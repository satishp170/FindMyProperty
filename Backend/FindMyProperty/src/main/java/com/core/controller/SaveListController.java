package com.core.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.core.dto.AvailablePropertyRespDTO;
import com.core.dto.SaveListReqDTO;
import com.core.service.SaveListService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/savelist")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class SaveListController {

	private final SaveListService saveListService;

	@PostMapping("/add")
	@Operation(description = "To add new user")
	public ResponseEntity<?> saveItem(@RequestBody @Valid SaveListReqDTO item) {
		return ResponseEntity.status(HttpStatus.CREATED).body(saveListService.saveItem(item));
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getSavedProperties(@PathVariable Long userId) {
		List<AvailablePropertyRespDTO> properties = saveListService.getSavedPropertiesByUser(userId);
		if (properties.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(properties);
	}

	@DeleteMapping("/delete/{userId}/{propId}")
	@Operation(description = "To delete user")
	public ResponseEntity<?> removeItem(@PathVariable Long userId, @PathVariable Long propId) {
		return ResponseEntity.ok(saveListService.removeItem(userId, propId));
	}
}

package com.core.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.core.dto.SubscriptionReqDTO;
import com.core.dto.UserRespDTO;
import com.core.service.SubscribeUserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/subusers")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class SubscribeUserController {

	private final SubscribeUserService subscribeUserService;

	@GetMapping("/list")
	@Operation(description = "To display all subscribed users")
	public ResponseEntity<?> showAllSubscribeUser() {
		List<UserRespDTO> users = subscribeUserService.showAllSubscribeUser();
		if (users.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(users);
	}
	
	@PostMapping("/add")
	@Operation(description = "To add new subscribe user")
	public ResponseEntity<?> subscribed(@RequestBody @Valid SubscriptionReqDTO subUser) {
		return ResponseEntity.status(HttpStatus.CREATED).body(subscribeUserService.subscribed(subUser));
	}
	
	@PutMapping("/edit/{userId}")
	@Operation(description = "To edit user Subscription")
	public ResponseEntity<?> editUser(@RequestBody @Valid SubscriptionReqDTO subUser, @PathVariable Long userId) {
		return ResponseEntity.ok(subscribeUserService.editSubscription(subUser, userId));
	}

	@DeleteMapping("/delete/{userId}")
	@Operation(description = "To unsubscribe user")
	public ResponseEntity<?> unsubscribed(@PathVariable Long userId) {
		return ResponseEntity.ok(subscribeUserService.unsubscribed(userId));
	}
}

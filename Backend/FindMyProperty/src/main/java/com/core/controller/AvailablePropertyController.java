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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.core.dto.AvailablePropertyReqDTO;
import com.core.dto.AvailablePropertyRespDTO;
import com.core.entities.Category;
import com.core.service.AvailablePropertyService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class AvailablePropertyController {

	private final AvailablePropertyService availablePropertyService;

	@GetMapping("/list")
	@Operation(description = "To display all properties")
	public ResponseEntity<?> showAllProperties() {
		List<AvailablePropertyRespDTO> props = availablePropertyService.showAllProperties();
		if (props.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(props);
	}

	@GetMapping("/property/{propId}")
	@Operation(description = "To display single property")
	public ResponseEntity<?> getProperty(@PathVariable Long propId) {
		return ResponseEntity.ok(availablePropertyService.getProperty(propId));
	}

	@PostMapping("/add")
	@Operation(description = "To add new property")
	public ResponseEntity<?> addProperty(@RequestBody @Valid AvailablePropertyReqDTO propertyReqDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(availablePropertyService.addProperty(propertyReqDTO));
	}

	@PutMapping("/edit/{propId}")
	@Operation(description = "To edit property")
	public ResponseEntity<?> editProperty(@RequestBody @Valid AvailablePropertyReqDTO propertyReqDTO,
			@PathVariable Long propId) {
		return ResponseEntity.ok(availablePropertyService.editProperty(propertyReqDTO, propId));
	}

	@DeleteMapping("/delete/{propId}")
	@Operation(description = "To delete property")
	public ResponseEntity<?> removeProperty(@PathVariable Long propId) {
		return ResponseEntity.ok(availablePropertyService.removeProperty(propId));
	}

	@GetMapping("/category/{cat}")
	@Operation(description = "To display all properties")
	public ResponseEntity<?> getPropertiesByCategory(@PathVariable Category cat) {
		List<AvailablePropertyRespDTO> props = availablePropertyService.getPropertiesByCategory(cat);
		if (props.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(props);
	}

	@GetMapping("/search")
	@Operation(description = "To search properties by filters")
	public ResponseEntity<?> searchProperties(@RequestParam String loc, @RequestParam Category type,
			@RequestParam int mxp, @RequestParam int mxar) {
		List<AvailablePropertyRespDTO> props = availablePropertyService.searchProperties(loc, type, mxp, mxar);
		if (props.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(props);
	}

}

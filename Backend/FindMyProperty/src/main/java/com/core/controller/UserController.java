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

import com.core.dto.ChangePasswordDTO;
import com.core.dto.UserReqDTO;
import com.core.dto.UserRespDTO;
import com.core.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class UserController {

	private final UserService userService;

	@GetMapping("/list")
	@Operation(description = "To display all users")
	public ResponseEntity<?> showAllUser() {
		List<UserRespDTO> users = userService.showAllUser();
		if (users.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(users);
	}

	@GetMapping("/user/{userId}")
	@Operation(description = "To display all users")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUser(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.getUser(userId));
	}

	@PostMapping("/{userId}/changepassword")
	@Operation(description = "To change user password")
	public ResponseEntity<?> changePassword(@RequestBody @Valid ChangePasswordDTO changePass,
			@PathVariable Long userId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.changePassword(userId, changePass));
	}

	@PutMapping("/edit/{userId}")
	@Operation(description = "To edit user")
	public ResponseEntity<?> editUser(@RequestBody @Valid UserReqDTO userDto, @PathVariable Long userId) {
		return ResponseEntity.ok(userService.editUser(userDto, userId));
	}

	@DeleteMapping("/delete/{userId}")
	@Operation(description = "To delete user")
	public ResponseEntity<?> removeUser(@PathVariable Long userId) {
		return ResponseEntity.ok(userService.removeUser(userId));
	}

	@GetMapping("/seller/{sellerId}")
	@Operation(description = "To display seller with properties")
	public ResponseEntity<?> getSellerWithProperties(@PathVariable Long sellerId) {
		return ResponseEntity.ok(userService.getSellerWithProperties(sellerId));
	}

}

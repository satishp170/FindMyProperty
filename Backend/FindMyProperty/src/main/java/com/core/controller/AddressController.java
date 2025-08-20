package com.core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.core.dto.AddressReqDTO;
import com.core.service.AddressService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class AddressController {

	private final AddressService addressService;

	@PutMapping("/edit/{addrId}")
	@Operation(description = "To edit Address")
	public ResponseEntity<?> editAddress(@RequestBody @Valid AddressReqDTO addrDto, @PathVariable Long addrId) {
		return ResponseEntity.ok(addressService.editAddress(addrDto, addrId));
	}

}

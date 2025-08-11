package com.core.dto;

import java.time.LocalDate;

import com.core.entities.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserReqDTO {
	@NotBlank
	private String name;
	@NotBlank
	private String username;
	@Email
	private String email;
	@Pattern(regexp="((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})")
	private String password;
	@Size(min = 10, max = 10)
	private String contactNo;
	@Past
	private LocalDate dob;
	@NotNull
	private AddressReqDTO address;
	private Role role;
}

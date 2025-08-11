package com.core.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@AllArgsConstructor
public class AddressReqDTO{
	@NotBlank
	private String lineOne;
	@NotBlank
	private String lineTwo;
	@NotBlank
	private String city;
	@NotBlank
	private String state;
	@NotBlank
	private String zipCode;

//	@NotBlank
//	private String country;

}

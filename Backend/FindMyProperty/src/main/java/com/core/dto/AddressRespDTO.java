package com.core.dto;

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
public class AddressRespDTO{
	private String lineOne;
	private String lineTwo;
	private String city;
	private String state;
	private String zipCode;

//	private String country;

}

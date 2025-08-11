package com.core.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class UserRespDTO extends BaseDTO {
	private String name;
	private String username;
	private String email;
	private String city;
	private String contactNo;
	private LocalDate dob;
}

package com.core.dto;

import java.time.LocalDate;
import java.util.List;

import com.core.entities.Plan;
import com.core.entities.Role;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SubUserRespDTO extends BaseDTO {
	private String name;
	private String username;
	private String email;
	private String contactNo;
	private LocalDate dob;
	private String imageUrl;
	private AddressRespDTO address;
	private Role role;
	private LocalDate startDate;
	private LocalDate endDate;
	private Plan plan;
	private List<AvailablePropertyRespDTO> avlProps;
}

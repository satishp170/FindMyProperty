package com.core.dto;

import com.core.entities.Plan;
import com.core.entities.Role;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class SubscriptionReqDTO extends BaseDTO {
	@NotNull
	private Long id;
	@NotNull
	private Role role;
	@NotNull
	private Plan plan;
}

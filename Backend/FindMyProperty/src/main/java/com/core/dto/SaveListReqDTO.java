package com.core.dto;

import jakarta.validation.constraints.NotNull;
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
public class SaveListReqDTO {
	@NotNull
	private Long userId;
	@NotNull
	private Long propertyId;
}

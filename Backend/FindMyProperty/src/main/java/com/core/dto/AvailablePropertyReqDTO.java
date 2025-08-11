package com.core.dto;

import org.hibernate.validator.constraints.Range;

import com.core.entities.Category;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
public class AvailablePropertyReqDTO  {
	@NotBlank
	private String name;
	@NotNull
	private Long sellerId;
	@NotNull
	private Category category;
	@NotNull
	private AddressReqDTO address;
	@NotNull
    private int beds;
	@NotNull
	private double area;
	@NotNull
	private boolean isRentable;
	@NotNull
	private boolean isBuyable;
	@Min(0)
	private double price;
	@Range(min = 0, max = 100)
	private double discount;
	@NotBlank
	private String description;
}

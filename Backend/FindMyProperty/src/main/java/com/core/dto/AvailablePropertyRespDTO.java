package com.core.dto;

import com.core.entities.Category;

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
public class AvailablePropertyRespDTO extends BaseDTO {
	private String name;
	private String sellerName;
	private Category category;
	private AddressRespDTO address;
    private int beds;
    private double area;
	private boolean isRentable;
	private boolean isBuyable;
	private double price;
	private double discount;
	private String description;
	
//    private String name;
//    private String sellerName;
//    private Category category;
//    private AddressRespDTO address;
//    private int beds;
//    private double area;
//    private double price;
//    private double discount;
//    private boolean isBuyable;
//    private boolean isRentable;
//    private String description;
}

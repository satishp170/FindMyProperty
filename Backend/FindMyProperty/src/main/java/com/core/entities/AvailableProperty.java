package com.core.entities;

import org.hibernate.validator.constraints.Range;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "available_properties")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@AllArgsConstructor
public class AvailableProperty extends BaseEntity {
	@Column(length = 50, nullable = false)
	private String name;
	@ManyToOne
	@JoinColumn(name = "seller_id")
	private User seller;
	@Enumerated(EnumType.STRING)
	private Category category;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "address_id", nullable = false, unique = true)
	private Address address;
	@Range(min = 0)
	@Column(nullable = false)
	private int beds;
	@Range(min = 0)
	@Column(nullable = false)
    private double area;
	@Column(nullable = false)
	private boolean isRentable;
	@Column(nullable = false)
	private boolean isBuyable;
	@Min(0)
	@Column(nullable = false)
	private double price;
//	@Min(0)
//	@Max(100)
	@Range(min = 0, max = 100)
	@Column(nullable = false)
	private double discount;
	@Column(length = 500, nullable = false)
	private String description;
}

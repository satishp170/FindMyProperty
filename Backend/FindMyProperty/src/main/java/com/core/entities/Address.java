package com.core.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "address")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Address extends BaseEntity {
	@Column(length = 100, nullable = false)
    private String lineOne;
	@Column(length = 100, nullable = false)
    private String lineTwo;
    @Column(length = 50, nullable = false)
    private String city;
    @Column(length = 50, nullable = false)
    private String state;
    @Column(length = 6, nullable = false)
    private String zipCode;

//	@Column(length = 50, nullable = false)
//	private String country;

}

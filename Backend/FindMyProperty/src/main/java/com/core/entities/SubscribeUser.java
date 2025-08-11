package com.core.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "subscribe_users")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@AllArgsConstructor
public class SubscribeUser {
	@Id
	private Long id;
	@OneToOne()
	@MapsId
	private User user;
	@Column(name = "started_on", nullable = false)
	private LocalDate startDate;
	@Column(name = "ended_on", nullable = false)
	private LocalDate endDate;
	@Enumerated(EnumType.STRING)
	private Plan plan;
}

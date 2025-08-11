package com.core.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@SuppressWarnings("serial")
@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = { "password", "address", "avlProps", "saveList" })
@AllArgsConstructor
public class User extends BaseEntity  implements UserDetails{
	@Column(length = 20, nullable = false)
	private String name;
	@Column(length = 20, nullable = false, unique = true)
	private String username;
	@Column(length = 30, nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String password;
	@Column(length = 20, nullable = false)
	private String contactNo;
	@Column(nullable = false)
	private LocalDate dob;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "address_id", nullable = false)
	private Address address;
	@Enumerated(EnumType.STRING)
	private Role role;	//seller buyer trader

	/*
	 * ========================================================== For Available
	 * Properties ==========================================================
	 */
	@OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<AvailableProperty> avlProps = new ArrayList<>();

	public void addAvailableProperty(AvailableProperty property) {
		avlProps.add(property);
		property.setSeller(this);
	}

	public void removeAvailableProperty(AvailableProperty property) {
		avlProps.remove(property);
		property.setSeller(null);
	}

	/*
	 * ========================================================== For Sold
	 * Properties ==========================================================
	 */

	/*
	 * ========================================================== For Rental
	 * Properties ==========================================================
	 */

	/*
	 * ========================================================== For Save List
	 * ==========================================================
	 */

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SaveList> saveList = new ArrayList<>();

	public void addSaveListEntry(SaveList entry) {
		saveList.add(entry);
		entry.setUser(this);
	}

	public void removeSaveListEntry(SaveList entry) {
		saveList.remove(entry);
		entry.setUser(null);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
	    return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
	}

}

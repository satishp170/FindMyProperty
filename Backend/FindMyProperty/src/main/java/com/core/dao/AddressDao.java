package com.core.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.core.entities.Address;

public interface AddressDao extends JpaRepository<Address, Long> {
	
}

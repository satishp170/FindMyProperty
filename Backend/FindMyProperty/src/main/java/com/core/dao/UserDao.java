package com.core.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.core.entities.User;

public interface UserDao extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);

	Optional<User> findByEmail(String email);
	
	Optional<User> findByUsernameOrEmail(String username, String email);
	
	@Query("select u from User u left join fetch u.avlProps where u.id=:sid")
	Optional<User> fetchSellerWithProperties(Long sid);

}

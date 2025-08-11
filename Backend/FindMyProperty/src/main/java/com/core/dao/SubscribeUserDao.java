package com.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.core.entities.SubscribeUser;
import com.core.entities.User;

public interface SubscribeUserDao extends JpaRepository<SubscribeUser, Long> {
	@Query("SELECT su.user FROM SubscribeUser su")
	List<User> findAllSubscribedUsers();
}

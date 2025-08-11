package com.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.core.entities.AvailableProperty;
import com.core.entities.Category;

public interface AvailablePropertyDao extends JpaRepository<AvailableProperty, Long> {

	List<AvailableProperty> findBySellerId(Long id);

	List<AvailableProperty> findByCategory(Category category);

	@Query("SELECT p FROM AvailableProperty p " + "JOIN p.address a "
			+ "WHERE LOWER(a.city) LIKE LOWER(CONCAT('%', :loc, '%')) " + "AND p.category = :type "
			+ "AND p.price <= :mxp ")
	List<AvailableProperty> findByFilters(String loc, Category type, double mxp);
}

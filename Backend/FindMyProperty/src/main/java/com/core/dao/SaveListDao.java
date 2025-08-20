package com.core.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.core.entities.SaveList;
import com.core.entities.SaveListId;

public interface SaveListDao extends JpaRepository<SaveList, SaveListId> {

	List<SaveList> findByUser_Id(Long userId);

	boolean existsByUserIdAndPropertyId(Long userId, Long propertyId);

}

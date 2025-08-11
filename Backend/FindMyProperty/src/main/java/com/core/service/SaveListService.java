package com.core.service;

import java.util.List;

import com.core.dto.ApiResponse;
import com.core.dto.AvailablePropertyRespDTO;
import com.core.dto.SaveListReqDTO;

public interface SaveListService {

	ApiResponse saveItem(SaveListReqDTO item);

	ApiResponse removeItem(Long userId, Long propId);

	List<AvailablePropertyRespDTO> getSavedPropertiesByUser(Long userId);
}

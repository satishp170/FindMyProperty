package com.core.service;

import java.util.List;

import com.core.dto.ApiResponse;
import com.core.dto.AvailablePropertyReqDTO;
import com.core.dto.AvailablePropertyRespDTO;
import com.core.entities.Category;

public interface AvailablePropertyService {

	List<AvailablePropertyRespDTO> showAllProperties();

	AvailablePropertyRespDTO getProperty(Long propId);

	AvailablePropertyRespDTO addProperty(AvailablePropertyReqDTO propertyReqDTO);

	ApiResponse editProperty(AvailablePropertyReqDTO propertyReqDTO, Long propId);

	ApiResponse removeProperty(Long propId);

	List<AvailablePropertyRespDTO> getPropertiesByCategory(Category cat);

	List<AvailablePropertyRespDTO> searchProperties(String loc, Category type, int mxp, int mxar);
}

package com.core.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.core.custom_exceptions.ResourceNotFoundException;
import com.core.dao.AddressDao;
import com.core.dao.AvailablePropertyDao;
import com.core.dao.UserDao;
import com.core.dto.ApiResponse;
import com.core.dto.AvailablePropertyReqDTO;
import com.core.dto.AvailablePropertyRespDTO;
import com.core.entities.Address;
import com.core.entities.AvailableProperty;
import com.core.entities.Category;
import com.core.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AvailablePropertyServiceImpl implements AvailablePropertyService {
	private final AvailablePropertyDao availablePropertyDao;
	private final UserDao userDao;
	private final AddressDao addressDao;
	private final ModelMapper modelMapper;

	@Override
	public List<AvailablePropertyRespDTO> showAllProperties() {
		return availablePropertyDao.findAll().stream().map(property -> {
			AvailablePropertyRespDTO dto = modelMapper.map(property, AvailablePropertyRespDTO.class);
			dto.setSellerName(property.getSeller().getName());
			dto.setSellerId(property.getSeller().getId());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public AvailablePropertyRespDTO getProperty(Long propId) {
		AvailableProperty property = availablePropertyDao.findById(propId)
				.orElseThrow(() -> new ResourceNotFoundException("Property not found!!!"));

		AvailablePropertyRespDTO dto = modelMapper.map(property, AvailablePropertyRespDTO.class);
		dto.setSellerName(property.getSeller().getName());
		dto.setSellerId(property.getSeller().getId());
		return dto;
	}

	@Override
	public AvailablePropertyRespDTO addProperty(AvailablePropertyReqDTO propertyReqDTO) {
		User seller = userDao.findById(propertyReqDTO.getSellerId())
				.orElseThrow(() -> new ResourceNotFoundException("Seller not found!!!"));
		Address addr = modelMapper.map(propertyReqDTO.getAddress(), Address.class);
		addressDao.save(addr);
		AvailableProperty property = modelMapper.map(propertyReqDTO, AvailableProperty.class);
		property.setAddress(addr);
		seller.addAvailableProperty(property);
		return modelMapper.map(availablePropertyDao.save(property), AvailablePropertyRespDTO.class);
	}

	@Override
	public ApiResponse editProperty(AvailablePropertyReqDTO dto, Long propId) {
		AvailableProperty property = availablePropertyDao.findById(propId)
				.orElseThrow(() -> new ResourceNotFoundException("Property not found!!!"));

		Address addr = property.getAddress();
		modelMapper.map(dto.getAddress(), addr);
		addressDao.save(addr);

		modelMapper.map(dto, property);
		property.setAddress(addr);

		availablePropertyDao.save(property);

		return new ApiResponse("Property with id - " + propId + " updated successfully");
	}

	@Override
	public ApiResponse removeProperty(Long propId) {
		AvailableProperty property = availablePropertyDao.findById(propId)
				.orElseThrow(() -> new ResourceNotFoundException("Property not found!!!"));

		property.getSeller().removeAvailableProperty(property);
		availablePropertyDao.delete(property);

		return new ApiResponse("user with id - " + propId + " removed successfully");
	}

	@Override
	public List<AvailablePropertyRespDTO> getPropertiesByCategory(Category category) {
		return availablePropertyDao.findByCategory(category).stream().map(property -> {
			AvailablePropertyRespDTO dto = modelMapper.map(property, AvailablePropertyRespDTO.class);
			dto.setSellerName(property.getSeller().getName());
			dto.setSellerId(property.getSeller().getId());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public List<AvailablePropertyRespDTO> searchProperties(String loc, Category type, int mxp, int mxar) {
		return availablePropertyDao.findByFilters(loc, type, mxp).stream().map(property -> {
			AvailablePropertyRespDTO dto = modelMapper.map(property, AvailablePropertyRespDTO.class);
			dto.setSellerName(property.getSeller().getName());
			dto.setSellerId(property.getSeller().getId());
			return dto;
		}).collect(Collectors.toList());
	}

}

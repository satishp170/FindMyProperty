package com.core.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.core.custom_exceptions.ResourceNotFoundException;
import com.core.dao.AddressDao;
import com.core.dto.AddressReqDTO;
import com.core.dto.ApiResponse;
import com.core.entities.Address;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AddressServiceImpl implements AddressService {

	private final AddressDao addressDao;
	private final ModelMapper modelMapper;

	@Override
	public ApiResponse editAddress(AddressReqDTO addrDto, Long addrId) {
		Address addr = addressDao.findById(addrId)
				.orElseThrow(() -> new ResourceNotFoundException("Address not found!!!"));

		modelMapper.map(addrDto, addr);
		addressDao.save(addr);
		return new ApiResponse("Address with id - " + addrId + " updated successfully");
	}

}

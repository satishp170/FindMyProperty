package com.core.service;

import com.core.dto.AddressReqDTO;
import com.core.dto.ApiResponse;

public interface AddressService {

	ApiResponse editAddress(AddressReqDTO addrDto, Long addrId);
}

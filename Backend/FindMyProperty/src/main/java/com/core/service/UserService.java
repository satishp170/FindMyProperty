package com.core.service;

import java.util.List;

import com.core.dto.ApiResponse;
import com.core.dto.ChangePasswordDTO;
import com.core.dto.SubUserRespDTO;
import com.core.dto.UserReqDTO;
import com.core.dto.UserRespDTO;

import jakarta.validation.Valid;

public interface UserService {

	UserRespDTO signUp(UserReqDTO userDto);

	List<UserRespDTO> showAllUser();

	SubUserRespDTO getUser(Long userId);

	ApiResponse editUser(UserReqDTO userDto, Long userId);

	ApiResponse removeUser(Long userId);

	SubUserRespDTO getSellerWithProperties(Long sellerId);

	ApiResponse changePassword(Long userId, @Valid ChangePasswordDTO changePass);

	void updateUserImage(Long userId, String imageUrl);

}

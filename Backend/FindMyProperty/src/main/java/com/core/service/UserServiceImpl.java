package com.core.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.core.custom_exceptions.ApiException;
import com.core.custom_exceptions.ResourceNotFoundException;
import com.core.dao.AddressDao;
import com.core.dao.SubscribeUserDao;
import com.core.dao.UserDao;
import com.core.dto.ApiResponse;
import com.core.dto.ChangePasswordDTO;
import com.core.dto.SubUserRespDTO;
import com.core.dto.UserReqDTO;
import com.core.dto.UserRespDTO;
import com.core.entities.Address;
import com.core.entities.AvailableProperty;
import com.core.entities.User;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserDao userDao;
	private final SubscribeUserDao subscribeUserDao;
	private final AddressDao addressDao;
	private final ModelMapper modelMapper;
	private final PasswordEncoder encoder;

	@Override
	public UserRespDTO signUp(UserReqDTO userDto) {
		if (userDao.existsByEmail(userDto.getEmail()))
			throw new ApiException("Duplicate Email !!!!!");
		Address addr = modelMapper.map(userDto.getAddress(), Address.class);
		addressDao.save(addr);
		User user = modelMapper.map(userDto, User.class);
		user.setPassword(encoder.encode(user.getPassword()));
		user.setAddress(addr);
		System.out.println(user.getRole());
//		user.setRole(Role.GUEST);
		return modelMapper.map(userDao.save(user), UserRespDTO.class);
	}

	@Override
	public ApiResponse changePassword(Long userId, @Valid ChangePasswordDTO changePass) {
		User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found!!!"));
		if (!encoder.matches(changePass.getOldPassword(), user.getPassword())) {
			throw new ApiException("Old password is incorrect");
		}
		user.setPassword(encoder.encode(changePass.getNewPassword()));
		userDao.save(user);
		return new ApiResponse("Password changed successfully for user ID: " + userId);
	}

	@Override
	public List<UserRespDTO> showAllUser() {
		return userDao.findAll().stream().map(user -> modelMapper.map(user, UserRespDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public SubUserRespDTO getUser(Long userId) {
		SubUserRespDTO user = modelMapper.map(
				userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found!!!")),
				SubUserRespDTO.class);

		subscribeUserDao.findById(userId).ifPresent(subUser -> {
			user.setStartDate(subUser.getStartDate());
			user.setEndDate(subUser.getEndDate());
			user.setPlan(subUser.getPlan());
		});

		return user;
	}

	@Override
	public ApiResponse editUser(UserReqDTO userDto, Long userId) {
		User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found!!!"));

		modelMapper.map(userDto, user);
		userDao.save(user);
		return new ApiResponse("user with id - " + userId + " updated successfully");
	}

	@Override
	public ApiResponse removeUser(Long userId) {
		User user = userDao.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found!!!"));

		for (AvailableProperty v : new ArrayList<>(user.getAvlProps()))
			user.removeAvailableProperty(v);

		userDao.delete(user);
		return new ApiResponse("user with id - " + userId + " removed successfully");
	}

	@Override
	public SubUserRespDTO getSellerWithProperties(Long sellerId) {
		SubUserRespDTO user = modelMapper.map(userDao.fetchSellerWithProperties(sellerId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found!!!")), SubUserRespDTO.class);

		subscribeUserDao.findById(sellerId).ifPresent(subUser -> {
			user.setStartDate(subUser.getStartDate());
			user.setEndDate(subUser.getEndDate());
			user.setPlan(subUser.getPlan());
		});

		return user;
	}

}

package com.core.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.core.custom_exceptions.ApiException;
import com.core.custom_exceptions.ResourceNotFoundException;
import com.core.dao.SubscribeUserDao;
import com.core.dao.UserDao;
import com.core.dto.ApiResponse;
import com.core.dto.SubscriptionReqDTO;
import com.core.dto.UserRespDTO;
import com.core.entities.Plan;
import com.core.entities.SubscribeUser;
import com.core.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class SubscribeUserServiceImpl implements SubscribeUserService {

	private final SubscribeUserDao subscribeUserDao;
	private final UserDao userDao;
	private final ModelMapper modelMapper;

	@Override
	public List<UserRespDTO> showAllSubscribeUser() {
		return subscribeUserDao.findAllSubscribedUsers().stream().map(user -> modelMapper.map(user, UserRespDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse subscribed(SubscriptionReqDTO subUser) {
		User user = userDao.findById(subUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found!!!"));
		if (subscribeUserDao.findById(subUser.getId()).isPresent())
			throw new ApiException("User already subscribed!!!");

		user.setRole(subUser.getRole());

		SubscribeUser newUser = new SubscribeUser();
		newUser.setUser(user);
		newUser.setPlan(subUser.getPlan());
		newUser.setStartDate(LocalDate.now());
		if (subUser.getPlan() == Plan.MONTHLY) {
			newUser.setEndDate(LocalDate.now().plusMonths(1));
		} else if (subUser.getPlan() == Plan.QUARTERLY) {
			newUser.setEndDate(LocalDate.now().plusMonths(3));
		} else if (subUser.getPlan() == Plan.YEARLY) {
			newUser.setEndDate(LocalDate.now().plusYears(1));
		}
		
		subscribeUserDao.save(newUser);
		return new ApiResponse("user with id - " + subUser.getId() + " successfully subscribed");
	}

	@Override
	public ApiResponse editSubscription(SubscriptionReqDTO subUser, Long userId) {
		SubscribeUser user = subscribeUserDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Subscription not found!!!"));
		modelMapper.map(subUser, user);
		subscribeUserDao.save(user);
		return new ApiResponse("Subscription updated successfully");
	}

	@Override
	public ApiResponse unsubscribed(Long userId) {
		SubscribeUser user = subscribeUserDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Subscription not found!!!"));
		subscribeUserDao.delete(user);
		return new ApiResponse("user with id - " + userId + " successfully unsubscribed");
	}

}

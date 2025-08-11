package com.core.service;

import java.util.List;

import com.core.dto.ApiResponse;
import com.core.dto.SubscriptionReqDTO;
import com.core.dto.UserRespDTO;

public interface SubscribeUserService {

	List<UserRespDTO> showAllSubscribeUser();

	ApiResponse subscribed(SubscriptionReqDTO subUser);

	ApiResponse editSubscription(SubscriptionReqDTO subUser, Long userId);

	ApiResponse unsubscribed(Long userId);
}

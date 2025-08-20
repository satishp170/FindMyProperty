package com.core.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.core.custom_exceptions.ApiException;
import com.core.custom_exceptions.ResourceNotFoundException;
import com.core.dao.AvailablePropertyDao;
import com.core.dao.SaveListDao;
import com.core.dao.UserDao;
import com.core.dto.ApiResponse;
import com.core.dto.AvailablePropertyRespDTO;
import com.core.dto.SaveListReqDTO;
import com.core.entities.AvailableProperty;
import com.core.entities.SaveList;
import com.core.entities.SaveListId;
import com.core.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class SaveListServiceImpl implements SaveListService {

	private final SaveListDao saveListDao;
	private final UserDao userDao;
	private final AvailablePropertyDao availablePropertyDao;
	private final ModelMapper modelMapper;

	@Override
	public ApiResponse saveItem(SaveListReqDTO item) {
		SaveListId id = new SaveListId(item.getUserId(), item.getPropertyId());

		if (saveListDao.findById(id).isPresent())
			throw new ApiException("This property is already saved by the user.");

		User user = userDao.findById(item.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + item.getUserId()));

		AvailableProperty property = availablePropertyDao.findById(item.getPropertyId()).orElseThrow(
				() -> new ResourceNotFoundException("Property not found with ID: " + item.getPropertyId()));

		SaveList saveList = new SaveList(user, property);
//		user.addSaveListEntry(saveList);
		saveListDao.save(saveList);

		return new ApiResponse("Item successfully added to your Save List.");
	}

	@Override
	public List<AvailablePropertyRespDTO> getSavedPropertiesByUser(Long userId) {
		List<SaveList> savedEntries = saveListDao.findByUser_Id(userId);

		return savedEntries.stream().map(entry -> {
			AvailableProperty property = entry.getProperty();
			AvailablePropertyRespDTO dto = modelMapper.map(property, AvailablePropertyRespDTO.class);
			dto.setSellerName(property.getSeller().getName());
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public ApiResponse removeItem(Long userId, Long propId) {
		SaveListId id = new SaveListId(userId, propId);
		SaveList saveList = saveListDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found!!!"));
//		saveList.getUser().removeSaveListEntry(saveList);
		saveListDao.delete(saveList);
		return new ApiResponse("Item successfully removed from your Save List!!!");
	}

	public boolean isPropertySaved(Long userId, Long propId) {
		return saveListDao.existsByUserIdAndPropertyId(userId, propId);
	}

}

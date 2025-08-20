package com.core.service;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageService {

	@Autowired
	private Cloudinary cloudinary;

	public String uploadImage(MultipartFile file) {
		try {
			Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), Map.of());
			return result.get("secure_url").toString();
		} catch (IOException e) {
			throw new RuntimeException("Image upload failed", e);
		}
	}

	public String uploadImageFromUrl(String imageUrl) {
		try {
			Map<?, ?> result = cloudinary.uploader().upload(imageUrl, Map.of());
			return result.get("secure_url").toString();
		} catch (IOException e) {
			throw new RuntimeException("Failed to upload image from URL", e);
		}
	}
}
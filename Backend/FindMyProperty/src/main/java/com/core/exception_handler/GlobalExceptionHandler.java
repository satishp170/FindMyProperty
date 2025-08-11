package com.core.exception_handler;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.method.ParameterErrors;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import com.core.custom_exceptions.ApiException;
import com.core.custom_exceptions.ResourceNotFoundException;
import com.core.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
	}

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> handleApiException(ApiException e) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(e.getMessage()));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		Map<String, String> rejectedFields = e.getFieldErrors().stream()
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(rejectedFields);
	}

	@ExceptionHandler(HandlerMethodValidationException.class)
	public ResponseEntity<Map<String, String>> handleHandlerMethodValidationException(
			HandlerMethodValidationException ex) {
		Map<String, String> errors = new HashMap<>();

		ex.getParameterValidationResults().forEach(paramResult -> {
			if (paramResult instanceof ParameterErrors parameterErrors) {
				parameterErrors.getFieldErrors().forEach(fieldError -> {
					errors.put(fieldError.getField(), fieldError.getDefaultMessage());
				});
			}
		});

		return ResponseEntity.badRequest().body(errors);
	}

}

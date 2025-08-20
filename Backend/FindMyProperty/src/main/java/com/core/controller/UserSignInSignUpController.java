package com.core.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.core.dto.AuthResp;
import com.core.dto.SignInDTO;
import com.core.dto.UserReqDTO;
import com.core.security.JwtUtils;
import com.core.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class UserSignInSignUpController {
	// depcy - user service i/f
	private final UserService userService;
	private AuthenticationManager authenticationManager;
	private JwtUtils jwtUtils;

//	Desc - sign in
//	URL - http://host:port/users/signin
//	Method - POST
//	Payload - signin dto 
//	Successful Resp -SC 200 ,body - mesg , JWT
//	failed - SC 401 , err mesg - api resp

	@PostMapping("/signin")
	@Operation(description = "User sign in ")
	public ResponseEntity<?> userSignIn(@RequestBody SignInDTO dto) {
		System.out.println("in sign in " + dto);
		// 1. invoke AuthenticationMgr's authenticate method

//		 API
//		1.1 Authentication authenticate(Authentication auth) 
//			throws AuthenticationException
//			i/p - not yet verified credentails
//			o/p - verified credentials
//			1.2 Authentication : i/f
//			Implemented by UserNamePasswordAuthenticationToken
//			(String userName|email,String password) 

		Authentication authToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
		System.out.println("before - " + authToken.isAuthenticated());// false
		Authentication validAuth = authenticationManager.authenticate(authToken);
		// => success
		System.out.println("after - " + validAuth.isAuthenticated());// true
		System.out.println(validAuth);// user details : UserEntity
		// 2. Create signed JWT n send it in the response.

		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new AuthResp("Succesful login !", jwtUtils.generateJwtToken(validAuth)));
	}

//	- Desc - User registration
//	URL - http://host:port/users/signup
//	Method - POST
//		payload -user signup req dto
//		resp - SC 201 , user resp  dto 
//		error - dup email - SC 400 | SC 409 , api resp - error mesg

	@PostMapping("/signup")
	public ResponseEntity<?> signupWithImage(@RequestPart("user") @Valid UserReqDTO dto,
			@RequestPart(value = "image", required = false) MultipartFile imageFile) {

		String imageUrl = "https://cdn-edge.kwork.ru/files/avatar/large/22/14459570-1.jpg";

		dto.setImageUrl(imageUrl);
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.signUp(dto));
	}

}

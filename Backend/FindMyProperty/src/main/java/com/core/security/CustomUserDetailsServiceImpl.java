package com.core.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.core.dao.UserDao;

import lombok.AllArgsConstructor;

@Service // spring bean containing B.L
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	// depcy
	private final UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// invoke dao's method
		com.core.entities.User user = userDao.findByUsernameOrEmail(email, email)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid Username or Email !!!!"));
		return user;
	}

}

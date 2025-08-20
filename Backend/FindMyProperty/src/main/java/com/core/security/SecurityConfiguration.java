package com.core.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration // to declare config class - to declare spring beans - @Bean)
@EnableWebSecurity // to customize spring security
@EnableMethodSecurity // to enable method level annotations
//(@PreAuthorize , @PostAuthorize..) to specify  authorization rules
@AllArgsConstructor
public class SecurityConfiguration {
//	depcy - password encoder
	@SuppressWarnings("unused")
	private final PasswordEncoder encoder;
	private final CustomJwtFilter customJwtFilter;
	private JwtAuthEntryPoint jwtAuthEntryPoint;
//	configure spring bean to customize spring security filter chain
//	disable CSRF protection
//		- session creation policy - stateless
//		- disable form login based authentication
//		- enable basic authentication scheme , for REST clients

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// 1. Disable CSRF protection
		http.csrf(csrf -> csrf.disable());
		// 2.
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		// 3. Authenticate any request
		http.authorizeHttpRequests(request ->
		// 4.permit all - swagger , view all restaurants , user signin , sign up....
		request.requestMatchers("/swagger-ui/**", "/v**/api-docs/**", "/users/signin", "/users/signup",
				"/users/signup-with-image").permitAll()
				// 6. restaurants - GET - to get all restaurants - no authentication
				.requestMatchers(HttpMethod.GET, "/users").permitAll()
				// get restaurant by id - customer
				.requestMatchers(HttpMethod.GET, "/users/list").permitAll()
				// update restaurant details - admin
				.anyRequest().authenticated());
		// 5. enable HTTP basic auth
		// http.httpBasic(Customizer.withDefaults());
		// 6. set session creation policy - stateless
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// 7. add custom JWT filter before -UserNamePasswordAuthFilter
		http.addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class);
		// 8. Customize error code of SC 401 , in case of authentication failure
		http.exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthEntryPoint));
		return http.build();
	}

	// configure a spring to return Spring security authentication manager
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration mgr) throws Exception {
		return mgr.getAuthenticationManager();
	}

	@Bean
	public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
		org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
		configuration.setAllowedOrigins(java.util.List.of("http://localhost:5173")); // ✅ Your frontend origin
		configuration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(java.util.List.of("*"));
		configuration.setAllowCredentials(true);

		org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}

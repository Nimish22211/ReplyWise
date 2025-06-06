package com.ansh.ReplyWise_Backend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy; // <-- Important import
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter; // <-- Important import

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final RateLimitFilter rateLimitFilter;

    public SecurityConfig(RateLimitFilter rateLimitFilter) {
        this.rateLimitFilter = rateLimitFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF, as it's not needed for stateless APIs
                .csrf(csrf -> csrf.disable())

                // 2. Explicitly set the session management to STATELESS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 3. Define authorization rules (we'll permit all for now, as rate limiting is our main concern)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // Secure this path
                        .anyRequest().authenticated() // Block other paths by default
                )

                // 4. Add your rate limit filter before the main AuthorizationFilter
                .addFilterBefore(rateLimitFilter, AuthorizationFilter.class);

        return http.build();
    }
}
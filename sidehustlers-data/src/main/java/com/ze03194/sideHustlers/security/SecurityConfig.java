package com.ze03194.sideHustlers.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private DataSource dataSource;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    private UserDetailsService userDetailsService;

    private static final String[] WHITE_LIST_URLS = {
            "/register",
            "/authenticate",
            "/refreshToken",
            "/",
            "/posts/findPostsBySideJobAndZipCodeLike",
            "/posts/findPostsByZipLike",
            "/posts/findPostsBySideJobLike",
            "/posts/findAllBySideJob",
            "/posts/findSideJobsByDescriptionLike",
            "/home",
            "/resendVerifyToken*",
            "/verifyRegistration*",
            "/test"
    };

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeRequests(auth -> {
//                            auth.antMatchers("/whoop").authenticated();
                            auth.antMatchers(WHITE_LIST_URLS).permitAll();
//                            auth.antMatchers("/api/**").authenticated();
                        }
                )
                .authorizeRequests().anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin()
                .loginPage("http://localhost:3000/login")
                .and()
                .cors()
                .and()
//                .oauth2Login(oauth2login ->
////                        oauth2login.loginPage("/oauth2/authorization/api-client-oidc")
//                        oauth2login.loginPage("http://localhost:3000/login")
//                )
//                .oauth2Client(Customizer.withDefaults())

                .build();
    }

//             .oauth2Login(oauth2login ->
////                        oauth2login.loginPage("/oauth2/authorization/api-client-oidc")
//            oauth2login.loginPage("http://localhost:3000/login")
//            )
//            .oauth2Client(Customizer.withDefaults())


    @Bean
    public AuthenticationProvider authProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }


}

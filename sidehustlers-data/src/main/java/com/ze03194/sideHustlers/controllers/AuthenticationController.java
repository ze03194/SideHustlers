package com.ze03194.sideHustlers.controllers;

import com.ze03194.sideHustlers.entities.RefreshToken;
import com.ze03194.sideHustlers.entities.User;
import com.ze03194.sideHustlers.models.JwtRequest;
import com.ze03194.sideHustlers.models.JwtResponse;
import com.ze03194.sideHustlers.repositories.UserRepository;
import com.ze03194.sideHustlers.services.RefreshTokenService;
import com.ze03194.sideHustlers.services.UserServiceImpl;
import com.ze03194.sideHustlers.utility.JWTUtility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {


    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/authenticate")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUserName(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getUserName());
        User user = userRepository.findByUserName(jwtRequest.getUserName());
        refreshTokenService.deleteAllByUser(user);
        final String token = jwtUtility.generateToken(userDetails);
        final String refreshTokenString = jwtUtility.generateRefreshToken(userDetails);
        RefreshToken refreshToken = new RefreshToken(refreshTokenString, jwtUtility.getExpirationDateFromToken(refreshTokenString), user);

        refreshTokenService.saveRefreshToken(refreshToken);


        return new JwtResponse(token);
    }


    @PostMapping("/refreshToken")
    public JwtResponse refreshToken(@RequestBody JwtRequest jwtRequest) throws Exception {

        try {
            authenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUserName(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        User user = userRepository.findByUserName(jwtRequest.getUserName());
        String token = refreshTokenService.findRefreshTokenByUser(user);

        if (jwtUtility.getExpirationDateFromToken(token).before(new Date())) {
            log.info("Token expired, generating new refresh token...");
            final UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getUserName());
            final String refreshTokenString = jwtUtility.generateRefreshToken(userDetails);
            RefreshToken refreshToken = new RefreshToken(refreshTokenString, jwtUtility.getExpirationDateFromToken(refreshTokenString), user);
            refreshTokenService.deleteRefreshTokenByToken(token);
            refreshTokenService.saveRefreshToken(refreshToken);
            token = refreshTokenService.findRefreshTokenByUser(user);
        }

        return new JwtResponse(token);
    }


    @GetMapping("/another")
    public ResponseEntity<String> blah(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token = authorization.substring(7);
        log.info("request: " + token);
//        token = authorization.substring(7);
        return ResponseEntity.status(HttpStatus.OK).body("It Worked!: ");
    }


}

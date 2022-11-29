package com.ze03194.sideHustlers.controllers;

import com.ze03194.sideHustlers.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.AuthProvider;
import java.security.Principal;
import java.util.Map;

@RestController
@Slf4j
public class LoginController {
    @Autowired
    AuthenticationProvider authProvider;

    @PostMapping("/whoop")
    public ResponseEntity<String> home(@RequestBody Map<String, Object> request) {
        String userName = String.valueOf(request.get("userName"));
        String password = String.valueOf(request.get("password"));

        Authentication authentication = authProvider.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
    @GetMapping("/testing")
    public String blah(Principal user) {
        if (user != null) {
            String name = user.getName();
            log.info("this is who is logged in: " + name);
        }
        return "test";
    }
}

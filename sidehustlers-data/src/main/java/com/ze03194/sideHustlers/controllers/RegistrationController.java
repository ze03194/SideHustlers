package com.ze03194.sideHustlers.controllers;

import com.ze03194.sideHustlers.entities.User;
import com.ze03194.sideHustlers.entities.VerificationToken;
import com.ze03194.sideHustlers.events.RegistrationCompleteEvent;
import com.ze03194.sideHustlers.models.PasswordModel;
import com.ze03194.sideHustlers.models.UserModel;
import com.ze03194.sideHustlers.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ApplicationEventPublisher publisher;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserModel userModel, final HttpServletRequest request) {
        User user = userService.registerUser(userModel);
        log.info("user: " + user);

        publisher.publishEvent(new RegistrationCompleteEvent(
                user,
                applicationUrl(request)
        ));
        return "Success";
    }
//    @PostMapping("/register")
//    public String registerUser(@RequestBody Map<String, String> request) {
//        User user = new User();
//        user.setUserName(request.get("userName"));
//        user.setFirstName(request.get("firstName"));
//        user.setLastName(request.get("lastName"));
//        user.setPassword(passwordEncoder.encode(request.get("password")));
//        user.setEmail(request.get("email"));
//        user.setPhoneNumber(request.get("phoneNumber"));
//        user.setCity(request.get("city"));
//        user.setState(request.get("state"));
//        user.setZipCode(request.get("zipCode"));
//        log.info("user: " + user);
//
//        userService.registerUser(user);
//        return "Registration Successful!";
//    }

    @GetMapping("/verifyRegistration")
    public String verifyRegistration(@RequestParam("token") String token) {
        String result = userService.validateVerificationToken(token);
        if (result.equalsIgnoreCase("valid")) {
            return "User Verified Successfully";
        }
        return "Bad User";
    }

    @GetMapping("/resendVerifiedToken")
    public String resendVerificationToken(@RequestParam("token") String oldToken, HttpServletRequest request) {
        VerificationToken verificationToken = userService.generateNewVerificationToken(oldToken);
        User user = verificationToken.getUser();
        resendVerificationTokenMail(user, applicationUrl(request), verificationToken);
        return "Verification Link Sent";
    }

    private void resendVerificationTokenMail(User user, String applicationUrl, VerificationToken verificationToken) {
        String url = applicationUrl + "/verifyRegistration?token=" + verificationToken.getToken();
        log.info("Click the link to verify your account: {}", url);

    }

    @PostMapping("/resetPassword")
    public String resetPassword(@RequestBody PasswordModel passwordModel, HttpServletRequest request) {
        User user = userService.findUserByEmail(passwordModel.getEmail());
        String url = "";
        if (user != null) {
            String token = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user, token);
            url = passwordResetTokenMail(user, applicationUrl(request), token);
        }
        return url;
    }

    private String passwordResetTokenMail(User user, String applicationUrl, String token) {
        String url = applicationUrl + "/savePassword?token=" + token;
        log.info("Click the link to reset your password: {}", url);

        return url;
    }

    @PostMapping("/savePassword")
    public String savePassword(@RequestParam("token") String token, @RequestBody PasswordModel passwordModel) {
        String result = userService.validatePasswordResetToken(token);
        if (!(result.equalsIgnoreCase("valid")))
            return "Invalid Token";
        Optional<User> user = userService.getUserByPasswordResetToken(token);

        if (user.isPresent()) {
            userService.changePassword(user.get(), passwordModel.getNewPassword());
            return "Password Reset Successful";
        } else
            return "Invalid Token";

    }

    @PostMapping("/changePassword")
    public String changePassword(@RequestBody PasswordModel passwordModel) {
        User user = userService.findUserByEmail(passwordModel.getEmail());
        if (!(userService.checkIfValidOldPassword(user, passwordModel.getOldPassword()))) {
            return "Invalid Old Password";
        }

        userService.changePassword(user, passwordModel.getNewPassword());
        return "Password Changed Successfully";
    }



    private String applicationUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + "/" + request.getContextPath();
    }

}
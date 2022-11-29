package com.ze03194.sideHustlers.events.listener;

import com.ze03194.sideHustlers.entities.User;
import com.ze03194.sideHustlers.events.RegistrationCompleteEvent;
import com.ze03194.sideHustlers.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Component
@Slf4j
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

    @Autowired
    private UserService userService;

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        userService.saveVerificationTokenForUser(token, user);

        String url = event.getApplicationUrl() + "verifyRegistration?token=" + token;
        System.out.println(url);
    }
}

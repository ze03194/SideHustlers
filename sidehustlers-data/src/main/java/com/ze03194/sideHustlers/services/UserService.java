package com.ze03194.sideHustlers.services;

import com.ze03194.sideHustlers.entities.User;
import com.ze03194.sideHustlers.entities.VerificationToken;
import com.ze03194.sideHustlers.models.UserModel;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    User registerUser(UserModel userModel);

    void saveVerificationTokenForUser(String token, User user);


    String validateVerificationToken(String token);

    VerificationToken generateNewVerificationToken(String oldToken);

    User findUserByEmail(String email);

    User findUserByUserName(String userName);

    void createPasswordResetTokenForUser(User user, String token);

    String validatePasswordResetToken(String token);

    void changePassword(User user, String newPassword);

    Optional<User> getUserByPasswordResetToken(String token);

    boolean checkIfValidOldPassword(User user, String oldPassword);


}

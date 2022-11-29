package com.ze03194.sideHustlers.services;

import com.ze03194.sideHustlers.entities.RefreshToken;
import com.ze03194.sideHustlers.entities.User;
import com.ze03194.sideHustlers.repositories.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RefreshTokenService  {

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    public String findRefreshTokenByUser(User user) {
        RefreshToken refreshToken = refreshTokenRepository.findRefreshTokenByUser(user);
        return refreshToken.getToken();
    }

    public void saveRefreshToken(RefreshToken refreshToken) {
        refreshTokenRepository.save(refreshToken);
    }

    public void deleteRefreshTokenByToken(String refreshToken) {
        refreshTokenRepository.deleteRefreshTokenByToken(refreshToken);
    }

    public void deleteAllByUser(User user) {
        refreshTokenRepository.deleteAllByUser(user);
    }

}

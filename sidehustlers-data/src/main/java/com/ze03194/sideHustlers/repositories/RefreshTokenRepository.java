package com.ze03194.sideHustlers.repositories;

import com.ze03194.sideHustlers.entities.RefreshToken;
import com.ze03194.sideHustlers.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findRefreshTokenByUser(User user);

    void deleteRefreshTokenByToken(String token);

    void deleteAllByUser(User User);
}

package com.ze03194.sideHustlers.repositories;

import com.ze03194.sideHustlers.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    User findByEmail(String email);

    User findByUserName(String username);
}

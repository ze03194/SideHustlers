package com.ze03194.sideHustlers.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class RefreshToken {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private Date expirationTime;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_name", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_REFRESH_TOKEN"))
    private User user;

    public RefreshToken(String token, Date expirationTime, User user) {
        super();
        this.token = token;
        this.expirationTime = expirationTime;
        this.user = user;
    }

    public RefreshToken(String token, Date expirationTime) {
        super();
        this.token = token;
        this.expirationTime = expirationTime;
    }
}

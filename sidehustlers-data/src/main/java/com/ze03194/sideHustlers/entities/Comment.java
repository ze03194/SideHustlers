package com.ze03194.sideHustlers.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", length = (1000))
    private String content;

    private Date dateCreated;

    private Long postId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_name", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_COMMENT"))
    private User user;

    public Comment(String content, Long postId, User user) {
        this.content = content;
        this.postId = postId;
        this.user = user;
    }
}

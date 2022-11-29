package com.ze03194.sideHustlers.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String postType;

    private String zipCode;

    private Date dateCreated;

    @OneToMany
    @JoinColumn(name = "comments", foreignKey = @ForeignKey(name = "FK_POST_COMMENTS"))
    private List<Comment> comments;

    @Column(name = "content", nullable = false, length = 1000)
    private String content;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_name", nullable = false, foreignKey = @ForeignKey(name = "FK_USER_POST"))
    private User user;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "side_job", nullable = false, foreignKey = @ForeignKey(name = "FK_DESCRIPTION"))
    private SideJob sideJob;


    public Post(String title, String content, User user) {
        this.title = title;
        this.content = content;
        this.user = user;
    }

    public Post(String title, String postType, SideJob sideJob, String content, User user) {
        this.title = title;
        this.postType = postType;
        this.sideJob = sideJob;
        this.content = content;
        this.user = user;
    }

    public Post(String title, String postType, SideJob sideJob, String zipCode, String content, User user) {
        this.title = title;
        this.postType = postType;
        this.sideJob = sideJob;
        this.zipCode = zipCode;
        this.content = content;
        this.user = user;
    }

    public Post(String title, String postType, SideJob sideJob, String zipCode, List<Comment> comments, String content, User user) {
        this.title = title;
        this.postType = postType;
        this.sideJob = sideJob;
        this.zipCode = zipCode;
        this.comments = comments;
        this.content = content;
        this.user = user;
    }
}

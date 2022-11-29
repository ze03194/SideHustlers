package com.ze03194.sideHustlers.repositories;

import com.ze03194.sideHustlers.entities.Post;
import com.ze03194.sideHustlers.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Post findPostByUser(User user);

    Post findPostById(Long id);

    List<Post> findAllPostsByUser(User user);

    void deletePostById(Long id);

    @Query("SELECT p FROM Post p WHERE p.sideJob.description LIKE ?1")
    List<Post> findAllBySideJob(String description);

    @Query("SELECT p FROM Post p WHERE p.postType LIKE %?1%")
    List<Post> findPostByPostTypeLike(String postType);

    @Query("SELECT p FROM Post p WHERE p.sideJob.description LIKE %?1%")
    List<Post> findPostsBySideJobLike(String sideJob);

    @Query("SELECT p FROM Post p WHERE p.zipCode LIKE ?1%")
    List<Post> findPostsByZipCodeLike(String zipCode);

    @Query("SELECT p FROM Post p WHERE p.sideJob.description LIKE %?1% AND p.zipCode LIKE %?2%")
    List<Post> findPostsBySideJobAndZipCodeLike(String sideJob, String zipCode);
}

package com.ze03194.sideHustlers.services;

import com.ze03194.sideHustlers.entities.Post;
import com.ze03194.sideHustlers.entities.SideJob;
import com.ze03194.sideHustlers.entities.User;
import com.ze03194.sideHustlers.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PostService {
    @Autowired
    PostRepository postRepository;

    public Post findPostByUser(User user) {
        return postRepository.findPostByUser(user);
    }

    public Post findPostById(Long id) {
        return postRepository.findPostById(id);
    }

    public List<Post> findAllPostsByUser(User user) {
        return postRepository.findAllPostsByUser(user);
    }

    public void createPost(Post post) {
        postRepository.save(post);
    }

    public void deletePostById(Long id) {
        postRepository.deletePostById(id);
    }

    public void editPost(Post post) {
        postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> findPostByPostTypeLike(String postType) {
        return postRepository.findPostByPostTypeLike(postType);
    }

    public List<Post> findPostBySideJobLike(String sideJob) {
        return postRepository.findPostsBySideJobLike(sideJob);
    }

    public List<Post> findPostByZipCodeLike(String zipCode) {
        return postRepository.findPostsByZipCodeLike(zipCode);
    }

    public List<Post> findPostsBySideJobAndZipCodeLike(String sideJob, String zipCode) {
        return postRepository.findPostsBySideJobAndZipCodeLike(sideJob, zipCode);
    }

    public List<Post> findAllBySideJob(String description) {
        return postRepository.findAllBySideJob(description);
    }

}

package com.ze03194.sideHustlers.controllers;

import com.ze03194.sideHustlers.entities.Post;
import com.ze03194.sideHustlers.entities.SideJob;
import com.ze03194.sideHustlers.entities.User;
import com.ze03194.sideHustlers.services.PostService;
import com.ze03194.sideHustlers.services.SideJobService;
import com.ze03194.sideHustlers.services.UserServiceImpl;
import com.ze03194.sideHustlers.utility.JWTUtility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/posts")
@CrossOrigin("http://localhost:3000")
@Slf4j
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    UserServiceImpl userService;

    @Autowired
    SideJobService sideJobService;

    @Autowired
    JWTUtility jwtUtility;

    @PostMapping("/createPost")
    public ResponseEntity<String> createPost(@RequestBody Map<String, Object> request, HttpServletRequest httpServletRequest) {
        String authorization = httpServletRequest.getHeader("Authorization");
        String token = authorization.substring(7);

        if (request.get("title").toString().equals("")) {
            String msg = "Tried to create post but missing param title";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
        }
        if (request.get("content").toString().equals("")) {
            String msg = "Tried to create post but missing param content";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
        }
        if (request.get("sideJob").toString().equals("")) {
            String msg = "Tried to create post but missing param sideJob";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
        }
        if (request.get("postType").toString().equals("")) {
            String msg = "Tried to create post but missing param postType";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
        }


        try {
            Post post = new Post();
            String userName = jwtUtility.getUsernameFromToken(token);
            User user = userService.findUserByUserName(userName);
            String title = (String) request.get("title");
            String content = (String) request.get("content");
            String zipCode = user.getZipCode();
            String sideJob = (String) request.get("sideJob");
            String postType = (String) request.get("postType");

            SideJob newSideJob = new SideJob(sideJob);
            sideJobService.createSideJob(newSideJob);


            post.setTitle(title);
            post.setContent(content);
            post.setPostType(postType);
            post.setSideJob(newSideJob);
            post.setZipCode(zipCode);
            post.setUser(user);
            post.setDateCreated(Date.from(Instant.now()));

            postService.createPost(post);

            return ResponseEntity.status(HttpStatus.OK).body("Created new post");
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @PostMapping("/getAllPostsByUser")
    public List<Post> getAllPostsByUser(@RequestBody Map<String, String> request) {
        String userName = request.get("userName");
        User user = userService.findUserByUserName(userName);

        return postService.findAllPostsByUser(user);
    }

    @GetMapping("/getAllPosts")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/getPostById")
    public Post getPostById(@RequestBody Map<String, String> request) {

        if (request.get("postId").equals("") || request.get("postId").isEmpty()) {
            String msg = "Tried to get post by postId but missing param postId";
            log.info(msg);
        }

        Long postId = Long.valueOf(request.get("postId"));
        Post post = postService.findPostById(postId);
        return post;
    }

    @PostMapping("/deletePostById")
    public ResponseEntity<String> deletePostById(@RequestBody Map<String, String> request) {
        if (request.get("postId").equals("") || request.get("postId").isEmpty()) {
            String msg = "Tried to delete post by postId but missing param postId";
            log.info(msg);
        }

        try {
            postService.deletePostById(Long.valueOf(request.get("postId")));
            return ResponseEntity.status(HttpStatus.OK).body("Post with ID: " + request.get("postId") + " successfully " +
                    "deleted");
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Post was not deleted successfully!");
        }
    }

    @PostMapping("/editPost")
    public ResponseEntity<String> editPost(@RequestBody Map<String, String> request) {
        if (request.get("postId").equals("") || request.get("postId").isEmpty()) {
            String msg = "Tried to edit post but missing param postId";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
        }
        Long postId = Long.valueOf(request.get("postId"));

        try {
            Post post = postService.findPostById(postId);
            post.setContent(request.get("content"));
            postService.editPost(post);
            return ResponseEntity.status(HttpStatus.OK).body("Post with ID: " + postId + " successfully edited!");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Post with ID: " + postId + " not edited!");
        }
    }

    @PostMapping("/findPostsBySideJobLike")
    public List<Post> findPostBySideJobLike(@RequestBody Map<String, String> request) {

        if (request.get("sideJob").equals("") || request.get("sideJob").isEmpty()) {
            String msg = "Tried to find posts by side job but missing param sideJob";
            log.info(msg);
        }

        String sideJob = request.get("sideJob");
        return postService.findPostBySideJobLike(sideJob);
    }

    @PostMapping("/findPostsByZipLike")
    public List<Post> findPostByZipLike(@RequestBody Map<String, String> request) {


        if (request.get("zipCode").equals("") || request.get("zipCode").isEmpty()) {
            String msg = "Tried to find posts by zip but missing param zipCode";
            log.info(msg);
        }

        String zipCode = request.get("zipCode").substring(0, 3);
        return postService.findPostByZipCodeLike(zipCode);
    }

    @PostMapping("/findPostsBySideJobAndZipCodeLike")
    public List<Post> findPostsBySideJobAndZipCodeLike(@RequestBody Map<String, String> request) {

        if (request.get("zipCode").equals("") || request.get("zipCode").isEmpty()) {
            String msg = "Tried to find posts by zip but missing param zipCode";
            log.info(msg);
        }
        if (request.get("sideJob").equals("") || request.get("sideJob").isEmpty()) {
            String msg = "Tried to find posts by sideJob but missing param sideJob";
            log.info(msg);
        }

        String sideJob = request.get("sideJob");
        String zipCode = request.get("zipCode").substring(0, 3);


        return postService.findPostsBySideJobAndZipCodeLike(sideJob, zipCode);
    }

    @PostMapping("/findSideJobsByDescriptionLike")
    public List<SideJob> findSideJobsByDescriptionLike(@RequestBody Map<String, String> request) {
        String description = request.get("description");
        return sideJobService.findAllByDescriptionLike(description);
    }

    @PostMapping("/findAllBySideJob")
    public List<Post> findAllBySideJob(@RequestBody Map<String, String> request) {
        String description = request.get("description");
        SideJob sideJob = sideJobService.findSideJobByDescription(description);
        log.info("sideJob: " + sideJob);
        return postService.findAllBySideJob(description);
    }
}

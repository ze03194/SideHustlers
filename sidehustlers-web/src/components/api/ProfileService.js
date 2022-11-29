import axios from "axios";

function ProfileService() {


}

const getAllPosts = async (token, user) => {

    return axios({
        method: 'post',
        url: 'http://localhost:8080/posts/getAllPostsByUser',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            userName: user
        }
    })
}

const deletePost = (token, postId) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/posts/deletePostById',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            postId: postId,
        }
    })
}

const editPost = (token, postId, content) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/posts/editPost',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            postId: postId,
            content: content
        }
    })
}

export {getAllPosts, deletePost, editPost}

export default ProfileService
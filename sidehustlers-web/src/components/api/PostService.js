import axios from "axios";

function PostService() {


}

const createPost = async (token, post) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/posts/createPost',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            title: post.title,
            content: post.content,
            postType: post.postType,
            sideJob: post.sideJob
        }
    })
}

const getAllPostsByZip = async (zipCode) => {

    return axios({
        method: 'post',
        url: 'http://localhost:8080/posts/findPostsByZipLike',
        headers: {
            // Authorization: 'Bearer ' + token
        },
        data: {
            zipCode: zipCode
        }
    })
}

const getAllPostsBySideJobAndZip = async (sideJob, zipCode) => {

    return axios({
        method: 'post',
        url: 'http://localhost:8080/posts/findPostByZipLike',
        headers: {
            // Authorization: 'Bearer ' + token
        },
        data: {
            sideJob: sideJob,
            zipCode: zipCode
        }
    })
}
const getAllPostsBySideJob = async (sideJob) => {
    console.log('sideJob: ' + sideJob)

    return axios({
        method: 'post',
        url: 'http://localhost:8080/posts/findAllBySideJob',
        headers: {
            // Authorization: 'Bearer ' + token
        },
        data: {
            description: sideJob
        }
    })
}

const getAllSideJobsByDescription = async (description) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/posts/findSideJobsByDescriptionLike',
        headers: {
            // Authorization: 'Bearer ' + token
        },
        data: {
            description: description
        }
    })
}


export {getAllPostsByZip, getAllPostsBySideJobAndZip, getAllPostsBySideJob, createPost, getAllSideJobsByDescription}

export default PostService
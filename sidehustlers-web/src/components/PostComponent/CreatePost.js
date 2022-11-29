import React, {useEffect, useState} from "react";
import NavigationHeaderLoggedIn from "../NavigationHeaderComponent/NavigationHeaderLoggedIn";
import './CreatePostStyles.css'
import useAuth from "../../hooks/useAuth";
import {createPost} from "../api/PostService";

const CreatePost = () => {
    const {auth} = useAuth();
    const [postTypeSelected, setPostTypeSelected] = useState(false);
    const [postType, setPostType] = useState('');
    const [post, setPost] = useState({
        title: '',
        content: '',
        postType: '',
        sideJob: ''
    })

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [postTypeError, setPostTypeError] = useState('');
    const [sideJobError, setSideJobError] = useState('');

    useEffect(() => {
        setTitleError('');
        setContentError('');
        setPostTypeError('');
        setSideJobError('');
    }, [])

    const handleChange = (key, value) => {

        setPost(({
            ...post,
            [key]: value
        }));

    }

    const handleSelector = (e) => {
        e.preventDefault()
        if (e.target.value === "null" || e.target.value === "") {
            setPostTypeSelected(false);
        }
        setPostTypeSelected(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (post.postType === "null" || post.postType === "") {
            setPostTypeError("Please select a Post Type");
        } else {
            setPostTypeError('');
        }

        if (post.title === "") {
            setTitleError("Please enter a Title");
        } else if (post.title !== "" && post.title.length < 5) {
            setTitleError("Title must have at least 5 characters");
        } else {
            setTitleError('');
        }

        if (post.content === "") {
            setContentError("Please enter a body for the post")
        } else if (post.content !== "" && post.content.length < 10) {
            setContentError("Body must have at least 10 characters");
        } else if (post.content !== "" && post.content.length > 999) {
            setContentError("Body cannot have more than 999 characters");
        } else {
            setContentError('');
        }

        if (post.sideJob === "") {
            setSideJobError("Please enter a Side Job");
        } else if (post.sideJob !== "" && post.sideJob.length < 3) {
            setSideJobError("Side job must have at least 3 characters")
        } else {
            setSideJobError('');
        }

        if (postTypeError === '' && titleError === '' && contentError === '' && sideJobError === '') {
            createPost(auth.token, post)
                .then(response => {
                    console.log(response.data)
                })
                .catch(response => {
                    console.error(response.status)
                })
        }


    }

    return (
        <div id="main-container">
            <NavigationHeaderLoggedIn/>
            <form id="post-card">
                <div id="individual-card">
                    <div id="post-top-bar">
                        {postTypeError && (
                            <span id="post-type-error">{postTypeError}</span>
                        )}
                        <span
                            id="top-post-header-span">
                            <select onChange={event => handleChange('postType', event.target.value)}
                                    id="post-type-selector" required>
                                <option value="null">Post Type</option>
                                <option value="Advertisement">Advertisement</option>
                                <option value="Solicit">Solicit</option>
                            </select>
                        </span>

                    </div>
                    {titleError && (
                        <span className="create-post-error-texts">{titleError}</span>
                    )}
                    <h3 id="title-header3">
                        <input type="text" id="title-header-input" placeholder="Title" required
                               onChange={event => handleChange("title", event.target.value)}/>
                    </h3>

                    {sideJobError && (
                        <span className="create-post-error-texts" id="side-job-error">{sideJobError}</span>
                    )}
                    <input type="text" id="sidejob-type-input" placeholder="Landscaping, plumbing, etc.."
                           onChange={event => handleChange("sideJob", event.target.value)} required/>

                    {contentError && (
                        <span className="create-post-error-texts">{contentError}</span>
                    )}
                    <textarea rows={6} id="content-text-area"
                              onChange={event => handleChange("content", event.target.value)} required></textarea>

                    <button id="edit-button" onClick={handleSubmit}>Create Post</button>
                </div>

            </form>
        </div>
    );
}

export default CreatePost
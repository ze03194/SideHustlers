import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import NavigationHeaderLoggedIn from "../NavigationHeaderComponent/NavigationHeaderLoggedIn";
import './ProfileStyles.css'
import {deletePost, editPost, getAllPosts} from "../api/ProfileService";
import secureLocalStorage from "react-secure-storage";
import {useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ProfilePage = () => {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [postClicked, setPostClicked] = useState(false);
    const [post, setPost] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [allPosts, setAllPosts] = useState([{
        id: 0,
        title: "",
        content: "",
        user: {}
    }])

    const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");

    useEffect(() => {
        if (isLoggedIn && auth.user) {
            // const user = secureLocalStorage.getItem("user")
            // const pw = secureLocalStorage.getItem("password");
            // let token = ''
            // RefreshService(user, pw)
            //     .then(response => {
            //         setRefreshToken(response.data.jwtToken);
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
            // console.log("did it work?: " + auth.token)
            console.log('token: ' + auth.token)

            try {
                let allPostsHolder = []
                getAllPosts(auth.token, auth.user)
                    .then(response => {
                        console.log(response.data)
                        for (let i = 0; i < response.data.length; i++) {
                            allPostsHolder.push(response.data[i])
                        }
                        setAllPosts(allPostsHolder)

                    })
                    .catch(response => {
                        console.log(response.status)
                    })
            } catch (error) {
                console.error(error)
            }
        }

    }, [auth, postClicked])


    const handlePostClick = (id, title, content) => {
        setPostClicked(true)
        setPost({
            id: id,
            title: title,
            content: content
        })
    }

    const handleDelete = () => {
        // console.log(JSON.stringify(post) + ' was clicked')
        try {
            deletePost(auth.token, post.id)
                .then(response => {
                    console.log("response: " + response.data)
                    setPostClicked(false);
                })
                .catch(response => {
                    console.error(response.status)
                })
        } catch (error) {
            console.error(error)
        }
        navigate('/profile');
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleEditBtn = () => {
        let element = document.getElementById("content-text-area").value;

        try {
            editPost(auth.token, post.id, element)
                .then(response => {
                    console.log("editResponse: " + response.data)
                    setIsEditing(false);
                })
                .catch(response => {
                    console.error(response.status)
                })
        } catch (error) {
            console.error(error)
        }


    }

    return (
        <>
            {postClicked ? (
                    <div id="main-container">
                        <NavigationHeaderLoggedIn/>
                        <div id="welcome-banner">
                            <h1 id="welcome-header">Welcome {auth.user}</h1>
                        </div>
                        <form id="post-card">
                            <div id="individual-card">
                                <DropdownButton id="dropdown-basic-button" title="Customize Post">
                                    <Dropdown.Item id="dropdown-edit" onClick={() => handleEdit()}>Edit Post</Dropdown.Item>
                                    <Dropdown.Item id="dropdown-delete" onClick={() => handleDelete()}>Delete
                                        Post</Dropdown.Item>
                                </DropdownButton>
                                <h3 id="title-header3">{post.title}</h3>
                                {
                                    !isEditing ? (
                                            <p id="content-paragraph">{post.content}</p>
                                        ) :
                                        <div id="edit-area-div">
                                            <textarea id="content-text-area" defaultValue={post.content} rows="6"
                                                      maxLength="23473247327"/>
                                            <button id="edit-button" onClick={() => handleEditBtn()}>Edit</button>
                                        </div>
                                }

                            </div>
                        </form>
                    </div>
                ) :
                <div id="main-container">
                    <NavigationHeaderLoggedIn/>
                    <div id="welcome-banner">
                        <h1>Welcome {auth.user}</h1>
                    </div>
                    <form id="post-card">
                        {allPosts.map(({id, title, content, user}) => (
                            <div id="individual-card" key={id} onClick={() => handlePostClick(id, title, content)}>
                                <h3 id="title-header3">{title}</h3>
                                <p id="content-paragraph">{content}</p>
                            </div>
                        ))}
                    </form>
                </div>
            }
        </>
    )

}

export default ProfilePage
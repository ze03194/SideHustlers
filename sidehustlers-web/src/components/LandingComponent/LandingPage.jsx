import React, {useEffect, useState} from "react";
import NavigationHeader from "../NavigationHeaderComponent/NavigationHeader";
import './LandingPageStyles.css'
import secureLocalStorage from "react-secure-storage";
import NavigationHeaderLoggedIn from "../NavigationHeaderComponent/NavigationHeaderLoggedIn";
import {useNavigate} from "react-router-dom";
import {getAllPostsBySideJob, getAllPostsByZip, getAllSideJobsByDescription} from "../api/PostService";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

function LandingPage() {

    const numbersRegex = /^[0-9]+$/;

    const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");
    const testing = secureLocalStorage.getItem("user");
    const navigate = useNavigate();
    const {auth} = useAuth();
    const refresh = useRefreshToken();
    const [zipCode, setZipCode] = useState('');
    const [sideJob, setSideJob] = useState('');
    const [displaySuggestions, setDisplaySuggestions] = useState(false);
    const [allPosts, setAllPosts] = useState([{
        id: 0,
        title: "",
        content: "",
        postType: "",
        sideJob: "",
        zipCode: "",
        dateCreated: "",
        comments: {},
        user: {}
    }])
    const [post, setPost] = useState({
        id: 0,
        title: "",
        content: "",
        postType: "",
        sideJob: "",
        zipCode: "",
        dateCreated: "",
        comments: {},
        user: {}
    })
    const [allSideJobs, setAllSideJobs] = useState([{
        description: '',
    }])

    const [postsRetrieved, setPostsRetrieved] = useState(false);
    const [postClicked, setPostClicked] = useState(false);
    const [zipError, setZipError] = useState('');
    const [postError, setPostError] = useState('');

    useEffect(() => {
        navigate("/")

        if (isLoggedIn) {
            refresh();
        }

    }, [])


    const handleSubmit = () => {
        setPostClicked(false);
        let allPostsHolder = [];

        if (sideJob === "" && zipCode === "") {
            allPosts.length = 0;
            setPostsRetrieved(false)
        }

        if (sideJob === "" && zipCode !== "") {
            getAllPostsByZip(zipCode)
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        allPostsHolder.push(response.data[i])
                    }
                    setAllPosts(allPostsHolder);
                    setPostsRetrieved(true);
                    setPostError('');
                })
                .catch(response => {
                    console.log(response.status)
                })
        }

        if (sideJob !== "" && zipCode === "") {
            getAllPostsBySideJob(sideJob)
                .then(response => {
                    console.log(response.data)
                    for (let i = 0; i < response.data.length; i++) {
                        allPostsHolder.push(response.data[i])
                    }
                    setAllPosts(allPostsHolder);
                    setPostsRetrieved(true);
                    setPostError('')
                })
                .catch(response => {
                    console.log(response.status)
                })
        }
        console.log(JSON.stringify(allPosts))
        if (allPosts.length === 0) {
            setPostError('Sorry, no posts were found matching your criteria.');
        } else {
            setPostError('');
        }


    }

    const handleChangeSideJob = (e) => {
        e.preventDefault();
        let allSideJobsHolder = [];

        if (e.target.value.length > 0) {

            getAllSideJobsByDescription(e.target.value)
                .then(response => {
                    setDisplaySuggestions(true);
                    for (let i = 0; i < response.data.length; i++) {
                        allSideJobsHolder.push(response.data[i])
                    }
                    if (response.data.length > 0) {
                        setAllSideJobs(allSideJobsHolder);
                    } else {
                        setDisplaySuggestions(false);
                        setAllSideJobs([])
                    }

                })
                .catch(response => {
                    console.log(response.status)
                })
        }
        // else {
        //     setAllSideJobs([]);
        //
        // }
        setSideJob(e.target.value);
        setDisplaySuggestions(false);
    }
    const handleChangeZip = (e) => {
        if (!numbersRegex.test(e.target.value)) {
            setZipError('Zipcode can only contain numbers')
        } else {
            setZipError('')
        }
        if (e.target.value === '') {
            setZipError('');
        }

        setZipCode(e.target.value);
    }

    const handlePostClicked = (e) => {
        setPostClicked(true);
        setPost({
            id: e.id,
            title: e.title,
            content: e.content,
            postType: e.postType,
            sideJob: e.sideJob,
            zipCode: e.zipCode,
            comments: e.comments,
            dateCreated: e.dateCreated,
            user: e.user
        })

    }

    const handleSuggestionClick = (e) => {
        let element = document.getElementById("side-job-input")
        element.value = e;
        setSideJob(e);
        setDisplaySuggestions(false);
    }

    return (
        <div id="main-container">
            {!isLoggedIn ? (<NavigationHeader/>) :
                <NavigationHeaderLoggedIn/>
            }
            <div className="header-container">
                <h1 id="main-header">The Ultimate Place to Advertise or Solicit a Side Hustle!</h1>
            </div>
            <div className="input-container">
                <div id="side-job-container">
                    <input type="text" placeholder="Enter type of side job" className="search-input" id="side-job-input"
                           onChange={handleChangeSideJob} autoComplete="off"/>
                    {allSideJobs.length > 0 && displaySuggestions ? (
                            <div id="sidejob-suggestions-container">
                                <ul id="ul-sidejob-suggestions">
                                    {allSideJobs.map(({
                                                          id, description
                                                      }) => (
                                        <li id="li-sidejob-suggestions" key={description}
                                            onClick={() => handleSuggestionClick(description)}>
                                            {description}
                                        </li>
                                    ))}
                                </ul>
                                <button id="search-button" onClick={handleSubmit}>Search</button>
                            </div>
                        ) :
                        <span></span>
                    }
                </div>
                <div id="zip-container">
                    <input type="text" placeholder="Zipcode" className="search-input" onChange={handleChangeZip}/>
                    {zipError && (
                        <span id="error-span">{zipError}</span>
                    )}
                </div>
            </div>

            {!displaySuggestions ? (
                <button id="search-button-no-suggestions" onClick={handleSubmit}>Search</button>
            ) : <span></span>}
            {postError && (
                <div id="no-post-error">
                    <span id="post-error-span">{postError}</span>
                </div>
            )}


            {postsRetrieved && allPosts.length > 0 ? (
                    <>
                        {!postClicked ? (
                            <form id="post-card">
                                {allPosts.map(({
                                                   id, title, content, sideJob, postType,
                                                   zipCode, comments, user, dateCreated
                                               }) => (
                                    <div id="individual-card" key={id}
                                         onClick={() => handlePostClicked({
                                             id,
                                             title,
                                             content,
                                             sideJob,
                                             postType,
                                             zipCode,
                                             user,
                                             dateCreated
                                         })}>
                                        <div id="post-top-bar">
                                            <span
                                                id="top-post-header-span">
                                                Posted by {user.firstName} {user.lastName} {
                                                Math.trunc(Math.abs((new Date() - new Date(dateCreated)) / 36e5)) > 0 ?
                                                    "(" + Math.trunc(Math.abs((new Date() - new Date(dateCreated)) / 36e5)) + " hour(s) ago)" :
                                                    "(" + Math.trunc(Math.abs((new Date() - new Date(dateCreated)) / 36e5 * 60)) + " minutes ago)"
                                            }
                                            </span>
                                        </div>
                                        <h3 id="title-header3">{title}</h3>
                                        <p id="content-paragraph">{content}</p>
                                    </div>
                                ))}
                            </form>
                        ) : <form id="post-card">
                            <div id="individual-card" key={post.id}>
                                <div id="post-top-bar">
                                            <span
                                                id="top-post-header-span">
                                                Posted by {post.user.firstName} {post.user.lastName} {
                                                "(" + Math.trunc(Math.abs((new Date() - new Date(post.dateCreated)) / 36e5)) > 0 ?
                                                    Math.trunc(Math.abs((new Date() - new Date(post.dateCreated)) / 36e5)) + " hour(s) ago)" :
                                                    "(" + Math.trunc(Math.abs((new Date() - new Date(post.dateCreated)) / 36e5 * 60)) + " minutes ago)"
                                            }
                                            </span>
                                </div>
                                <h3 id="title-header3">{post.title}</h3>
                                <p id="content-paragraph">{post.content}</p>
                            </div>
                        </form>}

                    </>
                ) :

                <div></div>
                // <form id="post-card">
                //     <div id="individual-card" key={post.id}>
                //         <h3 id="title-header3">{post.title}</h3>
                //         <p id="content-paragraph">{post.content}</p>
                //     </div>
                // </form>
            }


        </div>
    )
}

export default LandingPage
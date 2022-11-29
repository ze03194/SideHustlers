import React, {useEffect, useRef, useState} from "react";
import './LoginStyles.css'
import NavigationHeader from "../NavigationHeaderComponent/NavigationHeader";
import LoginService from "../api/LoginService";
import useAuth from "../../hooks/useAuth";
import {Link, useLocation, useNavigate} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";


// let user = {
//     userName: "",
//     password: "",
// }


function LoginPage() {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef(null);
    const errorRef = useRef(null);

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMsg('')
    }, [user, password])

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //
    //     try {
    //         const userData = await login({user, password}).unwrap()
    //         console.log(userData)
    //         dispatch(setCredentials({...userData, user}))
    //         setUser('')
    //         setPassword('')
    //
    //     } catch (error) {
    //         if (!error?.response) {
    //             setErrMsg('No Server Response')
    //         } else if (error.response?.status === 400) {
    //             setErrMsg('Missing Username or Password')
    //         } else if (error.response?.status === 401) {
    //             setErrMsg('Unauthorized')
    //         } else {
    //             setErrMsg('Login Failed')
    //         }
    //         errRef.current.focus();
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        LoginService(user, password)
            .then(response => {
                const token = response?.data?.jwtToken;
                setAuth({user, password, token})
                // window.sessionStorage.setItem("isLoggedIn", "true");
                // secureLocalStorage.setItem("isLoggedIn", "true");
                secureLocalStorage.setItem("isLoggedIn", "true");
                secureLocalStorage.setItem("user", user);
                secureLocalStorage.setItem("password", password);

                setUser('');
                setPassword('');
                navigate(from, {replace: true});
            })
            .catch(response => {
                console.log(response.status)
                setErrorMsg("error")
            })


    }

    return (
        <div id="main-container">
            <NavigationHeader/>
            <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"} aria-live="assertive">
                {errorMsg}
            </p>
            <form className="login-card" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Account Name"
                    className="login-inputs"
                    id="account-name-input"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(event) => {
                        setUser(event.target.value)
                    }}
                    value={user}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="login-inputs"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                    required
                    value={password}
                />
                <button id="login-button">Login</button>
                <div id="login-footer">
                    <Link to="/forgot-password" className="login-navigation-links">Forgot Password</Link>
                    <Link to="/register" className="login-navigation-links">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
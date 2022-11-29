import React, {useEffect, useRef, useState} from "react";
import './RegisterStyles.css'
import NavigationHeader from "../NavigationHeaderComponent/NavigationHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import RegisterService from "../api/RegisterService";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numbersRegex = /^[0-9]+$/;

function RegisterPage() {

    const userRef = useRef(null);
    const errorRef = useRef(null);
    let navigate = useNavigate();

    const [user, setUser] = useState({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
        state: "",
        zipCode: ""
    });
    const [validName, setValidName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [zipError, setZipError] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        console.log(userRef.current)
        userRef.current.focus()

    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user.userName));
        console.log(user.userName)
    }, [user.userName])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(user.password));
        // setValidMatch(password === matchPassword);
    }, [user.password])

    useEffect(() => {
        setValidEmail(emailRegex.test(user.email))
    }, [user.email])

    useEffect(() => {
        setErrorMsg('');
    }, [user.userName, user.password, user.email])


    let newUser = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
        state: "",
        zipCode: ""
    }

    const handleChange = (key, value) => {

        if (key === 'zipCode') {
            if (!numbersRegex.test(value)) {
                setZipError("Zipcode can only contain numbers")
                return
            }
            setZipError('');
        }


        setUser(({
            ...user,
            [key]: value
        }));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user.userName);
        const v2 = PWD_REGEX.test(user.password);

        if (!v1 || !v2) {
            setErrorMsg("Invalid Entry");
            return;
        }
        // console.log(JSON.stringify(user));
        setSuccess(true);
        RegisterService(user)
            .then(response => {
                console.log(response.data)
            })
            .catch(response => {
                console.log(response.status)
            })
        navigate('/login');
    }


    return (
        <>
            {success ? (
                <section id="success-container">
                    <NavigationHeader/>
                    <div id="success-div">
                        <h1 id="success-header">Registration Success!</h1>
                        <p>
                            <Link to="/login" className="login-navigation-links">Click to Login</Link>
                        </p>
                    </div>
                </section>
            ) : (
                <section id="main-container">
                    <NavigationHeader/>
                    <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"}
                       aria-live="assertive">{errorMsg}</p>
                    <form onSubmit={handleSubmit} id="register-card">
                        <span id="register-span">Register</span>
                        <input
                            type="text"
                            placeholder="Username"
                            className="register-inputs"
                            onChange={(event) => {
                                handleChange('userName', event.target.value)
                            }}
                            ref={userRef}
                            autoComplete="off"
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserNameFocus(true)}
                            onBlur={() => setUserNameFocus(false)}
                        />
                        <p id="uidnote"
                           className={userNameFocus && user.userName && !validName ? "instructions" : "offscreen"}
                           style={{borderStyle: "solid", color: 'white', borderColor: 'black', marginTop: '10px'}}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            4 to 24 character. <br/>
                            Must begin with a letter. <br/>
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <input
                            type="password"
                            placeholder="Password"
                            className="register-inputs"
                            onChange={event => handleChange('password', event.target.value)}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordNote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordNote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}
                           style={{
                               borderStyle: "solid",
                               color: 'white',
                               borderColor: 'black',
                               marginTop: '10px',
                               marginBottom: '-6px'
                           }}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            8 to 24 characters. <br/>
                            Must include uppercase and lowercase letters, a number and a special character <br/>
                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <input required type="text" placeholder="First Name" className="register-inputs"
                               onChange={event => handleChange('firstName', event.target.value)}/>
                        <input required type="text" placeholder="Last Name" className="register-inputs"
                               onChange={event => handleChange('lastName', event.target.value)}

                        />
                        <input required type="text" placeholder="Email" className="register-inputs"
                               onChange={event => handleChange('email', event.target.value)}/>
                        <input required type="text" placeholder="Phone Number" className="register-inputs"
                               onChange={event => handleChange('phoneNumber', event.target.value)}/>
                        <input required type="text" placeholder="City" className="register-inputs"
                               onChange={event => handleChange('city', event.target.value)}/>
                        <input required type="text" placeholder="State" className="register-inputs"
                               onChange={event => handleChange('state', event.target.value)}/>
                        <input required type="text" placeholder="Zipcode" className="register-inputs" maxLength={5}
                               onChange={event => handleChange('zipCode', event.target.value)}/>
                        {zipError && (
                            <span id="zip-error">{zipError}</span>
                        )}
                        <button
                            id="register-button"
                            disabled={!validName || !validPassword || !validEmail}>
                            Register
                        </button>
                    </form>
                </section>
            )}
        </>
    )
}

export default RegisterPage
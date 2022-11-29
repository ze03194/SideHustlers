import axios from "axios";

function LoginService(userName, userPassword) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/authenticate',
        headers: {},
        data: {
            userName: userName,
            password: userPassword
        }
    })
}

export default LoginService
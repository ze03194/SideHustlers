import axios from "axios";

function RefreshService(userName, userPassword) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/refreshToken',
        headers: {},
        data: {
            userName: userName,
            password: userPassword
        }
    })
}

export default RefreshService
import axios from "axios";

function RegisterService(user) {
    const postData = JSON.stringify(user);
    return axios({
        method: 'post',
        url: 'http://localhost:8080/register',
        headers: {},
        data: {
            userName: user.userName,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode
        }
    })
}

export default RegisterService
import useAuth from "./useAuth";
import RefreshService from "../components/api/RefreshService";
import secureLocalStorage from "react-secure-storage";

const useRefreshToken = () => {
    const {auth} = useAuth();
    const {setAuth} = useAuth();

    const refresh = async () => {
        const user = secureLocalStorage.getItem("user");
        const password = secureLocalStorage.getItem("password");


        RefreshService(user, password)
            .then((response) => {
                const token = response.data.jwtToken;
                setAuth({user, password, token})
                return response.data.jwtToken;
            })
            .catch((response) => {
                console.log(response.status)
            })
    }
    return refresh;
}
export default useRefreshToken;
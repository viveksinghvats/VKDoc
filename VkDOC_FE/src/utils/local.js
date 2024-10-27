import { clearUserData, isTokenExpired } from "../helpers/authHelper";
import AuthService from "../services/AuthService";

const getloggedInUser = () => {
    const token = localStorage.getItem('token');
    if(isTokenExpired(token)){
        clearUserData();
    }
    return AuthService.getCurrentUser();

}

const getLoginToken = () => {
    return localStorage.getItem('token');
}

export default { getloggedInUser, getLoginToken };
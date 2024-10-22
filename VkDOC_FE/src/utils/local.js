import AuthService from "../services/AuthService";

const getloggedInUser = () => {
    return AuthService.getCurrentUser();

}

const getLoginToken = () => {
    return localStorage.getItem('token');
}

export default { getloggedInUser, getLoginToken };
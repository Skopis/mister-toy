import { httpService } from './http.service.js'

const USER_URL = 'auth/'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser
}

var gLoggedinUser = null

function getLoggedinUser() {
    return gLoggedinUser
}

function login(credentials) {
    return httpService.post(USER_URL + 'login', credentials).then(res => {
        gLoggedinUser = { fullname: res.fullname, nickname: res.nickname, isAdmin: res.isAdmin }
        return res
    })
}
function signup(signupCredentials) {
    return httpService.post(USER_URL + 'signup', signupCredentials).then(res => {
        gLoggedinUser = { fullname: res.fullname, nickname: res.nickname, isAdmin: res.isAdmin }
        return res
    })
}
function logout() {
    return httpService.post(USER_URL + 'logout').then(res => res)
}
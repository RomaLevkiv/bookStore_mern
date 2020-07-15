import {
    EMAIL_UPDATE,
    PASSWORD_UPDATE,
    FETCH_LOGIN_DATA,
    FETCH_REGISTER_DATA,
    SET_TOKEN,
    LOGOUT} from '../action-types'

const fetchLoginData = (data) => {
    const {token, userId} =  data
    if(token){
        localStorage.setItem("user_data", JSON.stringify({
            token,
            userId
        }))
    } 
    return {
        type: FETCH_LOGIN_DATA,
        payload: data
    }
}

const fetchRegisterData = (data) => {
    return {
        type: FETCH_REGISTER_DATA,
        payload: data
    }
}


const updEmail = (email) => {
    return {
        type: EMAIL_UPDATE,
        payload: email
    }
}

const updPassword = (password) => {
    return {
        type: PASSWORD_UPDATE,
        payload: password
    }
}

const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

const logout = () => {
    localStorage.removeItem("user_data")
    return {
        type: LOGOUT
    }
}



export {
    updEmail, 
    updPassword, 
    setToken, 
    logout, 
    fetchLoginData, 
    fetchRegisterData 
}
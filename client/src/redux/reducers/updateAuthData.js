import{ EMAIL_UPDATE,
        PASSWORD_UPDATE,
        FETCH_LOGIN_DATA,
        FETCH_REGISTER_DATA,
        SET_TOKEN, 
        LOGOUT} from '../action-types'

const updateAuthData = (state, action) => {
    if(state === undefined) {
        return {
            email: "",
            password: "",
            token: null,
            userId: null,
            responseMessage: null     
        }
    }
    switch (action.type) {
        case EMAIL_UPDATE: {
            const {password} = state.authData
            return {
                ...state.authData,
                email: action.payload,
                password
            }
        }
        case PASSWORD_UPDATE: {
            const {email} = state.authData
            return {
                ...state.authData,
                email,
                password: action.payload 
            }
        }
       
        case FETCH_LOGIN_DATA: {
            const {message, token, userId} = action.payload
            return {
                ...state.authData,
                token,
                userId, 
                responseMessage: message
            }
        }
        case FETCH_REGISTER_DATA: {
            const {message} = action.payload
            return {
                ...state.authData,
                responseMessage: message,
                email: "",
                password: ""
            }
        }
        case SET_TOKEN: {
            const token = action.payload
            return {
                ...state.authData,
                token
            }
        }
        case LOGOUT: {
            return {
                ...state.authData,
                token: null,
                email: "",
                password:""
            }
        }
          
        default:
            return state.authData
    }
}

export default updateAuthData
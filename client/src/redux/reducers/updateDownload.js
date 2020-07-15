import{ FETCH_FAILURE,
        FETCH_SUCCESS,
        FETCH_REQUEST} from '../action-types'

const updateDownload = (state, action) => {
if(state === undefined) {
    return {
        isLoading: false,
        isError: null     
    }
}
switch (action.type) {
    case FETCH_REQUEST: {
        return {
            isLoading: true,
            isError: null
        }
    }
    case FETCH_SUCCESS: {        
        return {
            isLoading: false, 
            isError: null 
        }
    }
    case FETCH_FAILURE: {
        return {
            isLoading: false,
            isError: action.payload
        }
    }   
    default:
        return state.download
}
}

export default updateDownload
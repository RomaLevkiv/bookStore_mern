import {
    FETCH_BOOK_CREATED,
    TITLE_UPDATE,
    AUTHOR_UPDATE,
    PRICE_UPDATE,
    COVER_IMAGE_UPDATE,
    FETCH_BOOKS
} from '../action-types'

const updateBooks = (state, action) => {
    if(state === undefined) {
        return {
            books: [],
            title: "",
            author: "",
            price: 0,
            coverImage:"",
            responseMessage: null            
        }
    }

    switch (action.type) {

        case FETCH_BOOK_CREATED: {
            const { message } = action.payload 
            return {
                ...state.booksData,
                title: "",
                author: "",
                price: 0,
                coverImage: "",
                responseMessage: message
            }
        }

        case FETCH_BOOKS: {
            const { books } = action.payload 
            return {
                ...state.booksData,
                books
            }
        }

        case TITLE_UPDATE: {            
            return {
                ...state.booksData,
                title:action.payload
            }
        }
        case AUTHOR_UPDATE: {
            return {
                ...state.booksData,
                author: action.payload
            }
        }case PRICE_UPDATE: {
            return {
                ...state.booksData,
                price: action.payload
            }
        }
        case COVER_IMAGE_UPDATE: {
            return {
                ...state.booksData,
                coverImage: action.payload
            }
        }           
    
        default:
            return state.booksData
            
    }

}


export default updateBooks
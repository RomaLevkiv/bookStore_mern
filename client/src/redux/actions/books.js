import {
    FETCH_BOOK_CREATED,
    FETCH_BOOKS,
    TITLE_UPDATE,
    AUTHOR_UPDATE,
    PRICE_UPDATE,
    COVER_IMAGE_UPDATE,
    BOOK_ADDED_TO_CART,
    BOOK_DELETED_FROM_CART,
    BOOK_DECREASED_FROM_CART,
    BOOK_ADDED_TO_CART_FROM_SERVER,
    CART_RESET
} from '../action-types'

const fetchBookCreated = (data) => {
    return {
        type: FETCH_BOOK_CREATED,
        payload: data
    }
}

const fetchBooks = (data) => {
    return {
        type: FETCH_BOOKS,
        payload: data
    }
}

const updTitle = (title) => {
    return {
        type: TITLE_UPDATE,
        payload: title
    }
}


const updAuthor = (author) => {
    return {
        type: AUTHOR_UPDATE,
        payload: author
    }
}

const updPrice = (price) => {
    return {
        type: PRICE_UPDATE,
        payload: price
    }
}

const updCoverImage =(coverImage) => {
    return {
        type: COVER_IMAGE_UPDATE,
        payload: coverImage
    }
}

const addedToCart = (_id) => {    
    return {
        type: BOOK_ADDED_TO_CART,
        payload: _id
    }
}


const addedBooksToCart = (_id, count) => { 
    return {
        type: BOOK_ADDED_TO_CART_FROM_SERVER,
        payload: {_id, count}
    }
}

const cartReset = () => {
    return { 
        type: CART_RESET
    }
}

const onDelete = (id) => {
    return {
        type: BOOK_DELETED_FROM_CART,
        payload: id
    }
}

const onIncrease = (id) => {
    return {
        type: BOOK_ADDED_TO_CART,
        payload: id
    }
}

const onDecrease = (id) => {
    return {
        type: BOOK_DECREASED_FROM_CART,
        payload: id
    }
}



export {
    fetchBookCreated,
    fetchBooks,
    updTitle,
    updAuthor,
    updPrice,
    updCoverImage,
    addedToCart, 
    onDelete,
    onIncrease,
    onDecrease,
    addedBooksToCart,
    cartReset
}
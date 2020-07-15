import {
    BOOK_DELETED_FROM_CART,
    BOOK_ADDED_TO_CART,
    BOOK_DECREASED_FROM_CART, 
    BOOK_ADDED_TO_CART_FROM_SERVER,
    CART_RESET} from '../action-types'

const findBookInBooks = ({booksData: {books}}, _id) => {
    return books.find((item) => item._id === _id)
}

const updBookInCart = (state, book, addBookCount) => {
    const {_id, title, price} = book
    
    const {cartItems, orderTotal, numItems} = state.shoppingCart
    
    const candidateIndex = cartItems.findIndex((item) => item._id === _id)
    let updItemInCart
    if(candidateIndex !== -1) {
        updItemInCart = cartItems[candidateIndex]
        updItemInCart = {
            _id: updItemInCart._id,
            title: updItemInCart.title,
            count: updItemInCart.count + addBookCount,
            total: updItemInCart.total + addBookCount*price            
        }

        if(updItemInCart.count === 0) {
            return deleteBookFromCart(state, updItemInCart._id)
        }

        return {
            orderTotal: orderTotal + addBookCount*price,
            cartItems: [...cartItems.slice(0, candidateIndex),
                         updItemInCart, ...cartItems.slice(candidateIndex + 1)],
            numItems: numItems +  addBookCount
        }
    } else {
        updItemInCart = {
            _id: _id,
            title: title,
            count: addBookCount,
            total: addBookCount * price
        }
        return {
            orderTotal: orderTotal + addBookCount*price,
            cartItems: [...cartItems, updItemInCart],
            numItems: numItems + addBookCount
        }
    } 
        
}
const deleteBookFromCart = (state, _id) => {
    const {cartItems, orderTotal, numItems} = state.shoppingCart
    const delBook = cartItems.find((item) => item._id === _id)
    if(delBook){
        const updCartItems =  cartItems.filter((item) => item._id !== _id)
        return {
            orderTotal: orderTotal - delBook.total,
            cartItems: updCartItems,
            numItems: numItems - delBook.count
        }
    }
    return state.shoppingCart
} 


const updateShoppingCart = (state, action) => {
    if(state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
            numItems: 0      
        }
    }
    switch (action.type) {
        case BOOK_ADDED_TO_CART: {
            
            const book = findBookInBooks(state, action.payload)
            return updBookInCart(state, book, 1)          
        }
        case BOOK_DECREASED_FROM_CART: {
            const book = findBookInBooks(state, action.payload)
            return updBookInCart(state, book, -1)
        }
        case BOOK_DELETED_FROM_CART: {
            return deleteBookFromCart(state, action.payload)

        }
        case BOOK_ADDED_TO_CART_FROM_SERVER: {
            const {_id, count} = action.payload
            const book = findBookInBooks(state, _id)
            
            return updBookInCart(state, book, count)
        }
        case CART_RESET: {
            
            return {
                cartItems: [],
                orderTotal: 0,
                numItems: 0      
            }
        }        
        
        default:
            return state.shoppingCart
    }
}
export default updateShoppingCart
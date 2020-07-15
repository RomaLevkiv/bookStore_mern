import{ 
    FETCH_FAILURE,
    FETCH_SUCCESS,
    FETCH_REQUEST
    } from '../action-types'

import {
    fetchLoginData, 
    fetchRegisterData,    
    logout
    } from './auth'

import {
    fetchBookCreated,
    fetchBooks,
    addedBooksToCart,
    cartReset,
    onDelete
    } from './books'

import {
    fetchOrders
    } from './orders'


const fetchRequest = () => {
    return {
        type: FETCH_REQUEST
    }
}
const fetchSuccess = () => {
    return {
        type: FETCH_SUCCESS 
    }
}
const fetchFailure = (errorMessage) => {
    return {
        type: FETCH_FAILURE,
        payload: errorMessage
    }
}

const fetchData = (url, body = null, method = "GET", headers = {}) => {

    return async(dispatch) => {        
        const storageData = _getStorageData()
        if(storageData){
            const { token } = storageData
            headers["authorization"] = `Bearer ${token}` 
        }

        if(body) {
            body = JSON.stringify(body)
            headers["Content-Type"] = "application/json"
        }

        if (body && method !== "DELETE") {
            method = "POST"
        }

        dispatch(fetchRequest())
        const response = await fetch(url, { method, body, headers  })
        const data = await response.json()
        const statusCode = response.status
        const {message, hideMessage} = data
        
        
        if(statusCode === 401 && message === "Token is not valid!" ) {
            dispatch(logout())
        }

        if(     statusCode === 400
            ||  statusCode === 401){
            return (dispatch(fetchFailure(message)))
        } else {
            dispatch(fetchSuccess())
            if(statusCode === 200 && hideMessage === "You entered!") {
               return dispatch(fetchLoginData(data))
            }
            
            if(statusCode === 201 && message === "User created. Verify user on your email") {
                return dispatch(fetchRegisterData(data))
            }

            if(statusCode === 201 && hideMessage === "book created") { 
                return dispatch(fetchBookCreated(data))
            }

            if(statusCode === 200 && message === "books") {
                return dispatch(fetchBooks(data))
            }

            if(statusCode === 201 && message === "Order added") {
                return dispatch(cartReset())
            }

            if(statusCode === 200 && message === "user's orders") {
                return dispatch(fetchOrders(data))
            }

            if(statusCode === 201 && message === "write to cart") {
                
            }

            if(statusCode === 200 && message === "cart") {
                const { cart } = data
                cart.forEach( item => {
                    const {count, bookId} = item
                    dispatch(onDelete(bookId))
                    return dispatch(addedBooksToCart(bookId, count))
                })
   
            }

            
        }    
    }
}

function _getStorageData() {
    const data = localStorage.getItem("user_data")
    return JSON.parse(data)
}


export {
    fetchRequest, 
    fetchSuccess, 
    fetchFailure,
    fetchData
}
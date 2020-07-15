import updateAuthData from './updateAuthData'
import updateDownload from './updateDownload'
import updateBooks from './updateBooks'
import updateShoppingCart from './updateShoppingCart'
import updateOrders from './updateOrders'



const reducer = (state, action) => {
    return {
        authData: updateAuthData(state, action),
        download: updateDownload(state, action),
        booksData: updateBooks(state, action),
        shoppingCart: updateShoppingCart(state, action),
        ordersData: updateOrders(state, action)
    }   
}

export default reducer
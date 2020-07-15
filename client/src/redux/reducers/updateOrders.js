import {
    FETCH_ORDERS
} from '../action-types'

const updateOrders = (state, action) => {
    if(state === undefined) {
        return {
            orders: [],
            responseMessage: null            
        }
    }

    switch (action.type) {

        
        case FETCH_ORDERS: {
            const { orders } = action.payload 
            return {
                ...state.ordersData,
                orders
            }
        }

                   
    
        default:
            return state.ordersData
            
    }

}


export default updateOrders
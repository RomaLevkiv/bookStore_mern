import {
    FETCH_ORDERS
} from '../action-types'

const fetchOrders = (data) => {
    return {
        type: FETCH_ORDERS,
        payload: data
    }
}

export {
    fetchOrders
}
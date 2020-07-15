import React, { useEffect } from 'react'
import OrderItem from '../orderList/orderItem/orderItem'
import { connect } from 'react-redux'
import { fetchData } from '../../redux/actions'
import './orderList.css'

const OrderList = (props) => {
    
    
    const {
        fetchData,
        orders
    } = props

    useEffect(() => {
        fetchData('/orders')
    }, [])

    const onDeleteOrderItem = (orderItemId) => {
        fetchData('/deleteOrderItem', {orderItemId}, "DELETE")
    }

    const orderList = orders.reverse().map((item) => {
        return (
            <li key={item._id}>
                <OrderItem 
                    order={item}
                    onDeleteOrderItem={onDeleteOrderItem} 
                />
            </li>
        )
    })

    const emptyList = 
    <div>
        <h1>You have no orders yet!</h1>
    </div> 

    return (
        <div className="orderList">
            {
                orders.length ? orderList : emptyList
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const { orders } = state.ordersData
    const { isLoading, isError } = state.download

    return {
        orders,
        isLoading,
        isError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, method, body, headers) =>
            dispatch(fetchData(url, method, body, headers)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
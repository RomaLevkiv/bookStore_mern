import React from 'react'
import './orderItem.css'

const OrderItem = ({ order, onDeleteOrderItem }) => {

  const date = new Date(order.date).toLocaleDateString()
  const time = new Date(order.date).toLocaleTimeString()
  

  const bookList = order.books.map((item, index) => {
    console.log(order._id)
    
    return (
      <div key={item._id}>
        <p>Book: {item.bookId.title}</p>
        <p>Author: {item.bookId.author}</p>
        <p>Count: {item.count}</p>
        <p>Price: {item.total}</p>
        <hr></hr>
      </div>
    )
  })

  return (
    <div className="row card-order">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Order's Date: {date}</span>
            <span className="card-title">Time: {time}</span>
            <hr/>
            {bookList}
            <div className="total-price">
              <h6><i>Total price: ${order.totalPrice}</i></h6>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={() => onDeleteOrderItem(order._id)}
              className="btn btn-danger btn-sm"
            >
              <i className="fa fa-trash-o" />
              Delete 
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
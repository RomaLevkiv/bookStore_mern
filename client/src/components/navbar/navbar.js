import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import book_icon from '../../img/book.png' 
import { fetchData } from '../../redux/actions'
import './navbar.css'
import ShopHeader from '../shopHeader/shopHeader'
import Logout from '../logout/logout'

const Navbar = ({ fetchData }) => {
  

  useEffect(() => {
    fetchData("/books")
    .then(() => {
      fetchData("/getCart")
    })
    
  },[])

  return (
    <nav>
      <div className="nav-wrapper  blue-grey darken-3">
        <span href="#" className="brand-logo">BStore</span>
        <img src={book_icon} alt="book_icon" />
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><ShopHeader /></li>
          <li><NavLink to="/books"> <i className="navbar-fa-icons fa fa-book"/> Books</NavLink></li>
          <li><NavLink to="/create_book"><i className="navbar-fa-icons fa fa-pencil-square-o"/> Create book</NavLink></li>
          <li><NavLink to="/orders"><i className="navbar-fa-icons fa fa-building"/> Orders</NavLink></li>
          <li><Logout/></li>
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => {
  return {
      items: cartItems,
      total: orderTotal
  }
}


export default connect(mapStateToProps, { fetchData })(Navbar)
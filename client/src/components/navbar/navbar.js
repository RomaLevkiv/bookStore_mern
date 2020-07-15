import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import book_icon from '../../img/book.png' 
import { logout, cartReset, fetchData} from '../../redux/actions'
import './navbar.css'
import ShopHeader from '../shopHeader/shopHeader'

const Navbar = ({logout, cartReset, items}) => {
  const history = useHistory()
  const onLogout = async (e) => {
    e.preventDefault()
    cartReset()
    logout()
    history.push('/auth')
  }

  return (
    <nav>
      <div className="nav-wrapper  blue-grey darken-3">
        <span href="#" className="brand-logo">Book Store</span>
        <img src={book_icon} alt="book_icon" />
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><ShopHeader /></li>
          <li><NavLink to="/books"> <i className="navbar-fa-icons fa fa-book"/> Books</NavLink></li>
          <li><NavLink to="/create_book"><i className="navbar-fa-icons fa fa-pencil-square-o"/> Create book</NavLink></li>
          <li><NavLink to="/orders"><i className="navbar-fa-icons fa fa-building"/> Orders</NavLink></li>
          <li><a to="/logout" onClick={onLogout}> <i className="navbar-fa-icons fa fa-sign-out"/> Logout</a></li>
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


export default connect(mapStateToProps, { logout, cartReset, fetchData })(Navbar)
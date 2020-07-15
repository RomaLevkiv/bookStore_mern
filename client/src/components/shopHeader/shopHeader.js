import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './shopHeader.css'

const ShopHeader = ({ books, total, numItems }) => {
    const [cartList, setCartList] = useState(false)

    const cartListItem = <div className="shopping-cart">
        <i className="cart-icon navbar-fa-icons fa fa-shopping-cart" />
        <span>{books}&nbsp;
        {books === 1 || books === 0 ? "book" : "books"}&nbsp;
        - {numItems}&nbsp;
        {numItems === 1 || numItems === 0 ? "item" : "items"}
        </span>
        <span> (${total}) </span>
    </div>

    const cartItem = <div>
        <i className="cart-icon navbar-fa-icons fa fa-shopping-cart" />
        Cart
    </div>

    return (
        <header className="shop-header">
            <Link to="/cart" onClick={() => setCartList(true)}>
                {cartList ? cartListItem : cartItem}
            </Link>

        </header>

    )
}

const mapStateToProps = (state) => {
    const { cartItems, orderTotal, numItems } = state.shoppingCart
    return {
        books: cartItems.length,
        total: orderTotal,
        numItems: numItems
    }
}

export default connect(mapStateToProps)(ShopHeader)
import React, { useState } from "react"
import './burgerMenu.css'
import { NavLink } from 'react-router-dom'
import ShopHeader from '../shopHeader/shopHeader'
import Logout from "../logout/logout"

const BurgerMenu = () => {
    const [burgerMenuToggle, setBurgerMenuToggle] = useState(true)
    const toggleBurger = () => {
        setBurgerMenuToggle(!burgerMenuToggle)
    }
    const clsBurger = ["burger","fa"]
    const clsMenuItems = ["menu-items"]
    if(burgerMenuToggle) {
        clsBurger.push("fa-bars", "closeBM")
        clsMenuItems.push("closeM")
    }
    else clsBurger.push('fa-times', "openBM")
    
    

    const menu = (
       <div className={clsMenuItems.join(" ")}> 
        <ul>
          <li><ShopHeader /></li>
          <li><NavLink to="/books"> <i className="navbar-fa-icons fa fa-book"/> Books</NavLink></li>
          <li><NavLink to="/create_book"><i className="navbar-fa-icons fa fa-pencil-square-o"/> Create book</NavLink></li>
          <li><NavLink to="/orders"><i className="navbar-fa-icons fa fa-building"/> Orders</NavLink></li>
          <Logout/>
        </ul>
        </div>
    )

    return (
        <div>
            <i className={clsBurger.join(" ")} onClick={toggleBurger}/>
            {menu}   
        </div>
    )
}

export default BurgerMenu
import React from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, cartReset} from '../../redux/actions'

const Logout = ({ logout, cartReset }) => {
  const history = useHistory()
  const onLogout = async (e) => {
    e.preventDefault()
    cartReset()
    logout()
    history.push('/auth')
  }

  return (
    
          <NavLink to="/logout" onClick={onLogout}> <i className="navbar-fa-icons fa fa-sign-out"/> Logout</NavLink>
    
  )
}



export default connect(null, { logout, cartReset })(Logout)
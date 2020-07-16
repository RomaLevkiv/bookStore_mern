import React, { useEffect } from 'react';
import { Routes } from './route/route'
import { connect } from 'react-redux'
import { setToken } from './redux/actions'
import Navbar from './components/navbar/navbar'
import BurgerMenu from "./components/burgerMenu/burgerMenu"
import 'materialize-css'



function App({ setToken, token, fetchData }) {
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user_data"))
    if (data && data.token) {
      setToken(data.token)
    }
  }, [])
  const routes = Routes(!!token)
  return (
    <div>
      {
        !!token ? <Navbar /> : null
      }
      {
        !!token ? <BurgerMenu/> : null
      }
      <div className="container">
        {routes}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { token } = state.authData
  return {
    token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(setToken(token)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

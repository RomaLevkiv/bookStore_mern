import React, { useEffect} from 'react'
import {connect} from 'react-redux'
import border_icon from '../img/border.png'
import {updEmail, updPassword, fetchData} from '../redux/actions'
import Input from "../components/input/input"
import {toastMessage} from '../service/toastMessage'
import "./authPage.css"


const AuthPage = (props) => { 
    const {email, 
        password, 
        updEmail, 
        updPassword, 
        fetchData, 
        isLoading, 
        isError, 
        responseMessage } = props
    
    useEffect(() => {
        toastMessage(isError)    
    },[isError])

    useEffect(()=>{
        toastMessage(responseMessage)
    }, [responseMessage])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    
    const onLogin = async(email, password)  => {
        fetchData('/login', {email, password})
    }

    const onRegister = async(email, password) => {
        fetchData('/register', {email, password})
    }
    return (
        <div className="row">
            <div className="col s6 offset-s2">
                <h1>Sign in or register</h1>
                <div className="card blue-grey darken-1 card-register">
                    <div className="card-content white-text">
                    <span className="card-title">Sign in / Sign up</span>
                        <div>
                            <Input 
                                fieldValue="email" 
                                type="text" 
                                value={email} 
                                onChange={updEmail}
                                labelCaption="Email"/>         
                            <Input 
                                fieldValue="password" 
                                type="password" 
                                value={password} 
                                onChange={updPassword}
                                labelCaption="Password"/>   
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4 btn-login" 
                            disabled={isLoading}
                            onClick={() => {
                                onLogin(email, password)
                            }}
                        >
                            Sign in
                        </button>
                        <button 
                            className="btn light-blue darken-4"
                            onClick={() => {
                                onRegister(email, password)
                            }}
                            disabled={isLoading}
                        >
                            Register
                        </button>    
                    </div>
                </div>
            </div>
        <img 
            src={border_icon} 
            alt="border_icon"
            className="icon-fence"
        />
        </div>
    )
}

const mapStateToProps = (state) => {  
    const {email, password, responseMessage,token} = state.authData    
    const {isLoading, isError } = state.download
    return {
        email,
        password,
        isLoading,
        isError,
        responseMessage, 
        token
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updEmail: (e) => dispatch(updEmail(e.target.value)),
        updPassword: (e) => dispatch(updPassword(e.target.value)),
        fetchData: (url, method, body, headers) => dispatch(fetchData(url, method, body, headers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage) 
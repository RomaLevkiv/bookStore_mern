import React, { useEffect } from 'react'
import bookShop_icon from '../img/book-shop.png'
import { connect } from 'react-redux'
import { fetchData } from '../redux/actions'
import './titlePage.css'

const TitlePage = (props) => {
    const { fetchData } = props
    useEffect(() => {
        fetchData('/books')
    }, [])

    return (
        <div>
            <img 
                src={bookShop_icon} 
                alt="bookShop_icon"
                className="icon-book-shop"
            />
        </div>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, method, body, headers) =>
            dispatch(fetchData(url, method, body, headers)),        
    }
}

export default connect( null, mapDispatchToProps)(TitlePage)

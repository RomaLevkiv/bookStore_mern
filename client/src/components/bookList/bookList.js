import React, { Component } from 'react'
import BookItem from '../bookList/bookItem/bookItem'
import { connect } from 'react-redux'
import { fetchData, addedToCart } from '../../redux/actions'
import './bookList.css'

class  BookList extends Component {
   
    componentDidMount() {
        this.props.fetchData('/books')
    }

    componentDidUpdate(prevProps) {
        if(prevProps.items !== this.props.items) {
            this.onWriteToCart(this.props.items)
        }
    }

    onWriteToCart = async (itemsCart) => {
        const writeToCartArray = itemsCart.map( item => {
            const {_id, count} = item
            return {
                bookId: _id,
                count
            }
        })
        return await this.props.fetchData('/write_to_cart', {writeToCartArray})
    }

    bookList = this.props.books.map((item) => {
        return (
            <li key={item._id}>
                <BookItem 
                    book={item} 
                    onAddedToCart={ () => {
                        this.props.addedToCart(item._id)
                    }} 
                />
            </li>
        )
    })

    render() {

    return (
        <div className="bookList">
            {
                this.props.books ? this.bookList : null
            }
        </div>
    )

    }
}

const mapStateToProps = (state) => {
    const { books } = state.booksData
    const { isLoading, isError } = state.download
    const { cartItems } = state.shoppingCart

    return {
        books,
        isLoading,
        isError,
        items: cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, method, body, headers) =>
            dispatch(fetchData(url, method, body, headers)),
        addedToCart: (id) => dispatch(addedToCart(id))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)


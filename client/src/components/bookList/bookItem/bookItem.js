import React from 'react'
import './bookItem.css'

const BookItem = ({ book, onAddedToCart }) => {
    const { title, author, price, coverImage } = book
    return (
        <div className="book-list-item">
            <div className="book-cover">
                <img className="book-image" src={coverImage} alt="cover" />
            </div>
            <div className="book-details">
                <span href="#" className="book-title">{title}</span>
                <div className="book-author">{author}</div>
                <div className="book-price">${price}</div>
                <button
                    onClick={onAddedToCart}
                    className="btn-bookList waves-effect waves-light  light-blue darken-3"
                >
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default BookItem
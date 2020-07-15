import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Input from '../components/input/input'
import {
    fetchData,
    updTitle,
    updAuthor,
    updPrice,
    updCoverImage    
} from '../redux/actions'
import {toastMessage} from '../service/toastMessage'


const BookCreator = (props) => {
    
    const {
        title,
        author,
        price,
        coverImage,
        isLoading,
        updTitle,
        updPrice,
        updAuthor,
        updCoverImage,
        fetchData,
        isError,
        responseMessage
    } = props 
    
    useEffect(() => {
        toastMessage(isError)    
    },[isError])

    useEffect(()=>{
        toastMessage(responseMessage)
    }, [responseMessage])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const onCreateBook = async(title, author, price, coverImage) => {
        fetchData('/create_book', { title, author, price, coverImage })
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Add book to data base</h3>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Create your book</span>
                        <div>
                            <Input
                                fieldValue="title"
                                type="text"
                                value={title}
                                onChange={updTitle}
                                labelCaption="Title" />
                            <Input
                                fieldValue="author"
                                type="text"
                                value={author}
                                onChange={updAuthor}
                                labelCaption="Author" />
                            <Input
                                fieldValue="price"
                                type="number"
                                value={price}
                                onChange={updPrice}
                                labelCaption="Price" />
                            <Input
                                fieldValue="coverImage"
                                type="text"
                                value={coverImage}
                                onChange={updCoverImage}
                                labelCaption="Image" />
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{ marginRight: '10px' }}
                            disabled={isLoading}
                            onClick={() => {
                                onCreateBook(title, author, price, coverImage)
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { title, author, price, coverImage, responseMessage } = state.booksData
    const { isLoading, isError } = state.download
    
    return {
        title,
        author,
        price,
        coverImage,
        isLoading,
        isError,
        responseMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, method, body, headers) => 
            dispatch(fetchData(url, method, body, headers)),

        updTitle: (e) => dispatch(updTitle(e.target.value)),
        updAuthor: (e) => dispatch(updAuthor(e.target.value)),
        updPrice: (e) => dispatch(updPrice(e.target.value)),
        updCoverImage: (e) => dispatch(updCoverImage(e.target.value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCreator) 
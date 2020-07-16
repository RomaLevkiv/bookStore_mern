import React from 'react'
import { connect } from 'react-redux'
import { onDelete, onIncrease, onDecrease, fetchData } from '../../redux/actions'
import "./shoppingCartTable.css"

class ShoppingCartTable extends React.Component {


    // componentDidMount() {
    //     this.props.fetchData("/getCart")
    // }

    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            this.onWriteToCart(this.props.items)
        }
    }

    onWriteToCart = async (itemsCart) => {
        const writeToCartArray = itemsCart.map(item => {
            const { _id, count } = item
            return {
                bookId: _id,
                count
            }
        })
        return await this.props.fetchData('/write_to_cart', { writeToCartArray })
    }


    onCreateOrder = (itemsCart, totalPrice) => {
        const books = itemsCart.map(item => {
            return {
                bookId: item._id,
                count: item.count,
                total: item.total
            }
        })
        return this.props.fetchData('/create_order', { books, totalPrice })
    }

    render() {
    
        const { items, total, onIncrease, onDecrease, onDelete } = this.props
        
        return (
            <div className="shopping-cart-table">
                <h3>Your Cart</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Item</th>
                            <th>Count</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, idx) => {

                                const { _id, title, count, total } = item
                                return (
                                    <tr key={_id}>
                                        <td>{idx + 1}</td>
                                        <td>{title}</td>
                                        <td>{count}</td>
                                        <td>{total}</td>
                                        <td>
                                            <button
                                                onClick={() => onIncrease(_id)}
                                                className="btn btn-success"
                                            >
                                                <i className="fa fa-plus-circle" />
                                            </button>
                                            <button
                                                onClick={() => onDecrease(_id)}
                                                className="btn btn-warning btn-sm"
                                            >
                                                <i className="fa fa-minus-circle" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(_id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <i className="fa fa-trash-o" />
                                            </button>

                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }

                    </tbody>
                </table>
                <div className="total">
                    Total: ${total}
                </div>

                <button
                    disabled={!items.length}
                    onClick={() => {
                        this.onCreateOrder(items, total)
                    }}
                    className="btn btn-order btn-sm waves-effect waves-light"
                >
                    <i className="fa fa-gift" /> make the order
            </button>

            </div>
        )
    }
}

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => {
    return {
        items: cartItems,
        total: orderTotal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrease: (id) => dispatch(onIncrease(id)),
        onDecrease: (id) => dispatch(onDecrease(id)),
        onDelete: (id) => dispatch(onDelete(id)),
        fetchData: (url, body, method, headers) =>
            dispatch(fetchData(url, body, method, headers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)

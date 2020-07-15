import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CreateBookPage from '../page/createBookPage'
import CartPage from '../page/cartPage'
import TitlePage from '../page/titlePage'
import AuthPage from '../page/authPage'
import BooksPage from '../page/booksPage'
import OrdersPage from '../page/ordersPage'
const Routes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/title" exact>
                    <TitlePage />
                </Route>
                <Route path="/cart" exact>
                    <CartPage />
                </Route>
                <Route path="/create_book" exact>
                    <CreateBookPage/>
                </Route>
                <Route path="/books" exact>
                    <BooksPage/>
                </Route>
                <Route path="/orders" exact>
                    <OrdersPage/>
                </Route>
                <Redirect to="/title"/>
            </Switch>
        )
    }
    return (
        <Switch>
                <Route path="/title" exact>
                    <TitlePage />
                </Route>
                <Route path="/auth" exact>
                    <AuthPage />
                </Route>
                <Redirect to="/auth"/>
            </Switch>
    )

}
export {Routes} 
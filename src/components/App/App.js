import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'

import './App.css'

import Nav from '../Nav/Nav'
import Homepage from '../Homepage/Homepage'
import Shop from '../Shop/Shop'
import Basket from '../Basket/Basket'
import ShoeCard from '../Shop/Shoe/ShoeCard'
import AuthPage from '../Auth/AuthPage'

import { createDBMiddleware } from '../../redux/midllewares/createDBMiddleware'
import { bindDB } from '../../redux/midllewares/bindDB'
import GoCheckout from '../Checkout/GoCheckout'
import Login from '../Auth/Login'
import { createDatabase } from '../../firebase/Firebase'

export const appHistory = createBrowserHistory()

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: props.init,
        }
    }

    componentDidMount() {
        this.props.cleanDB('products')
        this.props.createDB(createDatabase, 'products')
        this.props.init('products')
    }

    render() {
        return (
            <HashRouter history={appHistory}>
                <div className='App'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <Route path='/shop' component={() => <Shop />} />
                        <Route path='/basket' component={Basket} />
                        <Route path='/shoe/item/:id' component={ShoeCard} />
                        <Route path='/auth' component={AuthPage} />
                        <Route path='/gocheckout' component={GoCheckout} />
                        <Route path='/login' component={Login} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        prods: state.products,
        init: state.createdDB.storeItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createDB: (firebaseCallback, path) => {
            dispatch(createDBMiddleware(firebaseCallback, path))
        },
        init: (path) => {
            dispatch(bindDB(path))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

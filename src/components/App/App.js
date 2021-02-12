import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import './App.css'
import Homepage from '../Homepage/Homepage'
import Shop from '../Shop/Shop'
import * as actionCreators from '../../redux/actions'
import Basket from '../Basket/Basket'
import ShoeCard from '../Shop/Shoe/ShoeCard'
import Auth from '../Auth/Auth'
import {
    createInitMiddleware,
    initMiddleware,
} from '../../redux/reducers/initReducer'

export const appHistory = createBrowserHistory()

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: props.init,
            transformedData: [],
        }
    }

    componentDidMount() {
        this.props.cleanDB('products')
        this.props.createDB('products')
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
                        <Route path='/auth' component={Auth} />
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
        createDB: (path) => {
            dispatch(createInitMiddleware(path))
        },
        init: (path) => {
            dispatch(initMiddleware(path))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

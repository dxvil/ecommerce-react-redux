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
        this.props.updateDb('products')

        this.props.db
            .collection('products')
            .get()
            .then((items) => {
                let arr = []
                items.forEach((item) => {
                    let transformVar = item.data()
                    return arr.push(transformVar)
                })
                return arr
            })
            .then((data) => {
                this.props.initStore(data)
            })
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
        init: state.init,
    }
}

export default connect(mapStateToProps, actionCreators)(App)

import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from '../Nav/Nav'
import './App.css'
import Homepage from '../Homepage/Homepage'
import Shop from '../Shop/Shop'
import * as actionCreators from '../../redux/actions'
import Basket from '../Basket/Basket'
import ShoeCard from '../Shop/Shoe/ShoeCard'
import { db, setProductsToDatabase } from '../../firebase/Firebase'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            transformedData: [],
        }
    }

    componentDidMount() {
        setProductsToDatabase('products')

        db.collection('products')
            .get()
            .then((items) => {
                return items.forEach((item) => {
                    let transformVar = item.data()
                    this.setState((prevState) => ({
                        transformedData: [
                            transformVar.item,
                            ...prevState.transformedData,
                        ],
                    }))
                })
            })
            .then(() => {
                this.setState((prevState) => ({
                    products: [
                        ...this.state.transformedData,
                        ...prevState.products,
                    ],
                }))
            })
    }

    render() {
        return (
            <HashRouter>
                <div className='App'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <Route
                            path='/shop'
                            component={() => (
                                <Shop items={this.state.products} />
                            )}
                        />
                        <Route path='/basket' component={Basket} />
                        <Route path='/shoe/item/:id' component={ShoeCard} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        prods: state.products,
    }
}
export default connect(mapStateToProps, actionCreators)(App)

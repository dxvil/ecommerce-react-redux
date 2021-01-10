import React from 'react'
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Nav from '../Nav/Nav'
import './App.css'
import Homepage from '../Homepage/Homepage'
import Shop from '../Shop/Shop'
import * as actionCreators from '../../redux/actions'
import shoePic from '../../images/shoe.png'
import shoePic2 from '../../images/2.png'
import shoePic3 from '../../images/3.png'
import shoePic4 from '../../images/4.png'
import shoePic5 from '../../images/5.png'
import Basket from '../Basket/Basket'
import ShoeCard from '../Shop/Shoe/ShoeCard'

export const products = [
    {
        id: 1,
        title: 'Jordan 11 Retro',
        price: '200 Eur',
        image: shoePic,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 2,
        title: 'Nike Air Max 97',
        price: '160 Eur',
        image: shoePic2,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 3,
        title: 'Chuck Taylor OX Low',
        price: '50 Eur',
        image: shoePic3,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 4,
        title: 'Vans Ward',
        price: '60 Eur',
        image: shoePic4,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 5,
        title: 'Adidas Yeezy Boost 350 V2',
        price: '500 Eur',
        image: shoePic5,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 6,
        title: 'Air Jordan 4 Retro',
        price: '205 Eur',
        image: shoePic,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 7,
        title: 'Adidas NMD R1',
        price: '130 Eur',
        image: shoePic2,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 8,
        title: 'Nike Tanjun',
        price: '65 Eur',
        image: shoePic3,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 9,
        title: 'Nike Air Force 1 Low',
        price: '90 Eur',
        image: shoePic4,
        quantity: 1,
        shipping: true,
        size: [],
    },
    {
        id: 10,
        title: 'Nike Air Max 270',
        price: '160 Eur',
        image: shoePic5,
        quantity: 1,
        shipping: true,
        size: [],
    },
]

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className='App'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <Route
                            path='/shop'
                            component={() => <Shop items={products} />}
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

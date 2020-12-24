import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from '../Nav/Nav'
import './App.css'
import Homepage from '../Homepage/Homepage'
import Shop from '../Shop/Shop'

import shoePic from '../../images/shoe.png'
import shoePic2 from '../../images/2.png'
import shoePic3 from '../../images/3.png'
import shoePic4 from '../../images/4.png'
import shoePic5 from '../../images/5.png'
import Basket from '../Basket/Basket'

export const products = [
    {
        title: 'Jordan 11 Retro',
        price: '200 Eur',
        image: shoePic,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Nike Air Max 97',
        price: '160 Eur',
        image: shoePic2,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Chuck Taylor OX Low',
        price: '50 Eur',
        image: shoePic3,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Vans Ward',
        price: '60 Eur',
        image: shoePic4,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Adidas Yeezy Boost 350 V2',
        price: '500 Eur',
        image: shoePic5,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Air Jordan 4 Retro',
        price: '205 Eur',
        image: shoePic,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Adidas NMD R1',
        price: '130 Eur',
        image: shoePic2,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Nike Tanjun',
        price: '65 Eur',
        image: shoePic3,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Nike Air Force 1 Low',
        price: '90 Eur',
        image: shoePic4,
        quantity: 1,
        shipping: true,
    },
    {
        title: 'Nike Air Max 270',
        price: '160 Eur',
        image: shoePic5,
        quantity: 1,
        shipping: true,
    },
]

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Nav />
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route path='/shop' component={Shop} />
                    <Route path='/basket' component={Basket} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App

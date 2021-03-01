import React, { useEffect, useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { appHistory } from '../App/App'

import logo from '../../images/logo.png'

const NavStyle = {
    listStyle: 'none',
    color: '#000',
    textDecoration: 'none',
}

const refreshRoute = () => {
    appHistory.push({ pathname: '/' })
}

const Nav = ({ products, login }) => {
    const [quantity, setQuantity] = useState(0)
    const [loginName, setLoginName] = useState('')

    useEffect(() => {
        if (products.length !== 0) {
            const acc = 0
            setQuantity(products.reduce((acc, item) => acc + item.quantity, 0))
        } else if (products.length === 0) {
            setQuantity(0)
        }
    })

    return (
        <nav className='navbar'>
            <img alt='logo' className='nav__logo' src={logo} />
            <Link to='/account'>{loginName.length > 1 ? loginName : null}</Link>
            <ul className='navbar__items'>
                <Link to='/' style={NavStyle}>
                    <li>Home</li>
                </Link>
                <Link to='/shop' style={NavStyle}>
                    <li>Shop</li>
                </Link>
                <Link to='/basket'>
                    <li className='nav__cart' onClick={refreshRoute}>
                        <i className='icon shopping cart'></i>
                    </li>
                </Link>
                <p className='cart-counter'>{quantity}</p>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return { products: state.products, login: state.form }
}

export default connect(mapStateToProps, null)(Nav)

import React, { useEffect, useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import { connect } from 'react-redux'
import { appHistory } from '../App/App'

const Nav = ({ products }) => {
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        if (products.length !== 0) {
            const acc = 0
            setQuantity(products.reduce((acc, item) => acc + item.quantity, 0))
        } else if (products.length === 0) {
            setQuantity(0)
        }
    })

    const refreshRoute = () => {
        appHistory.push({ pathname: '/' })
    }

    const NavStyle = {
        listStyle: 'none',
        color: '#000',
        textDecoration: 'none',
    }

    return (
        <nav className='navbar'>
            <Link to={'/auth'}>
                <h2>Log in</h2>
            </Link>

            <img alt='...' className='nav__logo' src={logo} />
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
    return { products: state.products }
}

export default connect(mapStateToProps, null)(Nav)

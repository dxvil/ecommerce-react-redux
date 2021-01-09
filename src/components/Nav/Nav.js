import React, { useEffect, useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import { connect } from 'react-redux'

const Nav = ({ products }) => {
    const [quantity, setQuantity] = useState(0)
    const [basket, setBasket] = useState(products)

    useEffect(() => {
        const acc = 0
        setQuantity(products.reduce((acc, item) => acc + item.quantity, 0))
    })

    const NavStyle = {
        listStyle: 'none',
        color: '#000',
        textDecoration: 'none',
    }

    return (
        <nav className='navbar'>
            <img alt='...' className='logo' src={logo} />
            <ul className='navbar__items'>
                <Link to='/' style={NavStyle}>
                    <li>Home</li>
                </Link>
                <Link to='/shop' style={NavStyle}>
                    <li>Shop</li>
                </Link>
                <Link to='/basket'>
                    <li className='cart'>
                        <i className='material-icons'>shopping_cart</i>
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

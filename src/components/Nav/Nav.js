import React from 'react';
import './Nav.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.png';

const Nav = () => {
    const NavStyle = {
        listStyle: 'none',
        color: '#000',
        textDecoration: 'none'
    }

    return (
        <nav className="navbar">
            <img className="logo" src={logo} />
            <ul className="navbar__items">
                <Link to="/" style={NavStyle}>
                    <li>Home</li>
                </Link>
                <Link to="/shop" style={NavStyle}>
                    <li>Shop</li>
                </Link>
                <li className="cart"><i className="material-icons">shopping_cart</i></li>
            </ul>
        </nav>
    )
}

export default Nav;
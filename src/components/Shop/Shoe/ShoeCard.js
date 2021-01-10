import React, { useEffect, useState } from 'react'
import { products } from '../../App/App'
import './ShoeCard.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../../redux/actions'
import Alert from '../../vidgets/Alert'

const ShoeCard = ({ addItem, removeItem, location }) => {
    const [size, setShoeSize] = useState(null)
    const [alert, setAlert] = useState(false)
    const tS = 37,
        tE = 38,
        tN = 39,
        f = 40,
        fO = 41,
        fT = 42
    const itemId = parseInt(location.pathname.match(/\d+/)) - 1

    const sizeReduxHandler = (e) => {
        if (size !== null) {
            let prevSize = products[itemId].size
            products[itemId].size = [...prevSize, size]
            addItem(products[itemId])
        } else {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 1000)
        }
    }

    const sizeReduxRemover = (e) => {
        removeItem(itemId + 1)
    }

    const changeColorBtn = (e) => {
        if (e !== undefined) {
            e.classList.toggle('active-btn-size')
        }
    }

    const sizeHandler = (e, s) => {
        if (e !== undefined) {
            if (e.classList.contains('active-btn-size')) {
                changeColorBtn(e)
            } else {
                changeColorBtn(e)
                setShoeSize(s)
            }
        }
    }

    const render = () => {
        return (
            <div className='product-details'>
                <div className='product-details__header'>
                    <h1>{products[itemId].title}</h1>
                    <p className='product-details__description'>
                        Description. Shoe. Description. Shoe. Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Autem, qui.
                    </p>
                </div>

                <div className='product-details__view'>
                    <div className='product-details__img'>
                        <img src={products[itemId].image} />
                    </div>
                </div>
                <div className='product-details__more'>
                    <div className='product-details__sizes'>
                        <p className='sizes-header'>Sizes:</p>
                        <div
                            className='sizes-btn'
                            onClick={(e) => sizeHandler(e.target, tS)}
                        >
                            {tS}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={(e) => sizeHandler(e.target, tE)}
                        >
                            {tE}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={(e) => sizeHandler(e.target, tN)}
                        >
                            {tN}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={(e) => sizeHandler(e.target, f)}
                        >
                            {f}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={(e) => sizeHandler(e.target, fO)}
                        >
                            {fO}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={(e) => sizeHandler(e.target, fT)}
                        >
                            {fT}
                        </div>
                    </div>
                    <div className='product-details__buttons'>
                        <button
                            className='shoe-btn buy-btn'
                            onClick={(e) => sizeReduxHandler(e)}
                        >
                            +
                        </button>
                        <button
                            className='shoe-btn remove-btn'
                            onClick={() => sizeReduxRemover()}
                        >
                            -
                        </button>
                    </div>
                    {alert ? <Alert text={'Choose a size, please'} /> : null}
                    <p className='product-details__price'>
                        {products[itemId].price}
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className='details'>
            <p className='details-header'>Product Details</p>
            {render()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, actionCreators)(ShoeCard)

import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, increaseQuantity } from '../../../redux/actions'

const Shoe = ({ title, price, img, id, addItem, prod, basket }) => {
    const refContainer = useRef(null)
    const refProduct = useRef(null)
    const refTitle = useRef(null)
    const refPrice = useRef(null)
    const refPic = useRef(null)

    const buyShoe = () => {
        let shoe = prod.find((item) => item.item.id === id)
        shoe.item.size = [...shoe.item.size, 37]
        addItem(shoe.item)
    }
    console.log('Shoe')

    return (
        <div ref={refContainer} className='container-product'>
            <div ref={refProduct} key={title} className='product'>
                <Link
                    to={{
                        pathname: `shoe/item/${id}`,
                        state: {
                            prods: prod,
                            fromShop: true,
                        },
                    }}
                >
                    <button className='product-info-btn'>
                        <i className='info icon' />
                    </button>
                </Link>
                <button
                    className='shoe-buy-btn'
                    onClick={() => {
                        buyShoe()
                    }}
                >
                    <i className='shopping cart icon' />
                </button>
                <div className='shoe-back' />
                <img ref={refPic} className='shoe-pic' alt={title} src={img} />
                <p ref={refTitle} className='shoe-title'>
                    {title}
                </p>
                <p ref={refPrice} className='shoe-price'>
                    {price}
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basket: state.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (item) => {
            dispatch(addItem(item))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shoe)

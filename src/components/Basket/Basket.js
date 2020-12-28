import React, { useEffect, useState } from 'react'
import './Basket.css'
import { connect } from 'react-redux'
import { loadFromLocalStorage } from '../../redux/store'
import * as actionCreators from '../../redux/actions'

const Basket = ({ addItem, products }) => {
    const [basket, setBasket] = useState(products)
    const storage = useState(loadFromLocalStorage())
    const [updated, setUpdated] = useState([])

    useEffect(() => {
        if (storage.length !== 0) {
            storage.forEach((item) => {
                console.log(item)
            })
        }
    }, [])

    useEffect(() => {
        if (basket.length >= 1) {
            basket.forEach((item) => {
                console.log(item)
            })
        }
    }, [basket])

    const renderOrder = (order) => {
        return order.map((item) => {
            return (
                <div key={item.title} className='basket__product'>
                    <img src={item.image} alt={item.title} />
                    <p className='basket__product-info'>{item.title}</p>
                    <p className='basket__product-info'>{item.price}</p>
                    <p className='basket__product-info'>{item.quantity}</p>
                </div>
            )
        })
    }

    const conditionalRendering = () => {
        if (basket.length === 0) {
            return <h3>Your basket is empty</h3>
        } else if (basket.length >= 1) {
            return renderOrder(basket)
        }
    }

    return (
        <div className='basket'>
            <div className='basket__order'>{conditionalRendering()}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { products: state.products }
}

export default connect(mapStateToProps, actionCreators)(Basket)

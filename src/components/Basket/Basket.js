import React from 'react'
import './Basket.css'
import { connect } from 'react-redux'

const Basket = (props) => {
    console.log(props)
    const renderOrder = (order) => {
        return order.map((item) => {
            console.log(item, 'This is our basket')
            return (
                <div className='basket__product'>
                    <img src={item.image} alt={item.title} />
                    <p className='basket__product-info'>{item.title}</p>
                    <p className='basket__product-info'>{item.price}</p>
                    <p className='basket__product-info'>{item.quantity}</p>
                </div>
            )
        })
    }
    return (
        <div className='basket'>
            <div className='basket__order'>
                {props.products === undefined ? (
                    <h3>Your basket is empty</h3>
                ) : (
                    renderOrder(props.products)
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { products: state.products }
}

export default connect(mapStateToProps, null)(Basket)

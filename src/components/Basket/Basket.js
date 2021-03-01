import React, { useEffect, useState } from 'react'
import './Basket.css'
import { connect } from 'react-redux'
import { removeItem } from '../../redux/actions'
import { totalSum } from '../../tools/tools'
import { Redirect } from 'react-router-dom'

function Basket(props) {
    let [basket, setBasket] = useState(props.products),
        [totalPrice, setTotalPrice] = useState(0),
        [itemToDelete, setItemToDelete] = useState(null),
        [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (basket.length > 0) {
            setTotalPrice(totalSum(basket))
        }
    }, [basket])

    useEffect(() => {
        if (itemToDelete) {
            props.removeItem(itemToDelete)
        }
    }, [itemToDelete])

    const renderOrder = (order) => {
        return order.map((item) => {
            return (
                <div key={item.title} className='basket__product'>
                    <i className='close icon' />
                    <img src={item.image} alt={item.title} />
                    <div className='info-wrapper'>
                        <p className='basket__product-info'>{item.title}</p>
                        <p className='basket__product-info'>
                            Price: {item.price}
                        </p>
                        <p className='basket__product-info'>
                            Quantity: {item.quantity}
                        </p>
                        <p>Size: {item.size}</p>
                    </div>
                </div>
            )
        })
    }

    const conditionalRendering = () => {
        if (basket.length === 0) {
            return (
                <div className='ui blue message'>
                    <div className='ui header'>Your basket is empty.</div>
                </div>
            )
        } else if (basket.length >= 1) {
            return (
                <>
                    {renderOrder(basket)}
                    <button
                        className='positive ui button basket__confirm'
                        onClick={() => setRedirect(true)}
                    >
                        Confirm purchase
                    </button>
                    <div className='basket__price'>{totalPrice} Euro</div>
                </>
            )
        }
    }

    return (
        <div className='basket'>
            <div className='basket__order'>{conditionalRendering()}</div>
            {redirect ? <Redirect to='/auth' /> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { products: state.products }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (item) => {
            dispatch(removeItem(item))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket)

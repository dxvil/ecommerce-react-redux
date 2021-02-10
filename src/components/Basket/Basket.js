import React, { useEffect, useState } from 'react'
import './Basket.css'
import { connect } from 'react-redux'
import { removeItem } from '../../redux/actions'

function Basket(props) {
    let [basket, setBasket] = useState(props.products),
        [totalPrice, setTotalPrice] = useState(0),
        [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        if (basket.length > 0) {
            let total = basket.reduce((prev, next) => {
                return prev + parseInt(next.price) * next.quantity
            }, 0)
            setTotalPrice(total)
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
                    <p className='basket__product-info'>{item.title}</p>
                    <p className='basket__product-info'>Price: {item.price}</p>
                    <p className='basket__product-info'>
                        Quantity: {item.quantity}
                    </p>
                    <p>{item.size}</p>
                </div>
            )
        })
    }

    const conditionalRendering = () => {
        if (basket.length === 0) {
            return <p>Your basket is empty</p>
        } else if (basket.length >= 1) {
            return (
                <>
                    {renderOrder(basket)}
                    <div className='basket__price'>{totalPrice} Euro</div>
                </>
            )
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

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (item) => {
            dispatch(removeItem(item))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket)

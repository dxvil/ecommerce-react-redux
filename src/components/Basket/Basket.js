import React from 'react'
import './Basket.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/actions'

class Basket extends React.Component {
    constructor(props) {
        super(props)
        this.conditionalRendering = this.conditionalRendering.bind(this)
        this.renderOrder = this.renderOrder.bind(this)
        this.state = {
            basket: props.products,
        }
    }

    renderOrder = (order) => {
        return order.map((item) => {
            return (
                <div key={item.title} className='basket__product'>
                    <img src={item.image} alt={item.title} />
                    <p className='basket__product-info'>{item.title}</p>
                    <p className='basket__product-info'>Price: {item.price}</p>
                    <p className='basket__product-info'>
                        Quantity: {item.quantity}
                    </p>
                </div>
            )
        })
    }

    conditionalRendering = () => {
        if (this.state.basket.length === 0) {
            return <p>Your basket is empty</p>
        } else if (this.state.basket.length >= 1) {
            return (
                <>
                    {this.renderOrder(this.state.basket)}
                    <div className='basket__price'>Total price: 300 eur</div>
                </>
            )
        }
    }

    render() {
        return (
            <div className='basket'>
                <div className='basket__order'>
                    {this.conditionalRendering()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { products: state.products }
}

export default connect(mapStateToProps, actionCreators)(Basket)

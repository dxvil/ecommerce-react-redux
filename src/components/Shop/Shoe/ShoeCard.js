import React from 'react'
import { products } from '../../App/App'
import './ShoeCard.css'
const ShoeCard = (props) => {
    const render = () => {
        let id = parseInt(props.location.pathname.match(/\d+/)) - 1

        return (
            <div className='product-details'>
                <div className='product-details__header'>
                    <h1>{products[id].title}</h1>
                    <p className='product-details__description'>
                        Description. Shoe. Description. Shoe. Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Autem, qui.
                    </p>
                </div>

                <div className='product-details__view'>
                    <div className='product-details__img'>
                        <img src={products[id].image} />
                    </div>

                    <div className='product-details__buttons'>
                        <button className='shoe-btn buy-btn'>+</button>
                        <button className='shoe-btn remove-btn'>-</button>
                    </div>
                    <p className='product-details__price'>
                        {products[id].price}
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

export default ShoeCard

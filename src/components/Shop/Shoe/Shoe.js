import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem } from '../../../redux/actions'

const Shoe = ({ title, price, img, id, addItem, prod }) => {
    const buyShoe = () => {
        let shoe = prod.find((item) => item.item.id === id)
        shoe.item.size = [...shoe.item.size, 37]
        addItem(shoe.item)
    }

    return (
        <div className='container-product'>
            <div key={title} className='product'>
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
                <img
                    className='shoe-pic'
                    alt={title}
                    src={img}
                    loading='lazy'
                />
                <p className='shoe-title'>{title}</p>
                <p className='shoe-price'>{price}</p>
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

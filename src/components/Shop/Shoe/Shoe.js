import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../../../redux/actions'
import { Link } from 'react-router-dom'

const Shoe = ({ title, price, img, id, addItem, prod }) => {
    const refContainer = useRef(null)
    const refProduct = useRef(null)
    const refTitle = useRef(null)
    const refPrice = useRef(null)
    const refPic = useRef(null)

    const buyShoe = () => {
        let shoe = prod.find((item) => item.id === id)
        shoe.size = [...shoe.size, 37]
        addItem(shoe)
        //change to not so many renders!
    }

    // useEffect(() => {
    //     refContainer.current.addEventListener('mousemove', (e) => {
    //         const card = refProduct.current
    //         card.style.transform = `rotateX(3deg)`
    //     })
    //     refContainer.current.addEventListener('mouseenter', () => {
    //         const card = refProduct.current
    //
    //         card.style.transition = 'none'
    //         const title = refTitle.current
    //         title.style.transform = 'translateZ(150px)'
    //         const price = refPrice.current
    //         price.style.transform = 'translateZ(120px)'
    //         const pic = refPic.current
    //         pic.style.transform = 'translateZ(200px) rotateZ(-15deg)'
    //     })
    //
    //     refContainer.current.addEventListener('mouseleave', () => {
    //         const card = refProduct.current
    //         card.style.transform = `rotateY(0deg) rotateX(0deg)`
    //         card.style.transition = 'all 0.5s ease'
    //         const title = refTitle.current
    //         title.style.transform = 'translateZ(0px)'
    //         const price = refPrice.current
    //         price.style.transform = 'translateZ(0px)'
    //         const pic = refPic.current
    //         pic.style.transform = 'translateZ(0px)'
    //     })
    // }, [])

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
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (item) => {
            dispatch(addItem(item))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shoe)

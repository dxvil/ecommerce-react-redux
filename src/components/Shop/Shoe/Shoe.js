import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../redux/actions'
import { Link } from 'react-router-dom'

const Shoe = ({ title, price, img, product, id, addItem }) => {
    const refContainer = useRef(null)
    const refProduct = useRef(null)
    const refTitle = useRef(null)
    const refPrice = useRef(null)
    const refPic = useRef(null)

    const buyShoe = (item) => {
        addItem(item)
        //change to not so many renders!
    }

    useEffect(() => {
        refContainer.current.addEventListener('mousemove', (e) => {
            let xAxis = (window.innerHeight / 2 - e.pageX) / 20
            let yAxis = (window.innerHeight / 2 - e.pageY) / 10
            const card = refProduct.current
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
        })
        refContainer.current.addEventListener('mouseenter', () => {
            const card = refProduct.current
            card.style.transition = 'none'
            const title = refTitle.current
            title.style.transform = 'translateZ(150px)'
            const price = refPrice.current
            price.style.transform = 'translateZ(120px)'
            const pic = refPic.current
            pic.style.transform = 'translateZ(200px) rotateZ(5deg)'
        })

        refContainer.current.addEventListener('mouseleave', () => {
            const card = refProduct.current
            card.style.transform = `rotateY(0deg) rotateX(0deg)`
            card.style.transition = 'all 0.5s ease'
            const title = refTitle.current
            title.style.transform = 'translateZ(0px)'
            const price = refPrice.current
            price.style.transform = 'translateZ(0px)'
            const pic = refPic.current
            pic.style.transform = 'translateZ(0px)'
        })
    }, [])

    return (
        <div ref={refContainer} className='container-product'>
            <div ref={refProduct} key={title} className='product'>
                <Link
                    to={`shoe/item/${id}`}
                    state={{
                        title,
                        img,
                        id,
                        price,
                    }}
                >
                    <button className='product-info-btn'>
                        <i className='material-icons'>info</i>
                    </button>
                </Link>
                <button
                    className='shoe-buy-btn'
                    onClick={() => {
                        buyShoe(product)
                    }}
                >
                    <i className='material-icons'>add_shopping_cart</i>
                </button>
                <div className='shoe-back'></div>
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

export default connect(mapStateToProps, actionCreators)(Shoe)

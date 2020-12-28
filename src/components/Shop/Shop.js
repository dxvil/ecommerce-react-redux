import React, { useEffect, useState } from 'react'
import './Shop.css'
import './Shoe/Shoe.css'
import Shoe from './Shoe/Shoe'
import { products as prodArray } from '../App/App'

const Shop = () => {
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState(prodArray)
    const [list, setList] = useState([])

    useEffect(() => {
        const renderedItems = products.map((item) => {
            return (
                <Shoe
                    key={item.title}
                    product={item}
                    price={item.price}
                    title={item.title}
                    img={item.image}
                />
            )
        })

        setList(renderedItems)
    }, [])

    return (
        <div className='shop'>
            <header className='shop-header'>
                <h2 className='shop-header__title'>Shop</h2>
                <input
                    className='shop-header__search-shoes'
                    placeholder='Search...'
                />
            </header>
            <section className='shop-products'>{list}</section>
        </div>
    )
}

export default Shop

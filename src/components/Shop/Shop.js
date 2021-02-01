import React, { useEffect, useState } from 'react'
import './Shop.css'
import './Shoe/Shoe.css'
import Shoe from './Shoe/Shoe'
import { connect } from 'react-redux'

const Shop = ({ items }) => {
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState([])
    const [fetched, setFetched] = useState(false)
    const [list, setList] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const [isSearched, setSearched] = useState(false)

    useEffect(() => {
        if (items.length > 0) {
            setProducts(items[0].payload)
        }
        if (products.length > 0) {
            setFetched(true)
        }
    })

    useEffect(() => {
        if (products.length > 0) {
            const renderedItems = products
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((item) => {
                    return (
                        <Shoe
                            key={item.title}
                            prod={products}
                            price={item.price}
                            title={item.title}
                            img={item.image}
                            id={item.id}
                        />
                    )
                })

            setList(renderedItems)
        }
    }, [fetched])

    const searchItems = (e) => {
        setSearched(false)
        setSearch(e.target.value.toLowerCase())
        let searchingValues
        if (search.length > 1 && !isSearched) {
            searchingValues = list.filter((item) =>
                item.key.toLowerCase().includes(search)
            )
        } else if (isSearched) {
            searchingValues = filtered.filter((item) =>
                item.key.toLowerCase().includes(search)
            )
        }
        //if matches
        if (searchingValues.length !== 0) {
            searchingValues.map((item) => {
                return (
                    <Shoe
                        key={item.props.title}
                        prod={products}
                        price={item.props.price}
                        title={item.props.title}
                        img={item.props.image}
                        id={item.props.id}
                    />
                )
            })
            setSearched(true)
            setFiltered(searchingValues)
            setTimeout(() => {
                setSearch('')
            }, 1000)
        }
        //if no matches
        if (searchingValues.length === 0) {
            let error = (
                <div className='ui icon message search-message'>
                    <div className='header'>
                        <i className='x icon' />
                        <p>The product is not found.</p>
                    </div>
                </div>
            )
            setSearched(true)
            setFiltered(error)
            return setTimeout(() => {
                setSearch('')
            }, 1000)
        }
    }

    const dropDownFiltering = (e) => {
        // eslint-disable-next-line default-case
        switch (e.target.value) {
            case 'alphabet':
                setSearched(true)
                let filterByAlph = products
                    .sort((i, b) => (i.title > b.title ? 1 : -1))
                    .map((item) => {
                        return (
                            <Shoe
                                key={item.title}
                                prod={products}
                                product={products[item.id]}
                                price={item.price}
                                title={item.title}
                                img={item.image}
                                id={item.id}
                            />
                        )
                    })
                setFiltered(filterByAlph)
                break
            case 'reverse':
                setSearched(true)
                let filterByReverseAlph = products
                    .sort((i, b) => (i.title < b.title ? 1 : -1))
                    .map((item) => {
                        return (
                            <Shoe
                                key={item.title}
                                prod={products}
                                product={products[item.id]}
                                price={item.price}
                                title={item.title}
                                img={item.image}
                                id={item.id}
                            />
                        )
                    })
                setFiltered(filterByReverseAlph)
                break
            case 'low':
                setSearched(true)
                let filterByLowPrice = products
                    .sort(function (a, b) {
                        let firstValue = parseInt(a.price),
                            secondValue = parseInt(b.price)
                        return firstValue - secondValue
                    })
                    .map((item) => {
                        return (
                            <Shoe
                                key={item.title}
                                prod={products}
                                product={products[item.id]}
                                price={item.price}
                                title={item.title}
                                img={item.image}
                                id={item.id}
                            />
                        )
                    })
                setFiltered(filterByLowPrice)
                break
            case 'high':
                setSearched(true)
                let filterByHighPrice = products
                    .sort(function (a, b) {
                        let firstValue = parseInt(a.price),
                            secondValue = parseInt(b.price)
                        return secondValue - firstValue
                    })
                    .map((item) => {
                        return (
                            <Shoe
                                key={item.title}
                                prod={products}
                                product={products[item.id]}
                                price={item.price}
                                title={item.title}
                                img={item.image}
                                id={item.id}
                            />
                        )
                    })
                setFiltered(filterByHighPrice)
                break
            case 'default':
                return setSearched(false)
        }
    }

    return (
        <div className='shop'>
            <header className='shop-header'>
                <h2 className='shop-header__title'>Shop</h2>
                <button
                    className='circular ui icon button shop-undo-btn'
                    onClick={() => setSearched(false)}
                >
                    <i className='icon undo' />
                </button>
                <input
                    className='shop-header__search-shoes'
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => searchItems(e)}
                />
                <select
                    className='ui dropdown shop-dropdown'
                    onChange={(e) => dropDownFiltering(e)}
                >
                    <option value='default'>Default</option>
                    <option value='alphabet'>Sort by A-Z</option>
                    <option value='reverse'>Sort by Z-A</option>
                    <option value='low'>Sort by low price</option>
                    <option value='high'>Sort by high price </option>
                </select>
            </header>
            <section className='shop-products'>
                {isSearched ? filtered : list}
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { items: state.init }
}

export default connect(mapStateToProps, null)(Shop)

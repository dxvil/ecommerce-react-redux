import React, { useEffect, useState } from 'react'
import './Shop.css'
import './Shoe/Shoe.css'
import Shoe from './Shoe/Shoe'
import { connect } from 'react-redux'
import {
    filterShopByAlphabet,
    filterShopByHighPrice,
    filterShopByLowPrice,
    filterShopReverse,
} from '../../redux/actions'

const Shop = ({
    items,
    filterShopByAlphabet,
    filterShopReverse,
    filterShopByLowPrice,
    filterShopByHighPrice,
}) => {
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
                .sort((a, b) => (a.item.id > b.item.id ? 1 : -1))
                .map((item) => {
                    const prod = item.item
                    return (
                        <Shoe
                            key={prod.title}
                            prod={products}
                            price={prod.price}
                            title={prod.title}
                            img={prod.image}
                            id={prod.id}
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
        } else {
            searchingValues = undefined
        }
        //if matches
        if (!(searchingValues.length === 0 && false)) {
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
        const filterComponent = (item) => {
            return (
                <Shoe
                    key={item.item.title}
                    prod={products}
                    product={products[item.item.id]}
                    price={item.item.price}
                    title={item.item.title}
                    img={item.item.image}
                    id={item.item.id}
                />
            )
        }

        switch (e.target.value) {
            case 'alphabet':
                setSearched(true)
                filterShopByAlphabet(true)
                let filterByAlph = products
                    .sort((i, b) => (i.item.title > b.item.title ? 1 : -1))
                    .map((item) => {
                        return filterComponent(item)
                    })
                setFiltered(filterByAlph)
                break
            case 'reverse':
                setSearched(true)
                filterShopReverse(true)
                let filterByReverseAlph = products
                    .sort((i, b) => (i.item.title < b.item.title ? 1 : -1))
                    .map((item) => {
                        return filterComponent(item)
                    })
                setFiltered(filterByReverseAlph)
                break
            case 'low':
                setSearched(true)
                filterShopByLowPrice(true)
                let filterByLowPrice = products
                    .sort(function (a, b) {
                        let firstValue = parseInt(a.item.price),
                            secondValue = parseInt(b.item.price)
                        return firstValue - secondValue
                    })
                    .map((item) => {
                        return filterComponent(item)
                    })
                setFiltered(filterByLowPrice)
                break
            case 'high':
                setSearched(true)
                filterShopByHighPrice(true)
                let filterByHighPrice = products
                    .sort(function (a, b) {
                        let firstValue = parseInt(a.item.price),
                            secondValue = parseInt(b.item.price)
                        return secondValue - firstValue
                    })
                    .map((item) => {
                        return filterComponent(item)
                    })
                setFiltered(filterByHighPrice)
                break
            case 'default':
                filterShopByHighPrice(false)
                filterShopReverse(false)
                filterShopByAlphabet(false)
                filterShopByLowPrice(false)
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
    return { items: state.init, filters: state.filters }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterShopByAlphabet: (flag) => {
            dispatch(filterShopByAlphabet(flag))
        },
        filterShopReverse: (flag) => {
            dispatch(filterShopReverse(flag))
        },
        filterShopByLowPrice: (flag) => {
            dispatch(filterShopByLowPrice(flag))
        },
        filterShopByHighPrice: (flag) => {
            dispatch(filterShopByHighPrice(flag))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)

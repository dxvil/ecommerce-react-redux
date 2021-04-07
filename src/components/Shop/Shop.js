import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    filterShopByAlphabet,
    filterShopByHighPrice,
    filterShopByLowPrice,
    filterShopReverse,
} from '../../redux/actions'
import { Dropdown } from '../vidgets/Dropdown'
import './Shop.css'
import './Shoe/Shoe.css'
import LoaderText from '../SemanticUI/Loader'
import { Message } from 'semantic-ui-react'
import Shoe from './Shoe/Shoe'

const Shop = ({
    items,
    filterShopByAlphabet,
    filterShopReverse,
    filterShopByLowPrice,
    filterShopByHighPrice,
}) => {
    const [products, setProducts] = useState(items)
    const [fetched, setFetched] = useState(false)
    const [list, setList] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchingValue, setSearchingValue] = useState('')
    const [isSearched, setSearched] = useState(false)
    const [foundSuccess, setFoundSuccess] = useState(null)
    const [notFound, setNotFound] = useState(null)

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
            setFetched(true)
        }
    }, [fetched])

    const searchRequest = (e) => {
        setSearched(false)
        return setSearchingValue(e.target.value.toLowerCase())
    }

    const findAMatch = () => {
        let searchingValues
        if (!isSearched) {
            searchingValues = list.filter((item) =>
                item.key.toLowerCase().includes(searchingValue)
            )
            if (searchingValues.length === 0) {
                setNotFound(true)
                setTimeout(() => setSearchingValue(''), 1000)
                return setTimeout(() => setNotFound(false), 1500)
            }
            setFoundSuccess(searchingValues)
        } else if (isSearched) {
            searchingValues = filtered.filter((item) =>
                item.key.toLowerCase().includes(searchingValue)
            )
            return setFoundSuccess(searchingValues)
        }
    }

    const renderSearchResults = () => {
        if (foundSuccess && !isSearched) {
            foundSuccess.map((item) => {
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
            setFiltered(foundSuccess)
            return setTimeout(() => setSearchingValue(''), 1000)
        }
    }

    useEffect(() => {
        if (searchingValue && searchingValue.length > 0) {
            findAMatch()
            renderSearchResults()
        }
    }, [searchingValue])

    const dropDownFiltering = (e) => {
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

    const renderByConditions = () => {
        if (notFound) {
            return <Message negative>The product is not found.</Message>
        } else if (fetched === false) {
            return <LoaderText />
        } else if (isSearched) {
            return filtered
        } else {
            return list
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
                    value={searchingValue}
                    onChange={(e) => searchRequest(e)}
                />
                <Dropdown action={dropDownFiltering} />
            </header>
            <section className='shop-products'>{renderByConditions()}</section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { items: state.createdDB.storeItems, filters: state.filters }
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
const MemoizedShop = React.memo(Shop)

export default connect(mapStateToProps, mapDispatchToProps)(MemoizedShop)

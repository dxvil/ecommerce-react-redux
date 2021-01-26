import React, { useEffect, useState } from 'react'
import './Shop.css'
import './Shoe/Shoe.css'
import Shoe from './Shoe/Shoe'
import { Loader } from 'semantic-ui-react'

const Shop = ({ items }) => {
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState(items)
    const [list, setList] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const [isSearched, setSearched] = useState(false)
    const [initialState, setInitialState] = useState('')
    const [filterBySelect, setFilterBySelect] = useState('')

    useEffect(() => {
        const renderedItems = products.map((item) => {
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

        setList(renderedItems)
        setInitialState(renderedItems)
    }, [])

    const searchItems = (e) => {
        setSearched(false)
        setSearch(e.target.value.toLowerCase())
        let searchingValues
        if (search.length > 1) {
            searchingValues = list.filter((item) =>
                item.key.toLowerCase().includes(search)
            )
            //if no match that show some error

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
            if (searchingValues.length === 0) {
                let error = (
                    <div className='ui icon message search-message'>
                        <div className='header'>
                            <i className='x icon'></i>
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
    }

    const dropDownFiltering = (e) => {
        setFilterBySelect(e.target.value)
        switch (filterBySelect) {
            case 'alphabet':
                console.log('okay dat is alpha')
                setSearched(true)
                const sortByAlphabet = products.sort((i) => i.title)
                return setFiltered(sortByAlphabet)
            case 'reverse':
                setSearched(true)
                const sortByReverseAlphabet = products
                    .reverse()
                    .sort((i) => i.title)

                return setFiltered(sortByReverseAlphabet)
            case 'low':
                setSearched(true)
                const sortByLowPrice = list.sort(function (a, b) {
                    return a.props.price - b.props.price
                })
                console.log(sortByLowPrice)
                setFiltered(sortByLowPrice)
                break
            default:
                return setSearched(false)
        }
    }

    const loader = () => {
        if (isSearched) {
            return <Loader />
        } else {
            return null
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
                    <i className='icon undo'></i>
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

export default Shop

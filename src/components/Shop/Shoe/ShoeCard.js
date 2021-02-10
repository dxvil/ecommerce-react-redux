import React from 'react'
import './ShoeCard.css'
import { connect } from 'react-redux'
import * as actionCreators from '../../../redux/actions'
import Alert from '../../vidgets/Alert'
import { db } from '../../../firebase/Firebase'
import { HashRouter, Link } from 'react-router-dom'
import LoaderText from '../../SemanticUI/Loader'
import { appHistory } from '../../App/App'
import {
    addItem,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
} from '../../../redux/actions'

class ShoeCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            ready: false,
            size: null,
            alert: false,
            sizes: {
                tS: 37,
                tE: 38,
                tN: 39,
                f: 40,
                fO: 41,
                fT: 42,
            },
            itemId: parseInt(this.props.match.params.id),
            fromShop: false,
            fromDatabase: false,
        }
    }

    componentDidMount() {
        if (this.props.location.state !== undefined) {
            this.setState({
                items: this.props.location.state.prods,
                fromShop: true,
            })
        } else {
            this.getDataFromDatabase()
        }
    }

    getDataFromDatabase = () => {
        db.collection('products')
            .get()
            .then((items) => {
                let arr = []
                items.forEach((item) => {
                    let transformVar = item.data()
                    arr.push(transformVar)
                })
                return arr
            })
            .then((data) => {
                this.setState({
                    items: data,
                    fromDatabase: true,
                })
            })
    }

    renderI = () => {
        let id = this.state.itemId,
            item = this.state.items.find((i) => i.item.id === id)
        let renderingItem = item.item

        return (
            <div className='product-details'>
                <div className='product-details__header'>
                    <h1>{renderingItem.title}</h1>
                    <p className='product-details__description'>
                        Description. Shoe. Description. Shoe. Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Autem, qui.
                    </p>
                </div>

                <div className='product-details__view'>
                    <div className='product-details__img'>
                        <img src={renderingItem.image} />
                    </div>
                </div>
                <div className='product-details__more'>
                    <div className='product-details__sizes'>
                        <p className='sizes-header'>Sizes:</p>
                        <div
                            className='sizes-btn'
                            onClick={() =>
                                this.sizeHandler(this.state.sizes.tS)
                            }
                        >
                            {this.state.sizes.tS}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={() =>
                                this.sizeHandler(this.state.sizes.tE)
                            }
                        >
                            {this.state.sizes.tE}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={() =>
                                this.sizeHandler(this.state.sizes.tN)
                            }
                        >
                            {this.state.sizes.tN}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={() => this.sizeHandler(this.state.sizes.f)}
                        >
                            {this.state.sizes.f}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={() =>
                                this.sizeHandler(this.state.sizes.fO)
                            }
                        >
                            {this.state.sizes.fO}
                        </div>
                        <div
                            className='sizes-btn'
                            onClick={() =>
                                this.sizeHandler(this.state.sizes.fT)
                            }
                        >
                            {this.state.sizes.fT}
                        </div>
                    </div>
                    <div className='product-details__buttons'>
                        <button
                            className='shoe-btn buy-btn'
                            onClick={(e) => this.sizeReduxHandler(e)}
                        >
                            +
                        </button>
                        <button
                            className='shoe-btn remove-btn'
                            onClick={(e) => this.sizeReduxRemover(e)}
                        >
                            <i className='icon trash'></i>
                        </button>
                    </div>
                    {alert === true ? (
                        <Alert text={'Choose a size, please'} />
                    ) : null}
                    <p className='product-details__price'>
                        {renderingItem.price}
                    </p>
                </div>
            </div>
        )
    }

    conditionalRendering = () => {
        if (this.state.fromShop || this.state.fromDatabase) {
            return this.renderI()
        }
        return <LoaderText />
    }

    changeItemToPrevious = () => {
        if (this.state.itemId !== 1) {
            appHistory.push(`/shoe/item/${this.state.itemId - 1}`)
            this.setState((prevState) => ({
                itemId: prevState.itemId - 1,
            }))
            return (
                <Link
                    to={{
                        pathname: `shoe/item/${this.state.itemId}`,
                        state: {
                            prods: this.state.items,
                        },
                    }}
                />
            )
        }
    }

    changeItemToNext = () => {
        if (this.state.itemId !== 10) {
            appHistory.push(`/shoe/item/${this.state.itemId + 1}`)
            this.setState((prevState) => ({
                itemId: prevState.itemId + 1,
            }))
            return (
                <Link
                    to={{
                        pathname: `shoe/item/${this.state.itemId}`,
                        state: {
                            prods: this.state.items,
                        },
                    }}
                />
            )
        }
    }

    refreshRoute = () => {
        appHistory.push({ pathname: '/' })
    }

    sizeHandler = (s) => {
        if (s !== undefined) {
            this.setState({
                size: s,
            })
        }
    }

    sizeReduxHandler = () => {
        if (this.state.size !== null && !isNaN(this.state.size)) {
            let item = this.state.items.find(
                (item) => item.item.id === this.state.itemId
            )

            let itemWithSize = {
                ...item.item,
                size: [...item.item.size, this.state.size],
            }

            this.props.addItem(itemWithSize)
        }
        this.setState({
            alert: true,
        })
    }

    sizeReduxRemover = (e) => {
        let item = this.state.items.find(
            (item) => item.item.id === this.state.itemId
        )
        this.props.removeItem(item.item.id)
    }

    render() {
        return (
            <div className='details'>
                <p className='details-header'>Product Details</p>
                <div className='shoe-card__nav-btn'>
                    <button
                        onClick={() => this.changeItemToPrevious()}
                        className='ui left attached button secondary'
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => this.changeItemToNext()}
                        className='right attached ui button secondary'
                    >
                        Next
                    </button>
                </div>
                <Link to={'/shop'}>
                    <button
                        className='ui inverted brown basic button back-btn'
                        onClick={this.refreshRoute}
                    >
                        Back to Shop
                    </button>
                </Link>
                {this.conditionalRendering()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { basket: state.products }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (item) => {
            dispatch(addItem(item))
        },
        removeItem: (item) => {
            dispatch(removeItem(item))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoeCard)

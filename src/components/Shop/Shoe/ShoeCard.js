import React, { useEffect, useRef } from 'react'
import './ShoeCard.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LoaderText from '../../SemanticUI/Loader'
import { appHistory } from '../../App/App'
import { addItem, removeItem } from '../../../redux/actions'

class ShoeCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.items,
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
            loaded: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.items.length !== prevProps.items.length) {
            this.setState({
                items: this.props.items
            })
        }
    }

    renderI = () => {
        if(this.state.items.length !== 0) {
            let id = this.state.itemId,
                item = this.state.items.find((i) => i.item.id === id),
                renderingItem = item.item

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
                            <img src={renderingItem.image} alt='shoe'/>
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
                        {alert === true ? <div>Alert</div> : null}
                        <p className='product-details__price'>
                            {renderingItem.price}
                        </p>
                    </div>
                </div>
            )
        }
    }

    changeItemToPrevious = () => {
        if (this.state.itemId !== 1) {
            const url = `${this.state.itemId - 1}`
            appHistory.replace(url)
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
            const url = `${this.state.itemId + 1}`
            appHistory.replace(url)
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

    refreshRoute = (route) => {
        appHistory.replace({ pathname: '/' })
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
                        className='ui inverted blue basic button back-btn'
                        onClick={this.refreshRoute}
                    >
                        Back to Shop
                    </button>
                </Link>
                {this.state.items.length === 0 ? <LoaderText /> : this.renderI()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { basket: state.products, items: state.createdDB.storeItems }
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

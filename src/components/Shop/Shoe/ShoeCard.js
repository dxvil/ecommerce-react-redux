import React, { useEffect } from 'react'
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
    componentDidMount() {
        // refContainer.current.addEventListener('mousemove', (e) => {
        //     let xAxis = (window.innerWidth / 4 - e.pageX) / 25
        //     let yAxis = (window.innerHeight / 2 - e.pageY) / 25
        //     const card = refProduct.current
        //     card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
        // })
        //
        // refContainer.current.addEventListener('mouseenter', () => {
        //     const card = refProduct.current
        //     card.style.transition = 'none'
        //     const title = refTitle.current
        //     title.style.transform = 'translateZ(150px)'
        //     const price = refPrice.current
        //     price.style.transform = 'translateZ(120px)'
        //     const pic = refPic.current
        //     pic.style.transform = 'translateZ(200px) rotateZ(5deg)'
        // })
        //
        // refContainer.current.addEventListener('mouseleave', () => {
        //     const card = refProduct.current
        //     card.style.transform = `rotateY(0deg) rotateX(0deg)`
        //     card.style.transition = 'all 0.5s ease'
        //     const title = refTitle.current
        //     title.style.transform = 'translateZ(0px)'
        //     const price = refPrice.current
        //     price.style.transform = 'translateZ(0px)'
        //     const pic = refPic.current
        //     pic.style.transform = 'translateZ(0px)'
        // })
        //loader
        if (this.state.items.length !== 0) {
            this.setState({
                loaded: true,
            })
        }
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
                    {alert === true ? <div>Alert</div> : null}
                    <p className='product-details__price'>
                        {renderingItem.price}
                    </p>
                </div>
            </div>
        )
    }

    conditionalRendering = () => {
        if (this.state.loaded) {
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
                        className='ui inverted blue basic button back-btn'
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

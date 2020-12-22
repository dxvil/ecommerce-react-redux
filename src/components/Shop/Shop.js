import React, {useEffect, useRef, useState} from 'react';
import './Shop.css';
import './Shoe/Shoe.css';
import Shoe from "./Shoe/Shoe";
import {products as prodArray} from "../App/App";


const Shop = () => {
    const [products, setProducts] = useState(prodArray);
    const [list, setList] = useState([]);

//something wrong with API, maybe will try it later
    /* useEffect(() => {
        async function shoesRequest() {
            const response = await fetch('https://shoe-catalogue-api-codex.herokuapp.com/api/shoes', {mode: 'cors'});
            response.json().then((response) => {
                setProducts([...response])
                return response
            })
                .catch(error => {
                    console.log(error)
                })
        }
        shoesRequest()
    }, []) */

    useEffect(() => {

            const renderedItems = products.map(item => {
                return (
                   <Shoe product={item} price={item.price} title={item.title} img={item.image}/>
                )
            })

            setList(renderedItems)

    }, [])


  return (
      <div className="shop">
          <header className="shop-header">
              <h2 className="shop-header__title">Shop</h2>
              <input className="shop-header__search-shoes" placeholder="Search..."/>
          </header>
          <section className="shop-products">
              {list}
          </section>
  </div>
  );
};

export default Shop;
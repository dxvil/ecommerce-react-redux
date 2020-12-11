import React, {useEffect, useState} from 'react';
import './Shop.css';
import './Shoe/Shoe.css';
import Shoe from "./Shoe/Shoe";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
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
    }, [])

    useEffect(() => {

            const renderedItems = products.map(item => {
                return (
                    <div key={item._id} className="product">
                        <div className="shoe-back">

                        </div>
                        <img  className="shoe-pic" alt={item.brand} src="https://lh3.googleusercontent.com/proxy/kpjXu__Z3KFuL11pzwUCyK0sNSSGlxMMhH4bvT3nCaVyxZlGJWD8_oJiOGN9BE6ssFffMaKBvfdX9UjBaPyUiBof-GO40VXISG5zadZBOLwMpRGBYIAo7cxdRo4ha_o1OcJANI4bfGFObYi1UajX5ochVTs38zPsetI" />
                        <p>{item.brand}</p>
                        <p>{item.price}</p>
                    </div>
                )
            })

            setList(renderedItems)

    }, [products])


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
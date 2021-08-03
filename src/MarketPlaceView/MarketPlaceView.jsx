import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Marketplace() {

    const allproducts = useSelector(store => store.productReducer);

    useEffect({
        dispatch: "FETCH_PRODUCTS"
    }, []);

    return(
        <section>
            <h1>This is the marketplace view</h1>
            <article>
                {allproducts.map(product => {
                    return (
                        <div key={product.id} >
                            <img src={product.img_url} ></img>
                            <h2>{product.name}</h2>
                            <h3>Price: {product.price}</h3>
                            <h4>Description: {product.description}</h4>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default Marketplace;

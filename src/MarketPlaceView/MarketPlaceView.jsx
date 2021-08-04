import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Marketplace() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allProducts = useSelector(store => store.productReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS'});
    }, []);

    const bookmarkClick = () => {
        history.push("/bookmark");
    }

    return(
        <section>
            <h1>This is the marketplace view</h1>
            <article>
                {allProducts.map(product => {
                    return (
                        <div key={product.id} >
                            <img src={product.image_url} height="200" ></img>
                            <h2>{product.name}</h2>
                            <h3>Price: ${product.price}</h3>
                            <h4>Description: {product.description}</h4>
                            <button>Contact</button>
                            <button onClick={bookmarkClick}>Bookmark</button>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default Marketplace;

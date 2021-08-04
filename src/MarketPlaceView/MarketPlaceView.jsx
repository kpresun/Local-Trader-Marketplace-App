import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Marketplace() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allProducts = useSelector(store => store.productReducer);
    // const currentUser = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS'});
    }, []);

    // const thisUser = currentUser

    const bookmarkClick = (product) => {
        dispatch({ type: 'ADD_TO_BOOKMARK', payload: product})
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
                            <h4>user id is:{product.user_id}</h4>
                            <h4>product id is: {product.id}</h4>
                            <button>Contact</button>
                            <button onClick={() => {bookmarkClick(product)}}>Bookmark</button>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default Marketplace;

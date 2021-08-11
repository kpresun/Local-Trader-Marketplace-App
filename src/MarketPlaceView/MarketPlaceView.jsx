import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import StarIcon from '@material-ui/icons/Star';

function Marketplace() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allProducts = useSelector(store => store.productReducer);
    // const userBookmark = useSelector(store => store.bookmarkReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS'});
        // dispatch({ type: 'FETCH_BOOKMARKS'}) maybe for the conditional rendering
    }, []);

    // handles adding and deleting item to bookmark: STILL NEED TO CREATE DELETE ROUTE
    const bookmarkClick = (product) => {
        if (product) {
            dispatch({ type: 'ADD_TO_BOOKMARK', payload: product})
        } else {
            dispatch({ type: 'DELETE_FROM_BOOKMARK', payload: product})
        }
    }

    const contactSeller = (sellerId) => {
        console.log('--LOG-- the seller ID is:', sellerId );
        history.push(`/seller/detail/${sellerId}`);
    }

    return(
        <section>
            <h1>Local Traders Marketplace</h1>
            <article>
                {allProducts.map(product => {
                    return (
                        <div key={product.id} >
                            <img src={product.image_url} height="200" />
                            <h2>{product.name}</h2>
                            <h3>Price: ${product.price}</h3>
                            <h4>Description: {product.description}</h4>
                            <h4>Category: {product.category_type}</h4>
                            <h4>Status: {product.status_type}</h4>
                            <button onClick={() =>{contactSeller(product.user_id)}}>Contact</button>
                            <button onClick={() => {bookmarkClick(product)}}>Bookmark</button>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default Marketplace;


// maybe create a boolean for bookmark table

{/* <StarIcon onClick={() => {bookmarkClick(product)}}>bookmark</StarIcon> */}
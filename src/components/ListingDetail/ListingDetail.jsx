import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ListingDetail() {

    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const listingItemDetail = useSelector(store => store.listingDetailReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_ITEM_DETAIL', payload: {itemId: params.id} });
    }, [params.id]);

    const goToMyListings = () => {
        history.push("/activity");
    }

    return(
        <section>
            <button onClick={goToMyListings}>Back</button>
            <p>Your Listing Details</p>
            <img src={listingItemDetail.image_url} height="200"></img>
            <h2>Name: {listingItemDetail.name} </h2>
            <h3>Price: {listingItemDetail.price} </h3>
            <h4>Description: {listingItemDetail.description} </h4>
            <button>Edit Listing</button>
        </section>
    )
}

export default ListingDetail;
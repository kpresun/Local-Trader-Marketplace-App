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
    // try again wtihout useEffect  - Chris

    const goToMyListings = () => {
        history.push('/activity');
    }

    const goToEditView = (itemId) => {
        console.log('Inside goToEditView');
        history.push(`/activity/edit/${itemId}`);
    }

    const deleteListing = (itemId) => {
        window.confirm('Are you sure you want to delete this listing?') &&
        dispatch({ type: 'DELETE_LISTING', payload: [itemId, history] });
    }

    return(
        <section>
            <button onClick={goToMyListings}>Back</button>
            <p>Your Listing Details</p>
            <img src={listingItemDetail.image_url} height="200"></img>
            <h2>Name: {listingItemDetail.name} </h2>
            <h3>Price: {listingItemDetail.price} </h3>
            <h4>Description: {listingItemDetail.description} </h4>
            <h4>Category: {listingItemDetail.category_type}</h4>
            <h4>Status: {listingItemDetail.status_type}</h4>
            <button onClick={() => {goToEditView((listingItemDetail.id))}}>Edit Listing</button>
            <button onClick={() => {deleteListing(listingItemDetail.id)}}>Delete Listing</button>
        </section>
    )
}

export default ListingDetail;
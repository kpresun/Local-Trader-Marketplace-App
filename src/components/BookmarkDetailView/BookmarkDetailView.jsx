import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function BookmarkDetailView() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'SET_SINGLE_BOOKMARK'});
    }, []);

    const singleBookmark = useSelector(store => store.allBookmarkReducers.singleBookmarkReducer);
    console.log('--LOG-- singleBookmark is:', singleBookmark);

    return(
        <section>
            <h1>This is detail view</h1>
            <img src={singleBookmark[0].image_url} height="200"></img>
            <h2>Name: {singleBookmark[0].name} </h2>
            <h3>Price: {singleBookmark[0].price} </h3>
            <h4>Description: {singleBookmark[0].description} </h4>
            <button>Contact Seller</button>
        </section>
    )
}

export default BookmarkDetailView;
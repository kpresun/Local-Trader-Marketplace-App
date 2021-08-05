import { PanoramaSharp } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function BookmarkDetailView() {

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        console.log('--LOG-- The params.id is:', params.id);
        dispatch({
        type: 'FETCH_SINGLE_BOOKMARK',
        payload: {
            productId: params.id
        }
    });
    }, [params.id]);

    const singleBookmark = useSelector(store => store.allBookmarkReducers.singleBookmarkReducer);
    console.log('--LOG-- singleBookmark is:', singleBookmark);

    return(
        <section>
            <h1>This is detail view</h1>
            <img src={singleBookmark.image_url} height="200"></img>
            <h2>Name: {singleBookmark.name} </h2>
            <h3>Price: {singleBookmark.price} </h3>
            <h4>Description: {singleBookmark.description} </h4>
            <button>Contact Seller</button>
        </section>
    )
}

export default BookmarkDetailView;
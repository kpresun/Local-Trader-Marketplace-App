import { PanoramaSharp } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function BookmarkDetailView() {

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

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

    const goBackToBookMark = () => {
        history.push("/bookmark");
    }

    const contactSeller = (sellerId) => {
        console.log('--LOG-- the seller ID is:', sellerId );
        history.push(`/seller/detail/${sellerId}`);
    }

    const deleteBookmark = (deleteID) => {
        dispatch({ type: 'DELETE_BOOKMARK', payload: deleteID});
        console.log('--LOG-- ID to delete:', deleteID);
        history.push('/bookmark');
    }

    return(
        <section>
            <button onClick={goBackToBookMark}>Back</button>
            <h1>Bookmark Detail</h1>
            <img src={singleBookmark.image_url} height="200"></img>
            <h2>{singleBookmark.name} </h2>
            <h4>Description: {singleBookmark.description} </h4>
            <h4>Status: {singleBookmark.status_type}</h4>
            <button onClick={() =>{contactSeller(singleBookmark.user_id)}}>Contact Seller</button>
            <button onClick={() => {deleteBookmark(singleBookmark.id)}}>Remove Bookmark</button>
        </section>
    )
}

export default BookmarkDetailView;
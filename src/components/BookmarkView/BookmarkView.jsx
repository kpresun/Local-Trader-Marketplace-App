import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function BookmarkView() {

    const history = useHistory();
    const dispatch = useDispatch();
    const userBookmark = useSelector(store => store.allBookmarkReducers.bookmarkReducer);
    console.log('--LOG-- userBookmark is:', userBookmark);

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKMARK'});
    }, []);

    const detailViewClick = (productId) => {
        // dispatch({ type: 'FETCH_SINGLE_BOOKMARK', payload: item.product_id})
        // console.log('--LOG-- the product ID is:', item.product_id);
        history.push(`/bookmark/detail/${productId}`);
    }

    const deleteBookmark = (deleteID) => {
        dispatch({ type: 'DELETE_BOOKMARK', payload: deleteID});
        console.log('--LOG-- ID to delete:', deleteID);

    }

    return(
        <section>
            <h1>Bookmark to buy list</h1>
            <article>
                {userBookmark.map(item => {
                    return (
                        <div key={item.id}>
                            <img src={item.image_url} height="200" onClick={() => {detailViewClick(item.product_id)}}/>
                            <p>{item.product_id}</p>
                            <p>The bookmark ID is: {item.id}</p>
                            <h2>{item.name}</h2>
                            <h3>Price: ${item.price}</h3>
                            <h4>Description: {item.description}</h4>
                            <button onClick={() => {deleteBookmark(item.id)}}>Remove Bookmark</button>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default BookmarkView;
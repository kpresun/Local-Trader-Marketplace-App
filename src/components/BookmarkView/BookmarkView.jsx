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

    const detailViewClick = (item) => {
        dispatch({ type: 'FETCH_SINGLE_BOOKMARK', payload: item.product_id})
        console.log('--LOG-- the product ID is:', item.product_id);
        history.push(`/bookmark/detail/${item.product_id}`);
    }

    return(
        <section>
            <h1>Bookmark to buy list</h1>
            <article>
                {userBookmark.map(item => {
                    return (
                        <div key={item.id} onClick={() => {detailViewClick(item)}}>
                            <img src={item.image_url} height="200" />
                            <p>{item.product_id}</p>
                            <h2>{item.name}</h2>
                            <h3>Price: ${item.price}</h3>
                            <h4>Description: {item.description}</h4>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default BookmarkView;
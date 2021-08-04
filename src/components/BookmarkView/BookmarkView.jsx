import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function BookmarkView() {

    const dispatch = useDispatch();
    const userBookmark = useSelector(store => store.bookmarkReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKMARK'});
    }, []);

    return(
        <section>
            <h1>Bookmark to buy list</h1>
            <article>
                {userBookmark.map(item => {
                    return (
                        <div key={item.id}>
                            <img src={item.image_url} height="200" />
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
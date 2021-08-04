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
            <ul>
                {userBookmark.map(item => {
                    return (
                        <li key={item.id} >{item.name}</li>
                    )
                })}
            </ul>
        </section>
    )
}

export default BookmarkView;
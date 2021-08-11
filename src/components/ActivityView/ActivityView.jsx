import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ActivityView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const mysellingitems = useSelector(store => store.activityReducer);
    console.log('--LOG-- my current selling items are:', mysellingitems);

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_ITEMS'});
  }, []);

    const goToBookmark = () => {
        history.push("/bookmark/user/");
    }

    const itemDetailClick = (itemId) => {
        history.push(`activity/detail/${itemId}`);
        console.log('--LOG-- itemDetailClick, the id is:', itemId);
    }

    const addNewListing = () => {
        history.push('/activity/listing');
        console.log('pushing into addingnewlisting');
    }

    return(
        <section>
            <button onClick={goToBookmark}>My Bookmark</button>
            <h1>My Listings</h1>
            <button onClick={addNewListing}>Add New Listing</button>
            <article>
                {mysellingitems.map(item => {
                    return (
                        <div key = {item.id}>
                            <img src={item.image_url} height="200" onClick={() =>{itemDetailClick(item.id)}}/>
                            <h2>{item.name}</h2>
                            <h5>Status: {item.status_type}</h5>
                            <h3>Price: ${item.price}</h3>
                            <h4>Description: {item.description}</h4>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default ActivityView;
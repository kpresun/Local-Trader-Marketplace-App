import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ActivityView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const mysellingitems = useSelector(store => store.activityReducer);
    console.log('--LOG-- my current selling items are:', mysellingitems);
    
  useEffect(() => {
    dispatch({
        type: 'FETCH_MY_ITEMS'});
  }, []);

    const goToBookmark = () => {
        history.push("/bookmark");
    }

    return(
        <section>
            <p>This is the activity view</p>
            <h1>{params.username}</h1>
            <button onClick={goToBookmark}>Bookmark</button>
            <article>
                {mysellingitems.map(item => {
                    return (
                        <div key = {item.id}>
                            <h1>{item.name}</h1>
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default ActivityView;
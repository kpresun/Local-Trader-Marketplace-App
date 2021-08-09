import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ActivityView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const mysellingitems = useSelector(store => store.activityReducer);
    const thisUser = useSelector(store => store.user);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_MY_ITEMS', payload: thisUser.id});
    console.log('--LOG-- the current user is', thisUser.id);
  }, [])

    const goToBookmark = () => {
        history.push("/bookmark");
    }


    return(
        <section>
            <p>This is the activity view</p>
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
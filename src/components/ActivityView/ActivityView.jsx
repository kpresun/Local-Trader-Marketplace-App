import React from 'react';
import { useHistory } from 'react-router-dom';

function ActivityView() {

    const history = useHistory();

    const goToBookmark = () => {
        history.push("/bookmark");
    }


    return(
        <section>
            <p>This is the activity view</p>
            <button onClick={goToBookmark}>Bookmark</button>
        </section>
    )
}

export default ActivityView;
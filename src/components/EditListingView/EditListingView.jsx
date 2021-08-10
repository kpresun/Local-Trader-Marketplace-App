import React from 'react';
import { useHistory } from 'react-router-dom';

function EditListingView() {

    const history = useHistory();

    const backToActivity = () => {
        history.push(`/activity/detail`);
        // edit this when we have the item id
    }

    return (
        <section>
            <button onClick={backToActivity}>Back</button>
            <h1>Edit Mode</h1>
        </section>
    )
}

export default EditListingView;
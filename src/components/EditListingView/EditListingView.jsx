import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function EditListingView() {

    const history = useHistory();
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
       ({ type: 'FETCH_ITEM_INFO'}); 
       ({ type: 'FETCH_CATEGORIES'}); 
       ({ type: 'FETCH_STATUS_TYPE'});
    })


    const backToActivity = () => {
        history.push(`/activity/detail`);
        // edit this when we have the item id
    }

    return (
        <section>
            <button onClick={backToActivity}>Back</button>
            <h1>Edit Mode</h1>
            <form>
                <input type="text" placeholder="Url" value={url} onChange={event => setUrl(event.target.value)} />
                <input type="text" placeholder="Name" value={name} onChange={event => setName(event.target.value)} />
                <input type="text" placeholder="Price" value={price} onChange={event => setPrice(event.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} />
                <input type="text" placeholder="Category" value={category} onChange={event => setCategory(event.target.value)} />
                <input type="text" placeholder="Status" value={status} onChange={event => setStatus(event.target.value)} />
                <button>Update Listing</button>
            </form>
        </section>
    )
}

export default EditListingView;
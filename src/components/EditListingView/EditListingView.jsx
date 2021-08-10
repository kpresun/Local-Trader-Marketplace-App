import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useHistory, useParams } from 'react-router-dom';

function EditListingView() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const categoryTypes = useSelector(store => store.categoryReducer);
    const statusTypes = useSelector(store => store.statusReducer);
    const listingItemDetail = useSelector(store => store.listingDetailReducer);


    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        console.log('--LOG-- useEffect, the params.id is:', params.id );
       dispatch({ type: 'FETCH_CATEGORY_TYPE'}); 
       dispatch({ type: 'FETCH_STATUS_TYPE'});
       dispatch({ type: 'FETCH_ITEM_DETAIL', payload: {itemId: params.id}});
    }, [params.id]);


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
                <select onChange={event => setCategory(event.target.value)}>
                    {categoryTypes.map(category => {
                        return (
                            <option key={category.id} value={category}>{category.category_type}</option>
                        )
                    })}
                </select>
                <select onChange={event => setStatus(event.target.value)}>
                    {statusTypes.map(status => {
                        return (
                            <option key={status.id} value={status}>{status.status_type}</option>
                        )
                    })}
                </select>
                <button>Update Listing</button>
            </form>
        </section>
    )
}

export default EditListingView;
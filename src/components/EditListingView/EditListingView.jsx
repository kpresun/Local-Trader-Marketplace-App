import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function EditListingView() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const categoryTypes = useSelector(store => store.categoryReducer);
    const statusTypes = useSelector(store => store.statusReducer);
    const listingItemDetail = useSelector(store => store.listingDetailReducer);

    const [itemId, setItemId] = useState('');
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
       setAllFields();
    }, [params.id]);

    const setAllFields = () => {
        setItemId(listingItemDetail.id);
        setUrl(listingItemDetail.image_url);
        setName(listingItemDetail.name);
        setPrice(listingItemDetail.price);
        setDescription(listingItemDetail.description);
        setCategory(listingItemDetail.category_type);
        setStatus(listingItemDetail.status_type);
    }

    const backToActivity = (itemId) => {
        history.push(`/activity/detail/${itemId}`);
        // edit this when we have the item id
    }

    const editItemDetails = (event) => {
        event.preventDefault();
        const editingInfo = {
            id: itemId,
            image_url: url,
            name: name,
            price: price,
            description: description,
            category_id: category,
            status_id: status,
            history: history
        }
        dispatch({ type: 'NEW_ITEM_DETAILS', payload: editingInfo});
    }

    return (
        <section>
            <button onClick={() => {{backToActivity(listingItemDetail.id)}}}>Back</button>
            <h1>Edit Mode</h1>
            <form onSubmit={editItemDetails}>
                <img src={listingItemDetail.image_url} height="200" />
                <input type="text" placeholder="Image Url" value={url} onChange={event => setUrl(event.target.value)} />
                <input type="text" placeholder="Name" value={name} onChange={event => setName(event.target.value)} />
                <input type="text" placeholder="Price" value={price} onChange={event => setPrice(event.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} />
                <select onChange={event => setCategory(event.target.value)}>
                    {categoryTypes.map(category => {
                        return (
                            <option key={category.id} value={category.id}>{category.category_type}</option>
                        )
                    })}
                </select>
                <select onChange={event => setStatus(event.target.value)}>
                    {statusTypes.map(status => {
                        return (
                            <option key={status.id} value={status.id}>{status.status_type}</option>
                        )
                    })}
                </select>
                <button type="submit" >Update Listing</button>
                <button onClick={() => {{backToActivity(listingItemDetail.id)}}}>Cancel</button>
            </form>
        </section>
    )
}

export default EditListingView;
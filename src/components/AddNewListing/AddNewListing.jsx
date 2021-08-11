import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddNewListing() {

    const dispatch = useDispatch();
    const history = useHistory();

    const categoryTypes = useSelector(store => store.categoryReducer); 
    const statusTypes = useSelector(store => store.statusReducer);
    const thisUser = useSelector(store => store.user);

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState(''); 

    useEffect(() => {
        dispatch({ type: 'FETCH_CATEGORY_TYPE'}); 
        dispatch({ type: 'FETCH_STATUS_TYPE'});
    }, []);

    const toActivity = () => {
        history.push('/activity');
    }

    const addNewListing = (event) => {
        event.preventDefault();
        const newItemAdded ={
            user_id: thisUser.id,
            image_url: url,
            name: name,
            price: price,
            description: description,
            category_id: category,
            status_id: status,
        }
        dispatch({ type: 'NEW_ITEM_ADDED', payload: newItemAdded});
        toActivity();
    }

    return(
        <section>
            <h1>Add a New Listing</h1>
            <form onSubmit={addNewListing}>
                <input type="text" placeholder="Image Url" value={url} onChange={event => setUrl(event.target.value)}/>
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
                <button type="submit">Add New Listing</button>
                <button onClick={toActivity}>Cancel Listing</button>
            </form>
        </section>
        
    )
}

export default AddNewListing;
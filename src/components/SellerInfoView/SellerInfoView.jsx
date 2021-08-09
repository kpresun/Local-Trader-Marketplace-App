import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SellerInfoView() {

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        console.log('--LOG-- SELLER INFO VIEW, the params.id is:', params.id);
        dispatch({
            type: 'FETCH_SELLER',
            payload: {
                sellerId: params.id
            }
        });
    }, [params.id]);

    const thisSeller = useSelector(store => store.sellerReducer);
    console.log('--LOG-- thisSeller is:', thisSeller);

    return(
    <section>
        <p>This is the seller info view</p>
        <h1>UserName: {thisSeller.username} </h1>
        <h2>Email: {thisSeller.email} </h2>
        <h3>Phone: {thisSeller.phone_number} </h3>
    </section>      
    )
}

export default SellerInfoView;
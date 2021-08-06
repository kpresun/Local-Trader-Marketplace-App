import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function SellerInfoView() {

    const dispatch = useDispatch();
    const params = useParams();
    

    useEffect(() => {
        console.log('--LOG-- SELLER INFO VIEW, the params.id is:', params.id);
        dispatch({
            type: 'FETCH_SELLER',
            payload: {
                userId: params.id
            }
        });
    }, [params.id]);

    return(
    <p>This is the seller info view</p>       
    )
}

export default SellerInfoView;
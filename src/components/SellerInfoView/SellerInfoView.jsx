import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function SellerInfoView() {

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

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

    const goToBookmark = () => {
        history.push("/bookmark");
    }

    return(
    <section>
        <button onClick={goToBookmark} >Back</button>
        <p>Local Trader</p>
        <h1>UserName: {thisSeller.username} </h1>
        <h2>Email: {thisSeller.email} </h2>
        <h3>Phone: {thisSeller.phone_number} </h3>
    </section>      
    )
}

export default SellerInfoView;
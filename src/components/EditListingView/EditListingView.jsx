import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

//material-ui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';

function EditListingView() {

        // Material-UI
        const useStyles = makeStyles({
            root: {
                width: 352,
            },
            media: {
                width: 352,
                height: 200,
                justify: "center",
            },
            container: {
                width: 352,
                padding: 0,
            },
            cardGrid: {
                margin: "16px 0px 16px 0px",
            },
            Header: {
                padding: '10px',
            },
            textField: {
                padding: '8px 0px 8px 0px',
                width: '100%',
            },
            selectors: {
                padding: '8px 0px 8px 0px',
            },
            headerButtons: {
                margin: '8px 4px 0px 4px',
            },
            updateAndCancel: {
                margin: "8px 8px 8px 8px"
            }
        });
        const classes = useStyles();
        // Material-UI

    // declared constants
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    //stores
    const categoryTypes = useSelector(store => store.categoryReducer);
    const statusTypes = useSelector(store => store.statusReducer);
    const listingItemDetail = useSelector(store => store.listingDetailReducer);

    // useStates 
    const [itemId, setItemId] = useState('');
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    // on page load, dispatch
    useEffect(() => {
        console.log('--LOG-- useEffect, the params.id is:', params.id );
       dispatch({ type: 'FETCH_CATEGORY_TYPE'}); 
       dispatch({ type: 'FETCH_STATUS_TYPE'});
       dispatch({ type: 'FETCH_ITEM_DETAIL', payload: {itemId: params.id}});
       setAllFields();
    }, [params.id]);

    // set the fields to the previous values
    const setAllFields = () => {
        setItemId(listingItemDetail.id);
        setUrl(listingItemDetail.image_url);
        setName(listingItemDetail.name);
        setPrice(listingItemDetail.price);
        setDescription(listingItemDetail.description);
        setCategory(listingItemDetail.category_type);
        setStatus(listingItemDetail.status_type);
    }

    // go back to activity
    const backToActivity = (itemId) => {
        history.push(`/activity/detail/${itemId}`);
        // edit this when we have the item id
    }

    // go back to edit details
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
        <Container className={classes.container}>
            <Button className={classes.headerButtons}  variant="outlined" color="primary" onClick={() => {{backToActivity(listingItemDetail.id)}}}>Back</Button>
            <Grid container justifyContent="center" alignItems="center" direction="column">
            <Typography className={classes.Header} variant="body" color="textPrimary" component="h1">Edit Listing</Typography>
                <Grid item xs={12} className={classes.cardGrid}>
                    <Card className={classes.root}>
                        <form onSubmit={editItemDetails}>
                            <CardMedia className={classes.media} image={listingItemDetail.image_url} />
                            <CardActionArea>
                                <CardContent>
                                    <TextField className={classes.textField} id="filled-basic" label="Image Url" variant="filled" type="text" value={url} onChange={event => setUrl(event.target.value)} />
                                    <TextField className={classes.textField} id="filled-basic" label="Name" variant="filled" type="text"  value={name} onChange={event => setName(event.target.value)} />
                                    <TextField className={classes.textField} id="filled-basic" label="Price" variant="filled" type="text" value={price} onChange={event => setPrice(event.target.value)} />
                                    <TextField className={classes.textField} id="filled-basic" label="Description" variant="filled" type="text" value={description} onChange={event => setDescription(event.target.value)} />
                                </CardContent>
                            </CardActionArea>
                                <InputLabel id="select-label">Categoriess</InputLabel>
                                <Select className={classes.selectors} onChange={event => setCategory(event.target.value)}>
                                    {categoryTypes.map(category => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.category_type}</option>
                                        )
                                    })}
                                </Select>
                                <InputLabel id="select-label">Status</InputLabel>
                                <Select className={classes.selectors}  onChange={event => setStatus(event.target.value)}>
                                    {statusTypes.map(status => {
                                        return (
                                            <option key={status.id} value={status.id}>{status.status_type}</option>
                                        )
                                    })}
                                </Select>
                            <div>
                                <Button size="small" color="primary" type="submit" >Update Listing</Button>
                                <Button size="small" color="primary" onClick={() => {{backToActivity(listingItemDetail.id)}}}>Cancel</Button>
                            </div>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default EditListingView;
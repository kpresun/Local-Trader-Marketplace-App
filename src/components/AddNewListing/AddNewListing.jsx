import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

function AddNewListing() {

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
        addAndCancel: {
            margin: "8px 8px 8px 8px"
        }
    });
    const classes = useStyles();
    // Material-UI

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
        <Container>
            <Grid container justifyContent="center" alignItems="center" direction="column">
            <Typography className={classes.Header} variant="body" color="textPrimary" component="h1">Create Listing</Typography>
                <Grid item xs={12} className={classes.cardGrid}>
                    <Card className={classes.root}>
                        <form onSubmit={addNewListing}>
                            <CardActionArea>
                                <CardContent>
                                    <TextField className={classes.textField} type="text" placeholder="Image Url" value={url} onChange={event => setUrl(event.target.value)}/>
                                    <TextField className={classes.textField} type="text" placeholder="Name" value={name} onChange={event => setName(event.target.value)} />
                                    <TextField className={classes.textField} type="text" placeholder="Price" value={price} onChange={event => setPrice(event.target.value)} />
                                    <TextField className={classes.textField} type="text" placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} />
                                </CardContent>
                            </CardActionArea>
                            <InputLabel id="select-label">Categoriess</InputLabel>
                                <Select onChange={event => setCategory(event.target.value)}>
                                    {categoryTypes.map(category => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.category_type}</option>
                                    )
                                    })}
                                </Select>
                            <InputLabel id="select-label">Status</InputLabel>
                                <Select className={classes.selectors} onChange={event => setStatus(event.target.value)}>
                                    {statusTypes.map(status => {
                                        return (
                                            <option key={status.id} value={status.id}>{status.status_type}</option>
                                        )
                                    })}
                                </Select>
                            <div>
                                <Button className={classes.addAndCancel} size="small" color="primary" type="submit">Add</Button>
                                <Button className={classes.addAndCancel}  size="small" color="primary" onClick={toActivity}>Cancel</Button>
                            </div>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        
    )
}

export default AddNewListing;
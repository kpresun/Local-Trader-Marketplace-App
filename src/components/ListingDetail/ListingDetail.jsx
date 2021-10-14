import React, { useEffect } from 'react';
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

function ListingDetail() {

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
        headerButtons: {
            margin: '8px 4px 0px 4px',
        },
    });
    const classes = useStyles();
    // Material-UI

    //declared consts
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    //stores
    const listingItemDetail = useSelector(store => store.listingDetailReducer);

    // on page load, dispatch
    useEffect(() => {
        dispatch({ type: 'FETCH_ITEM_DETAIL', payload: {itemId: params.id} });
    }, [params.id]);

    // go back to my listings
    const goToMyListings = () => {
        history.push('/activity');
    }

    // go back to edit view
    const goToEditView = (itemId) => {
        history.push(`/activity/edit/${itemId}`);
    }

    // dispatch delete of listing
    const deleteListing = (itemId) => {
        window.confirm('Are you sure you want to delete this listing?') &&
        dispatch({ type: 'DELETE_LISTING', payload: [itemId, history] });
    }

    return(
        <Container className={classes.container}>
            <Button className={classes.headerButtons} variant="outlined" color="primary" onClick={goToMyListings}>Back</Button>
            <Grid container justifyContent="center" alignItems="center" direction="column">
            <Typography className={classes.Header} variant="body" color="textPrimary" component="h1">{listingItemDetail.name}</Typography>
                <Grid item item xs={12} className={classes.cardGrid}>
                    <Card className={classes.root}>
                        <CardMedia className={classes.media} image={listingItemDetail.image_url} />
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p" >Price: ${listingItemDetail.price} </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" >Description: {listingItemDetail.description} </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" >Category: {listingItemDetail.category_type}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p" >Status: {listingItemDetail.status_type}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => {goToEditView((listingItemDetail.id))}}>Edit Listing</Button>
                            <Button size="small" color="primary" onClick={() => {deleteListing(listingItemDetail.id)}}>Delete Listing</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ListingDetail;
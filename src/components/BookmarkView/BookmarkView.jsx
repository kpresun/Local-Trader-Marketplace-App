import React from 'react';
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

function BookmarkView() {

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

    //declared constant
    const history = useHistory();
    const dispatch = useDispatch();

    //store
    const user = useSelector(store => store.user);
    const userBookmark = useSelector(store => store.allBookmarkReducers.bookmarkReducer);

    // on page load, dispatch
    useEffect(() => {
        dispatch({ type: 'FETCH_BOOKMARK', payload: user.id });
    }, []);

    // click to go to detail view
    const detailViewClick = (productId) => {
        history.push(`/bookmark/detail/${productId}`);
    }

    // click to go to delete bookmark
    const deleteBookmark = (deleteID) => {
        dispatch({ type: 'DELETE_BOOKMARK', payload: deleteID});
    }

    // click to go to my listings view
    const goToMyListing = () => {
        history.push('/activity');
    }

    return(
        <Container className={classes.container} >
            <Button className={classes.headerButtons} variant="outlined" color="primary" onClick={goToMyListing}>My Listings</Button>
            <Grid container justifyContent="center" alignItems="center" direction="column">
            <Typography className={classes.Header} className={classes.listingHeader} variant="body" color="textPrimary" component="h1">My Bookmarks</Typography>
                {userBookmark.map(item => {
                    return (
                        <Grid item xs={12} className={classes.cardGrid} key={item.id}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia className={classes.media} image={item.image_url} onClick={() => {detailViewClick(item.product_id)}}/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">{item.name}</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">Price: ${item.price}</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">Status: {item.status_type}</Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions size="small" color="primary" >
                                    <Button onClick={() => {deleteBookmark(item.id)}}>Remove Bookmark</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default BookmarkView;
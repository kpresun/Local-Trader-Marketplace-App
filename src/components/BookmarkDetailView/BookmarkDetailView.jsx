import { PanoramaSharp } from '@material-ui/icons';
import React from 'react';
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

function BookmarkDetailView() {

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

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const user = useSelector(store => store.user);

    useEffect(() => {
        console.log('--LOG-- The params.id is:', params.id);
        dispatch({
        type: 'FETCH_SINGLE_BOOKMARK',
        payload: {
            productId: params.id
        }
    });
    }, [params.id]);

    const singleBookmark = useSelector(store => store.allBookmarkReducers.singleBookmarkReducer);
    console.log('--LOG-- singleBookmark is:', singleBookmark);

    const goBackToBookMark = () => {
        history.push(`/bookmark/user/${user.id}`);
    }

    const contactSeller = (sellerId) => {
        console.log('--LOG-- the seller ID is:', sellerId );
        history.push(`/seller/detail/${sellerId}`);
    }

    const deleteBookmark = (deleteID) => {
        dispatch({ type: 'DELETE_BOOKMARK', payload: deleteID});
        console.log('--LOG-- ID to delete:', deleteID);
        history.push(`/bookmark/user/${user.id}`);
    }

    return(
        <Container className={classes.container}>
            <Button className={classes.headerButtons}  variant="outlined" color="primary" onClick={goBackToBookMark}>Back</Button>
            <Typography className={classes.Header} variant="body" color="textPrimary" component="h1">{singleBookmark.name} </Typography>
            <Grid container justifyContent="center" alignItems="center" direction="column">
                <Grid item xs={12} className={classes.cardGrid}>
                    <Card className={classes.root} >
                        <CardActionArea>
                            <CardMedia className={classes.media} image={singleBookmark.image_url} height="200" />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p" >Price: ${singleBookmark.price} </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" >Description: {singleBookmark.description} </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" >Category: {singleBookmark.category_type}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p" >Status: {singleBookmark.status_type}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={() =>{contactSeller(singleBookmark.user_id)}}>Contact Seller</Button>
                            <Button onClick={() => {deleteBookmark(singleBookmark.id)}}>Remove Bookmark</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default BookmarkDetailView;
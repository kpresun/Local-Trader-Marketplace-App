import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//material-UI
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
import { AutorenewTwoTone } from '@material-ui/icons';
//material-ui

function ActivityView() {

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
    const history = useHistory();
    const user = useSelector(store => store.user);
    const mysellingitems = useSelector(store => store.activityReducer);
    console.log('--LOG-- my current selling items are:', mysellingitems);

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_ITEMS'});
  }, []);

    const goToBookmark = () => {
        history.push(`/bookmark/user/${user.id}`);
    }

    const itemDetailClick = (itemId) => {
        history.push(`activity/detail/${itemId}`);
        console.log('--LOG-- itemDetailClick, the id is:', itemId);
    }

    const addNewListing = () => {
        history.push('/activity/listing');
        console.log('pushing into addingnewlisting');
    }

    return(
        <Container className={classes.container}>
            <Button className={classes.headerButtons} variant="outlined" color="primary" onClick={goToBookmark}>My Bookmark</Button>
            <Button className={classes.headerButtons} variant="contained" color="primary" onClick={addNewListing}>Add New Listing</Button>
            <Grid container justifyContent="center" alignItems="center" direction="column">
            <Typography className={classes.Header} variant="body" color="textPrimary" component="h1">My Listings</Typography>
                {mysellingitems.map(item => {
                    return (
                        <Grid item xs={12} className={classes.cardGrid} key = {item.id}>
                            <Card className={classes.root} >
                                <CardActionArea>
                                    <CardMedia className={classes.media} image={item.image_url} onClick={() =>{itemDetailClick(item.id)}}/>
                                    <Typography gutterBottom variant="h5" component="h2">{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" >Status: {item.status_type}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" >Price: ${item.price}</Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default ActivityView;
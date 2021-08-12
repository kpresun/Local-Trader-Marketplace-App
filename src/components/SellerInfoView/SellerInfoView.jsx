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

function SellerInfoView() {

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
    });
    const classes = useStyles();
    // Material-UI

    // const declared
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    // on page load, dispatch with params
    useEffect(() => {
        console.log('--LOG-- SELLER INFO VIEW, the params.id is:', params.id);
        dispatch({
            type: 'FETCH_SELLER',
            payload: {
                sellerId: params.id
            }
        });
    }, [params.id]);

    //store
    const thisSeller = useSelector(store => store.sellerReducer);
    console.log('--LOG-- thisSeller is:', thisSeller);

    // go back to bookmark
    const goToBookmark = () => {
        history.push('/marketplace');
    }

    return(
    <Container className={classes.container}>
        <Button variant="outlined" color="primary" onClick={goToBookmark} >Back</Button>
        <Typography className={classes.Header} variant="body" color="textPrimary" component="h1" >Local Trader, {thisSeller.username}</Typography>
        <Grid container justifyContent="center" alignItems="center" direction="column">
            <Grid item item xs={12} className={classes.cardGrid} >
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" >Email: {thisSeller.email} </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" >Phone: {thisSeller.phone_number} </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    </Container>      
    )
}

export default SellerInfoView;
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import StarIcon from '@material-ui/icons/Star';

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

function Marketplace() {
   
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
    });
    const classes = useStyles();
    // Material-UI

    const history = useHistory();
    const dispatch = useDispatch();
    const allProducts = useSelector(store => store.productReducer);

    // on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS'});
    }, []);

    // handles adding item to bookmark
    const bookmarkClick = (product) => {
        dispatch({ type: 'ADD_TO_BOOKMARK', payload: product});
    }

    // pushes to seller contact information
    const contactSeller = (sellerId) => {
        console.log('--LOG-- the seller ID is:', sellerId );
        history.push(`/seller/detail/${sellerId}`);
    }

    return(
        <Container className={classes.container} >
            <Typography variant="body" color="textPrimary" component="h1">Marketplace</Typography>
            <Grid container justifyContent="center" alignItems="center" direction="column">
                {allProducts.map(product => {
                    return (
                        <Grid item xs={12} className={classes.cardGrid}>
                            <Card className={classes.root} key={product.id} >
                                    <CardActionArea>
                                        <CardMedia className={classes.media} image={product.image_url} />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">{product.name}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">Price: ${product.price}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">Description: {product.description}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">Category: {product.category_type}</Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">Status: {product.status_type}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() =>{contactSeller(product.user_id)}}>Contact</Button>
                                        <Button size="small" color="primary" onClick={() => {bookmarkClick(product)}}>Bookmark</Button>
                                    </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default Marketplace;
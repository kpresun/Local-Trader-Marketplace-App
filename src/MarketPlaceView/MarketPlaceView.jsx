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
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';

function Marketplace() {
    
    const useStyles = makeStyles({
        root: {
            maxWidth: 400,
            height: 400,
        },
        media: {
            maxWidth: 200,
            height: 200,
            justify: "center",
        },
        container: {
            maxWidth: 500,
            height: 500,
        },
    });

    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();
    const allProducts = useSelector(store => store.productReducer);
    // const userBookmark = useSelector(store => store.bookmarkReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS'});
        // dispatch({ type: 'FETCH_BOOKMARKS'}) maybe for the conditional rendering
    }, []);

    // handles adding and deleting item to bookmark: STILL NEED TO CREATE DELETE ROUTE
    const bookmarkClick = (product) => {
        if (product) {
            dispatch({ type: 'ADD_TO_BOOKMARK', payload: product})
        } else {
            dispatch({ type: 'DELETE_FROM_BOOKMARK', payload: product})
        }
    }

    const contactSeller = (sellerId) => {
        console.log('--LOG-- the seller ID is:', sellerId );
        history.push(`/seller/detail/${sellerId}`);
    }

    return(
        <Container className={classes.container}>
            <Typography variant="body" color="textPrimary" component="h1">Marketplace</Typography>
            <Grid container padding={4} justify="center">
                {allProducts.map(product => {
                    return (
                        <Paper variant="outlined" square>
                            <Card className={classes.root} key={product.id} >
                                <Grid item>
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
                                </Grid>
                            </Card>
                        </Paper>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default Marketplace;


// maybe create a boolean for bookmark table

{/* <StarIcon onClick={() => {bookmarkClick(product)}}>bookmark</StarIcon> */}
import React from 'react';
import { useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

//material-ui
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';

function UserProfile() {

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

    const user = useSelector(store => store.user);

    return( 
        <Container>
        <Grid container justifyContent="center" alignItems="center" direction="column">
            <Typography className={classes.Header} variant="body" color="textPrimary" component="h1">My Profile</Typography>
            <Grid item>
                <Card>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" >UserName: {user.username}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p" >Email: {user.email}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p" >Phone Number: {user.phone_number}</Typography>
                    </CardContent>
                </Card>
                <CardActionArea>
                    <LogOutButton />
                </CardActionArea>
            </Grid>
        </Grid>
        </Container>
    )
}

export default UserProfile;
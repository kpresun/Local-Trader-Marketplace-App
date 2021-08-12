import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

//material UI
import { AppBar, Icon, makeStyles } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import StoreIcon from '@material-ui/icons/Store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid } from '@material-ui/core';

function Nav() {

  const useStyles = makeStyles({
    IconContainer: {
      width: '100%',
      margin: "auto",
    },
    BarContainer: {
      width: '352px',
      margin: "auto",
    },
    app: {
      paddingTop: '64px',
    },
  })

  const classes = useStyles();

  const user = useSelector((store) => store.user);
  const history = useHistory();

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = `/activity`;
    loginLinkData.text = 'Activity';
  }

  const handleClick = (route) => {
    history.push(route);
  }

  return (
        <AppBar position="relative" >
          <div>
            <Grid className={classes.BarContainer} container direction="rows" spacing={0} justifyContent="space-evenly" alignItems="center">
              <Grid item xs={4} >
                <IconButton className={classes.IconContainer}>
                  <MenuIcon onClick={() => {handleClick('/activity')}} fontSize="large" />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton className={classes.IconContainer}>
                <StoreIcon onClick={() => {handleClick('/marketplace')}} fontSize="large"/>
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton className={classes.IconContainer}>
                  <AccountCircleIcon onClick={() => {handleClick('/profile-page')}} fontSize="large"/>
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </AppBar>
  );
}

export default Nav;



 {/* <Link to="/marketplace">
          <h2 className="nav-title">Local Traders</h2>
        </Link> */}
{/* <Link className="navLink" to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>
          <Link className="navLink" to="/marketplace">
            Marketplace
          </Link>
          {user.id && (
            <>
              <Link className="navLink" to="/profile-page">
                Profile Page
              </Link>
              <LogOutButton className="navLink" />
            </>
          )} */}
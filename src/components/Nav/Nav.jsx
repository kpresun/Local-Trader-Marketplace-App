import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {

  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = `/activity`;
    loginLinkData.text = 'Activity';
  }

  return (
    <div className="nav">
      <Link to="/marketplace">
        <h2 className="nav-title">Local Traders</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
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
            {/* <LogOutButton className="navLink" /> */}
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;


// Save for new navigation
// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import PhoneIcon from "@material-ui/icons/Phone";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import PersonPinIcon from "@material-ui/icons/PersonPin";

// function Marketplace() {
//   const useStyles = makeStyles({
//     root: {
//       flexGrow: 1,
//       maxWidth: 500,
//     },
//   });

//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Paper square className={classes.root}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         variant="fullWidth"
//         indicatorColor="primary"
//         textColor="primary"
//         aria-label="icon tabs example"
//       >
//         <Tab icon={<PhoneIcon />} aria-label="phone" />
//         <Tab icon={<FavoriteIcon />} aria-label="favorite" />
//         <Tab icon={<PersonPinIcon />} aria-label="person" />
//       </Tabs>
//     </Paper>
//   );
// }

// export default Marketplace;

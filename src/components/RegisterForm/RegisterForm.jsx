import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { TextField } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';

function RegisterForm() {

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
  textField: {
      padding: '8px 0px 8px 0px',
      width: '100%',
  },
  selectors: {
      padding: '8px 0px 8px 0px',
  },
  headerButtons: {
      margin: '8px 4px 0px 4px',
  },
  btn: {
    margin: '16px 0px 16px 0px',
  },
});
const classes = useStyles();
// Material-UI

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // WILL NEED TO MOVE EMAIL, POSTAL CODE, AND PHONE NUMBER TO REDUCER OR SERVER
  const [email, setEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        phone_number: phoneNumber,
        postal_code: postalCode
      },
    });
  }; // end registerUser

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <Grid item xs={12} className={classes.cardGrid}>
          <form className="formPanel" onSubmit={registerUser}>
            <Typography  variant="body" color="textPrimary" component="h1">Register User</Typography>
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
            <div>
              <FormControl htmlFor="username">
                Username:
                <TextField
                  type="text"
                  name="username"
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormControl>
            </div>
            <div>
              <FormControl htmlFor="password">
                Password:
                <TextField
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
            </div>
            <div>
              <FormControl htmlFor="email">
                Contact Email:
                <TextField
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
            </div>
            <div>
              <FormControl htmlFor="phone number">
                Phone Number:
                <TextField
                  type="phone number"
                  name="phone number"
                  value={phoneNumber}
                  required
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </FormControl>
            </div>
            <div>
              <FormControl htmlFor="postal_code">
                Postal Code:
                <TextField
                  type="postal code"
                  name="postal code"
                  value={postalCode}
                  required
                  onChange={(event) => setPostalCode(event.target.value)}
                />
              </FormControl>
            </div>
            <div>
              <Button className={classes.btn}  type="submit" name="submit" value="Register" variant="contained" color="primary">Register</Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterForm;

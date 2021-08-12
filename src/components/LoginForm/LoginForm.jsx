import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

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

function LoginForm() {

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
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <Grid item xs={12} className={classes.cardGrid}>
          <form className="formPanel" onSubmit={login}>
            <Typography variant="body" color="textPrimary" component="h1">Login</Typography>
            {errors.loginMessage && (
              <h3 className="alert" role="alert">
                {errors.loginMessage}
              </h3>
            )}
            <div>
              <FormControl htmlFor="username">
                Username:
                <TextField
                  type="text"
                  name="username"
                  required
                  value={username}
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
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
            </div>
            <div>
              <Button className={classes.btn} type="submit" name="submit" value="Log In" variant="contained" color="primary" >Log In</Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;

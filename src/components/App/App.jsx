//Basic imports
import React, { useEffect } from 'react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
// CSS
import './App.css';

//Hooks needed
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

//Navigation and footer
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

//Components
// import AboutPage from '../AboutPage/AboutPage';
// import UserPage from '../UserPage/UserPage';
// import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

//Components I created
import Marketplace from '../../MarketPlaceView/MarketPlaceView';
import UserProfile from '../UserProfile/UserProfile';
import ActivityView from '../ActivityView/ActivityView';
import BookmarkView from '../BookmarkView/BookmarkView';
import BookmarkDetailView from '../BookmarkDetailView/BookmarkDetailView';
import SellerInfoView from '../SellerInfoView/SellerInfoView';
import ListingDetail from '../ListingDetail/ListingDetail';
import EditListingView from '../EditListingView/EditListingView';
import AddNewListing from '../AddNewListing/AddNewListing';
import { makeStyles } from '@material-ui/core';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          {/* Visiting localhost:3000/about will show the about page. */}
          {/* shows marketplace at all times (logged in or not) */}
          <Route exact path="/marketplace" > 
            <Marketplace />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute exact path="/activity" >
            <ActivityView />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile-page">
            <UserProfile />
          </ProtectedRoute>

          <ProtectedRoute exact path='/marketplace'>
            <Marketplace />
          </ProtectedRoute>

          <ProtectedRoute exact path="/bookmark/user/:id">
            <BookmarkView />
          </ProtectedRoute>

          <ProtectedRoute exact path="/bookmark/detail/:id" >
            <BookmarkDetailView />
          </ProtectedRoute>

          <ProtectedRoute exact path="/seller/detail/:id" >
            <SellerInfoView />
          </ProtectedRoute>

          <ProtectedRoute exact path="/activity/detail/:id" >
            <ListingDetail />
          </ProtectedRoute>

          <ProtectedRoute exact path="/activity/edit/:id" >
            <EditListingView />
          </ProtectedRoute>

          <ProtectedRoute exact path="/activity/listing" >
            <AddNewListing />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/marketplace"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/marketplace"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/marketplace"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/marketplace"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/marketplace"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/marketplace"
          >
            <LandingPage />
          </ProtectedRoute>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

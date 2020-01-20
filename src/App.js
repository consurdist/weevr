import React, { Component } from 'react';

// Navigation library
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Auth
import jwt_decode from "jwt-decode";
import { setCurrentUser, setAuthToken, logoutUser } from "./actions/auth.Actions";

// Styles
// import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
import "./__freelancer.css";
// import "./__custom.css";


// Redux boilerplate
import { Provider } from "react-redux";
import store from "./store";

// View modules:
import Navibar from "./components/navibar.Component";
import Footer from "./components/footer.Component";

// Public views:
import Landing from "./components/landing.Component";
import Signup from "./components/signup.Component";
import Signin from "./components/signin.Component";

// Private (authenticated) views:
import PrivateRoute from "./components/private-route/private-route.Component";
import Dashboard from "./components/dashboard.Component";
import Entries from "./components/entries.Component";
import MySpecies from "./components/myspecies.Component";
import MyCams from "./components/mycams.Component";


if (localStorage.jwtToken) {

    // Set auth token header
    const token = localStorage.jwtToken;
    setAuthToken(token);

    // Decode token and get user info
    const decoded = jwt_decode(token);

    // Set user isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "/signin";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navibar/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/signin" component={Signin}/>
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/entries" component={Entries}/>
                            <PrivateRoute exact path="/myspecies" component={MySpecies}/>
                            <PrivateRoute exact path="/mycams" component={MyCams}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

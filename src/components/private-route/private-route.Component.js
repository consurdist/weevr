import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, session, auth, entry, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/signin" />
            )
        }
    />
);
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    entry: state.entry,
    session: state.session
});
export default connect(mapStateToProps)(PrivateRoute);
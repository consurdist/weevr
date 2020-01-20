import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { loginUser } from "../actions/auth.Actions";

import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
        // console.log(userData);
    };

    render() {
        const { errors } = this.state;
        return(
            <div>
            <div className="cover-container d-flex h-100 p-4 mx-auto flex-column">
                <div className="container h-100">
                    <div className="form-group p-4 rounded-sm my-5 bg-white">
                        <h4 className="display-4">Login</h4>
                    <Form className="loginForm" noValidate onSubmit={this.onSubmit}>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4} className="form_label">
                                Email
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <span className="red-text">{errors.email} {errors.emailnotfound}</span>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4} className="form_label">
                                Password
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <span className="red-text">{errors.password}{errors.passwordincorrect}</span>
                            </Col>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                        >
                            Log in
                        </Button>

                    </Form>
                        <a href="/forgotpw">
                            <div className="ui floated right basic red button">
                                I forgot my password
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

Signin.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Signin));

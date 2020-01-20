import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
// import axios from 'axios';

import { registerUser } from "../actions/auth.Actions";

import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
        console.log(newUser);
    };
    render() {
        const { errors } = this.state;
        return (
            <div>
            <div className="cover-container d-flex h-100 p-4 mx-auto flex-column">
                <div className="container d-flex flex-column flex-row p2">
                    <div className="bg-white p-4 rounded-sm my-5">
                        <div className="form-group p-4 rounded-sm bg-white">
                            <div className="col s12" style={{ paddingLeft: "1rem" }}>
                            <h4 className="display-4">Sign up</h4>
                            </div>
                            <Form className="regForm" noValidate onSubmit={this.onSubmit}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4} className="form_label">
                                        First Name
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            onChange={this.onChange}
                                            value={this.state.firstname}
                                            error={errors.firstname}
                                            id="firstname"
                                            type="text"
                                            className={classnames("", { invalid: errors.firstname })}
                                            placeholder="First Name"
                                        />
                                        <span className="alert-danger">{errors.firstname}</span>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4} className="form_label">
                                        Last Name
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            onChange={this.onChange}
                                            value={this.state.lastname}
                                            error={errors.lastname}
                                            id="lastname"
                                            type="text"
                                            className={classnames("", { invalid: errors.lastname })}
                                            placeholder="Last Name"
                                        />
                                        <span className="alert-danger">{errors.lastname}</span>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4} className="form_label">
                                        Phone Number
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            onChange={this.onChange}
                                            value={this.state.phone}
                                            error={errors.phone}
                                            id="phone"
                                            type="phone"
                                            className={classnames("", { invalid: errors.phone })}
                                            placeholder="Phone Number"
                                        />
                                        <span className="alert-danger">{errors.phone}</span>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4} className="form_label">
                                        Email Address
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            error={errors.email}
                                            className={classnames("", { invalid: errors.email })}
                                            id="email"
                                            type="email"
                                            placeholder="Email Address"
                                            // size="lg"
                                        />
                                        <span className="alert-danger">{errors.email}</span>
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
                                            className={classnames("", { invalid: errors.password })}
                                            placeholder="Password"
                                        />
                                        <span className="alert-danger">{errors.password}</span>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4} className="form_label">
                                        Confirm Password
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control
                                            onChange={this.onChange}
                                            value={this.state.password2}
                                            error={errors.password2}
                                            id="password2"
                                            type="password"
                                            className={classnames("", { invalid: errors.password2 })}
                                            placeholder="Confirm Password"
                                        />
                                        <span className="alert-danger">{errors.password2}</span>
                                    </Col>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    style={{
                                        width: "10rem",
                                        borderRadius: "0.3rem",
                                        letterSpacing: "0.2rem",
                                        marginTop: "1rem"
                                    }}
                                >
                                    Sign up
                                </Button>
                            </Form>
                        </div>
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

Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Signup));


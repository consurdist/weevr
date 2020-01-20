import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth.Actions";

// import { Redirect } from "react-router-dom";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button";

import "../__freelancer.css";

class Navibar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        return (
            <div>
                <Navbar bg="white" expand="lg" variant="" style={{height:"110px", position:"fixed", top:"0px", width:"100%", paddingLeft: "5em", zIndex: "5", boxShadow: "0px 1px 20px #3A515F"}}>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="weevr.png"
                            height="55EM"
                            className="d-inline-block align-top"
                        />
                        {""}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary rounded">MENU </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {this.props.auth.isAuthenticated ? (
                            <Nav className="ml-auto">
                                <Nav.Link href="/mycams">
                                <Button className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-primary text-white"
                                >MY CAMS
                                </Button>
                                </Nav.Link>
                                <Nav.Link href="/entries">
                                <Button className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-primary text-white"
                                >MY ENTRIES
                                </Button>
                                </Nav.Link>
                                <Nav.Link href="/myspecies">
                                <Button className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-primary text-white"
                                >MY SPECIES
                                </Button>
                                </Nav.Link>
                                <Nav.Link href="#" onClick={this.onLogoutClick}>
                                <Button className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-secondary text-white"
                                >SIGN OUT
                                </Button>
                                </Nav.Link>
                            </Nav>
                        ) : (
                            <Nav className="ml-auto">
                                <Nav.Link href="/signup">
                                    <Button className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-primary text-white">
                                        SIGN UP
                                    </Button>
                                </Nav.Link>
                                <Nav.Link href="/signin">
                                    <Button className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-secondary text-white">
                                        SIGN IN
                                    </Button>
                                </Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

Navibar.propTypes = {
    auth: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    entry: state.entry
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navibar);
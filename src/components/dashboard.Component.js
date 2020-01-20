import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/auth.Actions";

// import "../../App.css";
import "../__custom.css"


// Bootstrap
import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// import TestPatternA from '../../public/test_pattern_A.jpeg';
// import TestPatternB from '../../public/test_pattern_B.jpeg';
// import BackgroundBird from "../Frontpagebird.png";




class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        // const { user } = this.props.auth;
        // const { sess } = this.props.session;
        return (
            <div className="container bg-white h-100 text-primary p-3 mx-auto my-4">

                <div className="streamContainer">
                    <div className="addCamPrompt">
                        <h5>Where do you want to go from this dashboard?</h5>
                        <div>
                            <Link to="/entries">
                                <Button
                                    variant="primary"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        margin: "1em",
                                        display: "inline-block"
                                    }}
                                >
                                    Entries
                                </Button>
                            </Link>
                            <Link to="/mycams">
                                <Button
                                    variant="primary"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        margin: "1em",
                                        display: "inline-block"
                                    }}
                                >
                                    My Cams
                                </Button>
                            </Link>
                            <Link to="/myspecies">
                                <Button
                                    variant="primary"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        margin: "1em",
                                        display: "inline-block"
                                    }}
                                >
                                    My Species
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    errors: PropTypes.object.isRequired,
    // session: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    entry: state.entry,
    errors: state.errors,
    session: state.session,
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);

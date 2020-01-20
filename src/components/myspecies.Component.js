import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import { getEntries, getSpecies, setUserSpecies, setLastSeen } from "../actions/entry.Actions";


import "../__custom.css"
// import "../App.css";
import "../__freelancer.css"

// import Button from "react-bootstrap/Button";


class MySpecies extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
        };

    }

    componentDidMount() {

        this.props.getSpecies();
        var userId = this.props.auth.user.id;
        this.props.getEntries(userId);
    }

    render() {

        return (


            <div className="container py-3">
                <div className="card-deck mt-3">
                    {this.props.entry.userSpecies.map((item , index) => {
                        return <div key={index} className="card box-shadow my-2 ">
                                    <div className="card-header text-center">
                                        <h5>{item.common_name}</h5>
                                    </div>
                                    <img src={item.img_path} className="card-img" alt={"example image"}></img>

                                    <div className="card-body">
                                        <ul className="list-unstyled mt-1 mb-1">
                                            <li>
                                                <h6>{item.species}</h6>
                                            </li>
                                            <li><b>Order :</b> {item.order} <br></br> <b>Family :</b>  {item.family}</li>

                                        </ul>
                                    </div>

                                    <div className="card-footer text-center text-muted">
                                        <p className="py-1 my-0">Last Seen </p>
                                        {/* <h6> {{lastseen(each.id)}}</h6>*/}
                                        <h6>{this.props.entry.entries[index].time}</h6>
                                    </div>
                                </div>
                    })}
                </div>
            </div>
        )
    }
}

MySpecies.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    entry: state.entry,
    errors: state.errors,
    session: state.session,
});

export default connect(mapStateToProps,
    { getEntries, getSpecies, setUserSpecies, setLastSeen }
    )(MySpecies);
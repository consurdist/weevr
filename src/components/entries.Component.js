import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// import { Redirect } from "react-router-dom";

import { getEntries, getSpecies } from "../actions/entry.Actions";


import "../__custom.css"
// import "../App.css";
import "../__freelancer.css"

// import Button from "react-bootstrap/Button";


class Entries extends Component {
    // constructor() {
    //     super();
    // }

    componentWillMount(){
        this.props.getSpecies();

        var userId = this.props.auth.user.id;
        console.log(userId);
        this.props.getEntries(userId);
    };

    // onChange = e => {
    //     this.setState({ [e.target.id]: e.target.value });
    // };

    render() {
        return (

            <div id="page-top body pt-3" className=" body">
                <h2> Recent Sightings </h2>
                <table className="table table-striped table-dark table-hover w-auto">
                    <thead>
                    <tr>
                        <th scope="col">Entry #</th>
                        <th scope="col">Bird Species</th>
                        <th scope="col">Time</th>
                    </tr>
                    </thead>

                    <tbody>
                    {/*{this.props.entry.entries.map((value, index) => {*/}
                    {this.props.entry.userSpecies.map((value, index) => {
                        return <tr>
                            <th key={index} scope="col">{index + 1}</th>
                            <th key={index} scope="col">{value.species}</th>
                            <th key={index} scope="col">{this.props.entry.entries[index].time}</th>
                            </tr>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

Entries.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    entry: state.entry,
    errors: state.errors,
    session: state.session,
});

export default connect(
    mapStateToProps,
    { getEntries, getSpecies }
    )
(Entries);


//
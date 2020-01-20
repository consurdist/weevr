import React, { Component } from "react";
// import {connect} from "react-redux";
// import {logoutUser} from "../actions/auth.Actions";

class Footer extends Component {
    render() {
        return (
            <footer className="py-5 border-top bg-white mb-0">
                <div className="container">
                    <div className="row d-flex flex-row">
                        <div className="col-3 col-md">
                            <small className="d-block mb-3 text-muted">&copy; Copyright and all rights reserved
                                Weevr
                                2019-2020</small>
                        </div>
                        <div className="col-3 col-md">
                            <h5>Features</h5>
                            <ul className="list-unstyled text-small">
                                 {/*eslint-disable-next-line*/}
                                <li><a className="text-muted" href="#">Static Image ID</a></li>
                                 {/*eslint-disable-next-line*/}
                                <li><a className="text-muted" href="#">Webcam Support</a></li>
                                 {/*eslint-disable-next-line*/}
                                <li><a className="text-muted" href="#">IFTTT Support</a></li>
                            </ul>
                        </div>
                        <div className="col-3 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                {/* eslint-disable-next-line*/}
                                <li><a className="text-muted" href="#">Resource</a></li>
                            </ul>
                        </div>
                        <div className="col-3 col-md">
                            <h5>About</h5>
                            <ul className="list-unstyled text-small">
                                {/*eslint-disable-next-line*/}
                                <li><a className="text-muted" href="#">Team</a></li>
                                {/*eslint-disable-next-line*/}
                                <li><a className="text-muted" href="#">Privacy</a></li>
                                {/* eslint-disable-next-line*/}
                                <li><a className="text-muted" href="#">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
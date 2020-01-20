import React, { Component } from "react";
// import { Link } from "react-router-dom";

// Bootstrap
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";

import BackgroundBird from '../Frontpagebird.png';

class Landing extends Component {
    render() {
        return (
            <div>
                <div className="view intro-2 d-flex flex-column cover-container">
                    <div className="flex-row flex-column" style = {{
                        backgroundImage: `url(${BackgroundBird})`,
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        height: "700px"}}>
                        <div className="container d-flex h-100 justify-content-center">
                            <div className="row w-100 d-flex flex-row justify-content-center align-center">
                                <div className=" border-white  border rounded my-auto p-4 m-2 align-center" id="homeTextBox">
                                    <h1 className="text-white align-right text-right border-bottom p-5 border-white"> TRACK & IDENTIFY BIRDS
                                        AT YOUR FEEDER</h1>
                                    <div className="border"></div>
                                <p className="text-white py-2 text-center"> Fall in love with the pet you never knew you had</p>
                                <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-primary text-center"
                                   href="/signup">SIGN
                                    UP FOR
                                    FREE</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white px-3">
                    <div className="cover-container py-5 d-flex flex-column justify-content-center">
                        <div
                            className="cover-container pricing-header text-center d-flex flex-row justify-content-center">
                            <h1 className="mx-auto">Plans</h1>
                        </div>
                        <div className="row text-left justify-content-center w-75 mx-auto">
                            <p>Keep track of your unoffical flying pets. See them come and go for the seasons and keep
                                track of your
                                rare sightings</p>
                        </div>
                    </div>
                </div>
                <div className = "container my-3" >
                    <div className = "card-deck my-3 text-center" >
                        <div className = "card mb-4 shadow-sm" >
                            <div className = "card-header" >
                                < h4 className = "my-0 font-weight-normal"> Free </h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>5 Static IDs</li>
                                    <li>Community Support</li>
                                    <li>No Logging</li>
                                    <li>Educational</li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Hobby</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$7 <small className="text-muted">/ mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Unlimited Static IDs</li>
                                    <li>Sighting Logging</li>
                                    <li>10 Video IDs </li>
                                    <li>Email Support</li>
                                    <li></li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Birder</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$17 <small className="text-muted">/ mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Webcam Stream Monitoring</li>
                                    <li>Unlimited Static IDs</li>
                                    <li>Unlimited Video IDs</li>
                                    <li>Phone and Email Support</li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">Get started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Landing;
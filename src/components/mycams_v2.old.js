import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import { enterURL } from "../actions/session.Actions";

// import "../../App.css";
import "../__custom.css"
import "../__freelancer.css"

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Toast from 'react-bootstrap/Toast'
import { useState } from 'react';

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import Hls from "hls.js";

import 'video.js/dist/video-js.css';

import videojs from 'video.js'
import 'videojs-youtube';

class MyCams extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            // isStreaming: "",
            streamURL: "",
            binaryURL: "../test_pattern_B.jpeg",
            // classifyURL: "",
            // camName: "",
            // errors: {},
            playing: false,

            cocoSsdReady: false,
            mobilenetReady: false,

            cocoButtonText: "Loading CocoSSD...",
            cocoButtonStatus: true,

            mobilenetButtonText: "Loading Mobilenet...",
            mobilenetButtonStatus: true

        };

        cocoSsd.load().then(model => {
            this.cocoModel = model;
            console.log("CocoSSD Loaded");
            // setInterval(this.onTriggerClick3(), 13500);
            // this.onTriggerClick3();

            this.setState({cocoButtonText: "Coco SSD"});

            this.setState({cocoButtonStatus: false});
            // document.getElementById("cocoButton").disabled = false;
        });

        mobilenet.load().then(model => {
            this.mobilenetModel = model;
            console.log("MobileNet Loaded");
            // setInterval(this.onTriggerClick3(), 13500);
            // this.onTriggerClick3();

            this.setState({mobilenetButtonText: "Mobilenet"});

            this.setState({mobilenetButtonStatus: false});
            // document.getElementById("mobilenetButton").disabled = false;

        });

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state.streamURL)
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.enterURL(this.state.streamURL);

    };

    // onTriggerClick4 = e => {
    //     const videoElement = document.getElementById('birdy');
    //     mobilenet.load().then(model => {
    //         // detect objects in the image.
    //         model.classify(videoElement).then(predictions => {
    //             console.log('Predictions: ', predictions);
    //         });
    //     });
    // };

    onTriggerClick = e => {

    };

    // onTriggerClick3 = e => {
    //     const videoElement = document.getElementById('birdy');
    //     cocoSsd.load().then(model => {
    //         // detect objects in the image.
    //         model.detect(videoElement).then(predictions => {
    //             let emptyArray = [];
    //
    //             if (!Array.isArray(predictions) || !predictions.length || predictions.length == 0) {
    //                 console.log('Predictions: ', predictions)
    //             }
    //             else {
    //                 console.log('Predictions: ', predictions);
    //                 const konsole = document.getElementById("console");
    //                 konsole.innerText = predictions[0].class;
    //
    //                 // console.log(predictions[0].bbox[0]); // Start X
    //                 // console.log(predictions[0].bbox[1]); // Start Y
    //                 // console.log(predictions[0].bbox[2]); // Width
    //                 // console.log(predictions[0].bbox[3]); // Height
    //
    //                 var x = predictions[0].bbox[0] / 3.2;
    //                 var y = predictions[0].bbox[1] / 3.2;
    //                 var width = predictions[0].bbox[2] / 3.2;
    //                 var height = predictions[0].bbox[3] / 3.2;
    //
    //                 var canvas = document.getElementById("canv");
    //                 var ctx = canvas.getContext("2d");
    //
    //                 ctx.clearRect(0, 0, canvas.width, canvas.height);
    //                 ctx.beginPath();
    //                 ctx.lineWidth = "3";
    //                 ctx.strokeStyle = "green";
    //                 ctx.rect(x, y, width, height);
    //                 ctx.stroke();
    //             }
    //         });
    //     });
    // };


    onTriggerMobilenet = () => {
        setInterval(this.mobilenetDetect, 1000);
    };

    mobilenetDetect = () => {
        const videoElement = document.getElementById('birdy');

        if (this.state.playing == true) {

            // this.mobilenetModel.infer(videoElement, false)
            //     .then(embeddings => {
            //         console.log('Embeddings: ', embeddings);
            //     });

            // Get the logits.
            const logits = this.mobilenetModel.infer(videoElement);
            console.log('Logits');
            logits.print(true);

            // Get the embedding.
            const embedding = this.mobilenetModel.infer(videoElement, true);
            console.log('Embedding');
            embedding.print(true);

            this.mobilenetModel.classify(videoElement, 6)
                .then(predictions => {

                    console.log('Predictions: ', predictions);
                    let emptyArray = [];
                    const konsole = document.getElementById("console");
                    var canvas = document.getElementById("canv");
                    var ctx = canvas.getContext("2d");

                    if (!Array.isArray(predictions) || !predictions.length || predictions.length == 0) {
                        console.log('Predictions: ', predictions);

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // konsole.innerText = "...";

                        // setInterval(this.onTriggerClick3(), 3000);
                    } else {
                        // console.log('Predictions: ', predictions);

                        if (predictions[0].class == "bird") {

                            // konsole.innerText = predictions[0].class;

                            var x = predictions[0].bbox[0] / 3.33;
                            var y = predictions[0].bbox[1] / 3.33;
                            var width = predictions[0].bbox[2] / 3;
                            var height = predictions[0].bbox[3] / 3;

                            var canvas = document.getElementById("canv");
                            var ctx = canvas.getContext("2d");

                            ctx.clearRect(0, 0, canvas.width, canvas.height);

                            // Draw Rectangle box
                            ctx.beginPath();
                            ctx.lineWidth = "3";
                            // ctx.setLineDash([1,1]);
                            ctx.strokeStyle = "#7BAF1A";
                            // ctx.fillStyle = "#1ABC9C";
                            ctx.rect(x, y, width, height);
                            ctx.globalAlpha = 1;
                            ctx.stroke();
                            // ctx.globalAlpha = 0.5;
                            // ctx.fill();

                            // Draw Circle box:
                            //         ctx.beginPath();
                            //         ctx.lineWidth = "3";
                            //         ctx.strokeStyle = "#7BAF1A";
                            //
                            //         ctx.fillStyle = "#1ABC9C";
                            //
                            //         if (width.valueOf() > height.valueOf()) {
                            //             ctx.globalAlpha = 1;
                            //             ctx.arc(x + (width /2), y + (height / 2), (width /2 ), 0, 2 * Math.PI);
                            //             ctx.stroke();
                            //             ctx.globalAlpha = 0.25;
                            //             ctx.fill();
                            //         } else {
                            //             ctx.globalAlpha = 1;
                            //             ctx.arc(x + (width /2), y + (height / 2), (height /2 ), 0, 2 * Math.PI);
                            //             ctx.stroke();
                            //             ctx.globalAlpha = 0.25;
                            //             ctx.fill();
                            //         }

                            // Draw Text label
                            const font = "16px sans-serif";
                            ctx.font = font;
                            ctx.textBaseline = "top";
                            ctx.fillStyle = "#7BAF1A";
                            const textWidth = ctx.measureText(predictions[0].class).width;
                            const textHeight = parseInt(font, 10); // base 10
                            ctx.globalAlpha = 1;
                            ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
                            ctx.fillStyle = "white";
                            ctx.fillText(predictions[0].class, x, y);

                            // setInterval(this.onTriggerClick3(), 13500);
                        } else {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            // konsole.innerText = "...";
                        }
                    }
                });
        } else {
            console.log("video stopped");
            return
        }
    };


    onTriggerCoco = () => {
        setInterval(this.cocoDetect, 100);
    };

    // setInterval(this.models.detect(videoElement)
    // { alert("Hello"); }, 3000);
    // setInterval(

    cocoDetect = () => {
        const videoElement = document.getElementById('birdy');

        if (this.state.playing == true) {
            this.cocoModel.detect(videoElement)
                .then(predictions => {
                    let emptyArray = [];
                    const konsole = document.getElementById("console");
                    var canvas = document.getElementById("canv");
                    var ctx = canvas.getContext("2d");

                    if (!Array.isArray(predictions) || !predictions.length || predictions.length == 0) {
                        // console.log('Predictions: ', predictions);

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // konsole.innerText = "...";

                        // setInterval(this.onTriggerClick3(), 3000);
                    } else {
                        // console.log('Predictions: ', predictions);

                        if (predictions[0].class == "bird") {

                            // var class1 = "";
                            // var class2 = "";
                            // var class3 = "";

                            this.mobilenetModel.classify(videoElement, 6)
                                .then(classes => {
                                    this.predictions = predictions;

                                    console.log(predictions);
                                    const class1 = classes[0].className;
                                    const class2 = classes[1].className;
                                    const class3 = classes[2].className;

                                    console.log(classes);

                                    // var mobi = this.mobilenetModel.classify(videoElement, 3);

                                    // konsole.innerText = predictions[0].class;

                                    konsole.innerText = "Second guess:  " + class2;

                                    var x = predictions[0].bbox[0] / 3.33;
                                    var y = predictions[0].bbox[1] / 3.33;
                                    var width = predictions[0].bbox[2] / 3;
                                    var height = predictions[0].bbox[3] / 3;

                                    var canvas = document.getElementById("canv");
                                    var ctx = canvas.getContext("2d");

                                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                                    // Draw Rectangle box
                                    ctx.beginPath();
                                    ctx.lineWidth = "3";
                                    // ctx.setLineDash([1,1]);
                                    ctx.strokeStyle = "#7BAF1A";
                                    // ctx.fillStyle = "#1ABC9C";
                                    ctx.rect(x, y, width, height);
                                    ctx.globalAlpha = 1;
                                    ctx.stroke();
                                    // ctx.globalAlpha = 0.5;
                                    // ctx.fill();

                                    // Draw Circle box:
                                    //         ctx.beginPath();
                                    //         ctx.lineWidth = "3";
                                    //         ctx.strokeStyle = "#7BAF1A";
                                    //
                                    //         ctx.fillStyle = "#1ABC9C";
                                    //
                                    //         if (width.valueOf() > height.valueOf()) {
                                    //             ctx.globalAlpha = 1;
                                    //             ctx.arc(x + (width /2), y + (height / 2), (width /2 ), 0, 2 * Math.PI);
                                    //             ctx.stroke();
                                    //             ctx.globalAlpha = 0.25;
                                    //             ctx.fill();
                                    //         } else {
                                    //             ctx.globalAlpha = 1;
                                    //             ctx.arc(x + (width /2), y + (height / 2), (height /2 ), 0, 2 * Math.PI);
                                    //             ctx.stroke();
                                    //             ctx.globalAlpha = 0.25;
                                    //             ctx.fill();
                                    //         }

                                    // Draw Text label
                                    const font = "16px sans-serif";
                                    ctx.font = font;
                                    ctx.textBaseline = "top";
                                    ctx.fillStyle = "#7BAF1A";


                                    // const textWidth = ctx.measureText(predictions[0].class).width;
                                    // const textWidth = ctx.measureText(mobi[0].className).width;
                                    const textWidth = ctx.measureText(class1).width;


                                    const textHeight = parseInt(font, 10); // base 10
                                    ctx.globalAlpha = 1;
                                    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
                                    ctx.fillStyle = "white";


                                    // ctx.fillText(predictions[0].class, x, y);
                                    // ctx.fillText(mobi[0].className, x, y);
                                    ctx.fillText(class1, x, y);
                                    // setInterval(this.onTriggerClick3(), 13500);
                                });
                        } else {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            // konsole.innerText = "...";
                        }
                    }
                });
        } else {
            console.log("video stopped");
            return
        }
    };






    componentDidMount() {

        const video1 = document.getElementById('birdy');

        video1.onseeking = () => {
            this.state.playing = false;
        };

        // video1.onseeked = () => {
        //     this.state.playing = true;
        // };

        video1.onpause = () => {
            this.state.playing = false;
        };

        video1.onplaying = () => {
            this.state.playing = true;
        };

        video1.onended = () => {
            this.state.playing = false;
        };

        video1.onwaiting = () => {
            this.state.playing = false;
        };

        video1.onstalled = () => {
            this.state.playing = false;
        };

        video1.onemptied = () => {
            this.state.playing = false;
        };

        video1.onloadstart = () => {
            this.state.playing = false;
        };

        video1.onerror = () => {
            this.state.playing = false;
        };

        video1.onabort = () => {
            this.state.playing = false;
        };

        // video1.oncanplaythrough = () => {
        //     this.state.playing = true;
        // };

        video1.onloadeddata = (event) => {
            this.state.playing = true;
            console.log('Yay! The readyState just increased to  ' +
                'HAVE_CURRENT_DATA or greater for the first time.');

            // const modelPromise = cocoSsd.load();
            // Promise.all([modelPromise])
            //     .then(values => {
            //         this.onTriggerClick3(values[0])
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
            //
            // cocoSsd.load().then(model => {
            //     const models = model;
            //     this.onTriggerClick3();
            // })
            // .catch(error => {
            //     console.error(error);
            // });
        };

        // see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events for other media events
        // onprogress
        // oncanplay
        // oncanplaythrough

        if (Hls.isSupported() && this.player) {
            console.log("hls init success");
            const video = this.player;
            const hls = new Hls({ enableWorker: false });
            hls.loadSource(
                "http://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            );
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        }
    }

    // componentDidUpdate() {
    //     if (Hls.isSupported() && this.player) {
    //         console.log("hls init success");
    //         const video = this.player;
    //         const hls = new Hls({ enableWorker: false });
    //         hls.loadSource(
    //             "http://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    //         );
    //         hls.attachMedia(video);
    //         hls.on(Hls.Events.MANIFEST_PARSED, function() {
    //             video.play();
    //         });
    //     }
    // }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };

        return (

            <div className="container bg-white h-100 text-primary p-3 mx-auto my-4">

                <div className="streamContainer">
                    {/*<div className="addCamPrompt">*/}
                    {/*    /!*<h5>Enter the URL for your Bird Feeder cam below, then click Submit!</h5>*!/*/}
                    {/*    /!*<p>For a quick demo, copy/paste this youtube*!/*/}
                    {/*    /!*    link: <strong>https://www.youtube.com/watch?v=xbs7FT7dXYc</strong></p>*!/*/}
                    {/*    <Form className="loginForm" noValidate onSubmit={this.onSubmit}>*/}

                    {/*        <Form.Group as={Col}>*/}
                    {/*            <h6 className="inline"> Enter a URL: </h6>*/}
                    {/*            <Form.Label column sm={4} className="form_label inline">*/}
                    {/*                ...*/}
                    {/*            </Form.Label>*/}
                    {/*            <Form.Control className="inline"*/}
                    {/*                          onChange={this.onChange}*/}
                    {/*                          value={this.state.streamURL}*/}
                    {/*                          error={null}*/}
                    {/*                          id="streamURL"*/}
                    {/*                          type="text"*/}
                    {/*                          placeholder="Stream URL"*/}
                    {/*            />*/}
                    {/*        </Form.Group>*/}
                    {/*        <Button className="rounded btn-primary text-white inline" type="submit">Submit</Button>*/}

                    {/*    </Form>*/}
                    {/*</div>*/}

                    <div className="camListContainer" id="listcont">
                        <h3></h3>

                        <Button id="cocoButton"
                                disabled={this.state.cocoButtonStatus}
                                onClick={this.onTriggerCoco}
                                className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-danger text-white"
                                style={{
                                    marginTop: 10,
                                    width: 120
                                }}>
                            {this.state.cocoButtonText}
                        </Button>

                        <Button id="mobilenetButton"
                                disabled={this.state.mobilenetButtonStatus}
                                onClick={this.onTriggerMobilenet}
                                className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-secondary text-white"
                                style={{
                                    marginTop: 10,
                                    width: 120
                                }}>
                            {this.state.mobilenetButtonText}
                        </Button>

                        <Button
                            disabled
                            className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-warning text-white"
                            style={{
                                marginTop: 10,
                                width: 120
                            }}>
                            Unassigned
                        </Button>

                        <ul className="list-unstyled mt-1 mb-1">
                            <li>
                                <div className="card-header text-center">

                                </div>
                            </li>
                            {/*{% endfor %}*/}
                        </ul>
                    </div>

                    <div id="viddiv" className="camVideoContainer">
                        <h6 id="cam_title_bp">Camera Feed:</h6>

                        <div className="playerwrapper player">
                            <div className="playerInner">
                                <canvas id="canv" height="336" width="600"
                                        style={{
                                            marginTop: 72,
                                            // opacity:0.5,
                                            position: "absolute",
                                            zIndex: 3,
                                            outline: "#3A515F 8px solid",
                                        }}>
                                </canvas>
                                <video
                                    id="birdy"
                                    controls
                                    className="videoCanvas"
                                    height="480"
                                    width="600"
                                    ref={player => (this.player = player)}
                                    autoPlay={true}
                                />

                            </div>
                        </div>
                        <h6 id="console">...</h6>

                    </div>

                </div>
            </div>
        )
    }
}

MyCams.propTypes = {
    auth: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    entry: state.entry,
    errors: state.errors,
    session: state.session,
});

export default connect(mapStateToProps, {enterURL})(MyCams);

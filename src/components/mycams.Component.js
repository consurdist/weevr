import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import { enterURL } from "../actions/session.Actions";

// import "../../App.css";
import "../__freelancer.css"
import "../__custom.css"

// Bootstrap
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Toast from 'react-bootstrap/Toast'
// import { useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faUserAstronaut, faKiwiBird, faFeather, faCrow, faPlay, faPause, faSpinner } from '@fortawesome/free-solid-svg-icons'

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import Hls from "hls.js";

import 'video.js/dist/video-js.css';

// import videojs from 'video.js'
import 'videojs-youtube';


// We are only using the user-astronaut icon
library.add(faUserAstronaut, faKiwiBird, faFeather, faCrow, faPlay, faPause, faSpinner);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch();

const playButton = <FontAwesomeIcon icon="play" size="2x" />;
const pauseButton = <FontAwesomeIcon icon="pause" size="2x" />;
const loadingButton = <FontAwesomeIcon icon="spinner" size="2x" pulse />;

var hls = new Hls;

const camDict = {
    // "Select a cam to begin" : "http://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "Sapsucker Woods [LIVE]" : "http://139.162.103.240:8080/hls/stream.m3u8",
    "Parkour" : "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    "Big Buck Bunny" : "http://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    "French Musicians" : "https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8",
    // "cam2" : "http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8",
    // "cam3" : "http://www.streambox.fr/playlists/test_001/stream.m3u8"
};

class MyCams extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            streamURL: "",
            binaryURL: "../test_pattern_B.jpeg",
            playing: false,

            activeCamTitle: "Select a cam to begin",

            // camTitle: "...",

            cocoSsdReady: false,
            mobilenetReady: false,

            cocoButtonText: "Loading CocoSSD...",
            cocoButtonStatus: true,

            mobilenetButtonText: "Loading Mobilenet...",
            mobilenetButtonStatus: true,

            AIButtonText: "Loading...",
            AIButtonDisabled: true,
            AIButtonAnim: "spinner",
            AIButtonAnimation: "pulse",

            AIButtonIcon: loadingButton



        };
        let hls = null;



        cocoSsd.load().then(model => {
            this.cocoModel = model;
            console.log("CocoSSD Loaded");
            // setInterval(this.onTriggerClick3(), 13500);
            // this.onTriggerClick3();

            // this.setState({cocoButtonText: "Coco SSD"});
            this.setState({cocoButtonStatus: false});

            if (this.state.mobilenetButtonStatus === false) {
                this.setState({AIButtonDisabled: false});
                this.setState({AIButtonText: "Play"});
                // this.setState({AIButtonIcon: "play"});
                this.setState({AIButtonIcon: playButton});
            }

            this.setState({cocoSsdReady: true});
            // document.getElementById("cocoButton").disabled = false;
        });

        mobilenet.load().then(model => {
            this.mobilenetModel = model;
            console.log("MobileNet Loaded");
            // setInterval(this.onTriggerClick3(), 13500);
            // this.onTriggerClick3();

            // this.setState({mobilenetButtonText: "Mobilenet"});
            this.setState({mobilenetButtonStatus: false});

            if (this.state.cocoButtonStatus === false) {
                this.setState({AIButtonDisabled: false});
                this.setState({AIButtonText: "Play"});
                // this.setState({AIButtonIcon: "play"});
                this.setState({AIButtonIcon: playButton});
            }

            this.setState({mobilenetReady: true})
            // document.getElementById("mobilenetButton").disabled = false;
        });

    }

    onLoadCam = (cam) => {

        if (hls !== null) {
            hls.detachMedia();
            hls.destroy();
            hls = null;
        }

        if (Hls.isSupported() && this.player) {

            this.setState({playing: false});
            this.setState({AIButtonDisabled: true});

            // this.player.pause();
            // this.player.destroy();
            // this.hls.destroy();
            // this.setState({AIButtonText: "Play"});
            // this.setState({AIButtonIcon: "play"})
            this.setState({AIButtonIcon: playButton});

            // this.player.remove();

            console.log(camDict[cam]);
            this.setState({activeCamTitle: cam});


            console.log("hls init success");
            const video = this.player;
            const hls = new Hls({enableWorker: true});


            hls.loadSource(camDict[cam]);
            hls.attachMedia(video);

            hls.once(Hls.Events.MEDIA_ATTACHED, () => {
                hls.on(Hls.Events.ERROR, (event, err) => {
                    if (err.fatal) {
                        hls.destroy();
                        return;
                    }
                    switch (err.type) {
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            hls.recoverMediaError();
                            break;
                    }
                });
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    // video.play();
                });
            });

            if (this.state.cocoSsdReady && this.state.mobilenetReady) {
                this.setState({AIButtonDisabled: false});
            }

        }

    };

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

    onTriggerAI = () => {
        this.player.play();

        var timer = setInterval(() => {
                this.detect()
            },500
        );

        if (this.state.AIButtonText === "Pause") {
            clearInterval(timer);
            this.player.pause();
            this.setState({AIButtonText: "Play"});
            // this.setState({AIButtonIcon: "play"})
            this.setState({AIButtonIcon: playButton});
        } else {
            // var idVar = setInterval(this.detect, 500);

            this.setState({AIButtonDisabled: false});
            this.setState({AIButtonText: "Pause"});
            // this.setState({AIButtonIcon: "pause"})
            this.setState({AIButtonIcon: pauseButton});
        }
    };

    detect() {
        const videoElement = document.getElementById('birdy');
        // videoElement.play;

        if (this.state.playing === true) {
            this.cocoModel.detect(videoElement)
                .then(predictions => {
                    // let emptyArray = [];
                    const konsole = document.getElementById("console");
                    var canvas = document.getElementById("canv");
                    var ctx = canvas.getContext("2d");

                    const vidd = document.getElementById("birdy");

                    const ww = ctx.width;
                    const hh = ctx.height;

                    if (!Array.isArray(predictions) || !predictions.length || predictions.length === 0) {
                        // console.log('Predictions: ', predictions);

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // konsole.innerText = "...";
                        // setInterval(this.onTriggerClick3(), 3000);
                    } else {
                        // console.log('Predictions: ', predictions);
                        if (predictions[0].class === "bird") {
                            // console.log("canvas width: " + ww, "canvas height: " + hh);
                            // console.log("vid width: " + vidd.width, "vid height: " + vidd.height);

                            // var class1 = "";
                            // var class2 = "";
                            // var class3 = "";

                            this.mobilenetModel.classify(videoElement, 2)
                                .then(classes => {
                                    this.predictions = predictions;

                                    // console.log(predictions);
                                    const class1 = classes[0].className;
                                    const class2 = classes[1].className;
                                    // const class3 = classes[2].className;
                                    // console.log(classes);
                                    // var mobi = this.mobilenetModel.classify(videoElement, 3);
                                    // konsole.innerText = predictions[0].class;

                                    konsole.innerText = "Second guess:  " + class2;

                                    // w = 400
                                    // h = 300

                                    var x = predictions[0].bbox[0] / 3;
                                    var y = predictions[0].bbox[1] / 3;
                                    var width = predictions[0].bbox[2] / 3;
                                    var height = predictions[0].bbox[3] / 3;

                                    // var x = predictions[0].bbox[0] / 3.33;
                                    // var y = predictions[0].bbox[1] / 3.33;
                                    // var width = predictions[0].bbox[2] / 3;
                                    // var height = predictions[0].bbox[3] / 3;

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
            return
            // console.log("video stopped");
            // return
        }
    };

    componentDidMount() {

        const video1 = document.getElementById('birdy');

        video1.onloadeddata = (event) => {
            this.setState({playing: true});
            console.log('initial stream data loaded');
        };
        video1.onseeking = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        // video1.onseeked = () => {
        //     this.state.playing = true;
        // };
        video1.onpause = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        video1.onplaying = () => {
            this.setState({playing: true});
            console.log('stream START');
        };
        video1.onended = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        video1.onwaiting = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        video1.onstalled = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        video1.onemptied = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        video1.onloadstart = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        video1.onerror = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        video1.onabort = () => {
            this.setState({playing: false});
            console.log('stream STOP');
        };
        // video1.oncanplaythrough = () => {
        //     this.state.playing = true;
        // };

        // see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events for other media events
        // onprogress
        // oncanplay
        // oncanplaythrough

        // if (Hls.isSupported() && this.player) {
        //     console.log("hls init success");
        //     const video = this.player;
        //     const hls = new Hls({ enableWorker: true });
        //     hls.loadSource(
        //
        //         // camDict[this.state.activeCamTitle]
        //         // "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8" // ! needs size change
        //         // "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8" // parkour
        //         // "http://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" // animation
        //         // "https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8" // french people
        //         // "http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8" // ! needs playlist mechanics
        //         // "http://www.streambox.fr/playlists/test_001/stream.m3u8" // ! doesnt load
        //     );
        //     hls.attachMedia(video);
        //     hls.on(Hls.Events.MANIFEST_PARSED, function() {
        //         // video.play();
        //     });
        // }
    }

    render() {

        return (
                <div className="streamContainer">
                    <div className="camListContainer">
                        <h4>My Cams</h4>

                        {Object.keys(camDict).map((key, index) => {
                            return <Button
                                id={key}
                                onClick={() => {this.onLoadCam(key)}}
                                className="py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-primary text-white camListButton"
                                style={{
                                }}>
                                {key}
                            </Button>
                        })}
                    </div>

                    <div id="viddiv" className="camVideoContainer">
                        <h6 id="cam_title_bp">{this.state.activeCamTitle}</h6>
                        <canvas id="canv"
                                height="360"
                                width="640"
                                // style={{
                                //     width:"70%",
                                //     height:"auto",
                                //     // marginTop: 72,
                                //     // height:"80%",
                                //     // opacity:0.5,
                                //     position: "absolute",
                                //     zIndex: 3,
                                //     outline: "#3A515F 8px solid"}}
                        />
                        <div className="playerwrapper player">
                            <div className="playerInner">

                                <video
                                    id="birdy"
                                    // controls
                                    className="videoCanvas"
                                    height="1080"
                                    width="1920"
                                    ref={player => (this.player = player)}
                                    // autoPlay={true}
                                    style={{
                                        width:"100%",
                                        // marginTop: 72,
                                        height:"auto",
                                        // opacity:0.5,
                                        // position: "absolute",
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="streamControl">
                        <Button id="AIButton"
                                disabled={this.state.AIButtonDisabled}
                                onClick={this.onTriggerAI}
                                className="nav-link py-3 px-0 px-lg-3 round js-scroll-trigger btn-danger text-white streamButton"
                                style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    // width: 120,
                                    width: 80,
                                    height: 80,
                                    borderRadius: 20
                                }}>
                            {/*{this.state.AIButtonText}*/}
                            {/*<i className={this.state.AIButtonIcon}></i>*/}
                            {this.state.AIButtonIcon}
                            {/*<FontAwesomeIcon icon="play" size="2x" pulse />*/}

                        </Button>

                        <Button id="emptyButton1"
                                disabled
                                className="nav-link py-3 px-0 px-lg-3 round js-scroll-trigger btn-secondary text-white streamButton"
                                style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    // width: 120,
                                    width: 80,
                                    height: 80,
                                    borderRadius: 20
                                }}>
                            {/*Unassigned*/}
                            <FontAwesomeIcon icon="kiwi-bird" size="2x" />
                        </Button>

                        <Button id="emptyButton1"
                                disabled
                                className="nav-link py-3 px-0 px-lg-3 round js-scroll-trigger btn-warning text-white streamButton"
                                style={{
                                    backgroundImage: "play.svg",
                                    marginLeft: 10,
                                    marginRight: 10,
                                    width: 80,
                                    height: 80,
                                    borderRadius: 20
                                }}>
                            {/*Unassigned*/}
                            <FontAwesomeIcon icon="feather" size="2x" />
                        </Button>

                        <ul className="list-unstyled mt-1 mb-1">
                            <li>
                                <div className="card-header text-center">
                                </div>
                            </li>
                            {/*{% endfor %}*/}
                        </ul>
                    </div>
                    <div className="console">
                        <h6 id="console">...</h6>
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

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
// import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import YouTube from 'react-youtube';

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import html2canvas from 'html2canvas';

import Hls from "hls.js";


// import '../../node_modules/video.js/dist/video.min.js'

import 'video.js/dist/video-js.css';

import videojs from 'video.js'
import 'videojs-youtube';
import 'videojs-flash';

import domtoimage from 'dom-to-image';
import saveAs from 'file-saver';
// import * as iframe2image from 'iframe2image';

// import iframe2image from 'iframe2image';



// import TestPatternA from '../../public/test_pattern_A.jpeg';
// import TestPatternB from '../../public/test_pattern_B.jpeg';
// import BackgroundBird from "../Frontpagebird.png";

import {Helmet} from "react-helmet";




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
        };
        cocoSsd.load().then(model => {
            this.models = model;
            console.log("loaded model");
            this.onTriggerClick3();
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
        // const payload = this.state.streamURL;

        // var url = this.state.streamURL.replace("watch?v=", "embed/" );
        //
        // var url = url + "?autoplay=1";
        // console.log(url)
        // ;
        // this.props.enterURL(url);

        this.props.enterURL(this.state.streamURL);

        // this.props.enterURL(this.state.streamURL);
        // console.log(userData);
    };
    // onTriggerClick = e => {
    //     e.preventDefault();
    //     html2canvas(document.querySelector("#birdy", {
    //         allowTaint: true,
    //         backgroundColor: "#f8f8f8",
    //         foreignObjectRendering: true,
    //         width: "50px",
    //         height: "50px"
    //
    //     })).then(canvas => {
    //         document.body.appendChild(canvas)
    //     });
    // };

    onTriggerClick2 = e => {

        const opti = {
            // windowWidth: el.scrollWidth,
            // windowHeight: el.scrollHeight,
            // imageTimeout: 0,
            // ignoreElements: (node) => node.nodeName === 'IFRAME',
            backgroundColor: '#EDEFF0',
            foreignObjectRendering: true,
            logging: true,
            useCORS: true,
            allowTaint: true
        };

        e.preventDefault();
        html2canvas(document.querySelector("#birdy"), opti).then(canvas => {
            document.body.appendChild(canvas)
        });
    };



    onTriggerClick4 = e => {
        const videoElement = document.getElementById('birdy');
        mobilenet.load().then(model => {
            // detect objects in the image.
            model.classify(videoElement).then(predictions => {
                console.log('Predictions: ', predictions);
            });
        });
    };


    // Download file:
    // onTriggerClick = e => {
    //     domtoimage.toBlob(document.getElementById('birdy'))
    //         .then(function (blob) {
    //             window.saveAs(blob, 'my-node.png');
    //         });
    // };

    // Append to canvas:
    // onTriggerClick = e => {
    //     domtoimage.toPng(document.getElementById('birdy'))
    //         .then(function (dataUrl) {
    //             var img = new Image();
    //             img.src = dataUrl;
    //             document.body.appendChild(img);
    //         })
    //         .catch(function (error) {
    //             console.error('oops, something went wrong!', error);
    //         });
    // };

    // Get as UINT array:
    // onTriggerClick = e => {
    //     domtoimage.toPixelData(document.getElementById('birdy'))
    //         .then(function (pixels) {
    //             for (var y = 0; y < node.scrollHeight; ++y) {
    //                 for (var x = 0; x < node.scrollWidth; ++x) {
    //                     pixelAtXYOffset = (4 * y * node.scrollHeight) + (4 * x);
    //                     /* pixelAtXY is a Uint8Array[4] containing RGBA values of the pixel at (x, y) in the range 0..255 */
    //                     pixelAtXY = pixels.slice(pixelAtXYOffset, pixelAtXYOffset + 4);
    //                 }
    //             }
    //         });
    // };

    onTriggerClick = e => {

        // const script = document.createElement("script");
        //
        // script.src = "iframe2image.js";
        // script.async = true;

        // document.body.appendChild(script);

        // Set up the canvas dimensions
        var canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');
        canvas.width = 360;
        canvas.height = 200;

        // Grab the iframe
        var inner = document.getElementById('birdy');

        // Get the image
        window.iframe2image(inner, function (err, img) {
            console.log("called iframecap");
            // If there is an error, log it
            if (err) {
                return console.error("there's some error", err);
            }

            // Otherwise, add the image to the canvas
            context.drawImage(img, 0, 0);
            document.body.appendChild(img);

            // domtoimage.toPng(img)
            //         .then(function (dataUrl) {
            //             var img2 = new Image();
            //             img2.src = dataUrl;
            //             document.body.appendChild(img2);
            //         })

            domtoimage.toPixelData(img)
                .then(function (pixels) {
                    for (var y = 0; y < img.scrollHeight; ++y) {
                        for (var x = 0; x < img.scrollWidth; ++x) {
                            var pixelAtXYOffset = (4 * y * img.scrollHeight) + (4 * x);
                            /* pixelAtXY is a Uint8Array[4] containing RGBA values of the pixel at (x, y) in the range 0..255 */
                            var pixelAtXY = pixels.slice(pixelAtXYOffset, pixelAtXYOffset + 4);
                        }
                    }

                    console.log(pixels);

                    var pixels2 = Array.from(pixels);
                    console.log(pixels2);

                    var pixels3 = new Uint32Array(pixels2);
                    console.log(pixels3);

                    var pixels4 = {data: pixels3, width:360, height: 200};
                    console.log(pixels4);

                    mobilenet.load().then(model => {
                        // detect objects in the image.
                        model.classify(canvas).then(predictions => {
                            console.log('Predictions: ', predictions);
                        });
                    });



                    // document.body.appendChild([pixels]);
                });
        });


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

    onTriggerClick3 = () => {
        const videoElement = document.getElementById('birdy');
        this.models.detect(videoElement).then(predictions => {
            let emptyArray = [];

            if (!Array.isArray(predictions) || !predictions.length || predictions.length == 0) {
                console.log('Predictions: ', predictions);
                this.onTriggerClick3()
            }
            else {
                console.log('Predictions: ', predictions);
                const konsole = document.getElementById("console");
                konsole.innerText = predictions[0].class;

                // console.log(predictions[0].bbox[0]); // Start X
                // console.log(predictions[0].bbox[1]); // Start Y
                // console.log(predictions[0].bbox[2]); // Width
                // console.log(predictions[0].bbox[3]); // Height

                var x = predictions[0].bbox[0] / 3.2;
                var y = predictions[0].bbox[1] / 3.2;
                var width = predictions[0].bbox[2] / 3.2;
                var height = predictions[0].bbox[3] / 3.2;

                var canvas = document.getElementById("canv");
                var ctx = canvas.getContext("2d");

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.strokeStyle = "green";
                ctx.rect(x, y, width, height);
                ctx.stroke();

                this.onTriggerClick3()
            }

        });

    };




    componentDidMount() {

        const video1 = document.getElementById('birdy');

        video1.onloadeddata = (event) => {
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

        // const s = document.createElement('script');
        // s.type = 'text/javascript';
        // s.async = true;
        // s.innerHTML = "document.write('This is output by document.write()!')";
        // this.instance.appendChild(s);

        // const script = document.createElement("script");
        //
        // script.src = "public/iframe2image.min.js";
        // script.async = true;
        //
        // document.body.appendChild(script);





        // <script src="public/iframe2image.min.js"></script>
        // <script>
        // MyGlobal.utils.iframe2image(myIframe, cb);
        // </script>

        // var node = document.getElementById('my-node');


        // instantiate Video.js
        // this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
        //     console.log('onPlayerReady', this)
        // });

        // const videoElement = document.getElementById('birdy');
        //
        // const model = async () => {
        //     await mobilenet.load();
        //     console.log("model loaded")
        // };
        //
        // const model2 = async () => {
        //     await cocoSsd.load();
        //     console.log("model 2 loaded")
        // };
        //
        // model();
        // model2();
        //
        // const capCoco = async () => {
        //     await this.model.detect(videoElement).then(predictions => {
        //         console.log('Predictions: ', predictions);
        //     });
        // };
        //
        // const capMobinet = () => {
        //     model2.classify(videoElement).then(predictions => {
        //         console.log('Predictions: ', predictions);
        //     });
        // };

        // console.log(navigator.mediaDevices.enumerateDevices());

        // const model = await mobilenet.load();

        // model.classify(
        //     img: tf.Tensor3D | ImageData | HTMLImageElement |
        //         HTMLCanvasElement | HTMLVideoElement,
        //     topk?: number
        // );


        // cocoSsd.load().then(model => {
        //     // detect objects in the image.
        //     model.detect(videoElement).then(predictions => {
        //         console.log('Predictions: ', predictions);
        //     });
        // });
        //
        // mobilenet.load().then(model => {
        //     // detect objects in the image.
        //     model.classify(videoElement).then(predictions => {
        //         console.log('Predictions: ', predictions);
        //     });
        // });

        // model.enumerate();

        // const predictions2 = async () => {
        //     // model.enumerate();
        //     // model2.enumerate();
        //     await model2.detect(videoElement);
        // };
        //
        // let predictions = async () => {
        //     await model.classify(videoElement);
        //     console.log('Predictions: ');
        //     console.log(predictions);
        // };
        //
        // setInterval(predictions, 13500);

        // const prediction = model.classify(videoElement);

        // setInterval(prediction, 13500);
    }

    componentDidUpdate() {
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

                <Helmet>
                    {/*<script src="http://include.com/pathtojs.js" type="text/javascript" />*/}
                    {/*<link rel="script" href="public/iframe2image.min.js" />*/}
                    <script src="iframe2image.withdomvas.js"/>
                    {/*<script>try{Typekit.load({ async: true });}catch(e){}</script>*/}
                </Helmet>

                {/*<div ref={el => (this.instance = el)} />*/}
                <canvas id="canvas"></canvas>
                <div className="streamContainer">
                    <div className="addCamPrompt">
                        <h5>Enter the URL for your Bird Feeder cam below, then click Submit!</h5>
                        <p>For a quick demo, copy/paste this youtube
                            link: <strong>https://www.youtube.com/watch?v=xbs7FT7dXYc</strong></p>
                        <Form className="loginForm" noValidate onSubmit={this.onSubmit}>

                            <Form.Group as={Col}>
                                <h6 className="inline"> Enter a URL: </h6>
                                <Form.Label column sm={4} className="form_label inline">
                                    ...
                                </Form.Label>
                                <Form.Control className="inline"
                                              onChange={this.onChange}
                                              value={this.state.streamURL}
                                              error={null}
                                              id="streamURL"
                                              type="text"
                                              placeholder="Stream URL"
                                />
                            </Form.Group>
                            {/*<Form.Group as={Col}>*/}
                            {/*    <h6 className="inline"> Enter a Name: </h6>*/}
                            {/*    <Form.Label column sm={4} className="form_label inline">*/}
                            {/*        ...*/}
                            {/*    </Form.Label>*/}
                            {/*    <Form.Control className="inline"*/}
                            {/*                  onChange={this.onChange}*/}
                            {/*                  value={this.state.camName}*/}
                            {/*                  error={null}*/}
                            {/*                  id="camName"*/}
                            {/*                  type="text"*/}
                            {/*                  placeholder="Cam Name"*/}
                            {/*    />*/}
                            {/*</Form.Group>*/}
                            <Button className="rounded btn-primary text-white inline" type="submit">Submit</Button>

                        </Form>
                    </div>

                    <div className="camListContainer" id="listcont">
                        <h3>My feeder Cams</h3>
                        {/*<Button onClick={this.onTriggerClick} className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-primary text-white">*/}
                        {/*    TRIGGER*/}
                        {/*</Button>*/}
                        {/*<Button onClick={this.onTriggerClick2} className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-primary text-white">*/}
                        {/*    TRIGGER B*/}
                        {/*</Button>*/}
                        <Button onClick={this.onTriggerClick3} className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-danger text-white">
                            Coco
                        </Button>
                        <Button onClick={this.onTriggerClick4} className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-secondary text-white">
                            Mobilenet
                        </Button>
                        <Button onClick={this.onTriggerClick} className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger btn-warning text-white">
                            Screenshot
                        </Button>
                        <ul className="list-unstyled mt-1 mb-1">
                            {/*{% for each in my_cams_list %}*/}
                            <li>
                                <div className="card-header text-center">
                                    {/*<a href='{{my_cams_list.get(each)}}'>*/}
                                    {/*    <b>{{each}}</b>*/}
                                    {/*</a>*/}
                                </div>
                            </li>
                            {/*{% endfor %}*/}
                        </ul>
                    </div>

                    <div id="viddiv" className="camVideoContainer">
                        <h6 id="cam_title_bp">Camera Feed:</h6>

                        {/*<embed id="birdy" src="https://www.youtube.com/embed/xbs7FT7dXYc?autoplay=1&output=embed"></embed>*/}

                        <div className="playerwrapper player">
                            <div className="playerInner">
                                <canvas id="canv" height="336" width="600"
                                        style={{
                                            marginTop: 72,
                                            // opacity:0.5,
                                            position: "absolute",
                                            zIndex: 3,
                                            outline: "black 3px solid"
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

                        {/*<canvas id="canv" height="600" width="600">*/}
                        {/*</canvas>*/}

                        {/*<canvas id="layer1"*/}
                        {/*        style="z-index: 1;*/}
                        {/*        position:absolute;*/}
                        {/*        left:0px;*/}
                        {/*        top:0px;*/}
                        {/*        " height="300px" width="400">*/}
                        {/*    This text is displayed if your browser does not support HTML5 Canvas.*/}
                        {/*</canvas>*/}
                        {/*<canvas id="layer2"*/}
                        {/*        style="z-index: 2;*/}
                        {/*        position:absolute;*/}
                        {/*        left:0px;*/}
                        {/*        top:0px;*/}
                        {/*        " height="300px" width="400">*/}
                        {/*    This text is displayed if your browser does not support HTML5 Canvas.*/}
                        {/*</canvas>*/}


                        {/*<p>video tag youtube embed link:</p>*/}
                        {/*<video id="birdy7" controls="controls"*/}
                        {/*       muted*/}
                        {/*       className="video-js vjs-default-skin"*/}
                        {/*       // x-webkit-airplay="allow"*/}
                        {/*       // data-youtube-id="xbs7FT7dXYc //*/}
                        {/*       // muted="true"*/}
                        {/*       // type="video/mp4"*/}
                        {/*       autoPlay="true">*/}
                        {/*    <source src="http://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" type="application/x-mpegURL"/>*/}
                        {/*</video>*/}

                        {/*blob:https://hls-js.netlify.com/b0349206-0aae-45ce-8cb5-ad05b6ff14b7*/}

                        {/*<video id="video-js vjs-default-skin"*/}
                        {/*       className="video-js vjs-default-skin"*/}
                        {/*       playsInline="playsinline"*/}
                        {/*       controls*/}
                        {/*       autoPlay*/}
                        {/*       muted*/}
                        {/*>*/}
                        {/*    <source*/}
                        {/*        src="http://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"*/}
                        {/*        type="application/x-mpegURL"/>*/}
                        {/*</video>*/}

                        {/*<video id="video"*/}
                        {/*       controls*/}
                        {/*       autoPlay*/}
                        {/*       className="videoCentered"*/}
                        {/*       src="http://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" type="application/x-mpegURL">*/}
                        {/*</video>*/}


                        {/*<div>*/}
                        {/*    <div data-vjs-player>*/}
                        {/*        <video ref={ node => this.videoNode = node } className="video-js"></video>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<p>video tag local file:</p>*/}
                        {/*<video*/}
                        {/*    id="birdy6"*/}
                        {/*    className="video-js vjs-default-skin"*/}
                        {/*    controls*/}
                        {/*    autoPlay*/}
                        {/*    width="640px"*/}
                        {/*    height="264px"*/}
                        {/*    src="birdy.mp4" >*/}
                        {/*</video>*/}

                        {/*<p>i-Frame local file:</p>*/}
                        {/*<iframe id="birdy5" title="raw stream" width="360" height="200" target="_parent"*/}
                        {/*        // src={this.props.session.streamURL}>*/}
                        {/*        src="birdy.mp4" >*/}
                        {/*</iframe>*/}

                        {/*<p>video tag third party stream link</p>*/}
                        {/*<video*/}
                        {/*    id="birdy3"*/}
                        {/*    className="video-js vjs-default-skin"*/}
                        {/*    controls*/}
                        {/*    autoPlay="true"*/}
                        {/*    width="640px"*/}
                        {/*    height="264px"*/}
                        {/*    data-setup='{*/}
                        {/*        "sources": [{ "type": "application/x-mpegURL", "src": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"}]*/}
                        {/*         }'*/}
                        {/*       >*/}
                        {/*</video>*/}




                        {/*<p>video tag with video-js youtube link</p>*/}
                        {/*<video*/}
                        {/*    id="birdy2"*/}
                        {/*    className="video-js vjs-default-skin"*/}
                        {/*    controls*/}
                        {/*    muted="true"*/}
                        {/*    autoPlay="true"*/}
                        {/*    width="640px"*/}
                        {/*    height="264px"*/}
                        {/*    data-setup='{*/}
                        {/*        "techOrder": ["youtube"],*/}
                        {/*        "youtube": { "enablePrivacyEnhancedMode": "true" },*/}
                        {/*        "sources": [{ "type": "video/youtube", "src": "https://www.youtube-nocookie.com/embed/xbs7FT7dXYc"}]*/}
                        {/*        }'*/}
                        {/*>*/}
                        {/*</video>*/}

                        {/*<YouTube*/}
                        {/*    videoId="2g811Eo7K8U"*/}
                        {/*    id="birdy5"*/}
                        {/*    // videoId={this.props.session.streamURL}*/}
                        {/*    opts={opts}*/}
                        {/*    onReady={this._onReady}*/}
                        {/*/>*/}



                        {/*<video controls="true">*/}
                        {/*    <source src="www.youtube.com/watch?v=xbs7FT7dXYc" type="video/mp4" />*/}
                        {/*</video>*/}

                        {/*<video id="viddiv" controls="controls"*/}
                        {/*       className="video-stream"*/}
                        {/*       x-webkit-airplay="allow"*/}
                        {/*       data-youtube-id="xbs7FT7dXYc"*/}
                        {/*       src="http://v20.lscache8.c.youtube.com/videoplayback?sparams=id%2Cexpire%2Cip%2Cipbits%2Citag%2Cratebypass%2Coc%3AU0hPRVRMVV9FSkNOOV9MRllD&amp;itag=43&amp;ipbits=0&amp;signature=D2BCBE2F115E68C5FF97673F1D797F3C3E3BFB99.59252109C7D2B995A8D51A461FF9A6264879948E&amp;sver=3&amp;ratebypass=yes&amp;expire=1300417200&amp;key=yt1&amp;ip=0.0.0.0&amp;id=37da319914f6616c">*/}

                        {/*</video>*/}

                        {/*<div id="player"></div>*/}

                        {/*<img src={this.props.session.streamURL}/>*/}

                        {/*<iframe id="birdy2" title="raw stream" width="200" height="200" target="_parent"*/}
                        {/*        src={this.props.session.streamURL}>*/}
                        {/*</iframe>*/}

                        {/*<img src="../test_pattern_A.jpeg" />*/}
                    </div>

                    {/*<div id="viddiv2" className="camVideoContainerB">*/}
                    {/*    <h6 id="cam_title_cl">Birds Detected:</h6>*/}
                    {/*    /!*<img src={this.state.streamURL} alt={""}/>*!/*/}
                    {/*    /!*<img src="../test_pattern_A.jpeg" />*!/*/}
                    {/*    <img height="45%" width="45%" id="tester" src="/home/jonmloss/BirdImgs/Chipping_Sparrow.jpg" />*/}
                    {/*</div>*/}
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

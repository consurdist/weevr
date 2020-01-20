import { SET_STREAM_URL, SET_BINARY_URL, SET_CLASSIFY_URL, } from "../actions/types";

// const isEmpty = require("is-empty");

const initialState = {
    isStreaming: false,
    streamURL: "",
    binaryURL: "",
    classifyURL: "",
    camName: "",
    loadingStream: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_STREAM_URL:
            return {
                ...state,
                // streamURL: action.payload + "?autoplay=1" // + "&output=embed"
                streamURL: action.payload
            };
        case SET_BINARY_URL:
            return {
                ...state,
                binaryURL: action.payload
            };
        case SET_CLASSIFY_URL:
            return {
                ...state,
                classifyURL: action.payload
            };
        default:
            // return state;
            return {
                ...state
                }

    }

}
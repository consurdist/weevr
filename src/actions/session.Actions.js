// import axios from "axios";

// import jwt_decode from "jwt-decode";
// , SET_BINARY_URL, SET_CLASSIFY_URL,
import { SET_STREAM_URL } from "./types";


// User Input Stream URL
export const enterURL = (streamURL) => dispatch => {
            dispatch({
                type: SET_STREAM_URL,
                payload: streamURL
            })
};




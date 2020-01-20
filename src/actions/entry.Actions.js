import axios from "axios";

import {GET_ERRORS, SET_USER_ENTRIES, SET_SPECIES_DICT, SET_USER_SPECIES_DICT, SET_LAST_SEEN_DICT} from "./types";

export const getEntries = userId => dispatch => {
    var URL = "/entries?userid=" + userId;
    // console.log("this is", URL);
        axios
        .get(URL)
        .then(res => {
            // console.log(res);
            const entries = res.data;
            dispatch(setEntries(entries));
            // dispatch(setLastSeen(entries));

        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
};

export const setEntries = entries => {
    return {
        type: SET_USER_ENTRIES,
        payload: entries
    };
};

export const getSpecies = () => dispatch => {
    var URL = "/entries/species";
    axios
        .get(URL)
        .then(res => {
            const species = res.data;
            dispatch(setSpecies(species));
            dispatch(setUserSpecies(species));

        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
};

export const setSpecies = species => {
    return {
        type: SET_SPECIES_DICT,
        payload: species
    };

};

export const setUserSpecies = species => {
    return {
        type: SET_USER_SPECIES_DICT,
        payload: species
    };
};

export const setLastSeen = entries  => {
    console.log(entries);
    var dict = {};

    function add (species_id) {
        console.log(species_id);
        dict.append(species_id)
    }
    entries.forEach(add);

    return {
        type: SET_LAST_SEEN_DICT,
        payload: dict
    };
};
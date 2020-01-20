import {SET_USER_ENTRIES, NEW_ENTRY, SET_SPECIES_DICT, SET_USER_SPECIES_DICT, SET_LAST_SEEN_DICT} from "../actions/types";

// const isEmpty = require("is-empty");

const initialState = {
    entries: [],
    species: [],
    lastseen: [],
    loading: false,     
    userSpecies: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER_ENTRIES:
            return {
                ...state,
                entries: action.payload
            };
        case NEW_ENTRY:
            return {
                ...state,
                entries: [...state.entries, action.payload]
            };
        case SET_SPECIES_DICT:
            return {
                ...state,
                species: action.payload,
                // userSpecies: state.entries.forEach((value, index) => {
                //     state.userSpecies[index] = state.species.find(function(val) {
                //         return val.species_id === value;
                //     });
                // })
            };
        case SET_USER_SPECIES_DICT:

            var userSpeciesObj = [];
            state.entries.forEach((value, index) => {
                userSpeciesObj[index] = state.species.find(({id}) => id === value.species_id)
            });
            return {
                ...state,
                userSpecies: userSpeciesObj,
            };
        case SET_LAST_SEEN_DICT:
            return {
                ...state,
                lastseen: action.payload
            };
        default:
            return {
                ...state
            };
        // default:
            // return state;
            // return {
            //     ...state,
            // }

    }

}
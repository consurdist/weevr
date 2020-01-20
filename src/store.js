import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Get the combined reducers
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);

const store = createStore(
    rootReducer,
    initialState,
    enhancer
);

// const store = createStore(
//     // () => [],
//     rootReducer,
//     initialState,
//
//       compose(applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//
//     // compose(applyMiddleware(...middleware))
// );

export default store;

const { combineReducers } = require("redux");
const { createStore } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");
const { default: DataReducer } = require("./DataReducer");

const root = combineReducers({ DataReducer });
const store = createStore(root, composeWithDevTools());
export default store;

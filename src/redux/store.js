import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import api from "./middleware/api"
import rootReducer from "./modules";
import loggerMiddleware from "../../src/redux/middleware/logger"

let store;

if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,api,loggerMiddleware)));
} else {
  store = createStore(rootReducer, applyMiddleware(thunk,api,loggerMiddleware));
}


//初始state
console.log(store.getState())

//订阅state的变化
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})




//取消订阅
unsubscribe()

export default store;
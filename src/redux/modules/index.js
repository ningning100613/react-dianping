import {combineReducers} from "redux";
import entities from "./entities";
import home from "./home";
import detail from './detail';
import search from "./search";
import login from "./login";
import user from "./user";
import app from "./app";
import purchase from "./purchase";

//合并根reducer
const rootReducer = combineReducers({
    entities,
    home,
    detail,
    search,
    login,
    user,
    app,
    purchase
})

export default rootReducer
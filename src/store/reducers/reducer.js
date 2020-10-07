//for combining the reducers 
import { combineReducers } from "redux";

//import all the reducers 
import burgerBuilderReducer from "./burgerBuilder";
import ordersReducer from "./orders";
import authReducer from "./auth";

const reducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: ordersReducer,
    auth: authReducer
});

export default reducer; 

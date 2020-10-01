//for combining the reducers 
import { combineReducers } from "redux";

//import all the reducers 
import burgerBuilderReducer from "./burgerBuilder";
import ordersReducer from "./orders";

const reducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: ordersReducer
});

export default reducer; 

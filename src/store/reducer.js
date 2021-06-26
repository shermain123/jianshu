//import { combineReducers } from "redux";//将多个reducer组合成一个reducer使用
import { combineReducers } from "redux-immutable"; //使用redux-immutable中的combineReducers 将多个reducer组合成一个reducer使用
import headerReducer from './../common/header/store/reducer'
import homeReducer from "../pages/home/store/reducer";
import detailReducer from "../pages/detail/store/reducer";
import loginReducer from "../pages/login/store/reducer";

//组合reducer 然后导出
const reducer = combineReducers({
    header: headerReducer,
    home: homeReducer,
    detail: detailReducer,
    login: loginReducer
})

export default reducer;
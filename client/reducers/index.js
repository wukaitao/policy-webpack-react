import {combineReducers} from 'redux';
import * as policy from './policy.js';
import * as login from './login.js';

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	policyListData: policy.policyListData,
	loginData: login.loginData
});

export default rootReducer;
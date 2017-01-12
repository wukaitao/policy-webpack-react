import {combineReducers} from 'redux';
import * as policy from './policy.js';
import * as login from './login.js';
import * as popup from './popup.js';

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	policyListData: policy.policyListData,
	loginData: login.loginData,
	pageStatus: popup.pageStatus
});

export default rootReducer;
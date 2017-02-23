import {combineReducers} from 'redux';
import * as policy from './policy.js';
import * as point from './point.js';
import * as popup from './popup.js';

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	policyList: policy.policyList,
	policyDetail: policy.policyDetail,
	hospitalList: policy.hospitalList,
	pointList: point.pointList,
	pointDetail: point.pointDetail,
	letterList: point.letterList,
	pageStatus: popup.pageStatus
});

export default rootReducer;
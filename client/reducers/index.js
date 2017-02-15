import {combineReducers} from 'redux';
import * as policy from './policy.js';
import * as point from './point.js';
import * as popup from './popup.js';

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	policyListData: policy.policyListData,
	policyDetail: policy.policyDetail,
	hospitalList: policy.hospitalList,
	allPointData: point.allPointData,
	letterList: point.letterList,
	templateNodeAddData: point.templateNodeAddData,
	templateNodeUpdateData: point.templateNodeUpdateData,
	pageStatus: popup.pageStatus
});

export default rootReducer;
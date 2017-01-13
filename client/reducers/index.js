import {combineReducers} from 'redux';
import * as policy from './policy.js';
import * as point from './point.js';
import * as login from './login.js';
import * as popup from './popup.js';

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	policyListData: policy.policyListData,
	policyRelationListData: policy.policyRelationListData,
	policyDetailData: policy.policyDetailData,
	hospitalListData: policy.hospitalListData,
	submitPDFData: policy.submitPDFData,
	deletePolicyData: policy.deletePolicyData,
	allPointData: point.allPointData,
	loginData: login.loginData,
	pageStatus: popup.pageStatus
});

export default rootReducer;
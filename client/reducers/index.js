import {combineReducers} from 'redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import * as policy from './policy.js';
import * as point from './point.js';
//import * as login from './login.js';
import * as popup from './popup.js';

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	routing: routerReducer,
	policyListData: policy.policyListData,
	policyRelationListData: policy.policyRelationListData,
	policyDetailData: policy.policyDetailData,
	hospitalListData: policy.hospitalListData,
	submitPDFData: policy.submitPDFData,
	deletePolicyData: policy.deletePolicyData,
	allPointData: point.allPointData,
	templateNodeAddData: point.templateNodeAddData,
	templateNodeUpdateData: point.templateNodeUpdateData,
//	loginData: login.loginData,
//	logoutData: login.logoutData,
	pageStatus: popup.pageStatus
});

export default rootReducer;
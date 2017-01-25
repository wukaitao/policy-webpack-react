import {combineReducers} from 'redux';
import * as policy from './policy.js';
import * as point from './point.js';
import * as popup from './popup.js';

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
	policyListData: policy.policyListData,
	policyRelationListData: policy.policyRelationListData,
	policyDetail: policy.policyDetail,
	hospitalList: policy.hospitalList,
	submitPDFData: policy.submitPDFData,
	deletePolicyData: policy.deletePolicyData,
	allPointData: point.allPointData,
	templateNodeAddData: point.templateNodeAddData,
	templateNodeUpdateData: point.templateNodeUpdateData,
	pageStatus: popup.pageStatus
});

export default rootReducer;
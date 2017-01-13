import * as types from './actionType.js';

//导出所有方法
//PolicyManage
//action->reducer
function requestPolicyList(param){
	return {
		type: types.PolicyListData,
		status: 'beforeSend',
		param
	};
}
;
function receivePolicyList(param,data){
	return {
		type: types.PolicyListData,
		status: 'success',
		param,
		data
	};
};
function failPolicyList(param,err){
	return {
		type: types.PolicyListData,
		status: 'error',
		param,
		err
	};
};
function receivePolicyRelationList(param,data){
	return {
		type: types.PolicyRelationList,
		status: 'success',
		param,
		data
	};
};
function receivePolicyDetail(param,data){
	return {
		type: types.PolicyDetail,
		status: 'success',
		param,
		data
	};
};
function receiveHospitalList(param,data){
	return {
		type: types.HospitalList,
		status: 'success',
		param,
		data
	};
};
//dispatch->action
export function queryPolicyList(param){
	return function(dispatch){
		dispatch(requestPolicyList(param));
		return fetch('../assets/json/policyList.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receivePolicyList(param,JSON.parse(data)));
		}).catch(err=>{
			dispatch(receivePolicyList(param,err));
		});
	};
};
export function queryPolicyRelationList(param){
	return function(dispatch){
		return fetch('../assets/json/policyRelationList.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receivePolicyRelationList(param,JSON.parse(data)));
		}).catch(err=>{
		});
	};
};
export function queryPolicyDetail(param){
	return function(dispatch){
		return fetch('../assets/json/policyDetails.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receivePolicyDetail(param,JSON.parse(data)));
			fetch('../assets/json/hosList.json',{
				method: 'get'
			}).then(response=>response.text())
			.then(data=>{
				dispatch(receiveHospitalList(param,JSON.parse(data)));
			}).catch(err=>{
			});
		}).catch(err=>{
		});
	};
};

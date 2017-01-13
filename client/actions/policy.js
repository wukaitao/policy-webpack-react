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
function receiveSubmitPDFData(param,data){
	return {
		type: types.SubmitPDF,
		status: 'success',
		param,
		data
	};
};
function receiveDeletePolicyData(param,data){
	return {
		type: types.DeletePolicy,
		status: 'success',
		param,
		data
	};
};
//dispatch->action
//获取保单列表
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
//获取关联保单
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
//获取保单详情
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
//提交保单
export function submitPDF(param){
	return function(dispatch){
		return fetch('../assets/json/submitPDF.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receiveSubmitPDFData(param,JSON.parse(data)));
		}).catch(err=>{
		});
	};
};
//删除保单
export function deletePolicy(param){
	return function(dispatch){
		return fetch('../assets/json/policyDelete.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receiveDeletePolicyData(param,JSON.parse(data)));
		}).catch(err=>{
		});
	};
};
//生成pdf
export function createPdf(param){
	window.location.href = '../assets/json/downLoadPDF?policyId='+param.policyId;
};

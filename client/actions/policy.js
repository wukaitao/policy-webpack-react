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
//dispatch->action
export function queryPolicyList(param){
	return function(dispatch){
		dispatch(requestPolicyList(param));
		return fetch('https://api.github.com',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receivePolicyList(param,JSON.parse(data)));
		}).catch(err=>{
			dispatch(receivePolicyList(param,err));
		});
	};
};
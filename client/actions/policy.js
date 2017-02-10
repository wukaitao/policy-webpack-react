import * as types from './actionType.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//PolicyManage
//获取保单列表
export function queryPolicyList(param){
	return (dispatch,getState)=>{
		dispatch(loadingOpen());
		return fetch('../assets/json/policyList.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				dispatch({
					type: types.PolicyListData,
					param,
					data: result.data
				});
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
//获取关联保单
export function queryPolicyRelationList(param){
	return (dispatch,getState)=>{
		return fetch('../assets/json/policyRelationList.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch({
				type: types.PolicyRelationList,
				param,
				data: JSON.parse(data)
			});
		}).catch(err=>{
		});
	};
};
//获取保单详情
export function queryPolicyDetail(param){
	return (dispatch,getState)=>{
		dispatch(loadingOpen());
		return fetch('../assets/json/policyDetails.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				dispatch({
					type: types.PolicyDetail,
					param,
					data: result.data
				});
				fetch('../assets/json/hosList.json',{
					method: 'get'
				}).then(response=>response.text())
				.then(data=>{
					var result = JSON.parse(data);
					if(result.statusCode==0){
						dispatch({
							type: types.HospitalList,
							data: result.data,
							policyDetail: getState().policyDetail,
							param
						});
					};
					dispatch(loadingCancel());
				}).catch(err=>{
					dispatch(loadingCancel());
				});
			};
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
//提交保单
export function submitPDF(param){
	return (dispatch,getState)=>{
		return fetch('../assets/json/submitPDF.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch({
				type: types.SubmitPDF,
				status: 'success',
				param,
				data: JSON.parse(data)
			});
		}).catch(err=>{
		});
	};
};
//删除保单
export function deletePolicy(param){
	return (dispatch,getState)=>{
		return fetch('../assets/json/policyDelete.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch({
				type: types.DeletePolicy,
				param,
				data: JSON.parse(data)
			});
		}).catch(err=>{
		});
	};
};
//生成pdf
export function createPdf(param){
	window.location.href = '../assets/json/downLoadPDF?policyId='+param.policyId;
};
//初始化保单节点
export function initPolicyChosen(){
	return (dispatch,getState)=>{
		dispatch(loadingOpen());
		return fetch('../assets/json/getTreeNode.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				dispatch({
					type: types.PolicyInitChosen,
					data: result.data
				});
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
//选中医院
export function chooseHospital(param){
	return {
		type: types.ChooseHospital,
		one: param.one
	};
};

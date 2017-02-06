import * as types from './actionType.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//PolicyManage
//action->reducer
function receivePolicyList(param,data){
	return {
		type: types.PolicyListData,
		param,
		data
	};
};
function receivePolicyRelationList(param,data){
	return {
		type: types.PolicyRelationList,
		param,
		data
	};
};
function receivePolicyDetail(param,data){
	return {
		type: types.PolicyDetail,
		param,
		data
	};
};
function receiveHospitalList(param,data){
	return {
		type: types.HospitalList,
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
		param,
		data
	};
};
//dispatch->action
//获取保单列表
export function queryPolicyList(param){
	return function(dispatch){
		dispatch(loadingOpen());
		return fetch('../assets/json/policyList.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				var pageCount = result.data.totalCount==0 ? 1 : 
					  result.data.totalCount%20==0 ? result.data.totalCount/20 : 
					  parseInt(result.data.totalCount/20)+1;
				result.data.pageCount = pageCount;
				result.data.basicList.forEach(item=>item.isPosting=false);
				dispatch(receivePolicyList(param,result.data));
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
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
		dispatch(loadingOpen());
		return fetch('../assets/json/policyDetails.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				var data = result.data;
				data.policyName = unescape(data.policyName);
				if(data.path=='copy'){
					data.policyName = data.policyName + '-复制';
				};
				data.policyTitle = unescape(data.policyTitle);
				data.benefitList.sort((a,b)=>a.orderId-b.orderId);
				data.benefitList.forEach((p)=>{
					p.showEdit = false;
					p.nodeTitle = unescape(p.nodeTitle);
					p.benefitKeyDesc = unescape(p.benefitKeyDesc);
					p.benefitValueDesc = unescape(p.benefitValueDesc);
					p.chosen=true;
					p.children.sort((a,b)=>a.orderId-b.orderId);
					p.children.forEach((c)=>{
						c.showEdit = false;
						c.nodeTitle = unescape(c.nodeTitle);
						c.benefitKeyDesc = unescape(c.benefitKeyDesc);
						c.benefitValueDesc = unescape(c.benefitValueDesc);
						c.chosen=true;
						c.isPrev=c.nodeType==4;
					});
				});
				result.data = data;
				dispatch(receivePolicyDetail(param,result.data));
				fetch('../assets/json/hosList.json',{
					method: 'get'
				}).then(response=>response.text())
				.then(data=>{
					var result = JSON.parse(data);
					if(result.statusCode==0){
						dispatch(receiveHospitalList(param,result.data));
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
//初始化保单节点
export function initPolicyChosen(){
	return function(dispatch){
		dispatch(loadingOpen());
		return fetch('../assets/json/getTreeNode.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				/*
				const data = result.data;
				data.forEach((item)=>{
					item.benefitKeyDesc = unescape(item.benefitKeyDesc);
					item.benefitValueDesc = unescape(item.benefitValueDesc);
					item.nodeTitle = unescape(item.nodeTitle);
					item.children.forEach((subItem)=>{
						subItem.benefitKeyDesc = unescape(subItem.benefitKeyDesc);
						subItem.benefitValueDesc = unescape(subItem.benefitValueDesc);
						subItem.nodeTitle = unescape(subItem.nodeTitle);
					});
				});
				result.data = data;
				*/
				//console.log(result.data);
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

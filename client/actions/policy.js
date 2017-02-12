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
export function queryPolicyDetail(param,callback=function(){}){
	return (dispatch,getState)=>{
		if(param.path=='add'){
			//新建
			const data = {
			    'policyName': '新建policy',
			    'policyTitle': '请在这里输入policy标题',
			    'isTemplate': 0,
			    'benefitList': [],
			    'coinsuranceArray': [],
			    'deductibleArray': []
			};
			dispatch({
				type: types.PolicyDetail,
				param,
				data
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
				callback.call(this);
				dispatch(loadingCancel());
			}).catch(err=>{
				dispatch(loadingCancel());
			});
		}else{
			//编辑/复制/查看
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
						callback.call(this);
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
//添加医院
export function addHospital(param){
	return {
		type: types.AddHospital,
		payType: param.payType
	};
};
//移除医院
export function removeHospital(param){
	return {
		type: types.RemoveHospital,
		curHospitalType: param.curHospitalType
	};
};
//添加所有昂贵医院
export function addExpHospital(param){
	return {
		type: types.AddExpHospital,
		curHospitalType: param.curHospitalType
	};
};
//移除所有昂贵医院
export function removeExpHospital(param){
	return {
		type: types.RemoveExpHospital,
		curHospitalType: param.curHospitalType
	};
};
//全选所有医院
export function changeHosSelectedAllLeft(param){
	return {
		type: types.HosSelectedAllLeft,
		flag: param.flag
	};
};
//全选选中医院
export function changeHosSelectedAllRight(param){
	return {
		type: types.HosSelectedAllRight,
		flag: param.flag,
		curHospitalType: param.curHospitalType
	};
};
//保单名称
export function changePolicyName(param){
	return {
		type: types.ChangePolicyName,
		policyName: param.policyName
	};
};
//切换节点显示状态
export function changeShow(param){
	return {
		type: types.ChangeShow,
		nodeIndex: param.nodeIndex
	};
};
//保存编辑器数据
export function changeContent(param,isSave=false){
	return {
		type: types.ChangeContent,
		changeType: param.changeType,
		value: param.value,
		nodeIndex: param.nodeIndex,
		bind: param.bind,
		isSave
	};
};
//切换责任限额
export function changeIsPrev(param){
	return {
		type: types.ChangeIsPrev,
		nodeIndex: param.nodeIndex
	};
};
//保存保单
export function policySave(param){
	return {
		type: types.PolicySave,
		param
	};
};

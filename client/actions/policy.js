import * as types from './actionType.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//PolicyManage
//获取保单列表
export function queryPolicyList(param,callback=function(){}){
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
				callback.call(this);
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
		const policyName = param.policyName;
		delete param.policyName;
		dispatch(loadingOpen());
		return fetch('../assets/json/policyRelationList.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				let message = '<table class="data-policyInfo">'+
							      '<colgroup>'+
							          '<col width="80"/>'+
							          '<col width="100"/>'+
							          '<col/>'+
							          '<col width="100"/>'+
							          '<col width="100"/>'+
							      '</colgroup>';
				message += '<thead>'+
						       '<tr>'+
						           '<th>产品编码</th>'+
						           '<th>计划编码</th>'+
						           '<th>团体编号</th>'+
						           '<th>子团体编号</th>'+
						           '<th>会员数</th>'+
						       '</tr>'+
						   '</thead>'+
						   '<tbody>';
				result.data.forEach(item=>{
					message += '<tr>'+
							       '<td>'+item.productCode+'</td>'+
							       '<td>'+item.planCode+'</td>'+
							       '<td>'+item.groupCode+'</td>'+
							       '<td>'+item.subGroupCode+'</td>'+
							       '<td>'+item.mbCnt+'</td>'+
							   '</tr>';
				});
				message += '</tbody></table>';
				dispatch(dialogOpen({
					type: 'window',
					message,
					style: {width:500,height:150,maxHeight:400},
					title: '关联保单信息 -- '+policyName
				}));
			}else{
				dispatch(dialogOpen({
					type: 'alert',
					message: result.msg
				}));
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
			dispatch(dialogOpen({
				type: 'alert',
				message: '网络错误.'
			}));
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
		dispatch({
			type: types.SubmitPDF,
			status: 'before',
			policyId: param.policyId
		});
		return fetch('../assets/json/submitPDF.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				dispatch({
					type: types.SubmitPDF,
					status: 'success',
					policyId: param.policyId
				});
				dispatch(dialogOpen({
					type: 'alert',
					message: '操作成功'
				}));
			}else{
				dispatch(dialogOpen({
					type: 'alert',
					message: result.msg
				}));
			};
		}).catch(err=>{
			dispatch({
				type: types.SubmitPDF,
				status: 'error',
				policyId: param.policyId
			});
			dispatch(dialogOpen({
				type: 'alert',
				message: '网络错误.'
			}));
		});
	};
};
//删除保单
export function deletePolicy(param,callback=function(){}){
	return (dispatch,getState)=>{
		return fetch('../assets/json/policyDelete.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				dispatch(dialogOpen({
					type: 'toast',
					message: '删除成功.',
					icon: 'icon-circle-check',
					callback: function(){
						delete param.policyIdArray;
						dispatch(queryPolicyList(param,callback));
					}
				}));
			}else{
				dispatch(dialogOpen({
					type: 'alert',
					message: result.msg
				}));
			};
		}).catch(err=>{
			dispatch(dialogOpen({
				type: 'alert',
				message: '网络错误.'
			}));
		});
	};
};
//生成pdf
export function createPdf(param){
	window.location.href = '../assets/json/downLoadPDF?policyId='+param.policyId;
};
//发送pdf
export function sendPdf(param){
	return (dispatch,getState)=>{
		dispatch({
			type: types.SendPdf,
			status: 'before',
			policyId: param.policyId
		});
		return fetch('../assets/json/emailPDF.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				dispatch({
					type: types.SendPdf,
					status: 'success',
					policyId: param.policyId
				});
				dispatch(dialogOpen({
					type: 'alert',
					message: '操作成功'
				}));
			}else{
				dispatch(dialogOpen({
					type: 'alert',
					message: result.msg
				}));
			};
		}).catch(err=>{
			dispatch({
				type: types.SendPdf,
				status: 'error',
				policyId: param.policyId
			});
			dispatch(dialogOpen({
				type: 'alert',
				message: '网络错误.'
			}));
		});
	};
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
export function policySave(param,callback=function(){}){
	const type = param.isTemplate ? '模板' : 'policy';
	const path = param.path;
	delete param.path;
	const urlApi = path=='edit' ? '../assets/json/policyUpdate.json' : '../assets/json/policyAdd.json';
	return (dispatch,getState)=>{
		dispatch(loadingOpen());
		return fetch(urlApi,{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			var result = JSON.parse(data);
			if(result.statusCode==0){
				const message = !result.data.policyId ? '修改'+type+'成功.' :
								path=='copy' ? '复制'+type+'成功.' : '创建'+type+'成功.';
				dispatch(dialogOpen({
					type: 'alert',
					message
				}));
				callback.call(this);
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
//全选保单
export function chooseAll(param){
	return {
		type: types.ChooseAllPolicy,
		flag: param.flag
	};
};
//反选保单
export function chooseInvert(){
	return {
		type: types.ChooseInvert
	};
};
//选择保单
export function changePolicyChosen(param){
	return {
		type: types.ChangePolicyChosen,
		one: param.one
	};
};
//重置搜索类型
export function resetSearchType(){
	return {
		type: types.ResetSearchType
	};
};
//切换搜索类型
export function changeSearchType(param){
	return {
		type: types.ChangeSearchType,
		one: param.one
	};
};
//切换保单排序
export function changeSortType(param){
	return {
		type: types.ChangeSortType,
		sortType: param.sortType
	};
};
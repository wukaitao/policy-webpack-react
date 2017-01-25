import * as types from './actionType.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//PointManage
//action->reducer
function receiveAllPoint(data){
	return {
		type: types.AllPointData,
		data
	};
};
function receiveCreatePointData(param,data){
	return {
		type: types.SaveCreatePointData,
		status: 'success',
		param,
		data
	};
};
function receiveModifyPointData(param,data){
	return {
		type: types.SaveModifyPointData,
		status: 'success',
		param,
		data
	};
};
//dispatch->action
//获取节点树
export function queryAllPoint(param){
	return function(dispatch){
		dispatch(loadingOpen());
		return fetch('../assets/json/getTreeNode.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			const result = JSON.parse(data);
			if(result.statusCode==0){
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
				dispatch(receiveAllPoint(result.data));
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
//保存新建节点
export function addTemplateNode(param){
	return function(dispatch){
		return fetch('../assets/json/templateNodeAdd.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receiveCreatePointData(param,JSON.parse(data)));
		}).catch(err=>{
		});
	};
};
//保存修改节点
export function updateTemplateNode(param){
	return function(dispatch){
		return fetch('../assets/json/templateNodeUpdate.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receiveModifyPointData(param,JSON.parse(data)));
		}).catch(err=>{
		});
	};
};
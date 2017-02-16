import * as types from './actionType.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//PointManage
//获取节点树
export function queryAllPoint(param){
	return (dispatch,getState)=>{
		dispatch(loadingOpen());
		return fetch('../assets/json/getTreeNode.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			const result = JSON.parse(data);
			if(result.statusCode==0){
				dispatch({
					type: types.AllPointData,
					data: result.data,
					eventType: param.eventType,
					keyword: param.keyword
				});
				setTimeout(()=>{
					dispatch({
						type: types.ResetLetterList,
						data: getState().allPointData
					});
				});
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
//过滤节点树
export function filterAllPoint(param){
	return (dispatch,getState)=>{
		dispatch({
			type: types.AllPointData,
			eventType: param.eventType,
			keyword: param.keyword
		});
		setTimeout(()=>{
			dispatch({
				type: types.ResetLetterList,
				data: getState().allPointData
			});
		});
	};
};
//切换子节点搜索框的显示状态
export function toggleSearchbox(param){
	return (dispatch,getState)=>{
		dispatch({
			type: types.ToggleSearchbox,
			one: param.one
		});
	};
};
//筛选分类节点子节点
export function filterPoint(param){
	return (dispatch,getState)=>{
		dispatch({
			type: types.FilterPoint,
			one: param.one,
			keyword: param.keyword
		});
	};
};
//获取节点内容
export function getPointData(param){
	return (dispatch,getState)=>{
		dispatch({
			type: types.PointData,
			param,
			data: getState().allPointData
		});
	};
};
//改变节点标题
export function changeNodeTitle(param){
	return {
		type: types.ChangeNodeTitle,
		param
	};
};
//保存新建节点
export function addTemplateNode(param){
	return (dispatch,getState)=>{
		return fetch('../assets/json/templateNodeAdd.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch({
				type: types.SaveCreatePointData,
				param,
				data: JSON.parse(data)
			});
		}).catch(err=>{
		});
	};
};
//保存修改节点
export function updateTemplateNode(param){
	return (dispatch,getState)=>{
		return fetch('../assets/json/templateNodeUpdate.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch({
				type: types.SaveModifyPointData,
				param,
				data: JSON.parse(data)
			});
		}).catch(err=>{
		});
	};
};
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
					data: result.data
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
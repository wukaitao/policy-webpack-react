import * as types from './actionType.js';
import * as common from './common.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//PointManage
//获取节点树
export function getPointList(param){
	return (dispatch,getState)=>{
		common.baseDataService({
			api: common.serverPath.pointListApi,
			param: {method: 'get'},
			showLoading: true,
			dispatch
		}).then((data)=>{
			dispatch({
				type: types.PointList,
				data,
				eventType: param.eventType,
				keyword: param.keyword
			});
			setTimeout(()=>{
				dispatch({
					type: types.ResetLetterList,
					data: getState().pointList
				});
			});
		});
	};
};
//过滤节点树
export function filterAllPoint(param){
	return (dispatch,getState)=>{
		dispatch({
			type: types.PointList,
			eventType: param.eventType,
			keyword: param.keyword
		});
		setTimeout(()=>{
			dispatch({
				type: types.ResetLetterList,
				data: getState().pointList
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
export function getPointDetail(param){
	return (dispatch,getState)=>{
		dispatch({
			type: types.PointDetail,
			param,
			data: getState().pointList
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
//保存分类/节点
export function savePoint(param,successCallback=function(){},errorCallback=function(){}){
	const isAdd = param.eventType=='pointadd'||param.eventType=='cateadd';
	const urlApi = isAdd ? common.serverPath.pointAddApi : common.serverPath.pointEditApi;
	delete param.eventType;
	return (dispatch,getState)=>{
		common.baseDataService({
			api: common.serverPath.getTreeNodeApi,
			param: {method: 'get'},
			showLoading: true,
			dispatch
		}).then((data)=>{
			dispatch(dialogOpen({
				type: 'alert',
				message: '保存成功.'
			}));
			successCallback.call(this);
		},(err)=>{
			errorCallback.call(this);
		});
	};
};
import * as types from './actionType.js';

//导出所有方法
//PointManage
//action->reducer
function receiveAllPoint(data){
	return {
		type: types.AllPointData,
		status: 'success',
		data
	};
};
//dispatch->action
export function queryAllPoint(param){
	return function(dispatch){
		return fetch('../assets/json/getTreeNode.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receiveAllPoint(JSON.parse(data)));
		}).catch(err=>{
		});
	};
};
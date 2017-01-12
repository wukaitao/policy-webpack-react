import * as types from './actionType.js';

//导出所有方法
//Dialog
//dispatch->action->reducer
export function dialogOpen(param){
	return {
		type: types.DialogOpen,
		param
	};
};
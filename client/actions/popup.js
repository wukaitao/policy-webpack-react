import * as types from './actionType.js';

//导出所有方法
//Dialog
//dispatch->action->reducer
//Loading open
export function loadingOpen(){
	return {
		type: types.LoadingOpen
	};
};
//Loading cancel
export function loadingCancel(){
	return {
		type: types.LoadingCancel
	};
};
//Dialog open
export function dialogOpen(param){
	return {
		type: types.DialogOpen,
		param
	};
};
//Dialog cancel
export function dialogCancel(param){
	return {
		type: types.DialogCancel,
		param
	};
};
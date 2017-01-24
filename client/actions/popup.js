import * as types from './actionType.js';

//导出所有方法
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
	return function(dispatch){
		param.show = true;
		if(param.type=='toast'){
			window.setTimeout(function(){
				let callback = param.callback||function(){};
				callback.call(param);
				dispatch(dialogCancel());
			},2000);
		};
		dispatch({
			type: types.DialogOpen,
			param
		});
	};
};
//Dialog cancel
export function dialogCancel(){
	return {
		type: types.DialogCancel
	};
};
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
		param.callback = param.callback||function(){};
		if(param.type=='toast'){
			window.setTimeout(function(){
				param.callback.call(param);
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
export function dialogCancel(param={}){
	return function(dispatch){
		dispatch({
			type: types.DialogCancel,
			param
		});
		if(param.result){
			window.setTimeout(function(){
				param.result = false;
				dispatch({
					type: types.DialogCancel,
					param
				});
			},10);
		};
	};
};
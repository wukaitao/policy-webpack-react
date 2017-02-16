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
	return (dispatch,getState)=>{
		param.show = true;
		param.callback = param.callback||function(){};
		dispatch({
			type: types.DialogOpen,
			param
		});
		param.type=='toast'&&(function(){
			setTimeout(function(){
				param.callback.call(param);
				dispatch(dialogCancel());
			},2000);
		})();
	};
};
//Dialog cancel
export function dialogCancel(param={},callback=function(){}){
	return (dispatch,getState)=>{
		param.show = false;
		param.result&&callback.call(this);
		dispatch({
			type: types.DialogCancel,
			param
		});
	};
};
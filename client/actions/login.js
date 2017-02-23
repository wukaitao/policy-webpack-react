import * as types from './actionType.js';
import * as common from './common.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//登录
export function login(param,callback=function(){}){
	return (dispatch,getState)=>{
		common.baseDataService({
			api: common.serverPath.loginApi,
			param: {method: 'get'},
			showLoading: true,
			dispatch
		}).then((data)=>{
			localStorage.setItem('pageLogin','true');
			localStorage.setItem('userName',escape(data.userName));
			localStorage.setItem('isTemplateManager',escape(data.templateFlag));
			dispatch({
				type: types.Login,
				param,
				data
			});
			callback.call(this);
		});
	};
};
//退出
export function logout(callback=function(){}){
	return (dispatch,getState)=>{
		common.baseDataService({
			api: common.serverPath.logoutApi,
			param: {method: 'get'},
			showLoading: true,
			dispatch
		}).then((data)=>{
			localStorage.setItem('pageLogin','false');
			localStorage.setItem('userName','');
			localStorage.setItem('isTemplateManager',escape('0'));
			dispatch({
				type: types.Logout,
				data
			});
			callback.call(this);
		});
	};
};
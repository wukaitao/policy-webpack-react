import * as types from './actionType.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//登录
export function login(param,callback=function(){}){
	return (dispatch,getState)=>{
		dispatch(loadingOpen());
		return fetch('../assets/json/policyLogin.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			const result = JSON.parse(data);
			if(result.statusCode==0){
				localStorage.setItem('pageLogin','true');
				localStorage.setItem('userName',escape(result.data.userName));
				localStorage.setItem('isTemplateManager',escape(result.data.templateFlag));
				dispatch({
					type: types.Login,
					param,
					data: result.data
				});
				callback.call(this);
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
//退出
export function logout(callback=function(){}){
	return (dispatch,getState)=>{
		dispatch(loadingOpen());
		return fetch('../assets/json/policyLogout.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			const result = JSON.parse(data);
			if(result.statusCode==0){
				localStorage.setItem('pageLogin','false');
				localStorage.setItem('userName','');
				localStorage.setItem('isTemplateManager',escape('0'));
				dispatch({
					type: types.Logout,
					data: result.data
				});
				callback.call(this);
			};
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
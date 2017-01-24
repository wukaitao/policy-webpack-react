import * as types from './actionType.js';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

//导出所有方法
//action->reducer
function receiveLogin(param,data){
	return {
		type: types.Login,
		param,
		data
	};
};
function receiveLogout(data){
	return {
		type: types.Logout,
		data
	};
};
//dispatch->action
//Login
export function login(param){
	return function(dispatch){
		dispatch(loadingOpen());
		return fetch('../assets/json/policyLogin.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			const result = JSON.parse(data);
			result.statusCode==0&&dispatch(receiveLogin(param,result.data));
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
//Logout
export function logout(){
	return function(dispatch){
		dispatch(loadingOpen());
		return fetch('../assets/json/policyLogout.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			const result = JSON.parse(data);
			result.statusCode==0&&dispatch(receiveLogout(result.data));
			dispatch(loadingCancel());
		}).catch(err=>{
			dispatch(loadingCancel());
		});
	};
};
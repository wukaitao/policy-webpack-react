import * as types from './actionType.js';

//导出所有方法
//Login
//action->reducer
function requestLogin(param){
	return {
		type: types.Login,
		status: 'beforeSend',
		param
	};
}
;
function receiveLogin(param,data){
	return {
		type: types.Login,
		status: 'success',
		param,
		data
	};
};
function failLogin(param,err){
	return {
		type: types.Login,
		status: 'error',
		param,
		err
	};
};
function receiveLogout(data){
	return {
		type: types.Logout,
		status: 'success',
		data
	};
};
//dispatch->action
//登录
export function login(param){
	return function(dispatch){
		dispatch(requestLogin(param));
		return fetch('../assets/json/policyLogin.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receiveLogin(param,JSON.parse(data)));
		}).catch(err=>{
			dispatch(failLogin(param,err));
		});
	};
};
//退出
export function logout(){
	return function(dispatch){
		return fetch('../assets/json/policyLogout.json',{
			method: 'get'
		}).then(response=>response.text())
		.then(data=>{
			dispatch(receiveLogout(JSON.parse(data)));
		}).catch(err=>{
		});
	};
};
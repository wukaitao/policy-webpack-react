import * as types from '../actions/actionType.js';

const initState = {
		pageStatus: {
			isSave: false,//保存状态
			isLoading: false,//用于蒙层loading
			isRequesting: false,//用于按钮置灰
			isLogin: localStorage.getItem('pageLogin')=='true',//登录状态
			isTemplateManager: unescape(localStorage.getItem('isTemplateManager'))=='1',//是否为模板管理人员
			userName: '',//用户昵称
			dialog: {
				show: false,//是否显示
				style: {
					width: 350,
					height: 150,
					maxHeight: ''
				},
				title: '提示',//标题
				message: '',//提示语
				type: '',//弹窗--confirm:确认框;alert:警告;tips:提示;toast:弹幕提示
				icon: '',//图标--icon-question:询问;icon-notification:警告;icon-info:信息;icon-circle-check:成功;icon-circle-cross:错误;
				result: '',//返回结果
				callback: function(){}//回调函数
			},
	    	oSearch: {isTemplate:'',name:'全部'},//policy搜索默认选中分类
	    	aSearch: [{isTemplate:'',name:'全部'},{isTemplate:0,name:'policy'},{isTemplate:1,name:'模板'}]//policy搜索分类
		}
	};
//reducer其实也是一个方法而已，三处是state和action,返回值是新的state
export function pageStatus(state=initState.pageStatus,action){
	switch(action.type){
		case types.DialogOpen:
			var result = Object.assign({},state,{
				dialog: Object.assign({},initState.pageStatus.dialog,action.param)
			});
			return result;
		case types.DialogCancel:
			var resultTrue = Object.assign({},state,{
				dialog: Object.assign({},state.dialog,action.param)
			});
			var resultFalse = Object.assign({},state,{
				dialog: Object.assign({},initState.pageStatus.dialog,action.param)
			});
			return action.param.result ? resultTrue : resultFalse;
		case types.LoadingOpen:
			return Object.assign({},state,{isLoading: true});
		case types.LoadingCancel:
			return Object.assign({},state,{isLoading: false});
		case types.Login:
			return Object.assign({},state,{
				isLogin: true,
				isTemplateManager: action.data.templateFlag=='1',
				userName: action.data.userName
			});
		case types.Logout:
			return Object.assign({},state,{
				isLogin: false,
				isTemplateManager: false,
				userName: ''
			});
		case types.ResetSearchType:
			return Object.assign({},state,{
				oSearch: initState.pageStatus.oSearch,
				aSearch: initState.pageStatus.aSearch
			});
		case types.ChangeSearchType:
			return Object.assign({},state,{
				oSearch: action.one
			});
		default:
			return state;
	};
};
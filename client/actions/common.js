import {hashHistory} from 'react-router';
import {loadingOpen,loadingCancel,dialogOpen,dialogCancel} from './popup.js';

const defautOption = {
	dispatch: function(){},
	api: '',
	param: {},
	config: {},
	popup: {}
};
export const serverPath = {
	domain: '..',//域
	commonPath: '/assets/json/',//路径
	loginApi: 'policyLogin.json',//登录
	logoutApi: 'policyLogout.json',//退出
	policyListApi: 'policyList.json',//获取保单列表
	policyDeleteApi: 'policyDelete.json',//删除保单
	submitPDFApi: 'submitPDF.json',//提交保单
	emailPDFApi: 'emailPDF.json',//发送pdf
	policyRelationListApi: 'policyRelationList.json',//获取关联保单列表
	policyDetailsApi: 'policyDetails.json',//获取保单详情
	hosListApi: 'hosList.json',//获取全部医院列表
	policyAddApi: 'policyAdd.json',//新增保单
	policyUpdateApi: 'policyUpdate.json',//更新保单
	getTreeNodeApi: 'getTreeNode.json',//获取节点列表
	templateNodeAddApi: 'templateNodeAdd.json',//新增节点
	templateNodeUpdateApi: 'templateNodeUpdate.json'//更新节点
};
export const baseDataService = (option=defautOption)=>{
	const promise = new Promise((resolve,reject)=>{
		option.showLoading&&option.dispatch(loadingOpen());
		fetch(serverPath.domain+serverPath.commonPath+option.api,option.param,option.config)
		.then(response=>response.text())
		.then(data=>{
			//请求成功
			option.showLoading&&option.dispatch(loadingCancel());
			const result = JSON.parse(data);
			if(result.statusCode==0){
				//获取数据成功
				resolve(result.data);
			}else if(result.statusCode==302){
				//用户未登录
				option.dispatch(dialogOpen({
					type: 'toast',
					message: '未登录.',
					callback: function(){
						localStorage.setItem('pageLogin','false');
						localStorage.setItem('userName','');
						localStorage.setItem('isTemplateManager',escape('0'));
						dispatch({
							type: types.Logout,
							data: result.data
						});
						hashHistory.push('/login');
					}
				}));
			}else{
				option.dispatch(dialogOpen({
					type: 'alert',
					message: result.msg
				}));
			};
		}).catch(err=>{
			//请求失败
			option.showLoading&&option.dispatch(loadingCancel());
			option.dispatch(dialogOpen({
				type: 'alert',
				message: '网络错误.'
			}));
			reject(err);
		});
	});
	return promise;
};
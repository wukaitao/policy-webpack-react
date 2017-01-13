import * as types from '../actions/actionType.js';

const initState = {
	policyListData: {
		data: {
			basicList: []
		},
		statusCode: 'static',
		msg: '请求初始化'
	},
	policyRelationListData: {
		data: [],
		statusCode: 'static',
		msg: '请求初始化'
	},
	policyDetailData: {
		data: {},
		statusCode: 'static',
		msg: '请求初始化'
	},
	hospitalListData: {
		data: [],
		statusCode: 'static',
		msg: '请求初始化'
	},
	submitPDFData: {
		data: {},
		statusCode: 'static',
		msg: '请求初始化'
	},
	deletePolicyData: {
		data: {},
		statusCode: 'static',
		msg: '请求初始化'
	}
};
//reducer其实也是一个方法而已，三处是state和action,返回值是新的state
//获取保单列表结果数据
export function policyListData(state=initState.policyListData,action){
	switch(action.type){
		case types.PolicyListData:
			if(action.status=='beforeSend'){
				return state;
			}else if(action.status=='success'){
				const pageCount = action.data.data.totalCount==0 ? 1 : 
								  action.data.data.totalCount%20==0 ? action.data.data.totalCount/20 : 
								  parseInt(action.data.data.totalCount/20)+1;
				action.data.data.pageCount = pageCount;
				action.data.data.basicList.forEach(item=>item.isPosting=false);
				return action.data;
			}else if(action.status=='error'){
				return state;
			};
		default:
			return state;
	};
};
//获取关联保单结果数据
export function policyRelationListData(state=initState.policyRelationListData,action){
	switch(action.type){
		case types.PolicyRelationList:
			if(action.status=='beforeSend'){
				return state;
			}else if(action.status=='success'){
				console.log(action.data);
				return action.data;
			}else if(action.status=='error'){
				return state;
			};
		default:
			return state;
	};
};
//获取保单详情结果数据
export function policyDetailData(state=initState.policyDetailData,action){
	switch(action.type){
		case types.PolicyDetail:
			if(action.status=='beforeSend'){
				return state;
			}else if(action.status=='success'){
				console.log(action.data);
				return action.data;
			}else if(action.status=='error'){
				return state;
			};
		default:
			return state;
	};
};
//获取医院列表结果数据
export function hospitalListData(state=initState.hospitalListData,action){
	switch(action.type){
		case types.HospitalList:
			if(action.status=='beforeSend'){
				return state;
			}else if(action.status=='success'){
				console.log(action.data);
				return action.data;
			}else if(action.status=='error'){
				return state;
			};
		default:
			return state;
	};
};
//提交保单结果数据
export function submitPDFData(state=initState.submitPDFData,action){
	switch(action.type){
		case types.SubmitPDF:
			if(action.status=='beforeSend'){
				return state;
			}else if(action.status=='success'){
				console.log(action.data);
				return action.data;
			}else if(action.status=='error'){
				return state;
			};
		default:
			return state;
	};
};
//删除保单结果数据
export function deletePolicyData(state=initState.deletePolicyData,action){
	switch(action.type){
		case types.DeletePolicy:
			if(action.status=='beforeSend'){
				return state;
			}else if(action.status=='success'){
				console.log(action.data);
				return action.data;
			}else if(action.status=='error'){
				return state;
			};
		default:
			return state;
	};
};
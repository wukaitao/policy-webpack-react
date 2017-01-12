import * as types from '../actions/actionType.js';

const initState = {
	policyListData: {
		data: {
			basicList: []
		},
		statusCode: 'static',
		msg: '请求初始化'
	}
};
//reducer其实也是一个方法而已，三处是state和action,返回值是新的state
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
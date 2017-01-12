import * as types from '../actions/actionType.js';

//reducer其实也是一个方法而已，三处是state和action,返回值是新的state
export function account(state={},action){
	switch(action.type){
		case types.PolicyListData:
			if(action.status=='beforeSend'){
				return state;
			}else if(action.status=='success'){
				return action.data.data;
			}else if(action.status=='error'){
				return state;
			};
		default:
			return state;
	};
};
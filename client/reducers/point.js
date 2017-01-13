import * as types from '../actions/actionType.js';

const initState = {
	allPointData: {
		data: [],
		statusCode: 'static',
		msg: '请求初始化'
	}
};
//reducer其实也是一个方法而已，三处是state和action,返回值是新的state
export function allPointData(state=initState.allPointData,action){
	switch(action.type){
		case types.AllPointData:
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
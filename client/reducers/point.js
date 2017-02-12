import * as types from '../actions/actionType.js';

const initState = {
	allPointData: [],
	templateNodeAddData: {
		data: {}
	},
	templateNodeUpdateData: {
		data: {}
	}
};
//reducer其实也是一个方法而已，三处是state和action,返回值是新的state
//获取节点树数据
export function allPointData(state=initState.allPointData,action){
	switch(action.type){
		case types.AllPointData:
			action.data.forEach((item)=>{
				item.benefitKeyDesc = unescape(item.benefitKeyDesc);
				item.benefitValueDesc = unescape(item.benefitValueDesc);
				item.nodeTitle = unescape(item.nodeTitle);
				item.children.forEach((subItem)=>{
					subItem.benefitKeyDesc = unescape(subItem.benefitKeyDesc);
					subItem.benefitValueDesc = unescape(subItem.benefitValueDesc);
					subItem.nodeTitle = unescape(subItem.nodeTitle);
				});
			});
			return action.data;
		default:
			return state;
	};
};
//获取添加节点数据
export function templateNodeAddData(state=initState.templateNodeAddData,action){
	switch(action.type){
		case types.SaveCreatePointData:
			return action.data;
		default:
			return state;
	};
};
//获取修改节点数据
export function templateNodeUpdateData(state=initState.templateNodeUpdateData,action){
	switch(action.type){
		case types.SaveModifyPointData:
			return action.data;
		default:
			return state;
	};
};
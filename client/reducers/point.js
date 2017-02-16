import * as types from '../actions/actionType.js';

const initState = {
	allPointDataCache: [],
	allPointData: [],
	letterList: [],
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
			action.eventType=='init'&&(initState.allPointDataCache=action.data);
			let letterList = [];
			let allPointData = action.eventType=='init'?JSON.parse(JSON.stringify(action.data)):JSON.parse(JSON.stringify(initState.allPointDataCache));
			allPointData = allPointData.filter(item=>unescape(item.nodeTitle).indexOf(action.keyword)!=-1);
			allPointData.sort((a,b)=>{
				return makePy(unescape(b.nodeTitle).charAt(0))[0].toUpperCase() < makePy(unescape(a.nodeTitle).charAt(0))[0].toUpperCase() ? 1 : -1;
			}).forEach((item)=>{
				item.benefitKeyDesc = unescape(item.benefitKeyDesc);
				item.benefitValueDesc = unescape(item.benefitValueDesc);
				item.nodeTitle = unescape(item.nodeTitle);
				item.keyword = '';
				item.isShowSearchbox = false;
				if(item.nodeType==2){
					let firstLetter = makePy(item.nodeTitle.charAt(0))[0].toUpperCase();
					if(firstLetter>='A'&&firstLetter<='Z'){
						if(letterList.indexOf(firstLetter)===-1){
							letterList.push(firstLetter);
							item.firstLetter = firstLetter;
						};
					}else{
						if(letterList.indexOf('#')===-1){
							letterList.push('#');
							item.firstLetter = '#';
						};
					};
				};
				item.children.forEach((subItem)=>{
					subItem.benefitKeyDesc = unescape(subItem.benefitKeyDesc);
					subItem.benefitValueDesc = unescape(subItem.benefitValueDesc);
					subItem.nodeTitle = unescape(subItem.nodeTitle);
				});
			});
			return JSON.parse(JSON.stringify(allPointData));
		case types.ToggleSearchbox:
			state.forEach(item=>item.libId==action.one.libId&&(item.isShowSearchbox=!item.isShowSearchbox));
			return JSON.parse(JSON.stringify(state));
		case types.FilterPoint:
			state.forEach(item=>item.libId==action.one.libId&&(item.keyword=action.keyword));
			return JSON.parse(JSON.stringify(state));
		default:
			return state;
	};
};
//获取分类节点首字母列表
export function letterList(state=initState.letterList,action){
	switch(action.type){
		case types.ResetLetterList:
			let letterList = [];
			action.data.forEach((item)=>{
				if(item.nodeType==2){
					let firstLetter = makePy(item.nodeTitle.charAt(0))[0].toUpperCase();
					if(firstLetter>='A'&&firstLetter<='Z'){
						if(letterList.indexOf(firstLetter)===-1){
							letterList.push(firstLetter);
						};
					}else{
						if(letterList.indexOf('#')===-1){
							letterList.push('#');
						};
					};
				};
			});
			return letterList;
		default:
			return state;
	}
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
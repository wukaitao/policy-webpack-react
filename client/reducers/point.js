import * as types from '../actions/actionType.js';

const initState = {
	pointListCache: [],
	pointList: [],
	pointDetail: {
		nodeTitle: '',
		benefitKeyDesc: '',
		benefitValueDesc: ''
	},
	letterList: []
};
//reducer其实也是一个方法而已，三处是state和action,返回值是新的state
//获取节点树数据
export function pointList(state=initState.pointList,action){
	switch(action.type){
		case types.PointList:
			action.eventType=='init'&&(initState.pointListCache=action.data);
			let letterList = [];
			let pointList = action.eventType=='init'?JSON.parse(JSON.stringify(action.data)):JSON.parse(JSON.stringify(initState.pointListCache));
			pointList = pointList.filter(item=>{
				return item.nodeType==1||item.nodeType==5||unescape(item.nodeTitle).indexOf(action.keyword)!=-1;
			});
			pointList.sort((a,b)=>{
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
			return JSON.parse(JSON.stringify(pointList));
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
//获取节点内容
export function pointDetail(state=initState.pointDetail,action){
	switch(action.type){
		case types.PointDetail:
			if(action.param.eventType=='cateadd'||action.param.eventType=='pointadd'){
				return initState.pointDetail;
			}else if(action.param.eventType=='cateedit'){
				return action.data.filter(item=>item.libId==action.param.id)[0];
			}else if(action.param.eventType=='pointedit'){
				const list = action.data.filter(item=>item.nodeType==2);
				outer:
				for(let item of list){
					inner:
					for(let subItem of item.children){
						if(subItem.libId==action.param.pointId){
							return subItem;
							break outer;
						};
					};
				};
			};
		case types.ChangeNodeTitle:
			state.nodeTitle = action.param.nodeTitle;
			return JSON.parse(JSON.stringify(state));
		default:
			return state;
	};
};
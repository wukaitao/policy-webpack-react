import * as types from '../actions/actionType.js';

const initState = {
	policyListData: {
		basicList: []
	},
	policyDetail: {},
	hospitalList: []
};
//reducer其实也是一个方法而已，三处是state和action,返回值是新的state
//获取保单列表结果数据
export function policyListData(state=initState.policyListData,action){
	switch(action.type){
		case types.PolicyListData:
			const pageCount = action.data.totalCount==0 ? 1 : 
				  action.data.totalCount%20==0 ? action.data.totalCount/20 : 
				  parseInt(action.data.totalCount/20)+1;
			action.data.pageCount = pageCount;
			action.data.basicList.forEach(item=>{
				item.chosen=false;
				item.isPosting=false;
				item.isSending=false;
			});
			return Object.assign({},state,action.data);
		case types.ChooseAllPolicy:
			state.basicList.forEach(item=>item.chosen=action.flag);
			return JSON.parse(JSON.stringify(state));
		case types.ChangePolicyChosen:
			const chosen = state.basicList.find(item=>item.policyId==action.one.policyId).chosen;
			state.basicList.find(item=>item.policyId==action.one.policyId).chosen=!chosen;
			return JSON.parse(JSON.stringify(state));
		case types.ChooseInvert:
			state.basicList.forEach(item=>item.chosen=!item.chosen);
			return JSON.parse(JSON.stringify(state));
		case types.ChangeSortType:
			state.basicList.sort((a,b)=>{
	  			const atime = new Date(a.updateTime.replace(/-/g,'/')).getTime();
	  			const btime = new Date(b.updateTime.replace(/-/g,'/')).getTime();
	 			if(action.sortType=='desc') return atime < btime ? -1 : 1;
	 			else return atime > btime ? -1 : 1;
			});
			return JSON.parse(JSON.stringify(state));
		case types.SubmitPDF:
			if(action.status=='success'||action.status=='error'){
				state.basicList.find(item=>item.policyId==action.policyId).isPosting=false;
				if(action.status=='success'){
					state.basicList.find(item=>item.policyId==action.policyId).policyStatus=1;
				};
			}else if(action.status=='before'){
				state.basicList.find(item=>item.policyId==action.policyId).isPosting=true;
			};
			return JSON.parse(JSON.stringify(state));
		case types.SendPdf:
			if(action.status=='success'||action.status=='error'){
				state.basicList.find(item=>item.policyId==action.policyId).isSending=false;
			}else if(action.status=='before'){
				state.basicList.find(item=>item.policyId==action.policyId).isSending=true;
			};
			return JSON.parse(JSON.stringify(state));
		default:
			return state;
	};
};
//获取保单详情结果数据
export function policyDetail(state=initState.policyDetail,action){
	switch(action.type){
		case types.PolicyDetail:
			action.data.policyName = unescape(action.data.policyName);
			if(action.data.path=='copy'){
				action.data.policyName = action.data.policyName + '-复制';
			};
			action.data.policyTitle = unescape(action.data.policyTitle);
			action.data.benefitList.sort((a,b)=>a.orderId-b.orderId);
			action.data.benefitList.forEach((item)=>{
				item.showEdit = false;
				item.nodeTitle = unescape(item.nodeTitle);
				item.benefitKeyDesc = unescape(item.benefitKeyDesc);
				item.benefitValueDesc = unescape(item.benefitValueDesc);
				item.chosen=true;
				item.children.sort((a,b)=>a.orderId-b.orderId);
				item.children.forEach((subItem)=>{
					subItem.showEdit = false;
					subItem.nodeTitle = unescape(subItem.nodeTitle);
					subItem.benefitKeyDesc = unescape(subItem.benefitKeyDesc);
					subItem.benefitValueDesc = unescape(subItem.benefitValueDesc);
					subItem.chosen=true;
					subItem.isPrev=subItem.nodeType==4;
				});
			});
			return Object.assign({},state,action.data);
		/*
		case types.PolicyInitChosen:
			//获取节点树形列表
			let l=JSON.parse(JSON.stringify(state.benefitList));
			//遍历出所有现有id的list，包括父节点
			let idList=l.reduce((p,c)=>{
				p.push(c.libId);
				return p.concat(c.children.map((o)=>{
					return o.libId;
				}));
			},[]);
			//遍历完整节点树
			action.data.forEach((item)=>{
				item.showEdit = false;
				item.benefitKeyDesc = unescape(item.benefitKeyDesc);
				item.benefitValueDesc = unescape(item.benefitValueDesc);
				item.nodeTitle = unescape(item.nodeTitle);
				//list中不包含当前父节点则全部加入
				if(idList.indexOf(item.libId)==-1){
					let pt=JSON.parse(JSON.stringify(item));
					pt.chosen=false;
					pt.children.forEach((subItem)=>{
						subItem.showEdit = false;
						subItem.benefitKeyDesc = unescape(subItem.benefitKeyDesc);
						subItem.benefitValueDesc = unescape(subItem.benefitValueDesc);
						subItem.nodeTitle = unescape(subItem.nodeTitle);
						subItem.chosen=false;
						subItem.isPrev=subItem.nodeType==4;
					});
					l.push(pt);
				}else{
					//找到当前父节点parent
					let parent;
					l.some((o)=>o.libId==item.libId&&(parent=o));
					//遍历完整节点树中当前父节点
					item.children.forEach((subItem)=>{
						subItem.showEdit = false;
						subItem.benefitKeyDesc = unescape(subItem.benefitKeyDesc);
						subItem.benefitValueDesc = unescape(subItem.benefitValueDesc);
						subItem.nodeTitle = unescape(subItem.nodeTitle);
						subItem.isPrev=subItem.nodeType==4;
						if(idList.indexOf(subItem.libId)==-1){
							let pt=JSON.parse(JSON.stringify(c));
							pt.chosen=false;
							parent.children.push(pt);
						}
					});
				}
			});
			return Object.assign({},state,{
				benefitList: l
			});
		*/
		case types.ChangePolicyName:
			state.policyName = action.policyName;
			return JSON.parse(JSON.stringify(state));
		case types.ChangeShow:
			const nodeIndex = action.nodeIndex;
			if(nodeIndex.length==1){
				state.benefitList[nodeIndex[0]].showEdit = !state.benefitList[nodeIndex[0]].showEdit;
			}else if(nodeIndex.length==2){
				state.benefitList[nodeIndex[0]].children[nodeIndex[1]].showEdit = !state.benefitList[nodeIndex[0]].children[nodeIndex[1]].showEdit;
			};
			return JSON.parse(JSON.stringify(state));
		case types.ChangeContent:
			if(action.changeType=='title'){
				state.policyTitle = action.value;
			}else if(action.changeType=='case'){
				state.benefitList[action.nodeIndex[0]][action.bind] = action.value;
				action.isSave&&(state.benefitList[action.nodeIndex[0]].showEdit=false);
			}else if(action.changeType=='point'){
				state.benefitList[action.nodeIndex[0]].children[action.nodeIndex[1]][action.bind] = action.value;
				action.isSave&&(state.benefitList[action.nodeIndex[0]].children[action.nodeIndex[1]].showEdit=false);
			};
			return JSON.parse(JSON.stringify(state));
		case types.ChangeIsPrev:
			state.benefitList[action.nodeIndex[0]].children[action.nodeIndex[1]].isPrev = !state.benefitList[action.nodeIndex[0]].children[action.nodeIndex[1]].isPrev;
			return JSON.parse(JSON.stringify(state));
		case types.PolicyInitChosen:
			//保单详情->挑选节点-初始化节点数据
			const benefitList=JSON.parse(JSON.stringify(state.benefitList));
			//console.log(action.data);
			action.data.sort((a,b)=>{
				return makePy(unescape(b.nodeTitle).charAt(0))[0].toUpperCase() < makePy(unescape(a.nodeTitle).charAt(0))[0].toUpperCase() ? 1 : -1;
			}).forEach((item,index)=>{
				//console.log(index);
				const one = benefitList.find(o=>o.libId==item.libId);
				if(!!one){
					item.nodeTitle = unescape(one.nodeTitle);
					item.benefitKeyDesc = unescape(one.benefitKeyDesc);
					item.benefitValueDesc = unescape(one.benefitValueDesc);
					if(item.nodeType==2){
						//item.showEdit = false;
						item.chosenAll = item.children.length==one.children.length;
						item.chosenSome = item.children.length>one.children.length&&!!one.children.length;
						item.children.forEach(subItem=>{
							const subOne = one.children.find(o=>o.libId==subItem.libId);
							if(!!subOne){
								//subItem.showEdit = false;
								subItem.chosen = true;
								subItem.nodeTitle = unescape(subOne.nodeTitle);
								subItem.benefitKeyDesc = unescape(subOne.benefitKeyDesc);
								subItem.benefitValueDesc = unescape(subOne.benefitValueDesc);
							}else{
								subItem.chosen = false;
							};
						});
					}else if(item.nodeType==1){
						item.chosen=true;
					}else if(item.nodeType==5){
						item.chosen=true;
					};
				}else{
					if(item.nodeType==1){
						item.chosen=false;
					}else if(item.nodeType==5){
						item.chosen=false;
					};
				};
			});
			//console.log(action.data);
			return JSON.parse(JSON.stringify(action.data));
		case types.PolicyFilterChosen:
			//挑选节点->保单详情-筛选节点数据
			return JSON.parse(JSON.stringify(state));
		case types.PolicyRefreshOrder:
			//调整排序->保单详情-刷新节点排序
			return JSON.parse(JSON.stringify(state));
		default:
			return state;
	};
};
//获取医院列表结果数据
export function hospitalList(state=initState.hospitalList,action){
	switch(action.type){
		case types.HospitalList:
			const policyDetail = action.policyDetail;
			action.data.forEach(function(item){
				item.chosen = false;
				//0:共付;1:无赔付;2:所有;
				if(policyDetail.coinsuranceArray && policyDetail.coinsuranceArray.indexOf(item.HOS_ID) != -1) item.payType = 0;
				else if(policyDetail.deductibleArray && policyDetail.deductibleArray.indexOf(item.HOS_ID) != -1) item.payType = 1;
				else item.payType = 2;
			});
			return action.data;
		case types.ChooseHospital:
			state.forEach(item=>{
				item.HOS_ID==action.one.HOS_ID&&(item.chosen=!item.chosen);
			});
			return JSON.parse(JSON.stringify(state));
		case types.AddHospital:
			state.forEach(item=>{
				if(item.payType=='2'&&item.chosen){
					item.payType = action.payType;
					item.chosen = false;
				};
			});
			return JSON.parse(JSON.stringify(state));
		case types.RemoveHospital:
			state.forEach(item=>{
				var flag = (item.payType=='0'&&item.chosen&&action.curHospitalType == 'coinsuranceList')||(item.payType=='1'&&item.chosen&&action.curHospitalType == 'deductibleList');
				if(flag){
					item.payType = '2';
					item.chosen = false;
				};
			});
			return JSON.parse(JSON.stringify(state));
		case types.AddExpHospital:
			state.forEach(item=>{
				if(item.IS_EXPENSIVE&&item.payType=='2'){
					item.payType = action.curHospitalType=='coinsuranceList'?'0':'1';
					item.chosen = false;
				};
			});
			return JSON.parse(JSON.stringify(state));
		case types.RemoveExpHospital:
			state.forEach(item=>{
				var flag = (action.curHospitalType=='coinsuranceList'&&item.payType=='0')||(action.curHospitalType=='deductibleList'&&item.payType=='1');
				if(item.IS_EXPENSIVE&&flag){
					item.payType = '2';
					item.chosen = false;
				};
			});
			return JSON.parse(JSON.stringify(state));
		case types.HosSelectedAllLeft:
			state.forEach(item=>{
				item.payType=='2'&&(item.chosen=action.flag);
			});
			return JSON.parse(JSON.stringify(state));
		case types.HosSelectedAllRight:
			state.forEach(item=>{
				var flag = (action.curHospitalType=='coinsuranceList'&&item.payType=='0')||(action.curHospitalType=='deductibleList'&&item.payType=='1');
				flag&&(item.chosen=action.flag);
			});
			return JSON.parse(JSON.stringify(state));
		default:
			return state;
	};
};
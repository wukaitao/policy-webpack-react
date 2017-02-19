import * as types from '../actions/actionType.js';

const initState = {
	policyListData: {
		basicList: []
	},
	policyDetail: {},
	policyDetailBasicListOrderCache: [],
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
				item.children.sort((a,b)=>a.orderId-b.orderId);
				item.children.forEach((subItem)=>{
					subItem.showEdit = false;
					subItem.nodeTitle = unescape(subItem.nodeTitle);
					subItem.benefitKeyDesc = unescape(subItem.benefitKeyDesc);
					subItem.benefitValueDesc = unescape(subItem.benefitValueDesc);
					subItem.isPrev=subItem.nodeType==4;
				});
			});
			return Object.assign({},state,action.data);
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
			//保存保单节点原始排序
			initState.policyDetailBasicListOrderCache = [];
			benefitList.forEach(item=>{
				const one = {
					libId: item.libId,
					nodeType: item.nodeType
				};
				item.nodeType==2&&(one.children=[])&&item.children.forEach(subItem=>{
					const subOne = {
						libId: subItem.libId,
						nodeType: subItem.nodeType
					};
					one.children.push(subOne);
				});
				initState.policyDetailBasicListOrderCache.push(one);
			});
			//匹配保单节点到节点树
			action.data.sort((a,b)=>{
				return makePy(unescape(b.nodeTitle).charAt(0))[0].toUpperCase() < makePy(unescape(a.nodeTitle).charAt(0))[0].toUpperCase() ? 1 : -1;
			}).forEach((item,index)=>{
				const one = benefitList.find(o=>o.libId==item.libId);
				item.nodeTitle = one?one.nodeTitle:unescape(item.nodeTitle);
				item.benefitKeyDesc = one?one.benefitKeyDesc:unescape(item.benefitKeyDesc);
				item.benefitValueDesc = one?one.benefitValueDesc:unescape(item.benefitValueDesc);
				item.nodeType==2&&item.children.forEach(subItem=>{
					subItem.nodeTitle = unescape(subItem.nodeTitle);
					subItem.benefitKeyDesc = unescape(subItem.benefitKeyDesc);
					subItem.benefitValueDesc = unescape(subItem.benefitValueDesc);
				});
				if(one){
					if(item.nodeType==2){
						item.chosenAll = item.children.length==one.children.length;
						item.chosenSome = item.children.length>one.children.length&&!!one.children.length;
						item.children.forEach(subItem=>{
							const subOne = one.children.find(o=>o.libId==subItem.libId);
							subItem.nodeTitle = subOne?subOne.nodeTitle:subItem.nodeTitle;
							subItem.benefitKeyDesc = subOne?subOne.benefitKeyDesc:subItem.benefitKeyDesc;
							subItem.benefitValueDesc = subOne?subOne.benefitValueDesc:subItem.benefitValueDesc;
							subOne&&(subItem.chosen=true);
							!subOne&&(subItem.chosen=false);
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
			state.benefitList = action.data;
			return JSON.parse(JSON.stringify(state));
		case types.FilterChosen:
			//挑选节点->保单详情-筛选节点数据
			if(action.param.flag){
				//挑选完成
				//筛选已挑选
				state.benefitList = state.benefitList.filter(item=>{
					if(item.nodeType==2) item.children = item.children.filter(subItem=>subItem.chosen);
					return item.chosen||item.chosenAll||item.chosenSome;
				});
				//合并已筛选节点到原保单节点
				const newBenefitList = [];
				initState.policyDetailBasicListOrderCache.forEach(item=>{
					const one = state.benefitList.find(o=>o.libId==item.libId);
					if(one){
						const oItem = {
							showEdit: false,
							nodeType: one.nodeType,
							libId: one.libId,
							parentId: one.parentId,
							orderId: one.orderId,
							nodeTitle: one.nodeTitle,
							benefitKeyDesc: one.benefitKeyDesc,
							benefitValueDesc: one.benefitValueDesc
						};
						if(item.nodeType==2){
							oItem.children = [];
							item.children.forEach(subItem=>{
								const subOne = one.children.find(o=>o.libId==subItem.libId);
								if(subOne){
									oItem.children.push({
										isPrev: false,
										showEdit: false,
										nodeType: subOne.nodeType,
										libId: subOne.libId,
										parentId: subOne.parentId,
										orderId: subOne.orderId,
										nodeTitle: subOne.nodeTitle,
										benefitKeyDesc: subOne.benefitKeyDesc,
										benefitValueDesc: subOne.benefitValueDesc
									});
									one.children = one.children.filter(o=>o.libId!=subOne.libId);
								};
							});
							oItem.children = oItem.children.concat(one.children);
						};
						newBenefitList.push(oItem);
						state.benefitList = state.benefitList.filter(o=>o.libId!=one.libId);
					};
				});
				state.benefitList = newBenefitList.concat(state.benefitList);
			}else{
				//取消挑选
				//恢复原保单节点
				const newBenefitList = [];
				initState.policyDetailBasicListOrderCache.forEach(item=>{
					const one = state.benefitList.find(o=>o.libId==item.libId);
					one.showEdit = false;
					if(item.nodeType==2){
						const newChildren = [];
						item.children.forEach(subItem=>{
							const subOne = one.children.find(o=>o.libId==subItem.libId);
							subOne.showEdit = false;
							subOne.isPrev = false;
							newChildren.push(subOne);
						});
						one.children = newChildren;
					};
					newBenefitList.push(one);
				});
				state.benefitList = newBenefitList
			};
			return JSON.parse(JSON.stringify(state));
		case types.RefreshOrder:
			//调整排序->保单详情-刷新节点排序
			if(action.param.eventType=='case'){
				//分类/自定义标题节点/医院节点
				const target = state.benefitList.find(item=>item.libId==action.param.target.libId);
				const one = state.benefitList.find(item=>item.libId==action.param.one.libId);
				const targetIndex = state.benefitList.indexOf(target);
				const oneIndex = state.benefitList.indexOf(one);
				state.benefitList.splice(targetIndex,1);
				state.benefitList.splice(oneIndex,0,target);
			}else if(action.param.eventType=='point'){
				//子节点
				const children = state.benefitList.find(item=>item.libId==action.param.target.parentId).children;
				const target = children.find(item=>item.libId==action.param.target.libId);
				const one = children.find(item=>item.libId==action.param.one.libId);
				const targetIndex = children.indexOf(target);
				const oneIndex = children.indexOf(one);
				children.splice(targetIndex,1);
				children.splice(oneIndex,0,target);
				state.benefitList.find(item=>item.libId==action.param.target.parentId).children = children;
			}else if(action.param.eventType=='reset'){
				//取消(重置)
				state.benefitList = initState.policyDetailBasicListOrderCache;
			};
			return JSON.parse(JSON.stringify(state));
		case types.ChangeChosen:
			//切换子节点/自定义标题节点/医院节点的选择
			if(action.param.parentLibId){
				//子节点
				const parent = state.benefitList.find(item=>item.libId==action.param.parentLibId);
				const flag = parent.children.find(item=>item.libId==action.param.libId).chosen;
				parent.children.find(item=>item.libId==action.param.libId).chosen = !flag;
				parent.chosenAll = parent.children.length==parent.children.filter(item=>item.chosen==true).length;
				parent.chosenSome = parent.children.length>parent.children.filter(item=>item.chosen==true).length&&parent.children.filter(item=>item.chosen==true).length;
			}else{
				//自定义标题节点/医院节点
				const flag = state.benefitList.find(item=>item.libId==action.param.libId).chosen;
				state.benefitList.find(item=>item.libId==action.param.libId).chosen = !flag;
			};
			return JSON.parse(JSON.stringify(state));
		case types.ChangeChosenAll:
			//选择全部子节点/自定义标题节点/医院节点的选择
			if(action.param.one==1||action.param.one==5){
				//自定义标题节点/医院节点的选择
				state.benefitList.filter(item=>item.nodeType==action.param.one).forEach(item=>item.chosen=!action.param.flag);
			}else{
				//子节点
				const parent = state.benefitList.find(item=>item.libId==action.param.one.libId);
				parent.chosenAll = !parent.chosenAll;
				parent.chosenSome = false;
				parent.children.forEach(item=>item.chosen=parent.chosenAll);
			};
			return JSON.parse(JSON.stringify(state));
		case types.InitOrder:
			initState.policyDetailBasicListOrderCache = JSON.parse(JSON.stringify(state.benefitList));
			return state;
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
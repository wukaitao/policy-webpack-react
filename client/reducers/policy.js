import * as types from '../actions/actionType.js';

const initState = {
	policyListData: {
		basicList: []
	},
	policyRelationListData: {
		data: [],
		statusCode: 'static',
		msg: '请求初始化'
	},
	policyDetail: {},
	hospitalList: [],
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
			const pageCount = action.data.totalCount==0 ? 1 : 
				  action.data.totalCount%20==0 ? action.data.totalCount/20 : 
				  parseInt(action.data.totalCount/20)+1;
			action.data.pageCount = pageCount;
			action.data.basicList.forEach(item=>item.isPosting=false);
			return Object.assign({},state,action.data);
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
		default:
			return state;
	};
};
//获取医院列表结果数据
export function hospitalList(state=initState.hospitalList,action){
	switch(action.type){
		case types.HospitalList:
			if(action.eventType=='init'){
				//请求(初始化)
				const policyDetail = action.policyDetail;
				action.data.forEach(function(item){
					item.chosen = false;
					//0:共付;1:无赔付;2:所有;
					if(policyDetail.coinsuranceArray && policyDetail.coinsuranceArray.indexOf(item.HOS_ID) != -1) item.payType = 0;
					else if(policyDetail.deductibleArray && policyDetail.deductibleArray.indexOf(item.HOS_ID) != -1) item.payType = 1;
					else item.payType = 2;
				});
				//test start
				initState.hospitalList = action.data;
				//test end
				return action.data;
			}else if(action.eventType=='filter'){
				//搜索(过滤)
				console.log(action.param.keyword);
				return JSON.parse(JSON.stringify(initState.hospitalList)).filter(item=>{
					return item.HOS_NAME.indexOf(action.param.keyword)!=-1;
				});
			};
		case types.ChooseHospital:
			state.forEach(item=>{
				item.HOS_ID==action.one.HOS_ID&&(item.chosen=!item.chosen);
			});
			return JSON.parse(JSON.stringify(state));
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
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
			action.data.forEach((p)=>{
				p.showEdit = false;
				p.benefitKeyDesc = unescape(p.benefitKeyDesc);
				p.benefitValueDesc = unescape(p.benefitValueDesc);
				p.nodeTitle = unescape(p.nodeTitle);
				//list中不包含当前父节点则全部加入
				if(idList.indexOf(p.libId)==-1){
					let pt=JSON.parse(JSON.stringify(p));
					pt.chosen=false;
					pt.children.forEach((c)=>{
						c.showEdit = false;
						c.benefitKeyDesc = unescape(c.benefitKeyDesc);
						c.benefitValueDesc = unescape(c.benefitValueDesc);
						c.nodeTitle = unescape(c.nodeTitle);
						c.chosen=false;
						c.isPrev=c.nodeType==4;
					});
					l.push(pt);
				}else{
					//找到当前父节点parent
					let parent;
					l.some((o)=>o.libId==p.libId&&(parent=o));
					//遍历完整节点树中当前父节点
					p.children.forEach((c)=>{
						c.showEdit = false;
						c.benefitKeyDesc = unescape(c.benefitKeyDesc);
						c.benefitValueDesc = unescape(c.benefitValueDesc);
						c.nodeTitle = unescape(c.nodeTitle);
						c.isPrev=c.nodeType==4;
						if(idList.indexOf(c.libId)==-1){
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
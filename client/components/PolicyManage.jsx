import React,{PropTypes} from 'react';
import {Link} from 'react-router';
//声明组件
const PolicyManage = React.createClass({
	propTypes: {
		//组件的props安全
		queryPolicyList: PropTypes.func.isRequired,
		policyList: PropTypes.any.isRequired
	},
	getPolicyList(page){
		const param = {
			currentPage: page,
			policyMemberIdPattern: 'policy'
		};
		this.props.queryPolicyList(param);
	},
	render(){
		const list = this.props.policyList.map((item,index)=>{
			return (
				<tr key={index}>
					<td className="text-center"><input type="checkbox"/></td>
					<td className="text-ellipsis">{item.policyName}</td>
					<td className="text-center">{item.policyId}</td>
					<td className="text-center">{item.policyKeyMsg}</td>
					<td className="text-center">{item.updateBy}</td>
					<td className="text-center">{item.updateTime}</td>
					<td className="text-center">状态</td>
					<td className="text-center">操作</td>
				</tr>
			);
		});
		return(
			<div className="policy-manage">
				This is PolicyManage.
				<button onClick={this.getPolicyList.bind(this,25)}>获取列表数据</button>
				<table className="data-table">
					<colgroup>
						<col width="40"/><col/>
						<col width="70"/><col width="180"/>
						<col width="130"/><col width="150"/>
						<col width="130"/><col width="180"/>
					</colgroup>
					<thead>
						<tr>
							<th><input type="checkbox"/></th>
							<th>名称</th>
							<th>编号</th>
							<th>保单信息</th>
							<th>最后修改人</th>
							<th>最后修改日期</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						{list}
					</tbody>
				</table>
			</div>
		)
	}
});

//导出组件
export default PolicyManage;
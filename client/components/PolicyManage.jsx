import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const PolicyManage = React.createClass({
	componentWillMount(){
		//默认加载列表
		this.getPolicyList(1,true);
	},
	componentWillUpdate(){
		console.log('存在期:componentWillUpdate');
		//监听页面变化
		//this.props.route.callbackRootRoute({
		//	isLoading: false,
		//	name: 'Nicky.Wu'
		//});
	},
	isTemplateManager(){
		//是否管理员
		return true;
	},
	getPolicyList(page,flag){
		//获取列表
		if(!flag) return;
		console.log(page);
		const param = {
			currentPage: page,
			policyMemberIdPattern: 'policy'
		};
		this.props.queryPolicyList(param);
	},
	postPolicy(one){
		//提交保单
		const param = {
			policyId: one.policyId
		};
		this.props.submitPDF(param);
	},
	delSelectedPolicy(){
		//删除保单
		const param = {
			currentPage: this.props.policyListData.data.currentPage,
			policyIdArray: []
		};
		this.props.deletePolicy(param);
	},
	createPdf(id){
		//生成pdf
		const param = {
			policyId: id
		};
		this.props.createPdf(param);
	},
	showTobPolicyRelation(id,policyName){
		//保单关系列表
		const param = {
			policyId: id,
			policyName: policyName
		};
		this.props.queryPolicyRelationList(param);
	},
	render(){
		const data = this.props.policyListData.data;
		const classSet = addons.classSet;
		const btnFirstClass = classSet({
			'btn-primary': data.currentPage!=1,
			'btn-disabled': data.currentPage==1,
			'btn': true
		});
		const btnPrevClass = classSet({
			'btn-primary': parseInt(data.currentPage)>1,
			'btn-disabled': parseInt(data.currentPage)<=1,
			'btn': true
		});
		const btnNextClass = classSet({
			'btn-primary': parseInt(data.currentPage)+1<=parseInt(data.pageCount),
			'btn-disabled': parseInt(data.currentPage)+1>parseInt(data.pageCount),
			'btn': true
		});
		const btnLastClass = classSet({
			'btn-primary': parseInt(data.currentPage)!=parseInt(data.pageCount),
			'btn-disabled': parseInt(data.currentPage)==parseInt(data.pageCount),
			'btn': true
		});
		const list = data.basicList.length ? data.basicList.map((item,index)=>{
			return (
				<tr key={index}>
					<td className="text-center"><input type="checkbox"/></td>
					<td className="text-ellipsis" title={item.policyName}>{item.policyName}</td>
					<td className="text-center">
						{item.isTemplate?'模板':item.policyId}
					</td>
					<td className="text-center">
						{!item.isTemplate&&item.policyKeyMsg ?
							<span>
								{item.policyKeyMsg}
								<i className="icon-eye" onClick={this.showTobPolicyRelation.bind(this,item.policyId,item.tobName)}></i>
							</span> : null
						}
					</td>
					<td className="text-center">{item.updateBy}</td>
					<td className="text-center">{item.updateTime}</td>
					<td className="text-center">
						{item.isTemplate ? 
							null : item.policyStatus==0 ? 
							<span><span>待提交</span>{item.isPosting?<span className="btn btn-disabled">提交中.</span>:<span className="btn" onClick={this.postPolicy.bind(this,item)}>提交</span>}</span> : item.policyStatus==1 ? 
							<span><span>已提交</span>{item.isPosting?<span className="btn btn-disabled">提交中.</span>:<span className="btn" onClick={this.postPolicy.bind(this,item)}>再提交</span>}</span>: null
						}
					</td>
					<td className="text-center">
						{item.isTemplate&&!this.isTemplateManager?<Link to={`/policyview/${item.policyId}`} className="btn">查看</Link>:null}
						{!item.isTemplate||this.isTemplateManager?<Link to={`/policyedit/${item.policyId}`} className="btn">修改</Link>:null}
						<Link to={`/policycopy/${item.policyId}`} className="btn">复制</Link>
						<span onClick={this.createPdf.bind(this,item.policyId)} className="btn">生成pdf</span>
					</td>
				</tr>
			);
		}) : <tr><td colSpan="8" className="text-center">暂时没有数据，请稍后查询</td></tr>;
		const selectedPageOption = [];
		for(var i=1;i<data.pageCount+1;i++){
			selectedPageOption.push(
				<option key={i} value={i}>{i}</option>
			);
		};
		return(
			<section className="main policy-manage">
				<div className="toolbar">
					<div className="toolbar-row">
						<span className="searchbox">
							<input type="text" ref="policyKeyword" placeholder="请输入policy名称或memberId" onClick={this.getPolicyList.bind(this,1,true)}/>
							<span className="type">
								<span>
									{'policy'}<i className="icon-arrow_drop_down"></i>
								</span>
								{/*<ul v-if="showSearchType">
									<li v-for="one in pageStatus.aSearch" @click.stop="changeSearchType(one);">{{one.name}}</li>
							</ul>*/}
							</span>
							<i onClick={this.getPolicyList.bind(this,1,true)} className="icon-search"></i>
						</span>
					</div>
					<div className="toolbar-row ">
						<Link to="/policyadd" className="btn btn-primary">+新建policy</Link>
						<span onClick={this.delSelectedPolicy} className="btn btn-warn">!批量删除</span>
					</div>
				</div>
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
				<div className="toolbar">
					<div className="toolbar-row">
						<Link to="/policyadd" className="btn btn-primary">+新建policy</Link>
						<span onClick={this.delSelectedPolicy} className="btn btn-warn">!批量删除</span>
					</div>
				</div>
				<div className="pagination">
					<span className="pageInfo">共有 {data.totalCount} 条记录，每页显示 20 条，当前第 {data.currentPage}/{'17'} 页</span>
					<span onClick={this.getPolicyList.bind(this,1,data.currentPage!=1)} 
					className={btnFirstClass}>第一页</span>
					<span onClick={this.getPolicyList.bind(this,parseInt(data.currentPage)-1,parseInt(data.currentPage)>1)} 
					className={btnPrevClass}>上一页</span>
					<span onClick={this.getPolicyList.bind(this,parseInt(data.currentPage)+1,parseInt(data.currentPage)+1<=parseInt(data.pageCount))} 
					className={btnNextClass}>下一页</span>
					<span onClick={this.getPolicyList.bind(this,parseInt(data.pageCount),parseInt(data.currentPage)!=parseInt(data.pageCount))} 
					className={btnLastClass}>最后一页</span>
					<select className="ipt-goPage" ref="selectedPage" value={data.currentPage} onChange={this.getPolicyList.bind(this,23,true)}>
						{selectedPageOption}
					</select>
				</div>
			</section>
		)
	}
});

//导出组件
export default PolicyManage;
import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link} from 'react-router';
//声明组件
const PolicyManage = React.createClass({
	componentWillMount(){
		//默认加载列表
		this.getPolicyList(1,true);
	},
	isTemplateManager(){
		//是否管理员
		return true;
	},
	getPolicyList(page,flag){
		if(!flag) return;
		const param = {
			currentPage: page,
			policyMemberIdPattern: 'policy'
		};
		this.props.queryPolicyList(param);
	},
	delSelectedPolicy(){},
	createPdf(id){},
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
						{!item.isTemplate&&item.policyKeyMsg?item.policyKeyMsg:null}
					</td>
					<td className="text-center">{item.updateBy}</td>
					<td className="text-center">{item.updateTime}</td>
					<td className="text-center">
						{item.isTemplate?null:item.policyStatus==0?'待提交':item.policyStatus==1?'已提交':null}
					</td>
					<td className="text-center">
						{item.isTemplate&&!this.isTemplateManager?<Link to="/policyview/{{item.tobId}}" className="btn">查看</Link>:null}
						{!item.isTemplate||this.isTemplateManager?<Link to="/policyedit/{{item.tobId}}" className="btn">修改</Link>:null}
						<Link to="/policycopy/{{item.tobId}}" className="btn">复制</Link>
						<span onClick={this.createPdf.bind(this,item.tobId)} className="btn">生成pdf</span>
					</td>
				</tr>
			);
		}) : <tr><td colSpan="8" className="text-center">暂时没有数据，请稍后查询</td></tr>;
		const selectedPageOption = (count=>{
			var htmlTemp = '';
			for(let i=0;i<count;i++){
				htmlTemp += '<option value="'+i+'">'+i+'</option>';
			};
			return htmlTemp;
		})(data.pageCount);
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
					{/*
					<select className="ipt-goPage" ref="selectedPage" onChange={this.getPolicyList.bind(this,this.refs.selectedPage.value,true)}>
						{selectedPageOption}
					</select>
					*/}
				</div>
			</section>
		)
	}
});

//导出组件
export default PolicyManage;
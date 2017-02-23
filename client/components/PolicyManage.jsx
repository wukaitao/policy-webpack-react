import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const PolicyManage = React.createClass({
	getInitialState(){
		return {
			showSearchType: false,
			sortType: 'desc'
		};
	},
	componentDidMount(){
		//重置搜索类型
		this.props.page.resetSearchType();
		//默认加载列表
		this.getPolicyListHandler(1,true);
	},
	isTemplateManager(){
		//是否管理员
		return true;
	},
	getPolicyListHandler(page,flag){
		//获取列表
		if(!flag) return;
		let param = {
			currentPage: page
		};
		this.props.pageStatus.oSearch.isTemplate!==''&&(param.isTemplate=this.props.pageStatus.oSearch.isTemplate);
		if(/^[0-9]*$/.test(this.refs.policyKeyword.value)) param.policyMemberIdPattern = this.refs.policyKeyword.value;
		else param.policyNamePattern = this.refs.policyKeyword.value;
		this.props.page.getPolicyList(param);
		//重置排序
		this.setState({
			sortType: 'desc'
		});
	},
	postPolicyHandler(one){
		//提交保单
		const param = {
			policyId: one.policyId
		};
		this.props.page.submitPDF(param);
	},
	delSelectedPolicyHandler(){
		//删除保单
		const self = this;
		let param = {
			currentPage: this.props.policyList.currentPage,
			policyIdArray: []
		};
		this.props.policyList.basicList.forEach(item=>item.chosen&&(param.policyIdArray.push(item.policyId)));
		this.props.pageStatus.oSearch.isTemplate!==''&&(param.isTemplate=this.props.pageStatus.oSearch.isTemplate);
		if(/^[0-9]*$/.test(this.refs.policyKeyword.value)) param.policyMemberIdPattern = this.refs.policyKeyword.value;
		else param.policyNamePattern = this.refs.policyKeyword.value;
		if(!param.policyIdArray.length){
			this.props.popup.dialogOpen({
				type: 'alert',
				message: '请选择要删除的保单'
			});
			return;
		};
		this.props.popup.dialogOpen({
			type: 'confirm',
			message: '删除保单将不可恢复，请确认是否删除所选保单.',
			style: {width:360,height:150},
			callback: function(){
				self.props.page.deletePolicy(param,function(){
					self.changeCheckboxStatus();
				});
				//重置排序
				self.setState({
					sortType: 'desc'
				});
			}
		});
	},
	createPdfHandler(id){
		//生成pdf
		const param = {
			policyId: id
		};
		this.props.page.createPdf(param);
	},
	sendPdfHandler(id){
		//发送pdf
		const param = {
			policyId: id
		};
		this.props.page.sendPdf(param);
	},
	getPolicyRelationListHandler(id,policyName){
		//保单关系列表
		const param = {
			policyId: id,
			policyName: policyName
		};
		this.props.page.getPolicyRelationList(param);
	},
	chooseAllHandler(){
		//全选保单
		const param = {
			flag: this.refs.chooseAll.checked
		};
		this.props.page.chooseAll(param);
	},
	chooseInvertHandler(){
		//反选保单
		this.props.page.chooseInvert();
		this.changeCheckboxStatus();
	},
	changePolicyChosenHandler(one){
		//选择保单
		const param = {one};
		this.props.page.changePolicyChosen(param);
		this.changeCheckboxStatus();
	},
	changeCheckboxStatus(){
		//改变全选状态
		const self = this;
		setTimeout(function(){
			const data = self.props.policyList.basicList;
			self.refs.chooseAll.checked=true;
			for(let item of data){
				if(!item.chosen){
					self.refs.chooseAll.checked=false;
					break;
				};
			};
		});
	},
	changeShowSearchTypeHandler(event){
		const isSelf = event.target.className=='searchType';
		//阻止冒泡事件
		isSelf&&event.stopPropagation();
		//切换搜索类型的显示状态
		this.setState({
			showSearchType: !isSelf?false:!this.state.showSearchType
		});
	},
	changeSearchTypeHandler(one){
		//切换搜索类型
		const param = {one};
		this.props.page.changeSearchType(param);
	},
	changeSortTypeHandler(){
		//切换保单排序
		this.setState({
			sortType: this.state.sortType=='desc'?'asc':'desc'
		});
		const param = {
			sortType: this.state.sortType
		};
		this.props.page.changeSortType(param);
	},
	render(){
		const pageStatus = this.props.pageStatus;
		const data = this.props.policyList;
		const classSet = addons.classSet;
		const iSortClass = classSet({
			'icon-arrow_drop_up': this.state.sortType=='asc',
			'icon-arrow_drop_down': this.state.sortType=='desc'
		});
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
					<td className="text-center">
						<input type="checkbox" checked={item.chosen} onChange={this.changePolicyChosenHandler.bind(this,item)}/>
					</td>
					<td className="text-ellipsis" title={item.policyName}>{item.policyName}</td>
					<td className="text-center">
						{item.isTemplate?'模板':item.policyId}
					</td>
					<td className="text-center">
						{!item.isTemplate&&item.policyKeyMsg ?
							<span>
								{item.policyKeyMsg}
								<i className="icon-eye" onClick={this.getPolicyRelationListHandler.bind(this,item.policyId,item.policyName)}></i>
							</span> : null
						}
					</td>
					<td className="text-center">{item.updateBy}</td>
					<td className="text-center">{item.updateTime}</td>
					<td className="text-center">
						{item.isTemplate ? 
							null : item.policyStatus==0 ? 
							<span>
								<span style={{color: "#333"}}>待提交</span>
								{item.isPosting?
									<span className="btn btn-disabled">提交中.</span>:
									<span className="btn" onClick={this.postPolicyHandler.bind(this,item)}>提交</span>
								}
							</span> : item.policyStatus==1 ?
							<span>
								<span style={{color: "#999"}}>已提交</span>
								{item.isPosting?
									<span className="btn btn-disabled">提交中.</span>:
									<span className="btn" onClick={this.postPolicyHandler.bind(this,item)}>再提交</span>
								}
							</span>: null
						}
					</td>
					<td className="text-center">
						{item.isTemplate&&!this.isTemplateManager?<Link to={`/policyview/${item.policyId}`} className="btn">查看</Link>:null}
						{!item.isTemplate||this.isTemplateManager?<Link to={`/policyedit/${item.policyId}`} className="btn">修改</Link>:null}
						<Link to={`/policycopy/${item.policyId}`} className="btn">复制</Link>
						<span onClick={this.createPdfHandler.bind(this,item.policyId)} className="btn">生成pdf</span>
						<span onClick={this.sendPdfHandler.bind(this,item.policyId)} className="btn">发送pdf</span>
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
		const ulSearchTypeClass = classSet({
			'hide': !this.state.showSearchType
		});
		const iSearchTypeClass = classSet({
			'icon-arrow_drop_up': this.state.showSearchType,
			'icon-arrow_drop_down': !this.state.showSearchType
		});
		return(
			<section className="main policy-manage" onClick={this.changeShowSearchTypeHandler}>
				<div className="toolbar">
					<div className="toolbar-row">
						<span className="searchbox">
							<input type="text" ref="policyKeyword" placeholder="请输入policy名称或memberId"/>
							<span className="type">
								<span className="searchType" onClick={this.changeShowSearchTypeHandler}>
									{pageStatus.oSearch.name}<i className={iSearchTypeClass}></i>
								</span>
								<ul className={ulSearchTypeClass}>
									{pageStatus.aSearch.map((item,index)=>{
										return <li key={index} onClick={this.changeSearchTypeHandler.bind(this,item)}>{item.name}</li>;
									})}
								</ul>
							</span>
							<i onClick={this.getPolicyListHandler.bind(this,1,true)} className="icon-search"></i>
						</span>
					</div>
					<div className="toolbar-row ">
						<Link to="/policyadd" className="btn btn-primary">+新建policy</Link>
						<span onClick={this.delSelectedPolicyHandler} className="btn btn-warn">!批量删除</span>
					</div>
				</div>
				<table className="data-table">
					<colgroup>
						<col width="40"/><col/>
						<col width="70"/><col width="180"/>
						<col width="130"/><col width="150"/>
						<col width="130"/><col width="240"/>
					</colgroup>
					<thead>
						<tr>
							<th>
								<input type="checkbox" ref="chooseAll" onChange={this.chooseAllHandler}/>
								<i onClick={this.chooseInvertHandler} className="icon-call_missed"></i>
							</th>
							<th>名称</th>
							<th>编号</th>
							<th>保单信息</th>
							<th>最后修改人</th>
							<th onClick={this.changeSortTypeHandler}>
								最后修改日期
								<i className={iSortClass}></i>
							</th>
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
						<span onClick={this.delSelectedPolicyHandler} className="btn btn-warn">!批量删除</span>
					</div>
				</div>
				<div className="pagination">
					<span className="pageInfo">共有 {data.totalCount} 条记录，每页显示 20 条，当前第 {data.currentPage}/{'17'} 页</span>
					<span onClick={this.getPolicyListHandler.bind(this,1,data.currentPage!=1)} 
					className={btnFirstClass}>第一页</span>
					<span onClick={this.getPolicyListHandler.bind(this,parseInt(data.currentPage)-1,parseInt(data.currentPage)>1)} 
					className={btnPrevClass}>上一页</span>
					<span onClick={this.getPolicyListHandler.bind(this,parseInt(data.currentPage)+1,parseInt(data.currentPage)+1<=parseInt(data.pageCount))} 
					className={btnNextClass}>下一页</span>
					<span onClick={this.getPolicyListHandler.bind(this,parseInt(data.pageCount),parseInt(data.currentPage)!=parseInt(data.pageCount))} 
					className={btnLastClass}>最后一页</span>
					<select className="ipt-goPage" ref="selectedPage" value={data.currentPage} onChange={this.getPolicyListHandler.bind(this,23,true)}>
						{selectedPageOption}
					</select>
				</div>
			</section>
		)
	}
});

//导出组件
export default PolicyManage;
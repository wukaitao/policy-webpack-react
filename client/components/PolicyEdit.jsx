import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const PolicyEdit = React.createClass({
	propTypes: {
		//组件的props安全
	},
	getInitialState(){
		//console.log('PolicyEdit+getInitialState');
		//页面状态
		return {
			//coinsuranceList:共付医院;deductibleList:无赔付医院
			curHospitalType: 'coinsuranceList',
			editBase: false,
			editHospital: true,
			hasChosenLeft: false,
			hasChosenRight: false,
			hasExpLeft: false,
			hasExpRight: false,
			isDisabledHosSelectedAllLeft: false,
			isDisabledHosSelectedAllRight: false,
			pageEdit: false//测试,用以驱动页面渲染
		};
	},
	componentWillMount(){
		//默认加载内容
		this.getPolicyDetail();
	},
	componentDidMount(){
		//this.props.router.setRouteLeaveHook(
		//	this.props.route,
		//	this.routerWillLeave
		//);
		//固定菜单
		$(window).scroll(function(){
			let scollTop = $(window).scrollTop();
			if(scollTop<80) $('.tob-edit header').css({top:80-scollTop+'px'});
			else $('.tob-edit header').css({top:'0px'});
			if(scollTop>10) $('.toTop').fadeIn('show');
			else $('.toTop').fadeOut('show');
		});
	},
	routerWillLeave(nextLocation){
		//返回false会停留当前页面
		//否则,返回一个字符串,会显示给用户,让其自己决定
		//if(!this.state.isSaved){
		//	return '内容还没有保存,确定要离开?';
		//};
	},
	getPolicyDetail(){
		const param = {
			policyId: 12,
			path: 'edit'
		};
		this.props.queryPolicyDetail(param);
	},
	back(){
		hashHistory.push('/policymanage');
	},
	show(obj,param){
		console.log(param);
	},
	save(flag){},
	searchHospital(){},
	toTop(){
		//页面滚动到顶部
		$('body').animate({scrollTop:0},'slow');
	},
	showPolicyBtn(){return true;},
	showTemplateBtn(){return true;},
	showEditBtn(){
		//查看且为模板管理人员的时候隐藏
		return this.props.route.path!='/policyview/:id';
	},
	changeCurHospitalType(type){
		this.setState({
			curHospitalType: type
		});
	},
	changeChosen(one){
		const param = {one};
		this.props.chooseHospital(param);
	},
	render(){
		console.log('render.');
		const self = this;
		const classSet = addons.classSet;
		const data = this.props.policyDetail;
		const hospitalList = this.props.hospitalList;
		if(!data.benefitList||!hospitalList) return null;
		//改变hospitalList
		hospitalList.forEach(function(item){
			//以下props的改变应该放在reducer实现
			item.chosen = false;
			//0:共付;1:无赔付;2:所有;
			//编辑policy的时候根据返回的共付和无赔付list来改变payType
			if(data.coinsuranceArray && data.coinsuranceArray.indexOf(item.HOS_ID) != -1) item.payType = 0;
			else if(data.deductibleArray && data.deductibleArray.indexOf(item.HOS_ID) != -1) item.payType = 1;
			else item.payType = 2;
		});
		var aa=JSON.parse(JSON.stringify(hospitalList)).filter(item=>{
			return item.IS_EXPENSIVE==1;
		});
		console.log(aa.length);
		const editHospitalClass = classSet({
			'hide': !this.state.editHospital,
			'table-hospital': true
		});
		const viewHospitalClass = classSet({
			'hide': this.state.editHospital
		});
		const coinsuranceClass = classSet({
			'selected': this.state.curHospitalType=='coinsuranceList',
			'tab': true
		});
		const deductibleClass = classSet({
			'selected': this.state.curHospitalType=='deductibleList',
			'tab': true
		});
		const addHospitalClass = classSet({
			'btn-disabled': !this.state.hasChosenLeft,
			'btn': true
		});
		const removeHospitalClass = classSet({
			'btn-disabled': !this.state.hasChosenRight,
			'btn': true
		});
		const addExpHospitalClass = classSet({
			'btn-disabled': !this.state.hasExpLeft,
			'btn': true
		});
		const removeExpHospitalClass = classSet({
			'btn-disabled': !this.state.hasExpRight,
			'btn': true
		});
		const baseHtml = (
			<article>
				<nav>
					<div>基础信息</div>
					<hr/>
					{this.showEditBtn() ? <button className="btn" onClick={this.show.bind(this,'editBase',{count:1,id:'baseeditor0',nodeIndex:'base',bind:'policyTitle'})}>{this.state.editBase?'预览':'编辑'}</button> : null}
				</nav>
				<table>
					<colgroup>
						<col width="100"/><col/>
					</colgroup>
					<tbody>
						<tr>
							<td className="label">
								{data.isTemplate ? '模板名称：' : 'POLICY名称：'}
							</td>
							<td>
								{this.state.editBase ? (
									<input type="text" className="ipt" maxLength="250" ref="policyName"/>
								) : (
									<div className="detail" dangerouslySetInnerHTML={{__html: data.policyName}}/>
								)}
							</td>
						</tr>
						<tr>
							<td className="label">
								{data.isTemplate ? '模板标题：' : 'POLICY标题：'}
							</td>
							{this.state.editBase ? (
								<td id="baseeditor0" className="editor"/>
							) : (
								<td>
									<div className="detail" dangerouslySetInnerHTML={{__html: data.policyTitle}}/>
								</td>
							)}
						</tr>
					</tbody>
				</table>
			</article>
		);
		const hospitalHtml = (
			<article>
				<nav>
					<div>医院选择</div>
					<hr/>
					{this.showEditBtn() ? <button className="btn" onClick={this.show.bind(this,'editHospital',{count:0,id:'',nodeIndex:'',bind:''})}>{this.state.editHospital?'预览':'编辑'}</button> : null}
				</nav>
				<table className={viewHospitalClass}>
					<tbody>
						<tr>
							<td className="label">共付医院：</td>
							<td className="label">无赔付医院：</td>
						</tr>
						<tr>
							<td>
								<ul className="detail">
									{hospitalList.map((item,index)=>{
										let liClass = classSet({
											'exp': item.IS_EXPENSIVE
										});
										let html = item.payType==0 ? <li key={index} className={liClass}>{item.HOS_NAME}</li> : null;
										return html;
									})}
								</ul>
							</td>
							<td>
								<ul className="detail">
									{hospitalList.map((item,index)=>{
										let liClass = classSet({
											'exp': item.IS_EXPENSIVE
										});
										let html = item.payType==1 ? <li key={index} className={liClass}>{item.HOS_NAME}</li> : null;
										return html;
									})}
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
				<table className={editHospitalClass}>
					<colgroup>
						<col width="40%"/><col width="20%"/><col width="40%"/>
					</colgroup>
					<tbody>
						<tr>
							<td className="type">
								医院类型选择：
								<span className="tab-container">
									<span className={coinsuranceClass} onClick={this.changeCurHospitalType.bind(this,'coinsuranceList')}>共付医院</span>
									<span className={deductibleClass} onClick={this.changeCurHospitalType.bind(this,'deductibleList')}>无赔付医院</span>
								</span>
							</td>
							<td/>
							<td className="toolbar">
								<span className="searchbox">
									<input type="text" placeholder="请输入医院名称" ref="keyWord"/>
									<i onClick={this.searchHospital} className="icon-search"></i>
								</span>
							</td>
						</tr>
						<tr>
							<td className="title label">
								所有医院
								<span className="choose">
									<input type="checkbox" disabled={this.state.isDisabledHosSelectedAllLeft} ref="hosSelectedAllLeft"/>全选
								</span>
							</td>
							<td></td>
							<td className="title label">
								选中医院
								<span className="choose">
									<input type="checkbox" disabled={this.state.isDisabledHosSelectedAllRight} ref="hosSelectedAllRight"/>全选
								</span>
							</td>
						</tr>
						<tr>
							<td>
								<div className="hospital-container">
									<ul>
										{hospitalList.filter(item=>item.payType==2).map((item,index)=>{
											console.log('map');
											const liClass = classSet({
												'selected': item.chosen,
												'exp': item.IS_EXPENSIVE,
												'hospital': true
											});
											const html = <li key={index} className={liClass} onClick={this.changeChosen.bind(this,item)}>{item.HOS_NAME}</li>;
											return html;
										})}
									</ul>
								</div>
							</td>
							<td className="text-center">
								<span className={addHospitalClass} onClick={this.addHospital}> &gt;&gt; </span>
								<span className={removeHospitalClass} onClick={this.removeHospital}> &lt;&lt; </span>
								<span className={addExpHospitalClass} onClick={this.addExpHospital}>添加所有昂贵医院 </span>
								<span className={removeExpHospitalClass} onClick={this.removeExpHospital}>移除所有昂贵医院 </span>
							</td>
							<td>
								<div className="hospital-container">
									<ul>
										{hospitalList.map((item,index)=>{
											const liClass = classSet({
												'selected': item.chosen,
												'exp': item.IS_EXPENSIVE,
												'hospital': true
											});
											const html = (self.state.curHospitalType=='coinsuranceList'&&item.payType==0)||(self.state.curHospitalType=='deductibleList'&&item.payType==1) ? 
													(<li key={index} className={liClass} onClick={this.changeChosen.bind(this,item)}>{item.HOS_NAME}</li>) : null;
											return html;
										})}
									</ul>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</article>
		);
		const nodeHtml = (
			<div>
				{data.benefitList.map((item,index)=>{
					const isNodeType2 = item.nodeType==2;
					const isNodeType1 = item.nodeType==1;
					const isNodeType5 = item.nodeType==5;
					const trEditClass = classSet({
						'hide' : !item.showEdit
					});
					const trViewClass = classSet({
						'hide' : item.showEdit
					});
					const html = isNodeType2 ? (
						<div key={index}>
							<nav className="nodeType2">
								<div>{item.nodeTitle}</div>
								<hr style={{marginTop: "15px"}}/>
								{this.showEditBtn() ? <button className="btn">编辑</button> : null}
							</nav>
							<table>
								<tbody>
									<tr>
										<td className="label">描述文字：</td>
										<td className="label">责任限额：</td>
									</tr>
									<tr className={trViewClass}>
										<td>
											<div className="detail" dangerouslySetInnerHTML={{__html: item.benefitKeyDesc}}/>
										</td>
										<td>
											<div className="detail" dangerouslySetInnerHTML={{__html: item.benefitValueDesc}}/>
										</td>
									</tr>
									<tr className={trEditClass}>
										<td className="editor"></td>
										<td className="editor"></td>
									</tr>
								</tbody>
							</table>
							{
								item.children.map((subItem,subIndex)=>{
									const trSubEditClass = classSet({
										'hide': !subItem.showEdit
									});
									const trSubViewClass = classSet({
										'hide': subItem.showEdit
									});
									const benefitValueDescClass = classSet({
										'detail': true,
										'hide': subItem.isPrev
									});
									return (
										<article key={subIndex} style={{marginLeft: "2em"}}>
											<nav>
												<div>{subItem.nodeTitle}</div>
												<hr/>
												{this.showEditBtn() ? <button className="btn">编辑</button> : null}
											</nav>
											<table>
												<tbody>
													<tr>
														<td className="label">描述文字：</td>
														<td className="label">
															责任限额：
															{/*<span v-if="!!subIndex" v-show="!point.showEdit&&point.isPrev" style="float: right;color: #000">
																<input type="checkbox" v-model="point.isPrev" disabled="disabled"/>
																与上一节点相同
															</span>
															<span v-if="!!subIndex" v-show="point.showEdit" style="float: right;color: #000;">
																<input type="checkbox" v-model="point.isPrev" v-on:change="changeIsPrev(point);"/>
																与上一节点相同
															</span>*/}
														</td>
													</tr>
													<tr className={trSubViewClass}>
														<td>
															<div className="detail" dangerouslySetInnerHTML={{__html: subItem.benefitKeyDesc}}></div>
														</td>
														<td>
															<div dangerouslySetInnerHTML={{__html: subItem.benefitValueDesc}} className={benefitValueDescClass}></div>
														</td>
													</tr>
													<tr className={trSubEditClass}>
														<td className="editor"></td>
														<td className="editor"></td>
													</tr>
												</tbody>
											</table>
										</article>
									);
								})
							}
						</div>
					) : isNodeType1 ? (
						<article key={index}>
							<nav className="nodeType1">
								<div>{item.nodeTitle}</div>
								<hr/>
								{this.showEditBtn() ? <button className="btn">编辑</button> : null}
							</nav>
							<table>
								<tbody>
									<tr>
										<td className="label">自定义节点：</td>
									</tr>
									<tr className={trViewClass}>
										<td>
											<div className="detail" dangerouslySetInnerHTML={{__html: item.benefitKeyDesc}}/>
										</td>
									</tr>
									<tr className={trEditClass}>
										<td className="editor"></td>
									</tr>
								</tbody>
							</table>
						</article>
					) : isNodeType5 ? (
						<article key={index}>
							<nav className="nodeType5">
								<div>{item.nodeTitle}</div>
								<hr/>
								{this.showEditBtn() ? <button className="btn">编辑</button> : null}
							</nav>
							<table>
								<tbody>
									<tr>
										<td className="label">医院节点标题：</td>
										<td className="label">医院节点描述：</td>
									</tr>
									<tr className={trViewClass}>
										<td>
											<div className="detail" dangerouslySetInnerHTML={{__html: item.benefitKeyDesc}}/>
										</td>
										<td>
											<div className="detail" dangerouslySetInnerHTML={{__html: item.benefitValueDesc}}/>
										</td>
									</tr>
									<tr className={trEditClass}>
										<td className="editor"></td>
										<td className="editor"></td>
									</tr>
								</tbody>
							</table>
						</article>
					) : null;
					return html;
				})}
			</div>
		);
		return (
			<section className="main policy-edit">
				<header>
					<button className="btn" onClick={this.back}>返回</button>
					{this.showPolicyBtn ? <button className="btn" onClick={this.save}>保存POLICY</button> : null}
					{this.showTemplateBtn ? <button className="btn" onClick={this.save.bind(this,true)}>保存模板</button> : null}
					{this.showEditBtn() ? <Link to="/pointchoose" className="btn">挑选节点</Link> : null}
					{this.showEditBtn() ? <Link to="/pointdrag" className="btn">调整排序</Link> : null}
				</header>
				<section>
					{baseHtml}
					{nodeHtml}
					{hospitalHtml}
				</section>
				<footer>
					<button className="btn" onClick={this.back}>返回</button>
					{this.showPolicyBtn ? <button className="btn btn-primary" onClick={this.save}>保存POLICY</button> : null}
					{this.showTemplateBtn ? <button className="btn btn-primary" onClick={this.save.bind(this,true)}>保存模板</button> : null}
				</footer>
				<button className="btn toTop" onClick={this.toTop}>Top</button>
			</section>
		)
	}
});

//导出组件
export default PolicyEdit;
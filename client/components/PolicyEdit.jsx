import React,{PropTypes} from 'react';
import {Link} from 'react-router';
//声明组件
const PolicyEdit = React.createClass({
	propTypes: {
		//组件的props安全
	},
	getInitialState(){
		console.log('PolicyEdit+getInitialState');
		return {};
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
	},
	routerWillLeave(nextLocation){
		//返回false会停留当前页面
		//否则,返回一个字符串,会显示给用户,让其自己决定
		//if(!this.state.isSaved){
			return '内容还没有保存,确定要离开?';
		//};
	},
	getPolicyDetail(){
		const param = {
			policyId: 11,
			path: 'edit'
		};
		this.props.queryPolicyDetail(param);
	},
	back(){},
	show(){},
	save(flag){},
	showPolicyBtn(){return true;},
	showTemplateBtn(){return true;},
	showEditBtn(){return true;},
	render(){
		return false;
	}
/*	render(){
		return false;
		const baseHtml = this.props.editBase ? (
			<table>
				<colgroup>
					<col width="100"/><col/>
				</colgroup>
				<tr>
					<td className="label">
						{this.props.policyCur.isTemplate ? '模板名称：' : 'POLICY名称：'}
					</td>
					<td>
						<input type="text" className="ipt" maxLength="250" ref="policyCur.policyName">
					</td>
				</tr>
				<tr>
					<td className="label" valign="top">
						{this.props.policyCur.isTemplate ? '模板标题：' : 'POLICY标题：'}
					</td>
					<td id="baseeditor0" className="editor"></td>
				</tr>
			</table>
		) : (
			<table>
				<colgroup>
					<col width="100"/><col/>
				</colgroup>
				<tr>
					<td className="label">
						{this.props.policyCur.isTemplate ? '模板名称：' : 'POLICY名称：'}
					</td>
					<td>
						<div className="detail" v-html="policyCur.policyName"></div>
					</td>
				</tr>
				<tr>
					<td className="label" valign="top">
						{this.props.policyCur.isTemplate ? '模板标题：' : 'POLICY标题：'}
					</td>
					<td>
						<div className="detail" v-html="policyCur.policyTitle"></div>
					</td>
				</tr>
			</table>
		);
		return (
			<section className="main">
				<header>
					<button className="btn" onClick={this.back}>返回</button>
					{this.showPolicyBtn ? <button className="btn" onClick={this.save}>保存POLICY</button> : null}
					{this.showTemplateBtn ? <button className="btn" onClick={this.save.bind(this,true)}>保存模板</button> : null}
					{this.showEditBtn ? <Link to="/pointchoose" className="btn">挑选节点</Link> : null}
					{this.showEditBtn ? <Link to="/pointdrag" className="btn">调整排序</Link> : null}
				</header>
				<section>
					<article>
						<nav>
							<div>基础信息</div>
							<hr>
							{this.showEditBtn ? <button className="btn" onClick={this.show.bind(this,'editBase',{count:1,id:'baseeditor0',nodeIndex:'base',bind:'policyTitle'})}>预览</button> : null}
						</nav>
						{baseHtml}
					</article>
					<div v-for="(parent,index) in policyCur.benefitList">
						<div v-if="parent.nodeType==2" :id="'o'+parent.libId">
							<nav className="nodeType2">
								<div>{{parent.nodeTitle | toCn}}</div>
								<hr style="margin-top: 15px;">
								<button className="btn" v-if="showEditBtn()" onClick="show(parent,{count:2,id:'o'+parent.libId+'editor0'+'-o'+parent.libId+'editor1',nodeIndex:index+'',bind:'benefitKeyDesc-benefitValueDesc'})">{{parent.showEdit?'预览':'编辑'}}</button>
							</nav>
							<table>
								<tr>
									<td className="label">描述文字：</td>
									<td className="label">责任限额：</td>
								</tr>
								<tr v-show="!parent.showEdit">
									<td>
										<div className="detail" v-html="parent.benefitKeyDesc"></div>
									</td>
									<td>
										<div className="detail" v-html="parent.benefitValueDesc"></div>
									</td>
								</tr>
								<tr v-show="parent.showEdit">
									<td :id="'o'+parent.libId+'editor0'" className="editor"></td>
									<td :id="'o'+parent.libId+'editor1'" className="editor"></td>
								</tr>
							</table>
							<article style="margin-left: 2em;" v-for="(point,subIndex) in parent.children">
								<nav>
									<div>{{point.nodeTitle | toCn}}</div>
									<hr>
									<button className="btn" v-if="showEditBtn()" onClick="show(point,{count:2,id:'p'+point.libId+'editor0'+'-p'+point.libId+'editor1',nodeIndex:index+'-'+subIndex,bind:'benefitKeyDesc-benefitValueDesc'})">{{point.showEdit?'预览':'编辑'}}</button>
								</nav>
								<table>
									<tr>
										<td className="label">描述文字：</td>
										<td className="label">
											责任限额：
											<span v-if="!!subIndex" v-show="!point.showEdit&&point.isPrev" style="float: right;color: #000">
												<input type="checkbox" v-model="point.isPrev" disabled="disabled"/>
												与上一节点相同
											</span>
											<span v-if="!!subIndex" v-show="point.showEdit" style="float: right;color: #000;">
												<input type="checkbox" v-model="point.isPrev" v-on:change="changeIsPrev(point);"/>
												与上一节点相同
											</span>
										</td>
									</tr>
									<tr v-show="!point.showEdit">
										<td>
											<div className="detail" v-html="point.benefitKeyDesc"></div>
										</td>
										<td>
											<div className="detail" v-show="!point.isPrev" v-html="point.benefitValueDesc"></div>
										</td>
									</tr>
									<tr v-show="point.showEdit">
										<td :id="'p'+point.libId+'editor0'" className="editor"></td>
										<td v-show="!point.isPrev" :id="'p'+point.libId+'editor1'" className="editor"></td>
									</tr>
								</table>
							</article>
						</div>
						<article v-if="parent.nodeType==1" :id="'o'+parent.libId">
							<nav className="nodeType1">
								<div>{{parent.nodeTitle | toCn}}</div>
								<hr>
								<button className="btn" v-if="showEditBtn()" onClick="show(parent,{count:1,id:'o'+parent.libId+'editor0',nodeIndex:index+'',bind:'benefitKeyDesc'})">{{parent.showEdit?'预览':'编辑'}}</button>
							</nav>
							<table>
								<tr>
									<td className="label">自定义节点：</td>
								</tr>
								<tr v-show="!parent.showEdit">
									<td>
										<div className="detail" v-html="parent.benefitKeyDesc"></div>
									</td>
								</tr>
								<tr v-show="parent.showEdit">
									<td :id="'o'+parent.libId+'editor0'" className="editor"></td>
								</tr>
							</table>
						</article>
						<article v-if="parent.nodeType==5" :id="'o'+parent.libId">
							<nav className="nodeType5">
								<div>{{parent.nodeTitle | toCn}}</div>
								<hr>
								<button className="btn" v-if="showEditBtn()" onClick="show(parent,{count:2,id:'o'+parent.libId+'editor0'+'-o'+parent.libId+'editor1',nodeIndex:index+'',bind:'benefitKeyDesc-benefitValueDesc'})">{{parent.showEdit?'预览':'编辑'}}</button>
							</nav>
							<table>
								<tr>
									<td className="label">医院节点标题：</td>
									<td className="label">医院节点描述：</td>
								</tr>
								<tr v-show="!parent.showEdit">
									<td>
										<div className="detail" v-html="parent.benefitKeyDesc"></div>
									</td>
									<td>
										<div className="detail" v-html="parent.benefitValueDesc"></div>
									</td>
								</tr>
								<tr v-show="parent.showEdit">
									<td :id="'o'+parent.libId+'editor0'" className="editor"></td>
									<td :id="'o'+parent.libId+'editor1'" className="editor"></td>
								</tr>
							</table>
						</article>
					</div>
					<article>
						<nav>
							<div>医院选择</div>
							<hr>
							<button className="btn" v-if="showEditBtn()" onClick="show('editHospital',{count:0,id:'',nodeIndex:'',bind:''})">{{editHospital?'预览':'编辑'}}</button>
						</nav>
						<table v-show="!editHospital">
							<tr>
								<td className="label">共付医院：</td>
								<td className="label">无赔付医院：</td>
							</tr>
							<tr>
								<td valign="top">
									<ul className="detail">
										<li v-bind:className="{'exp':one.IS_EXPENSIVE}"  v-for="one in hospitalListData" v-if="one.payType==0">{{one.HOS_NAME | toCn}}</li>
									</ul>
								</td>
								<td valign="top">
									<ul className="detail">
										<li v-bind:className="{'exp':one.IS_EXPENSIVE}" v-for="one in hospitalListData" v-if="one.payType==1">{{one.HOS_NAME | toCn}}</li>
									</ul>
								</td>
							</tr>
						</table>
						<table v-show="editHospital" className="table-hospital" :compute="setBtnStatus">
							<colgroup>
								<col width="40%"/><col width="20%"/><col width="40%"/>
							</colgroup>
							<tr>
								<td className="type">
									医院类型选择：
									<span className="tab-container">
										<span className="tab" v-bind:className="{'selected':curHospitalType=='coinsuranceList'}" onClick="curHospitalType='coinsuranceList';">共付医院</span>
										<span className="tab" v-bind:className="{'selected':curHospitalType=='deductibleList'}" onClick="curHospitalType='deductibleList';">无赔付医院</span>
									</span>
								</td>
								<td></td>
								<td className="toolbar">
									<span className="searchbox">
										<input type="text" placeholder="请输入医院名称" v-model="keyWord"/>
										<i onClick="searchHospital();" className="icon-search"></i>
									</span>
								</td>
							</tr>
							<tr>
								<td className="title label">
									所有医院
									<span className="choose">
										<input type="checkbox" :disabled="isDisabledHosSelectedAllLeft" v-model="hosSelectedAllLeft"/>全选
									</span>
								</td>
								<td></td>
								<td className="title label">
									选中医院
									<span className="choose">
										<input type="checkbox" :disabled="isDisabledHosSelectedAllRight" v-model="hosSelectedAllRight"/>全选
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<div className="hospital-container">
										<ul>
											<li className="hospital" v-bind:className="{'selected':one.chosen,'exp':one.IS_EXPENSIVE}" v-on:click="one.chosen=!one.chosen;" v-for="one in searchHospital()" v-if="one.payType==2">{{one.HOS_NAME | toCn}}</li>
										</ul>
									</div>
								</td>
								<td className="text-center">
									<span className="btn" :className="{'btn-disabled':!hasChosenLeft}" onClick="addHospital();"> &gt;&gt; </span>
									<span className="btn" :className="{'btn-disabled':!hasChosenRight}" onClick="removeHospital();"> &lt;&lt; </span>
									<span className="btn" :className="{'btn-disabled':!hasExpLeft}" onClick="addExpHospital();">添加所有昂贵医院 </span>
									<span className="btn" :className="{'btn-disabled':!hasExpRight}" onClick="removeExpHospital();">移除所有昂贵医院 </span>
								</td>
								<td>
									<div className="hospital-container">
										<ul v-show="curHospitalType=='coinsuranceList'">
											<li className="hospital" v-bind:className="{'selected':one.chosen,'exp':one.IS_EXPENSIVE}" v-on:click="one.chosen=!one.chosen;" v-for="one in hospitalListData" v-if="one.payType==0">{{one.HOS_NAME | toCn}}</li>
										</ul>
										<ul v-show="curHospitalType=='deductibleList'">
											<li className="hospital" v-bind:className="{'selected':one.chosen,'exp':one.IS_EXPENSIVE}" v-on:click="one.chosen=!one.chosen;" v-for="one in hospitalListData" v-if="one.payType==1">{{one.HOS_NAME | toCn}}</li>
										</ul>
									</div>
								</td>
							</tr>
						</table>
					</article>
				</section>
				<footer>
					<button className="btn" onClick="back();">返回</button>
					<button className="btn btn-primary" onClick="save();" v-if="showPolicyBtn()">保存POLICY</button>
					<button className="btn btn-primary" onClick="save(true);" v-if="showTemplateBtn()">保存模板</button>
				</footer>
				<button className="btn toTop" onClick="toTop();">Top</button>
			</section>
		)
	}
*/
});

//导出组件
export default PolicyEdit;
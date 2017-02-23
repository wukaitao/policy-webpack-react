import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
let ueList = [];
//保存编辑器数据到state中
function saveEditorContent(self,isDestroy){
	ueList.forEach(item=>{
		if(!self.props.pageStatus.isSave){
			//在保存policy后不再保存到props
			const id = item.id;
			const nodeIndex = item.nodeIndex;
			const bind = item.bind;
			const value = item.ue.getContent();
			//policy标题
			if(id=='baseeditor0'){
				const param = {
					changeType: 'title',
					value
				};
				self.props.page.changeContent(param);
			//自定义节点/医院节点/分类节点
			}else if(nodeIndex.length==1){
				//self.tobCur.benefitList[nodeIndex[0]].showEdit = false;
				const param = {
					changeType: 'case',
					value,
					nodeIndex,
					bind
				};
				self.props.page.changeContent(param,true);
			//子节点
			}else if(nodeIndex.length==2){
				const param = {
					changeType: 'point',
					value,
					nodeIndex,
					bind
				};
				self.props.page.changeContent(param,true);
			};
		};
		isDestroy&&item.ue.destroy();
	});
	isDestroy&&(ueList=[]);
};
//声明组件
const PolicyEdit = React.createClass({
	getInitialState(){
		//页面状态
		return {
			//coinsuranceList:共付医院;deductibleList:无赔付医院
			curHospitalType: 'coinsuranceList',
			editBase: false,
			editHospital: false,
			hasChosenLeft: false,
			hasChosenRight: false,
			hasExpLeft: false,
			hasExpRight: false,
			isDisabledHosSelectedAllLeft: false,
			isDisabledHosSelectedAllRight: false,
			keyword: ''//搜索医院关键字
		};
	},
	componentDidMount(){
		//默认加载内容
		const self = this;
		const fromPath = localStorage.getItem('fromPath');
		(fromPath!='/pointchoose'&&fromPath!='/pointdrag')&&this.getPolicyDetail(function(){
			self.changeBtnStatus();
		});
		//固定菜单
		$(window).scroll(function(){
			let scollTop = $(window).scrollTop();
			if(scollTop<80) $('.tob-edit header').css({top:80-scollTop+'px'});
			else $('.tob-edit header').css({top:'0px'});
			if(scollTop>10) $('.toTop').fadeIn('show');
			else $('.toTop').fadeOut('show');
		});
	},
	getPolicyDetail(callback){
		const policyId = this.props.routeParams.id?this.props.routeParams.id:'';
		const path = this.props.route.path=='/policycopy/:id'?'copy':
					 this.props.route.path=='/policyedit/:id'?'edit':
					 this.props.route.path=='/policyview/:id'?'view':'add';
		const param = {policyId,path};
		this.props.page.getPolicyDetail(param,callback);
	},
	backHandler(){
		hashHistory.push('/policymanage');
	},
	showHandler(one,param){
		const self = this;
		const count = param.count;
		const id = param.id.split('-');
		const nodeIndex = param.nodeIndex.split('-');
		const bind = param.bind.split('-');
		//切换节点显示状态
		if(one=='editBase'){
			//基础信息
			self.setState({
				editBase: !self.state.editBase
			});
		}else if(one=='editHospital'){
			//选择医院
			self.setState({
				editHospital: !self.state.editHospital
			});
		}else{
			//节点
			self.props.page.changeShow({nodeIndex});
		};
		//编辑器和props之间内容交互
		if(!count) return;
		setTimeout(function(){
			//预览-保存编辑器数据到state中
			if((typeof one=='object'&&!one.showEdit)||(typeof one=='string'&&!self.state[one])){
				if(one=='editBase'){
					//policy标题
					const value = ueList.filter(item=>item.id=='baseeditor0')[0].ue.getContent();
					const param = {
						changeType: 'title',
						value
					};
					self.props.page.changeContent(param);
				}else if(nodeIndex.length==1){
					//自定义节点/医院节点/分类节点
					for(let i=0;i<count;i++){
						const oUe = ueList.filter(item=>item.id=='o'+one.libId+'editor'+i)[0];
						const param = {
							changeType: 'case',
							value: oUe.ue.getContent(),
							nodeIndex,
							bind: oUe.bind
						};
						self.props.page.changeContent(param);
					};
				}else if(nodeIndex.length==2){
					//子节点
					for(let i=0;i<count;i++){
						const oUe = ueList.filter(item=>item.id=='p'+one.libId+'editor'+i)[0];
						const param = {
							changeType: 'point',
							value: oUe.ue.getContent(),
							nodeIndex,
							bind: oUe.bind
						};
						self.props.page.changeContent(param);
					};
				};
			//编辑-渲染编辑器
			}else if((typeof one=='object'&&one.showEdit)||(typeof one=='string'&&self.state[one])){
				let lUe = [];
				//policy标题
				if(one=='editBase') lUe = ueList.filter(item=>item.id=='baseeditor0');
				//自定义节点/医院节点/分类节点/子节点
				else if(nodeIndex.length==1||nodeIndex.length==2) lUe = ueList.filter(item=>item.id==id[0]||item.id==id[1]);
				//如果存在编辑器则直接显示
				if(!!lUe.length) return;
				//如果不存在编辑器则渲染编辑器
				for(let i=0;i<count;i++){
					(function(){
						let value = '';
						//policy标题
						if(one=='editBase') value = self.props.policyDetail[bind[i]];
						//自定义节点/医院节点/分类节点
						else if(nodeIndex.length==1) value = self.props.policyDetail.benefitList[nodeIndex[0]][bind[i]];
						//子节点
						else if(nodeIndex.length==2) value = self.props.policyDetail.benefitList[nodeIndex[0]].children[nodeIndex[1]][bind[i]];
						let editor = UE.getEditor(id[i],{
							initialFrameWidth: '100%',
							initialFrameHeight: 150,
							scaleEnabled: true
						});
						editor.ready(function(){
							this.setContent(value);
						});
						ueList.push({
							id: id[i],
							nodeIndex: nodeIndex,
							bind: bind[i],
							ue: editor
						});
					})();
				};
			};
		});
	},
	saveHandler(isTemplate){
		const self = this;
		//更新orderId
		//if(!drag) this.props.page.policyRefreshOrder(types.PolicyRefreshOrder,{isResetNodeType: false});
		//保存编辑器数据到props中
		saveEditorContent(self);
		//保存policy
		let data = JSON.parse(JSON.stringify(this.props.policyDetail));
		let hospitalList = JSON.parse(JSON.stringify(this.props.hospitalList));
		let path = this.props.route.path=='/policycopy/:id'?'copy':
					 this.props.route.path=='/policyedit/:id'?'edit':
					 this.props.route.path=='/policyview/:id'?'view':'add';
		let param = {
			policyName: data.policyName,
			policyTitle: escape(data.policyTitle),
			coinsuranceArray: [],
			deductibleArray: [],
			nodeArray: [],
			isTemplate: isTemplate ? 1 : 0,
			path
		};
		//policyId
		!!this.props.routeParams.id && (param.policyId=this.props.routeParams.id);
		//coinsuranceArray/deductibleArray
		hospitalList.forEach(item=>{
			item.payType==0 && param.coinsuranceArray.push(item.HOS_ID);
			item.payType==1 && param.deductibleArray.push(item.HOS_ID);
		});
		//nodeArray
		data.benefitList.forEach(item=>{
			param.nodeArray.push({
				benefitKeyDesc: escape(item.benefitKeyDesc),
				benefitValueDesc: escape(item.benefitValueDesc),
				libId: item.libId,
				nodeType: item.nodeType,
				orderId: item.orderId,
				parentId: item.parentId,
				mergeNodeNum: 0
			});
			if(!!item.children&&!!item.children.length){
				item.children.forEach(function(subItem,subIndex){
					let mergeNodeNum = 0;
					if(subItem.nodeType=='3'){
						mergeNodeNum = 1;
						for(let i=subIndex+1;i<item.children.length;i++){
							if(item.children[i].nodeType=='3'){
								break;
							};
							mergeNodeNum++;
						};
					};
					param.nodeArray.push({
						benefitKeyDesc: escape(subItem.benefitKeyDesc),
						benefitValueDesc: escape(subItem.benefitValueDesc),
						libId: subItem.libId,
						nodeType: subItem.nodeType,
						orderId: subItem.orderId,
						parentId: subItem.parentId,
						mergeNodeNum: mergeNodeNum
					});
				});
			};
		});
		param.coinsuranceArray = JSON.stringify(param.coinsuranceArray);
		param.deductibleArray = JSON.stringify(param.deductibleArray);
		param.nodeArray = JSON.stringify(param.nodeArray);
		//校验
		if(data.policyName.replace(/^\s+|\s+$/g,'')==''){
			this.props.popup.dialogOpen({
				type: 'alert',
				message: 'POLICY名称不能为空'
			});
			return;
		}else if(data.policyTitle.replace(/^\s+|\s+$/g,'')==''){
			this.props.popup.dialogOpen({
				type: 'alert',
				message: 'POLICY标题不能为空'
			});
			return;
		};
		this.props.page.savePolicy(param,function(){
			//保存成功回调
			hashHistory.push('/policymanage');
		});
	},
	toTopHandler(){
		//页面滚动到顶部
		$('body').animate({scrollTop:0},'slow');
	},
	showPolicyBtn(){
		//新建/复制(tob/模板)/编辑(tob)的时候true
		const path = this.props.route.path;
		const flagOne = ['/policyadd','/policycopy/:id'].indexOf(path)!=-1;
		const flagTwo = path=='/policyedit/:id';
		const flagThree = !this.props.pageStatus.isTemplate;
		return flagOne||(flagTwo&&flagThree);
	},
	showTemplateBtn(){
		//新建/复制(policy/模板)/编辑(模板)的时候true
		const path = this.props.route.path;
		const flagOne = ['/policyadd','/policycopy/:id'].indexOf(path)!=-1;
		const flagTwo = path=='/policyedit/:id'&&this.props.policyDetail.isTemplate;
		const flagThree = this.props.pageStatus.isTemplateManager;
		return (flagOne||flagTwo)&&flagThree;
	},
	showEditBtn(){
		//查看且为模板管理人员的时候隐藏
		return this.props.route.path!='/policyview/:id';
	},
	changePolicyNameHandlerHandler(){
		const param = {
			policyName: this.refs.policyName.value
		};
		this.props.page.changePolicyName(param);
	},
	changeIsPrevHandler(nodeIndex){
		//切换责任限额
		const param = {nodeIndex};
		this.props.page.changeIsPrev(param);
	},
	//医院部分
	changeBtnStatus(){
		//切换医院选择按钮状态
		const self = this;
		setTimeout(function(){
			const payType = self.state.curHospitalType=='coinsuranceList'?'0':'1';
			self.setState({
				hasChosenLeft: self.props.hospitalList.filter(function(item){return item.payType=='2'&&item.chosen&&item.HOS_NAME.indexOf(self.state.keyword)!=-1}).length,
				hasChosenRight: self.props.hospitalList.filter(function(item){return item.payType==payType&&item.chosen}).length,
				hasExpLeft: self.props.hospitalList.filter(function(item){return item.payType=='2'&&item.IS_EXPENSIVE}).length,
				hasExpRight: self.props.hospitalList.filter(function(item){return item.payType==payType&&item.IS_EXPENSIVE}).length,
				isDisabledHosSelectedAllLeft: !self.props.hospitalList.filter(item=>item.payType=='2'&&item.HOS_NAME.indexOf(self.state.keyword)!=-1).length,
				isDisabledHosSelectedAllRight: !self.props.hospitalList.filter(function(item){return item.payType==payType}).length
			});
		});
	},
	changeCurHospitalTypeHandler(type){
		//切换当前医院选择类型
		this.setState({
			curHospitalType: type
		});
		this.changeBtnStatus();
	},
	changeChosenHandler(one){
		//切换医院选择
		const param = {one};
		this.props.page.chooseHospital(param);
		this.changeBtnStatus();
		//切换全选选中状态
		const self = this;
		setTimeout(function(){
			//所有
			const leftPart = self.props.hospitalList.filter(item=>item.payType=='2'&&item.HOS_NAME.indexOf(self.state.keyword)!=-1);
			if(!leftPart.length) self.refs.hosSelectedAllLeft.checked=false;
			else{
				self.refs.hosSelectedAllLeft.checked=true;
				for(let item of leftPart){
					if(!item.chosen){
						self.refs.hosSelectedAllLeft.checked=false;
						break;
					};
				};
			};
			//选中
			const payType = self.state.curHospitalType=='coinsuranceList'?'0':'1';
			const rightPart = self.props.hospitalList.filter(item=>item.payType==payType);
			if(!rightPart.length) self.refs.hosSelectedAllRight.checked=false;
			else{
				self.refs.hosSelectedAllRight.checked=true;
				for(let item of rightPart){
					if(!item.chosen){
						self.refs.hosSelectedAllRight.checked=false;
						break;
					};
				};
			};
		});
	},
	filterHospitalHandler(){
		//筛选医院
		this.setState({
			keyword: this.refs.keyword.value
		});
		this.changeBtnStatus();
	},
	addHospitalHandler(){
		//添加医院
		const payType = this.state.curHospitalType=='coinsuranceList'?'0':'1';
		const param = {payType};
		this.props.page.addHospital(param);
		this.changeBtnStatus();
	},
	removeHospitalHandler(){
		//移除医院
		const param = {
			curHospitalType: this.state.curHospitalType
		};
		this.props.page.removeHospital(param);
		this.changeBtnStatus();
	},
	addExpHospitalHandler(){
		//添加所有昂贵医院
		const param = {
			curHospitalType: this.state.curHospitalType
		};
		this.props.page.addExpHospital(param);
		this.changeBtnStatus();
	},
	removeExpHospitalHandler(){
		//移除所有昂贵医院
		const param = {
			curHospitalType: this.state.curHospitalType
		};
		this.props.page.removeExpHospital(param);
		this.changeBtnStatus();
	},
	changeHosSelectedAllLeftHandler(){
		//全选所有医院
		const param = {
			flag: this.refs.hosSelectedAllLeft.checked
		};
		this.props.page.changeHosSelectedAllLeft(param);
		this.changeBtnStatus();
	},
	changeHosSelectedAllRightHandler(){
		//全选选中医院
		const param = {
			flag: this.refs.hosSelectedAllRight.checked,
			curHospitalType: this.state.curHospitalType
		};
		this.props.page.changeHosSelectedAllRight(param);
		this.changeBtnStatus();
	},
	render(){
		const self = this;
		const classSet = addons.classSet;
		const data = this.props.policyDetail;
		const hospitalList = this.props.hospitalList;
		if(!data.benefitList||!hospitalList) return null;
		const editPolicyTitleClass = classSet({
			'hide': !this.state.editBase,
			'editor': true,
			'edui-default': true
		});
		const viewPolicyTitleClass = classSet({
			'hide': this.state.editBase
		});
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
					{this.showEditBtn() ? <button className="btn" onClick={this.showHandler.bind(this,'editBase',{
						count: 1,
						id: 'baseeditor0',
						nodeIndex: 'base',
						bind: 'policyTitle'
					})}>{this.state.editBase?'预览':'编辑'}</button> : null}
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
									<input type="text" className="ipt" maxLength="250" value={data.policyName} onChange={this.changePolicyNameHandlerHandler} ref="policyName"/>
								) : (
									<div className="detail" dangerouslySetInnerHTML={{__html: data.policyName}}/>
								)}
							</td>
						</tr>
						<tr>
							<td className="label">
								{data.isTemplate ? '模板标题：' : 'POLICY标题：'}
							</td>
							<td id="baseeditor0" className={editPolicyTitleClass}/>
							<td className={viewPolicyTitleClass}>
								<div className="detail" dangerouslySetInnerHTML={{__html: data.policyTitle}}/>
							</td>
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
					{this.showEditBtn() ? <button className="btn" onClick={this.showHandler.bind(this,'editHospital',{
						count: 0,
						id: '',
						nodeIndex: '',
						bind: ''
					})}>{this.state.editHospital?'预览':'编辑'}</button> : null}
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
									<span className={coinsuranceClass} onClick={this.changeCurHospitalTypeHandler.bind(this,'coinsuranceList')}>共付医院</span>
									<span className={deductibleClass} onClick={this.changeCurHospitalTypeHandler.bind(this,'deductibleList')}>无赔付医院</span>
								</span>
							</td>
							<td/>
							<td className="toolbar">
								<span className="searchbox">
									<input type="text" placeholder="请输入医院名称" onChange={this.filterHospitalHandler} ref="keyword"/>
									<i className="icon-search"></i>
								</span>
							</td>
						</tr>
						<tr>
							<td className="title label">
								所有医院
								<span className="choose">
									<input type="checkbox" disabled={this.state.isDisabledHosSelectedAllLeft} onChange={this.changeHosSelectedAllLeftHandler} ref="hosSelectedAllLeft"/>全选
								</span>
							</td>
							<td></td>
							<td className="title label">
								选中医院
								<span className="choose">
									<input type="checkbox" disabled={this.state.isDisabledHosSelectedAllRight} onChange={this.changeHosSelectedAllRightHandler} ref="hosSelectedAllRight"/>全选
								</span>
							</td>
						</tr>
						<tr>
							<td>
								<div className="hospital-container">
									<ul>
										{hospitalList.filter(item=>item.payType==2&&item.HOS_NAME.indexOf(this.state.keyword)!=-1).map((item,index)=>{
											const liClass = classSet({
												'selected': item.chosen,
												'exp': item.IS_EXPENSIVE,
												'hospital': true
											});
											const html = <li key={index} className={liClass} onClick={this.changeChosenHandler.bind(this,item)}>{item.HOS_NAME}</li>;
											return html;
										})}
									</ul>
								</div>
							</td>
							<td className="text-center">
								<span className={addHospitalClass} onClick={this.addHospitalHandler}> &gt;&gt; </span>
								<span className={removeHospitalClass} onClick={this.removeHospitalHandler}> &lt;&lt; </span>
								<span className={addExpHospitalClass} onClick={this.addExpHospitalHandler}>添加所有昂贵医院 </span>
								<span className={removeExpHospitalClass} onClick={this.removeExpHospitalHandler}>移除所有昂贵医院 </span>
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
													(<li key={index} className={liClass} onClick={this.changeChosenHandler.bind(this,item)}>{item.HOS_NAME}</li>) : null;
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
								{this.showEditBtn() ? <button className="btn" onClick={this.showHandler.bind(this,item,{
									count: 2,
									id: 'o'+item.libId+'editor0'+'-o'+item.libId+'editor1',
									nodeIndex: index+'',
									bind: 'benefitKeyDesc-benefitValueDesc'
								})}>{item.showEdit?'预览':'编辑'}</button> : null}
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
										<td className="editor" id={'o'+item.libId+'editor0'}></td>
										<td className="editor" id={'o'+item.libId+'editor1'}></td>
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
									const disabledPrevClass = classSet({
										'hide': !(!subItem.showEdit&&subItem.isPrev)
									});
									const abledPrevClass = classSet({
										'hide': !subItem.showEdit
									});
									const tdEditorClass = classSet({
										'hide': subItem.isPrev&&!!subIndex,
										'editor': true,
										'edui-default': true
									});
									return (
										<article key={subIndex} style={{marginLeft: "2em"}}>
											<nav>
												<div>{subItem.nodeTitle}</div>
												<hr/>
												{this.showEditBtn() ? <button className="btn" onClick={this.showHandler.bind(this,subItem,{
													count: 2,
													id: 'p'+subItem.libId+'editor0'+'-p'+subItem.libId+'editor1',
													nodeIndex: index+'-'+subIndex,
													bind: 'benefitKeyDesc-benefitValueDesc'
												})}>{subItem.showEdit?'预览':'编辑'}</button> : null}
											</nav>
											<table>
												<tbody>
													<tr>
														<td className="label">描述文字：</td>
														<td className="label">
															责任限额：
															{!!subIndex?(
																<span className="isPrev">
																	<span className={disabledPrevClass}>
																		<input type="checkbox" checked={subItem.isPrev} disabled="disabled"/>
																		与上一节点相同
																	</span>
																	<span className={abledPrevClass}>
																		<input type="checkbox" checked={subItem.isPrev} onChange={this.changeIsPrevHandler.bind(this,[index,subIndex])}/>
																		与上一节点相同
																	</span>
																</span>
															):null}
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
														<td className="editor" id={'p'+subItem.libId+'editor0'}></td>
														<td className={tdEditorClass} id={'p'+subItem.libId+'editor1'}></td>
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
								{this.showEditBtn() ? <button className="btn" onClick={this.showHandler.bind(this,item,{
									count: 1,
									id: 'o'+item.libId+'editor0',
									nodeIndex: index+'',
									bind: 'benefitKeyDesc'
								})}>{item.showEdit?'预览':'编辑'}</button> : null}
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
										<td className="editor" id={'o'+item.libId+'editor0'}></td>
									</tr>
								</tbody>
							</table>
						</article>
					) : isNodeType5 ? (
						<article key={index}>
							<nav className="nodeType5">
								<div>{item.nodeTitle}</div>
								<hr/>
								{this.showEditBtn() ? <button className="btn" onClick={this.showHandler.bind(this,item,{
									count:2,
									id:'o'+item.libId+'editor0'+'-o'+item.libId+'editor1',
									nodeIndex:index+'',
									bind:'benefitKeyDesc-benefitValueDesc'
								})}>{item.showEdit?'预览':'编辑'}</button> : null}
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
										<td className="editor" id={'o'+item.libId+'editor0'}></td>
										<td className="editor" id={'o'+item.libId+'editor1'}></td>
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
					<button className="btn" onClick={this.backHandler}>返回</button>
					{this.showPolicyBtn ? <button className="btn" onClick={this.saveHandler.bind(this,false)}>保存POLICY</button> : null}
					{this.showTemplateBtn ? <button className="btn" onClick={this.saveHandler.bind(this,true)}>保存模板</button> : null}
					{this.showEditBtn() ? <Link to="/pointchoose" className="btn">挑选节点</Link> : null}
					{this.showEditBtn() ? <Link to="/pointdrag" className="btn">调整排序</Link> : null}
				</header>
				<section>
					{baseHtml}
					{nodeHtml}
					{hospitalHtml}
				</section>
				<footer>
					<button className="btn" onClick={this.backHandler}>返回</button>
					{this.showPolicyBtn ? <button className="btn btn-primary" onClick={this.saveHandler.bind(this,false)}>保存POLICY</button> : null}
					{this.showTemplateBtn ? <button className="btn btn-primary" onClick={this.saveHandler.bind(this,true)}>保存模板</button> : null}
				</footer>
				<button className="btn toTop" onClick={this.toTopHandler}>Top</button>
			</section>
		)
	}
});

//导出组件
export default PolicyEdit;
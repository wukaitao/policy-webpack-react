import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const PointChoose = React.createClass({
	componentDidMount(){
		//默认加载内容
		this.props.page.initPolicyChosen();
		//this.props.router.setRouteLeaveHook(
		//	this.props.route,
		//	this.routerWillLeave
		//);
	},
	routerWillLeave(nextLocation){
		//返回false会停留当前页面
		//否则,返回一个字符串,会显示给用户,让其自己决定
		//if(!this.state.isSaved){
		//	return '内容还没有保存,确定要离开?';
		//};
	},
	back(){
		//返回
		hashHistory.goBack();
	},
	choose(){},
	chosenSome(){},
	chosenAll(p){},
	render(){
		const self = this;
		const data = this.props.policyDetail;
		const classSet = addons.classSet;
		const customNodeHeaderClass = classSet({
			'chosenSome': true,//this.chosenSome.bind(this,1),
			'chosenAll': true//this.chosenAll1
		});
		const hospitalNodeHeaderClass = classSet({
			'chosenSome': true,//this.chosenSome.bind(this,5),
			'chosenAll': true//this.chosenAll5
		});
		const classNodeHtml = <div></div>;
		const customNodeHtml = (
			<dl>
				<dt>
					<header className={customNodeHeaderClass} onClick={this.chosenAll.bind(this,1)}>自定义标题</header>
				</dt>
				{
					data.benefitList.map((item,index)=>{
						let nodeClass = classSet({
							'chosen': item.chosen
						});
						let resultHtml = item.nodeType==1 ? <dd key={index} className={nodeClass} onClick={self.choose.bind(this,item)}>{item.nodeTitle}</dd> : null;
						return resultHtml;
					})
				}
			</dl>
		);
		const hospitalNodeHtml = (
			<dl>
				<dt>
					<header className={hospitalNodeHeaderClass} onClick={this.chosenAll.bind(this,5)}>医院</header>
				</dt>
				{
					data.benefitList.map((item,index)=>{
						let nodeClass = classSet({
							'chosen': item.chosen
						});
						let resultHtml = item.nodeType==5 ? <dd key={index} className={nodeClass} onClick={self.choose.bind(this,item)}>{item.nodeTitle}</dd> : null;
						return resultHtml;
					})
				}
			</dl>
		);
		return (
			<section className="main point-choose">
				<section>
					<div className="title">挑选节点</div>
					{classNodeHtml}
					{customNodeHtml}
					{hospitalNodeHtml}
				</section>
				<footer>
					<button className="btn" onClick={this.back}>返回</button>
					<button className="btn btn-primary" onClick={this.back}>挑选完成</button>
				</footer>
			</section>
		)
	}
});

//导出组件
export default PointChoose;
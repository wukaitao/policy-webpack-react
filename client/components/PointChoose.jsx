﻿import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link} from 'react-router';
//声明组件
const PointChoose = React.createClass({
	back(){},
	chosenAll(p){},
	render(){
		const self = this;
		const data = this.props.policyDetailData.data;
		const classSet = addons.classSet;
		const customNodeHeaderClass = classSet({
			'chosenSome': this.chosenSome.bind(this,1),
			'chosenAll': this.chosenAll1
		});
		const hospitalNodeHeaderClass = classSet({
			'chosenSome': this.chosenSome.bind(this,5),
			'chosenAll': this.chosenAll5
		});
		const classNodeHtml = <div>分类节点</div>;
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
				{classNodeHtml}
				{customNodeHtml}
				{hospitalNodeHtml}
				<button className="btn btn-primary" onClick={this.back}>挑选完成</button>
			</section>
		)
	}
});

//导出组件
export default PointChoose;
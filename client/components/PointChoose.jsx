import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const PointChoose = React.createClass({
	componentDidMount(){
		//默认加载内容
		this.props.page.initPolicyChosen();
	},
	componentWillUnmount(){
		//保存当前路径
		localStorage.setItem('fromPath',this.props.route.path);
		setTimeout(()=>{
			localStorage.removeItem('fromPath');
		},100);
	},
	back(flag){
		//取消挑选/挑选完成
		const param = {flag};
		this.props.page.filterChosen(param);
		hashHistory.goBack();
	},
	changeChosen(one,parent={}){
		//切换子节点/自定义标题节点/医院节点的选择
		const param = {
			parentLibId: parent.libId?parent.libId:'',
			libId: one.libId
		};
		this.props.page.changeChosen(param);
	},
	changeChosenAll(one,flag=false){
		//选择全部子节点/自定义标题节点/医院节点的选择
		const param = {one,flag};
		this.props.page.changeChosenAll(param);
	},
	render(){
		const self = this;
		const data = this.props.policyDetail.benefitList;
		const classNodeData = data.filter(item=>item.nodeType==2);
		const customNodeData = data.filter(item=>item.nodeType==1);
		const hospitalNodeData = data.filter(item=>item.nodeType==5);
		const isChosenAllCustom = customNodeData.length==customNodeData.filter(item=>item.chosen).length;
		const isChosenAllHospital = hospitalNodeData.length==hospitalNodeData.filter(item=>item.chosen).length;
		const classSet = addons.classSet;
		const customNodeHeaderClass = classSet({
			'chosenSome': customNodeData.length>customNodeData.filter(item=>item.chosen).length&&customNodeData.filter(item=>item.chosen).length,
			'chosenAll': isChosenAllCustom
		});
		const hospitalNodeHeaderClass = classSet({
			'chosenSome': hospitalNodeData.length>hospitalNodeData.filter(item=>item.chosen).length&&hospitalNodeData.filter(item=>item.chosen).length,
			'chosenAll': isChosenAllHospital
		});
		const classNodeHtml = (
			<div>
				{classNodeData.map((item,index)=>{
					const classNodeClass = classSet({
						'chosenSome': item.chosenSome,
						'chosenAll': item.chosenAll
					});
					return <dl key={index}>
						<dt>
							<header className={classNodeClass} onClick={this.changeChosenAll.bind(this,item)}>{item.nodeTitle}</header>
						</dt>
						{item.children.map((subItem,subIndex)=>{
							const nodeClass = classSet({
								'chosen': subItem.chosen
							});
							return <dd key={subIndex} className={nodeClass} onClick={this.changeChosen.bind(this,subItem,item)}>{subItem.nodeTitle}</dd>;
						})}
					</dl>;
				})}
			</div>
		);
		const customNodeHtml = (
			<dl>
				<dt>
					<header className={customNodeHeaderClass} onClick={this.changeChosenAll.bind(this,1,isChosenAllCustom)}>自定义标题</header>
				</dt>
				{customNodeData.map((item,index)=>{
					const nodeClass = classSet({
						'chosen': item.chosen
					});
					return <dd key={index} className={nodeClass} onClick={this.changeChosen.bind(this,item)}>{item.nodeTitle}</dd>;
				})}
			</dl>
		);
		const hospitalNodeHtml = (
			<dl>
				<dt>
					<header className={hospitalNodeHeaderClass} onClick={this.changeChosenAll.bind(this,5,isChosenAllHospital)}>医院</header>
				</dt>
				{hospitalNodeData.map((item,index)=>{
					const nodeClass = classSet({
						'chosen': item.chosen
					});
					return <dd key={index} className={nodeClass} onClick={this.changeChosen.bind(this,item)}>{item.nodeTitle}</dd>;
				})}
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
					<button className="btn" onClick={this.back.bind(this,false)}>取消挑选</button>
					<button className="btn btn-primary" onClick={this.back.bind(this,true)}>挑选完成</button>
				</footer>
			</section>
		)
	}
});

//导出组件
export default PointChoose;
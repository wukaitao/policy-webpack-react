import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
const oDrag = {target: null};
//声明组件
const PointDrag = React.createClass({
	componentDidMount(){
		//保存初始化排序
		this.props.page.initOrder();
	},
	componentWillUnmount(){
		//保存当前路径
		localStorage.setItem('fromPath',this.props.route.path);
		setTimeout(()=>{
			localStorage.removeItem('fromPath');
		},100);
	},
	backHandler(flag){
		//完成排序/取消排序
		const param = {
			eventType: flag?'ok':'reset'
		};
		this.props.page.refreshOrder(param);
		hashHistory.goBack();
	},
	caseDragStart(one,event){
		//分类/自定义标题节点/医院节点-拖拽开始
		event.dataTransfer.effectAllowed = 'move';
		oDrag.target = one;
	},
	caseDragOver(one,event){
		//分类/自定义标题节点/医院节点-拖拽进行中
		event.preventDefault();
		[2,1,5].indexOf(oDrag.target.nodeType)!=-1&&(event.dataTransfer.dropEffect=one.parentId==oDrag.target.parentId?'move':'none');
		[2,1,5].indexOf(oDrag.target.nodeType)!=-1||(event.dataTransfer.dropEffect='none');
	},
	caseDrop(one,event){
		//分类/自定义标题节点/医院节点-拖拽释放
		const param = {
			eventType: 'case',
			target: oDrag.target,
			one
		};
		[2,1,5].indexOf(oDrag.target.nodeType)!=-1&&this.props.page.refreshOrder(param);
	},
	pointDragStart(one,event){
		//子节点-拖拽开始
		event.stopPropagation();
		event.dataTransfer.effectAllowed = 'move';
		oDrag.target = one;
	},
	pointDragOver(one,event){
		//子节点-拖拽进行中
		event.preventDefault();
		event.stopPropagation();
		[3,4].indexOf(oDrag.target.nodeType)!=-1&&(event.dataTransfer.dropEffect=oDrag.target.parentId==one.parentId?'move':'none');
	},
	pointDrop(one,event){
		//子节点-拖拽释放
		const param = {
			eventType: 'point',
			target: oDrag.target,
			one
		};
		event.stopPropagation();
		[3,4].indexOf(oDrag.target.nodeType)!=-1&&this.props.page.refreshOrder(param);
	},
	render(){
		const self = this;
		const data = this.props.policyDetail.benefitList;
		return (
			<section className="main point-drag">
				<section>
					<div className="title">调整排序</div>
					{data.map((item,index)=>{
						return (
							<dl key={index} 
								draggable="true"
								onDragStart={this.caseDragStart.bind(this,item)}
								onDragOver={this.caseDragOver.bind(this,item)} 
								onDrop={this.caseDrop.bind(this,item)}>
								<dt>
									<header className="chosen">{item.nodeTitle}</header>
								</dt>
								{item.nodeType==2 ? item.children.map((subItem,subIndex)=>{
									return (
										<dd key={subIndex} 
											className="chosen"
											draggable="true"
											onDragStart={this.pointDragStart.bind(this,subItem)} 
											onDragOver={this.pointDragOver.bind(this,subItem)} 
											onDrop={this.pointDrop.bind(this,subItem)}>
											{subItem.nodeTitle}
										</dd>
									)
								}) : null}
							</dl>
						)
					})}
				</section>
				<footer>
					<button className="btn" onClick={this.backHandler.bind(this,false)}>取消</button>
					<button className="btn btn-primary" onClick={this.backHandler.bind(this,true)}>完成</button>
				</footer>
			</section>
		)
	}
});

//导出组件
export default PointDrag;
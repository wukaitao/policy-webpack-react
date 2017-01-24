import React,{PropTypes} from 'react';
import {Link} from 'react-router';
//声明组件
const PointManage = React.createClass({
	componentWillMount(){
		//默认加载列表
		this.getAllPoint();
	},
	getAllPoint(){
		this.props.queryAllPoint();
	},
	modifycate(id){
		this.props.router.push('/cateedit/'+id);
	},
	createPoint(parentId){
		this.props.router.push('/pointadd/3/'+parentId);
	},
	modifyPoint(pointId){
		this.props.router.push('/pointedit/'+pointId);
	},
	render(){
		const self = this;
		const data = this.props.allPointData;
		const classNodeHtml = data.map((item,index)=>{
			let resultHtml = item.nodeType==2 ? (
			    <dl key={index}>
			    	<dt>
			    		<header onClick={self.modifycate.bind(this,item.libId)}>{item.nodeTitle}</header>
			    	</dt>
			      	{
			      		item.children.map((subItem,subIndex)=>{
			      			return <dd key={subIndex} onClick={self.modifyPoint.bind(this,subItem.libId)}>{subItem.nodeTitle}</dd>;
			      		})
			      	}
			    	<dd className="btn" onClick={self.createPoint.bind(this,item.libId)}>+新建节点</dd>
			    </dl>
			) : null;
			return resultHtml;
		});
		const customNodeHtml = (
			<dl>
				<dt>
					<header>自定义标题</header>
				</dt>
				{
					data.map((item,index)=>{
						let resultHtml = item.nodeType==1 ? (
							<dd key={index} onClick={self.modifycate.bind(this,item.libId)}>{item.nodeTitle}</dd>
						) : null;
						return resultHtml;
					})
				}
		    	<dd className="btn">
		    		<Link to="/cateadd/1">+新建自定义标题节点</Link>
		    	</dd>
			</dl>
		);
		const hospitalNodeHtml = (
			<dl>
				<dt>
					<header>医院</header>
				</dt>
				{
					data.map((item,index)=>{
						let resultHtml = item.nodeType==5 ? (
							<dd key={index} onClick={self.modifycate.bind(this,item.libId)}>{item.nodeTitle}</dd>
						) : null;
						return resultHtml;
					})
				}
		    	<dd className="btn">
		    		<Link to="/cateadd/5">+新建医院节点</Link>
		    	</dd>
			</dl>
		);
		return (
			<section className="main point-manage">
				{classNodeHtml}
				<dl>
					<dd className="btn">
						<Link to="/cateadd/2">+新建分类</Link>
					</dd>
				</dl>
				{customNodeHtml}
				{hospitalNodeHtml}
			</section>
		)
	}
});

//导出组件
export default PointManage;
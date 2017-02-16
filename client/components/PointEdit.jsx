import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const PointEdit = React.createClass({
	componentWillMount(){
		//this.saveAddTemplateNode();
		//this.saveUpdateTemplateNode();
	},
	saveAddTemplateNode(){
		const param = {};
		this.props.addTemplateNode(param);
	},
	saveUpdateTemplateNode(){
		const param = {};
		this.props.updateTemplateNode(param);
	},
	initPagePath(){
		return {
			type: this.props.params.type,
			id: this.props.params.id,
			parentId: this.props.params.parentId,
			pointId: this.props.params.pointId,
			pagePath: this.props.route.path,
			cateAddPath: '/cateadd/:type',
			cateEditPath: '/cateedit/:type/:id',
			pointAddPath: '/pointadd/:type/:parentId',
			pointEditPath: '/pointedit/:pointId'
		};
	},
	render(){
		const initPagePath = this.initPagePath();
		const path = initPagePath.pagePath;
		const actionText = path==initPagePath.cateAddPath||path==initPagePath.pointAddPath ? '创建' : '修改';
		const typeText = path==initPagePath.pointAddPath||path==initPagePath.pointEditPath ? '节点' :
						 initPagePath.type== '2' ? '分类' :
						 initPagePath.type== '1' ? '自定义标题节点' :
						 initPagePath.type== '5' ? '医院节点' : '';
		return (
			<section className="main point-edit">
				<div className="title">{actionText+typeText}</div>
				<div className="content">
				    <div className="label">{typeText}名称</div>
				    <div className="label">
				    	<input type="text" className="ipt"/>
				    </div>
				    <div className="label">* 不会在页面显示</div>
				</div>
				<div className="content">
					<div className="label">描述文字</div>
					<div className="label">
						<div id="editor"></div>
					</div>
					<div className="label">* 会在页面显示</div>
				</div>
				<div className="content">
					<div className="label">责任限额</div>
					<div className="label">
						<div id="editor2"></div>
					</div>
					<div className="label">* 会在页面显示</div>
				</div>
				<div className="content">
					<div className="label">
						<button type="button" className="btn btn-primary">保存</button>
					</div>
				</div>
			</section>
		)
	}
});

//导出组件
export default PointEdit;
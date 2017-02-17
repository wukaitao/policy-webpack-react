import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const PointEdit = React.createClass({
	getInitialState(){
		return {
			isRequesting: false
		};
	},
	componentDidMount(){
		//获取节点内容
		const self = this;
		const initPagePath = this.initPagePath();
		const path = initPagePath.pagePath;
		const isCateAddPath = path==initPagePath.cateAddPath;
		const isCateEditPath = path==initPagePath.cateEditPath;
		const isPointAddPath = path==initPagePath.pointAddPath;
		const isPointEditPath = path==initPagePath.pointEditPath;
		const param = {
			eventType: isCateAddPath?'cateadd':isCateEditPath?'cateedit':isPointAddPath?'pointadd':isPointEditPath?'pointedit':'',
			type: initPagePath.type,
			id: initPagePath.id,
			parentId: initPagePath.parentId,
			pointId: initPagePath.pointId
		};
		this.props.page.getPointData(param);
		//渲染编辑器
		setTimeout(()=>{
			UE.getEditor('editor0',{
				initialFrameWidth: 550,
				initialFrameHeight: 250,
				scaleEnabled: true
			}).ready(function(){
				this.setContent(self.props.pointData.benefitKeyDesc);
			});
			if(initPagePath.type!=1){
				UE.getEditor('editor1',{
					initialFrameWidth: 550,
					initialFrameHeight: 250,
					scaleEnabled: true
				}).ready(function(){
					this.setContent(self.props.pointData.benefitValueDesc);
				});
			};
		});
	},
	componentWillUnmount(){
		//销毁编辑器
		UE.getEditor('editor0').destroy();
		const initPagePath = this.initPagePath();
		initPagePath.type!=1&&UE.getEditor('editor1').destroy();
	},
	initPagePath(){
		//获取路由信息
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
	changeNodeTitle(){
		//改变节点标题
		const param = {
			nodeTitle: this.refs.nodeTitle.value
		};
		this.props.page.changeNodeTitle(param);
	},
	back(){
		hashHistory.push('pointmanage');
	},
	save(){
		//保存
		if(this.state.isRequesting)return;
		const self = this;
		const initPagePath = this.initPagePath();
		const path = initPagePath.pagePath;
		const isCateAddPath = path==initPagePath.cateAddPath;
		const isCateEditPath = path==initPagePath.cateEditPath;
		const isPointAddPath = path==initPagePath.pointAddPath;
		const isPointEditPath = path==initPagePath.pointEditPath;
		const isCustomPath = initPagePath.type==1;
		const typeText = path==initPagePath.pointAddPath||path==initPagePath.pointEditPath ? '节点' :
						 initPagePath.type== 2 ? '分类' :
						 initPagePath.type== 1 ? '自定义标题节点' :
						 initPagePath.type== 5 ? '医院节点' : '';
		var param = {
			nodeTitle: escape(this.refs.nodeTitle.value),
			benefitKeyDesc: escape(UE.getEditor('editor0').getContent()),
			benefitValueDesc: isCustomPath?'':escape(UE.getEditor('editor1').getContent())
		};
		//校验
		if(!param.nodeTitle){
			this.props.popup.dialogOpen({
				type: 'alert',
				message: typeText+'名称不能为空'
			});
			return;
		}else if(!param.benefitKeyDesc){
			this.props.popup.dialogOpen({
				type: 'alert',
				message: '描述文字不能为空'
			});
			return;
		}else if(!isCustomPath&&!param.benefitValueDesc){
			this.props.popup.dialogOpen({
				type: 'alert',
				message: '责任限额不能为空'
			});
			return;
		};
		//入参
		if(isPointEditPath){
			//修改节点
			param.libId = this.props.pointData.libId;
			param.eventType = 'pointedit';
		}else if(isPointAddPath){
			//新增节点
			param.nodeType = 3;
			param.orderId = 99999;
			param.parentId = initPagePath.parentId;
			param.eventType = 'pointadd';
		}else if(isCateEditPath){
			//修改分类
			param.libId = this.props.pointData.libId;
			param.nodeType = this.props.pointData.nodeType;
			param.eventType = 'cateedit';
		}else if(isCateAddPath){
			//新增分类
			param.nodeType = initPagePath.type;
			param.orderId = 99999;
			param.parentId = 0;
			param.eventType = 'cateadd';
		};
		//保存
		this.setState({isRequesting: true});
		this.props.page.savePoint(param,function(){
			hashHistory.push('pointmanage');
		},function(){
			self.setState({
				isRequesting: false
			});
		});
	},
	render(){
		const initPagePath = this.initPagePath();
		const path = initPagePath.pagePath;
		const actionText = path==initPagePath.cateAddPath||path==initPagePath.pointAddPath ? '创建' : '修改';
		const typeText = path==initPagePath.pointAddPath||path==initPagePath.pointEditPath ? '节点' :
						 initPagePath.type== 2 ? '分类' :
						 initPagePath.type== 1 ? '自定义标题节点' :
						 initPagePath.type== 5 ? '医院节点' : '';
		const classSet = addons.classSet;
		const benefitValueDescClass = classSet({
			'hide': initPagePath.type==1,
			'content': true
		});
		const btnClass = classSet({
			'btn-disabled': this.state.isRequesting,
			'btn-primary': !this.state.isRequesting,
			'btn': true
		});
		const btnText = this.state.isRequesting?'保存中...':'保存';
		const data = this.props.pointData;
		return (
			<section className="main point-edit">
				<div className="title">{actionText+typeText}</div>
				<div className="content">
				    <div className="label">{typeText}名称</div>
				    <div className="label">
				    	<input type="text" className="ipt" value={data.nodeTitle} onChange={this.changeNodeTitle} ref="nodeTitle"/>
				    </div>
				    <div className="label">* 不会在页面显示</div>
				</div>
				<div className="content">
					<div className="label">描述文字</div>
					<div className="label">
						<div id="editor0"></div>
					</div>
					<div className="label">* 会在页面显示</div>
				</div>
				<div className={benefitValueDescClass}>
					<div className="label">责任限额</div>
					<div className="label">
						<div id="editor1"></div>
					</div>
					<div className="label">* 会在页面显示</div>
				</div>
				<div className="content">
					<div className="btn-area">
						<button type="button" className="btn" onClick={this.back}>返回</button>
						<button type="button" className={btnClass} onClick={this.save}>{btnText}</button>
					</div>
				</div>
			</section>
		)
	}
});

//导出组件
export default PointEdit;
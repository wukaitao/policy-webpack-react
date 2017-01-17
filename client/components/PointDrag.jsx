import React,{PropTypes} from 'react';
import {Link} from 'react-router';
const dragObj = {};
//声明组件
const PointDrag = React.createClass({
	back(){},
	pDragStart(event,obj){},
	cDragStart(event,obj){},
	pDragOver(event,obj){},
	cDragOver(event,obj){},
	pDrop(event,obj){},
	cDrop(event,parent,obj){},
	render(){
		const self = this;
		const data = this.props.policyDetailData.data;
		const pointHtml = data.benefitList.map((item,index)=>{
			const childrenPointHtml = item.children.map((subItem,subIndex)=>{
				return(
					<dd className="chosen" draggable="true" 
						onDragstart={self.cDragStart.bind(this,$event,subItem)} 
						onDragover={self.cDragOver.bind(this,$event,subItem)} 
						onDrop={self.cDrop.bind(this,$event,item,subItem)}>
						{subItem.nodeTitle}
					</dd>
				);
			});
			const resultHtml = (
				<dl draggable="true" 
					onDragstart={self.pDragStart.bind(this,$event,item)}
					onDragover={self.pDragOver.bind(this,$event,item)} 
					onDrop={self.pDrop.bind(this,$event,item)}>
					<dt>
						<header className="chosen">{item.nodeTitle}</header>
					</dt>
					{childrenPointHtml}
				</dl>
			);
		});
		return (
			<section className="main point-drag">
				{pointHtml}
				<button className="btn btn-primary" onClick={this.back}>完成</button>
			</section>
		)
	}
});

//导出组件
export default PointDrag;
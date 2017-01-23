﻿import React,{PropTypes} from 'react';
//声明组件
const Popup = React.createClass({
	componentWillUpdate(){
		console.log('popup componentWillUpdate');
	},
	openDialog(param){
		this.props.dialogOpen(param);
	},
	closeDialog(){
		//关闭弹窗
		let param = {result: false};
		this.props.dialogCancel(param);
	},
	confirmDialog(){
		//确认操作
		let param = {result: true};
		if(this.props.pageStatus.dialog.type=='alert') this.closeDialog();
		else this.props.dialogCancel(param);
	},
	render(){
		console.log('popup render.');
		const data = this.props.pageStatus;
		const loadingHtml = (
			<div className="cover">
				<div className="loading">
					<div className="box">
						<div className="contaier-one">
							<span className="rect-odd"></span>
							<span className="rect-even"></span>
						</div>
						<div className="contaier-two">
							<span className="rect-odd"></span>
							<span className="rect-even"></span>
						</div>
						<div className="contaier-three">
							<span className="rect-odd"></span>
							<span className="rect-even"></span>
						</div>
						<div className="contaier-four">
							<span className="rect-odd"></span>
							<span className="rect-even"></span>
						</div>
						<div className="contaier-five">
							<span className="rect-odd"></span>
							<span className="rect-even"></span>
						</div>
						<div className="contaier-sixe">
							<span className="rect-odd"></span>
							<span className="rect-even"></span>
						</div>
					</div>
					<p>加载中...</p>
				</div>
			</div>
		);
		return (
			<footer className="foot popup">
				{data&&data.isLoading ? loadingHtml : null}
			</footer>
		)
	}
});

//导出组件
export default Popup;
import React,{PropTypes} from 'react';
import addons from 'react-addons';
//声明组件
const Popup = React.createClass({
	closeDialog(){
		//关闭弹窗
		const param = {
			result: false
		};
		this.props.dialogCancel(param);
	},
	confirmDialog(){
		//确认操作
		const self = this;
		const param = {
			result: true
		};
		if(this.props.pageStatus.dialog.type=='alert'||this.props.pageStatus.dialog.type=='window') this.closeDialog();
		else this.props.dialogCancel(param,function(){
			self.props.pageStatus.dialog.callback.call(this);
		});
	},
	render(){
		const data = this.props.pageStatus;
		const classSet = addons.classSet;
		const dialogClass = classSet({
			'show': data.dialog.show,
			'dialog': true
		});
		const iToastClass = data.dialog.icon=='' ? 'icon-circle-cross' : data.dialog.icon;
		const iConfirmClass = data.dialog.icon=='' ? 'icon-question' : data.dialog.icon;
		const iAlertClass = data.dialog.icon=='' ? 'icon-notification' : data.dialog.icon;
		const iTipsClass = data.dialog.icon=='' ? 'icon-info' : data.dialog.icon;
		const iClass = data.dialog.type=='confirm' ? iConfirmClass : 
					   data.dialog.type=='alert' ? iAlertClass : 
					   data.dialog.type=='tips' ? iTipsClass : 'hide';
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
		const dialogHtml = (
			<div className={dialogClass}>
				<div className="dialog-wrap">
					{data.dialog.type=='toast' ? (
						<div className="toast-box">
							<i className={iToastClass}></i>
							<p dangerouslySetInnerHTML={{__html: data.dialog.message}}></p>
						</div>
					) : (
						<div className="dialog-box" style={{width:data.dialog.style.width+'px'}}>
							<div className="dialog-title">
								<i onClick={this.closeDialog} className="icon-cross"></i>
								{data.dialog.title}
							</div>
							<div className="dialog-content" style={{
								height: data.dialog.style.maxHeight?'auto':data.dialog.style.height-66+'px'
							}}>
								<i className={iClass}></i>
								<p dangerouslySetInnerHTML={{__html: data.dialog.message}} style={{
									minHeight: data.dialog.style.maxHeight?data.dialog.style.height-76+'px':'100%',
									maxHeight: data.dialog.style.maxHeight?data.dialog.style.maxHeight+'px':'auto'
								}}></p>
							</div>
							<div className="dialog-toolbar">
								<button onClick={this.confirmDialog} className="btn btn-primary">确定</button>
								{data.dialog.type=='confirm' ? <button onClick={this.closeDialog} className="btn">取消</button> : null}
							</div>
						</div>
					)}
				</div>
			</div>
		);
		return (
			<footer className="foot popup">
				{data&&data.isLoading ? loadingHtml : null}
				{dialogHtml}
			</footer>
		)
	}
});

//导出组件
export default Popup;
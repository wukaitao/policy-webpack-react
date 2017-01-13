import React,{PropTypes} from 'react';
//声明组件
const Popup = React.createClass({
	render(){
		console.log('ok.');
		const loadingHtml = (
			<div className="cover">
				<div className="loading">
					<div className="box">
						<div className="contaier-one">
							<span className="rect-odd"></span><span className="rect-even"></span>
						</div>
						<div className="contaier-two">
							<span className="rect-odd"></span><span className="rect-even"></span>
						</div>
						<div className="contaier-three">
							<span className="rect-odd"></span><span className="rect-even"></span>
						</div>
						<div className="contaier-four">
							<span className="rect-odd"></span><span className="rect-even"></span>
						</div>
						<div className="contaier-five">
							<span className="rect-odd"></span><span className="rect-even"></span>
						</div>
						<div className="contaier-sixe">
							<span className="rect-odd"></span><span className="rect-even"></span>
						</div>
					</div>
					<p>加载中...</p>
				</div>
			</div>
		);
		return false;
		return (
			<footer className="foot popup">
				{loadingHtml}
			</footer>
		)
	}
});

//导出组件
export default Popup;
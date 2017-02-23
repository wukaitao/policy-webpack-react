import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//字母列表高度设置
function resizeLetterList(){
	const letterListHeight = $('.letter-list').height();
	const letterListLength = $('.letter-list span').length;
	if(!letterListLength) return;
	$('.letter-list span').css({
		'height': letterListHeight/letterListLength+'px',
		'lineHeight': letterListHeight/letterListLength+'px'
	});
};
//声明组件
const PointManage = React.createClass({
	getInitialState(){
		return {
			currentTabType: 'nodeType2',
			letter: '',
			keyword: ''
		};
	},
	componentDidMount(){
		//默认加载列表
		this.getAllPoint();
	    //窗口改变调整字母列表高度
	  	$(window).resize(function(){
	  		resizeLetterList();
	  	});
	},
	componentDidUpdate(){
		resizeLetterList();
	},
	getAllPoint(){
		const param = {
			eventType: 'init',
			keyword: this.state.keyword
		};
		this.props.getPointList(param);
	},
	cateEditHandler(one,type){
		//编辑分类/自定义节点/医院节点
		hashHistory.push('/cateedit/'+type+'/'+one.libId);
	},
	pointAddHandler(one){
		//新建子节点
		hashHistory.push('/pointadd/3/'+one.libId);
	},
	pointEditHandler(one){
		//编辑子节点
		hashHistory.push('/pointedit/'+one.libId);
	},
	changeCurrentTabTypeHandler(type){
		//切换页签
		this.setState({
			currentTabType: type
		});
	},
	caseFilterHandler(){
		//筛选分类
		this.setState({
			keyword: this.refs.keyword.value
		});
		const param = {
			eventType: 'filter',
			keyword: this.refs.keyword.value
		};
		this.props.filterAllPoint(param);
	},
	pointFilterHandler(one){
		//筛选节点
		const param = {
			keyword: this.refs['point'+one.libId].value,
			one
		};
		this.props.filterPoint(param);
	},
	toggleSearchboxHandler(one,event){
		//切换筛选节点的显示状态
		const self = this;
		const param = {one};
    	$(event.target).siblings().animate({
    		'width': one.isShowSearchbox?'0px':'164px'
    	},'fast',function(){
    		self.props.toggleSearchbox(param);
    	});
	},
	clearKeywordHandler(one){
		//清除筛选节点的关键字
		const param = {
			keyword: '',
			one
		};
		this.props.filterPoint(param);
	},
	pageScrollToHandler(one){
		//点击字母滚动页面
  		$('.letter-list').css({
  			'background': 'rgba(145,145,145,0.6)'
  		});
  		this.setState({
  			letter: one
  		});
  		$('.letter-text').fadeIn();
  		setTimeout(function(){
  			$('.letter-list').css({
  				'background': 'rgba(145,145,145,0)'
  			});
  			$('.letter-text').fadeOut();
  		},1000);
  		var letterTop = 0;
  		if(one=='#'){
  			letterTop = $('#default').position().top;
  		}else{
  			letterTop = $('#'+one).position().top;
  		};
    	$('html,body').animate({
    		scrollTop: letterTop+'px'
    	}, 300);
	},
	render(){
		const self = this;
		const classSet = addons.classSet;
		const data = this.props.pointList;
		const tab2Class = classSet({
			'selected': this.state.currentTabType=='nodeType2',
			'tab': true
		});
		const tab1Class = classSet({
			'selected': this.state.currentTabType=='nodeType1',
			'tab': true
		});
		const tab5Class = classSet({
			'selected': this.state.currentTabType=='nodeType5',
			'tab': true
		});
		const searchCaseClass = classSet({
			'active': !!this.state.keyword,
			'hide': this.state.currentTabType!='nodeType2',
			'searchbox': true
		});
		const classNodeClass = classSet({
			'hide': this.state.currentTabType!='nodeType2',
			'case-wrap': true
		});
		const customNodeClass = classSet({
			'hide': this.state.currentTabType!='nodeType1'
		});
		const hospitalNodeClass = classSet({
			'hide': this.state.currentTabType!='nodeType5'
		});
		const letterOptionHtml = [];
		self.props.letterList.forEach((item,index)=>{
			letterOptionHtml.push(
				<span key={index} onClick={this.pageScrollToHandler.bind(this,item)}>{item}</span>
			);
		});
		const tabHtml = (
		  	<div className="tab-wrap">
		  		<span className="tab-container">
		  			<span className={tab2Class} onClick={this.changeCurrentTabTypeHandler.bind(this,'nodeType2')}>分类</span>
		  			<span className={tab1Class} onClick={this.changeCurrentTabTypeHandler.bind(this,'nodeType1')}>自定义标题节点</span>
		  			<span className={tab5Class} onClick={this.changeCurrentTabTypeHandler.bind(this,'nodeType5')}>医院节点</span>
		  		</span>
		  		<span className={searchCaseClass}>
		  			<input type="text" placeholder="请输入分类关键字" value={this.state.keyword} onChange={this.caseFilterHandler} ref="keyword"/>
		  			<span className="icon icon-search"></span>
		  		</span>
		  	</div>
	  	);
		const classNodeHtml = (
			<div className={classNodeClass}>
				{data.filter(item=>item.nodeType==2).map((item,index)=>{
					const searchPointClass = classSet({
						'active': !!item.keyword,
						'searchbox': true
					});
					const iToggleClass = classSet({
						'icon-angle-left': item.isShowSearchbox,
						'icon-angle-right': !item.isShowSearchbox,
						'icon': true
					});
					const iClearClass = classSet({
						'hide': !item.isShowSearchbox,
						'clear': true,
						'icon-cross': true
					});
					const letterId = !item.firstLetter ? '' : item.firstLetter=='#' ? 'default' : item.firstLetter;
					return (
					    <dl key={index}>
					    	{item.firstLetter?(
					    		<dd id={letterId} className="letter">{item.firstLetter}</dd>
					    	):null}
					    	<dt>
					    		<header onClick={self.cateEditHandler.bind(this,item,2)}>{item.nodeTitle}</header>
						      	<span className={searchPointClass}>
						      		<i onClick={this.toggleSearchboxHandler.bind(this,item)} className={iToggleClass}></i>
						      		<span className="inputbox">
							      		<input type="text" placeholder="请输入节点关键字" value={item.keyword} onChange={this.pointFilterHandler.bind(this,item)} ref={'point'+item.libId}/>
							      		<span onClick={this.clearKeywordHandler.bind(this,item)} className={iClearClass}></span>
						      		</span>
						      	</span>
					    	</dt>
					      	{item.children.filter(subItem=>subItem.nodeTitle.indexOf(item.keyword)!=-1).map((subItem,subIndex)=>{
				      			return <dd key={subIndex} onClick={self.pointEditHandler.bind(this,subItem)}>{subItem.nodeTitle}</dd>;
				      		})}
					    	<dd className="btn" onClick={self.pointAddHandler.bind(this,item)}>+新建节点</dd>
					    </dl>
					);
				})}
				<dl>
					<dd className="btn">
						<Link to="/cateadd/2" className="btn add">+新建分类</Link>
					</dd>
				</dl>
				<div className="letter-list">
					{letterOptionHtml}
				</div>
  				<div className="letter-text">{this.state.letter}</div>
			</div>
		);
		const customNodeHtml = (
			<dl className={customNodeClass}>
				<dt>
					<header>自定义标题</header>
				</dt>
				{data.filter(item=>item.nodeType==1).map((item,index)=>{
					return <dd key={index} onClick={self.cateEditHandler.bind(this,item,1)}>{item.nodeTitle}</dd>;
				})}
		    	<dd className="btn">
		    		<Link to="/cateadd/1" className="btn add">+新建自定义标题节点</Link>
		    	</dd>
			</dl>
		);
		const hospitalNodeHtml = (
			<dl className={hospitalNodeClass}>
				<dt>
					<header>医院</header>
				</dt>
				{data.filter(item=>item.nodeType==5).map((item,index)=>{
					return <dd key={index} onClick={self.cateEditHandler.bind(this,item,5)}>{item.nodeTitle}</dd>;
				})}
		    	<dd className="btn">
		    		<Link to="/cateadd/5" className="btn add">+新建医院节点</Link>
		    	</dd>
			</dl>
		);
		return (
			<section className="main point-manage">
				{tabHtml}
				{classNodeHtml}
				{customNodeHtml}
				{hospitalNodeHtml}
			</section>
		);
	}
});

//导出组件
export default PointManage;
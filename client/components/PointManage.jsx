import React,{PropTypes} from 'react';
import addons from 'react-addons';
import {Link} from 'react-router';
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
		this.props.queryAllPoint(param);
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
	changeCurrentTabType(type){
		//切换页签
		this.setState({
			currentTabType: type
		});
	},
	caseFilter(){
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
	pointFilter(one){
		//筛选节点
	},
	toggleSearchbox(one){
		//切换筛选节点的显示状态
	},
	clearKeyword(one){
		//清除筛选节点的关键字
	},
	pageScrollTo(one){
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
		const data = this.props.allPointData;
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
		const letterOptionHtml = [];
		self.props.letterList.forEach((item,index)=>{
			letterOptionHtml.push(
				<span key={index} onClick={this.pageScrollTo.bind(this,item)}>{item}</span>
			);
		});
		const tabHtml = (
		  	<div className="tab-wrap">
		  		<span className="tab-container">
		  			<span className={tab2Class} onClick={this.changeCurrentTabType.bind(this,'nodeType2')}>分类节点</span>
		  			<span className={tab1Class} onClick={this.changeCurrentTabType.bind(this,'nodeType1')}>自定义标题节点</span>
		  			<span className={tab5Class} onClick={this.changeCurrentTabType.bind(this,'nodeType5')}>医院节点</span>
		  		</span>
		  		<span className={searchCaseClass}>
		  			<input type="text" placeholder="请输入分类关键字" value={this.state.keyword} onChange={this.caseFilter} ref="keyword"/>
		  			<span className="icon icon-search"></span>
		  		</span>
		  	</div>
	  	);
		const classNodeHtml = (
			<div className="case-wrap">
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
					    		<header onClick={self.modifycate.bind(this,item.libId)}>{item.nodeTitle}</header>
						      	<span className={searchPointClass}>
						      		<i onClick={this.toggleSearchbox.bind(this,item)} className={iToggleClass}></i>
						      		<span className="inputbox">
							      		<input type="text" placeholder="请输入节点关键字" value={item.keyword} onChange={this.pointFilter.bind(this,item)}/>
							      		<span onClick={this.clearKeyword.bind(this,item)} className={iClearClass}></span>
						      		</span>
						      	</span>
					    	</dt>
					      	{item.children.map((subItem,subIndex)=>{
				      			return <dd key={subIndex} onClick={self.modifyPoint.bind(this,subItem.libId)}>{subItem.nodeTitle}</dd>;
				      		})}
					    	<dd className="btn" onClick={self.createPoint.bind(this,item.libId)}>+新建节点</dd>
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
			<dl>
				<dt>
					<header>自定义标题</header>
				</dt>
				{data.filter(item=>item.nodeType==1).map((item,index)=>{
					return <dd key={index} onClick={self.modifycate.bind(this,item.libId)}>{item.nodeTitle}</dd>;
				})}
		    	<dd className="btn">
		    		<Link to="/cateadd/1" className="btn add">+新建自定义标题节点</Link>
		    	</dd>
			</dl>
		);
		const hospitalNodeHtml = (
			<dl>
				<dt>
					<header>医院</header>
				</dt>
				{data.filter(item=>item.nodeType==5).map((item,index)=>{
					return <dd key={index} onClick={self.modifycate.bind(this,item.libId)}>{item.nodeTitle}</dd>;
				})}
		    	<dd className="btn">
		    		<Link to="/cateadd/5" className="btn add">+新建医院节点</Link>
		    	</dd>
			</dl>
		);
		return (
			<section className="main point-manage">
				{tabHtml}
				{
					this.state.currentTabType=='nodeType2'?classNodeHtml:
					this.state.currentTabType=='nodeType1'?customNodeHtml:
					this.state.currentTabType=='nodeType5'?hospitalNodeHtml:null
				}
			</section>
		);
	}
});

//导出组件
export default PointManage;
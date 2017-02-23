import React from 'react';
import addons from 'react-addons';
import {Link,hashHistory} from 'react-router';
//声明组件
const Nav = React.createClass({
	componentDidMount(){
		//刷新页面确认
		const self = this;
		window.onbeforeunload = function(){
			const initPagePath = self.initPagePath();
			if(initPagePath.policyPointPath.indexOf(initPagePath.pagePath)!=-1) return '刷新当前页面将丢失节点操作并返回首页，请确认.';
			else if(initPagePath.pointEditPath.indexOf(initPagePath.pagePath)!=-1) return '刷新页面将丢失页面操作并返回节点管理页面，请确认.';
		};
	},
	logoutHandler(){
		//退出
		const self = this;
		self.props.popup.dialogOpen({
			type: 'confirm',
			message: '请确认是否退出系统',
			callback: function(){
				self.props.page.logout(function(){
					self.props.popup.dialogOpen({
						type: 'toast',
						icon: 'icon-circle-check',
						message: '退出成功',
						callback: function(){
							hashHistory.push('/login');
						}
					});
				});
			}
		});
	},
	goPathHandler(path){
		//跳转到保单管理/节点管理
		const initPagePath = this.initPagePath();
		const message = initPagePath.policyEditPath.indexOf(initPagePath.pagePath)!=-1?'离开当前页面将丢失未保存的保单内容，请确认.':
						initPagePath.policyPointPath.indexOf(initPagePath.pagePath)!=-1?'离开当前页面将丢失节点操作，请确认.':
						initPagePath.pointEditPath.indexOf(initPagePath.pagePath)!=-1?'离开页面将丢失未保存的内容':'';
		if(!message) hashHistory.push('/'+path);
		else this.props.popup.dialogOpen({
			type: 'confirm',
			message,
			callback: function(){
				hashHistory.push('/'+path);
			}
		});
	},
	initPagePath(){
		return {
			pagePath: this.props.path,
			loginPath: ['','/','/login'],
			policyManagePath: ['/policymanage','/policyview/:id','/404'],
			policyEditPath: ['/policyadd','/policyedit/:id','/policycopy/:id'],
			policyPointPath: ['/pointchoose','/pointdrag'],
			pointManagePath: ['/pointmanage'],
			pointEditPath: ['/cateadd/:type','/cateedit/:type/:id','/pointadd/:type/:parentId','/pointedit/:pointId']
		};
	},
	isLoginPath(){
		//登录页面
        const pagePath = this.initPagePath().pagePath;
		return this.initPagePath().loginPath.indexOf(pagePath)!=-1;
	},
  	isPolicyPath: function(){
  		//保单页面
        const pagePath = this.initPagePath().pagePath;
  		return this.initPagePath().policyManagePath.indexOf(pagePath)!=-1||this.isPolicyEditPath()||this.isPolicyPointPath();
  	},
  	isPolicyEditPath: function(){
  		//保单编辑页面
        const pagePath = this.initPagePath().pagePath;
        return this.initPagePath().policyEditPath.indexOf(pagePath)!=-1;
  	},
  	isPolicyPointPath: function(){
  		//保单节点操作页面
        const pagePath = this.initPagePath().pagePath;
        return this.initPagePath().policyPointPath.indexOf(pagePath)!=-1;
  	},
  	isPointPath: function(){
  		//节点页面
        const pagePath = this.initPagePath().pagePath;
        return this.initPagePath().pointManagePath.indexOf(pagePath)!=-1||this.isPointEditPath();
  	},
  	isPointEditPath: function(){
  		//节点编辑页面
        const pagePath = this.initPagePath().pagePath;
        return this.initPagePath().pointEditPath.indexOf(pagePath)!=-1;
  	},
	render(){
		const data = this.props.pageStatus;
		const classSet = addons.classSet;
		const tabPolicyClass = classSet({
			'current': this.isPolicyPath()
		});
		const tabPointClass = classSet({
			'current': this.isPointPath()
		});
		if(this.isLoginPath()){return false};
		return(
			<header className="head">
				<nav className="nav">
					<div className="title">POLICY管理系统</div>
					<div className="welcome">
						欢迎您，<strong>{data.userName}</strong>
						|
						<span onClick={this.logoutHandler} className="logout">退出</span>
					</div>
					<div className="menu">
						<a onClick={this.goPathHandler.bind(this,'policymanage')} className={tabPolicyClass}>保单管理</a>
						<span className="br">｜</span>
						<a onClick={this.goPathHandler.bind(this,'pointmanage')} className={tabPointClass}>节点管理</a>
					</div>
				</nav>
			</header>
		)
	}
});
//导出组件
export default Nav;
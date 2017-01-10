import React from 'react';
import {Link} from 'react-router';
import md5 from 'md5';
//声明组件
const Login = React.createClass({
	render(){
		return(
			<div>
				This is Login.
				<Link to="/login" activeClassName="current">Login</Link>
				<Link to="/policymanage" activeClassName="current">PolicyManage</Link>
			</div>
		)
	}
});
//导出组件
export default Login;
import React from 'react';
import {Link} from 'react-router';
//声明组件
class Login extends React.Component{
	render(){
		return(
			<div>
				This is Login.
				<Link to="/login" activeClassName="current">Login</Link>
				<Link to="/policymanage" activeClassName="current">PolicyManage</Link>
			</div>
		)
	}
};
//导出组件
export default Login;
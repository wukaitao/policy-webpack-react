import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Login from '../components/Login.jsx';
import * as LoginActions from '../actions/login.js';

//将state.account绑定到props.account
const mapStateToProps = state =>{
	return {
		loginData: state.loginData
	};
};
//将action的所有方法绑定到props上
const mapDispatchToProps = dispatch => {
	return bindActionCreators(LoginActions,dispatch);
};

//通过react-redux提供的connect方法将我们需要的state数据和action的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(Login);
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Popup from '../components/Popup.jsx';
import * as popupActions from '../actions/popup.js';

//将state.account绑定到props.account
const mapStateToProps = state =>{
	return {
		pageStatus: state.pageStatus
	};
};
//将action的所有方法绑定到props上
const mapDispatchToProps = dispatch => {
	return bindActionCreators(popupActions,dispatch);
};

//通过react-redux提供的connect方法将我们需要的state数据和action的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(Popup);
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PolicyEdit from '../components/PolicyEdit.jsx';
import * as PolicyActions from '../actions/policy.js';

//将state.policyDetailData绑定到props.policyDetailData
const mapStateToProps = state =>{
	return {
		policyDetailData: state.policyDetailData
	};
};
//将action的所有方法绑定到props上
const mapDispatchToProps = dispatch => {
	return bindActionCreators(PolicyActions,dispatch);
};

//通过react-redux提供的connect方法将我们需要的state数据和action的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(PolicyEdit);
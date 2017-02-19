﻿import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PointDrag from '../components/PointDrag.jsx';
import * as PolicyActions from '../actions/policy.js';
import * as PopupActions from '../actions/popup.js';

//将state.policyDetailData绑定到props.policyDetailData
const mapStateToProps = state =>{
	return {
		policyDetail: state.policyDetail
	};
};
//将action的所有方法绑定到props上
const mapDispatchToProps = dispatch => ({
	page: bindActionCreators(PolicyActions,dispatch),
	popup: bindActionCreators(PopupActions,dispatch),
	dispatch: dispatch
});

//通过react-redux提供的connect方法将我们需要的state数据和action的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(PointDrag);
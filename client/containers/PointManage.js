import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PointManage from '../components/PointManage.jsx';
import * as PointActions from '../actions/point.js';

//将state.pointList绑定到props.pointList
const mapStateToProps = state =>{
	return {
		pointList: state.pointList,
		letterList: state.letterList
	};
};
//将action的所有方法绑定到props上
const mapDispatchToProps = dispatch => {
	return bindActionCreators(PointActions,dispatch);
};

//通过react-redux提供的connect方法将我们需要的state数据和action的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(PointManage);
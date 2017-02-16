import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PointEdit from '../components/PointEdit.jsx';
import * as PointActions from '../actions/point.js';
import * as PopupActions from '../actions/popup.js';

//将state.allPointData绑定到props.allPointData
const mapStateToProps = state =>{
	return {
		pointData: state.pointData,
		pageStatus: state.pageStatus
	};
};
//将action的所有方法绑定到props上
const mapDispatchToProps = dispatch => ({
	page: bindActionCreators(PointActions,dispatch),
	popup: bindActionCreators(PopupActions,dispatch),
	dispatch: dispatch
});

//通过react-redux提供的connect方法将我们需要的state数据和action的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(PointEdit);
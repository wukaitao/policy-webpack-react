import React, { PropTypes, Component } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';
import addons from 'react-addons';

const classSet = addons.classSet;
const style = classSet({
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left'
});

const boxTarget = {
  drop() {
    return { name: 'Dustbin' };
  }
};

const Dustbin = React.createClass({
	propTypes: {
	    connectDropTarget: PropTypes.func.isRequired,
	    isOver: PropTypes.bool.isRequired,
	    canDrop: PropTypes.bool.isRequired
	},
	render() {
	    const { canDrop, isOver, connectDropTarget } = this.props;
	    const isActive = canDrop && isOver;

	    let backgroundColor = '#222';
	    if (isActive) {
	    	backgroundColor = 'darkgreen';
	    } else if (canDrop) {
	    	backgroundColor = 'darkkhaki';
	    }

	    return connectDropTarget(
	    	<div className={style}>
	    		{isActive ?
	    			'Release to drop' :
	    			'Drag a box here'
	    		}
	    	</div>
	    );
	}
});

export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Dustbin);
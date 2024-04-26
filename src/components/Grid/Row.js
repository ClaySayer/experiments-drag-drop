import React from 'react';
import PropTypes from 'prop-types';
import Resizable from './Resizable';
import Sizable from './Sizable';
import Handle from './Handle';

class Row extends React.Component {
  static propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    resizable: PropTypes.bool,
    setRowHeight: PropTypes.func,
    index: PropTypes.number.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  static defaultProps = {
    resizable: false,
    setRowHeight: () => {},
    children: null
  };

  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  setRowHeight = () => {
    this.props.setRowHeight(this.props.index);
  };

  render() {
    const handles = [
      <Handle
        width={this.props.width}
        left={this.props.left}
        height={3}
        top={this.props.height - 3}
        handleMouseDown={this.props.handleMouseDown}
        cursor="row-resize"
        key={`row${this.props.index}handle`}
      />
    ];
    return this.props.resizable ? (
      <Resizable
        axis="y"
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
        height={this.props.height}
        ref={this.element}
        setDimension={this.setRowHeight}
        index={this.props.index}
        key={`row${this.props.index}`}
        handles={handles}
        zIndex={1000}
      >
        {this.props.children}
      </Resizable>
    ) : (
      <Sizable
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
        height={this.props.height}
      >
        {this.props.children}
      </Sizable>
    );
  }
}

export default Row;

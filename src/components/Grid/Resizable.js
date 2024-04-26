import React from 'react';
import PropTypes from 'prop-types';
import Sizable from './Sizable';

class Resizable extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    setDimension: PropTypes.func,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    handles: PropTypes.arrayOf(PropTypes.element)
  };

  static defaultProps = {
    children: null,
    setDimension: () => {},
    handles: []
  };

  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  handleDoubleClick = (e) => {
    if (e.target !== e.currentTarget) {
      const element = this.element.current;
      const children = Array.from(element.ref.children);
      this.props.setDimension(children);
    }
  };

  render() {
    const { children, handles, setDimension, ...rest } = this.props;
    return (
      <Sizable
        {...rest}
        ref={this.element}
        onDoubleClick={this.handleDoubleClick}
      >
        {children}
        {handles}
      </Sizable>
    );
  }
}

export default Resizable;

import React from 'react';
import PropTypes from 'prop-types';

class Handle extends React.Component {
  static propTypes = {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    cursor: PropTypes.string,
    handleMouseDown: PropTypes.func
  };
  static defaultProps = {
    cursor: 'default',
    handleMouseDown: () => {}
  };

  state = {
    hover: false
  };

  style = {
    top: 0,
    cursor: this.props.cursor,
    position: 'absolute',
    zIndex: 9999,
    overflow: 'visible'
  };

  toggleHover = () => this.setState({ hover: !this.state.hover });

  handleMouseDown = (e) => {
    e.preventDefault();
    this.props.handleMouseDown(e);
  };

  render() {
    let style = this.state.hover
      ? { ...this.style, backgroundColor: 'lightblue' }
      : { ...this.style };
    style = {
      ...style,
      width: this.props.width,
      left: this.props.left,
      top: this.props.top,
      height: this.props.height
    };
    return (
      <div
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        style={style}
      />
    );
  }
}

export default Handle;

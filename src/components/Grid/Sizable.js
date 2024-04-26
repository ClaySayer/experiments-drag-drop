import React from 'react';
import PropTypes from 'prop-types';

class Sizable extends React.Component {
  static propTypes = {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    style: PropTypes.objectOf(PropTypes.string)
  };

  static defaultProps = {
    children: null,
    style: {}
  };

  style = {
    position: 'absolute',
    padding: '2px',
    margin: 0
  };

  render() {
    const { children, height, width, left, top, style, ...rest } = this.props;
    const combinedStyle = {
      ...this.style,
      ...style,
      height,
      width,
      left,
      top
    };
    return (
      <div
        ref={(ref) => {
          this.ref = ref;
        }}
        style={combinedStyle}
        {...rest}
      >
      {children}
      </div>
    );
  }
}

export default Sizable;

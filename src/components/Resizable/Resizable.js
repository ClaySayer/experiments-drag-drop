import React from 'react';
import PropTypes from 'prop-types';
import Handle from './Handle';
import transformations from '../../helpers/transformations';

export default class Resizable extends React.Component {
  static getLeft = (type, bounds, MARGIN) => {
    if (type === 'ne' || type === 'e' || type === 'se') {
      return bounds.width - MARGIN;
    }
    if (type === 'move') {
      return MARGIN;
    }
    return 0;
  };

  static getWidth = (type, bounds, MARGIN) => {
    if (
      type === 'nw' ||
      type === 'w' ||
      type === 'sw' ||
      type === 'ne' ||
      type === 'e' ||
      type === 'se'
    ) {
      return MARGIN;
    }
    if (type === 'move') {
      return bounds.width - MARGIN * 2;
    }
    return bounds.width;
  };

  static getTop = (type, bounds, MARGIN) => {
    if (type === 'sw' || type === 's' || type === 'se') {
      return bounds.height - MARGIN;
    }
    if (type === 'move') {
      //return MARGIN;
    }
    if (type === 'top') {
      return MARGIN;
    }
    return 0;
  };

  static getHeight = (type, bounds, MARGIN) => {
    if (
      type === 'nw' ||
      type === 'n' ||
      type === 'ne' ||
      type === 'sw' ||
      type === 's' ||
      type === 'se'
    ) {
      return MARGIN;
    }
    if (type === 'move') {
      return bounds.height - MARGIN * 2;
    }
    return bounds.height;
  };

  static createHandle = (handle, bounds, MARGIN) => ({
    type: handle.type,
    left: Resizable.getLeft(handle.type, bounds, MARGIN),
    top: Resizable.getTop(handle.type, bounds, MARGIN),
    height: Resizable.getHeight(handle.type, bounds, MARGIN),
    width: Resizable.getWidth(handle.type, bounds, MARGIN),
    resizeFunction: handle.resizeFunction,
    backgroundColor: handle.backgroundColor,
    cursor: handle.type === 'move' ? 'move' : `${handle.type}-resize`,
  });

  static propTypes = {
    resizeMargin: PropTypes.number,
    left: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  };

  static defaultProps = {
    resizeMargin: 5,
  };

  static handles = [
    {
      type: 'move',
      resizeFunction: transformations.move,
      backgroundColor: 'transparent',
    },
    {
      type: 'n',
      resizeFunction: transformations.dilateN,
      backgroundColor: 'lightblue',
    },
    {
      type: 'e',
      resizeFunction: transformations.dilateE,
      backgroundColor: 'lightblue',
    },
    {
      type: 's',
      resizeFunction: transformations.dilateS,
      backgroundColor: 'lightblue',
    },
    {
      type: 'w',
      resizeFunction: transformations.dilateW,
      backgroundColor: 'lightblue',
    },
    {
      type: 'nw',
      resizeFunction: transformations.dilateNW,
      backgroundColor: 'lightblue',
    },
    {
      type: 'ne',
      resizeFunction: transformations.dilateNE,
      backgroundColor: 'lightblue',
    },
    {
      type: 'se',
      resizeFunction: transformations.dilateSE,
      backgroundColor: 'lightblue',
    },
    {
      type: 'sw',
      resizeFunction: transformations.dilateSW,
      backgroundColor: 'lightblue',
    },
  ];

  constructor(props) {
    super(props);
    const { top, left, height, width } = props;
    this.RESIZE_MARGIN = props.resizeMargin;
    this.state.resizeTypes = Resizable.handles.filter(handle => {
      switch (props.axis) {
        case 'x':
          if (handle.type === 'e' || handle.type === 'w') {
            return true;
          }
          break;
        case 'y':
          if (handle.type === 'n' || handle.type === 's') {
            return true;
          }
          break;
        case 'both': {
          return true;
        }
        default:
          return false;
      }
      return false;
    });
    this.state.handles = this.state.resizeTypes.map(handle =>
      Resizable.createHandle(
        handle,
        { top, left, height, width },
        this.RESIZE_MARGIN,
      ),
    );
  }

  state = {
    style: {
      left: this.props.left,
      height: this.props.height,
      top: this.props.top,
      width: this.props.width,
      cursor: 'default',
      backgroundColor: this.props.backgroundColor,
      zIndex: 0,
    },
    value: this.props.value,
  };

  handleResizeStart = handle => e => {
    this.props.onResizeStart(e, (point, offset) => {
      const transformation = handle.resizeFunction({
        bounds: this.state.style,
        point,
        margin: this.RESIZE_MARGIN,
        offset,
      });
      this.setState(state => {
        const style = { ...state.style, ...transformation };
        const handles = this.state.resizeTypes.map(staticHandle =>
          Resizable.createHandle(
            staticHandle,
            {
              top: style.top,
              left: style.left,
              height: style.height,
              width: style.width,
            },
            this.RESIZE_MARGIN,
          ),
        );
        return { style, handles };
      });
    });
  };

  handleMouseOut = e => {
    this.setState({ style: { ...this.state.style, cursor: 'default' } });
  };

  render() {
    return (
      <div
        style={{
          ...this.state.style,
          position: 'absolute',
          padding: this.RESIZE_MARGIN,
          overflow: 'hidden',
        }}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        onBlur={this.handleMouseOut}
      >
        {this.state.handles.map(handle => (
          <Handle
            key={handle.type}
            type={handle.type}
            height={handle.height}
            width={handle.width}
            top={handle.top}
            left={handle.left}
            cursor={handle.cursor}
            onMouseDown={this.handleResizeStart(handle)}
            backgroundColor={handle.backgroundColor}
          />
        ))}
        {this.props.children}
      </div>
    );
  }
}

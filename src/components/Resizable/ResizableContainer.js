import React from 'react';

const getResizePoint = (x, y, bounds) => {
  const handle = {};
  const { left, right, top, bottom } = bounds;
  switch (true) {
    case x - left <= 5:
      handle.x = right;
      break;
    case right - x <= 5:
      handle.x = left;
      break;
    default:
      handle.x = null;
  }
  switch (true) {
    case y - top <= 5:
      handle.y = bottom;
      break;
    case bottom - y <= 5:
      handle.y = top;
      break;
    default:
      handle.y = null;
  }
  return handle;
};

export default class ResizableContainer extends React.Component {
  constructor(props) {
    super(props);
    this._childRefs = new Map();
  }
  onResizeStart = index => (e, resizeFunction) => {
    const { target, clientX, clientY } = e;
    const bounds = target.getBoundingClientRect();
    this.resizeFixedPoint = getResizePoint(clientX, clientY, bounds);
    this.selectedIndex = index;
    this.resizeFunction = resizeFunction;
    this.resizing = true;
    this.offset = { x: clientX - bounds.left, y: clientY - bounds.top };
  };

  onMouseUp = e => {
    if (this.resizing) {
      this.resizing = false;
      this.selectedIndex = null;
      const rect = this.ref.getBoundingClientRect();
      this.resizeFunction(
        {
          x: e.clientX - rect.x,
          y: e.clientY - rect.y,
        },
        this.offset,
      );
    }
  };

  render() {
    const that = this;
    return (
      <div
        style={this.props.style}
        onMouseUp={this.onMouseUp}
        ref={ref => (this.ref = ref)}
      >
        {React.Children.map(this.props.children, (child, index) =>
          React.cloneElement(child, {
            onResizeStart: that.onResizeStart(index),
            key: { index },
            index,
            ref: c => {
              that._childRefs.set(index, c);
            },
          }),
        )}
      </div>
    );
  }
}

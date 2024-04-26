import React from 'react';

const Handle = (props) => (
  <div
    onMouseDown={props.onMouseDown}
    style={{
      left: props.left,
      height: props.height,
      top: props.top,
      width: props.width,
      position: 'absolute',
      cursor: props.cursor,
      backgroundColor: props.backgroundColor,
      userSelect: 'none'
    }}
  />
);

export default Handle;

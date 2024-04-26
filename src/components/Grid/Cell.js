import React from 'react';
import Sizable from './Sizable';

const style = {
  overflow: 'hidden',
  whiteSpace: 'noWrap',
  textOverflow: 'ellipsis'
};

const Cell = (props) => {
  const combinedStyle = { ...style, ...props.style };
  return <Sizable {...props} style={combinedStyle} />;
};

export default Cell;

import React from 'react';
import Resizable from './Resizable';

const asResizable = (Component, data) => (
  <Resizable key={data.id} {...data}>
    {Component}
  </Resizable>
);

export default asResizable;

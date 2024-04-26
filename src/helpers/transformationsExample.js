import React from 'react';
import transformations from './transformations';

let element = { left: 100, top: 100, height: 100, width: 100 };

element = {
  ...element,
  ...transformations.move(element, { x: -200, y: 100 }, 5)
};

const App = () => (
  <div style={{ overflow: 'auto' }}>
    <div
      style={{ ...element, backgroundColor: 'green', position: 'absolute' }}
    />
  </div>
);

export { App };

import React from 'react';
import ResizableContainer from './ResizableContainer';
import asResizable from './asResizable';

const Div = props => <div {...props}>I Am Resizable</div>;

const resizables = [];
for (let i = 0; i < 5; i += 1) {
  const next = {
    id: i,
    height: Math.floor(40 + Math.random() * Math.floor(180)),
    width: Math.floor(40 + Math.random() * Math.floor(150)),
    left: Math.floor(Math.random() * Math.floor(1050)),
    top: Math.floor(Math.random() * Math.floor(360)),
    backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256,
    )}, ${Math.floor(Math.random() * 256)})`,
  };
  resizables.push(next);
}

const ResizableExample = () => (
  <ResizableContainer
    style={{
      position: 'absolute',
      backgroundColor: '#EEEEEE',
      height: '100%',
      width: '100%',
    }}
  >
    {resizables.map(resizable =>
      asResizable(
        <Div
          key={resizable.id}
          height={resizable.height}
          width={resizable.width}
        />,
        {
          ...resizable,
          axis: 'both',
        },
      ),
    )}
  </ResizableContainer>
);

export default ResizableExample;

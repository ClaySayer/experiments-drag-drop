import React from 'react';
import VirtualizedContainer from './VirtualizedContainer';

const withVirtualizing = (props) => {
    return <VirtualizedContainer data={props}/>;
}
export default withVirtualizing;

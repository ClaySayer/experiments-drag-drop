import React from 'react';
import PropTypes from 'prop-types';
import Resizable from './Resizable';
import Sizable from './Sizable';
import Handle from './Handle';

class Column extends React.Component {
  static propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    resizable: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    setColumnWidth: PropTypes.func,
    index: PropTypes.number.isRequired
  };

  static defaultProps = {
    resizable: false,
    children: null,
    setColumnWidth: () => {}
  };

  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  setColumnWidth = (children) => {
    let widest = children.reduce(
      (acc, child) => Math.max(acc, child.scrollWidth),
      0
    );
    if (widest > this.element.current.scrollWidth) {
      this.props.setColumnWidth(this.props.index, widest);
    } else {
      widest = 0;
      for (let i = 0; i < children.length; i += 1) {
        const div = document.createElement('div');
        div.style.display = 'inline-block';
        div.style.visibility = 'hidden';
        div.style.padding = children[i].style.padding;
        div.textContent = children[i].textContent;
        document.body.appendChild(div);
        widest = Math.max(div.scrollWidth, widest);
        document.body.removeChild(div);
      }
      this.props.setColumnWidth(this.props.index, widest + 4);
    }
  };

  render() {
    const handles = [
      <Handle
        width={3}
        left={this.props.width - 3}
        height={this.props.height}
        top={this.props.top}
        handleMouseDown={this.props.handleMouseDown}
        cursor="col-resize"
        style={{ zIndex: '1'}}
        key={`row${this.props.index}handle`}
      />
    ];
    return this.props.resizable ? (
      <Resizable
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
        height={this.props.height}
        ref={this.element}
        setDimension={this.setColumnWidth}
        index={this.props.index}
        key={`column${this.props.index}`}
        handles={handles}
      >
        {this.props.children}
      </Resizable>
    ) : (
      <Sizable
        width={this.props.width}
        top={this.props.top}
        left={this.props.left}
        height={this.props.height}
      >
        {this.props.children}
      </Sizable>
    );
  }
}

export default Column;

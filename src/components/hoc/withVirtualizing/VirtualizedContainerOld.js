import React from 'react';
import PropTypes from 'prop-types';
import VirtualizedPanel from './VirtualizedPanel';
import { debounce } from 'lodash';

const containerStyle = {
  height: '100%',
  width: '100%',
  overflow: 'auto'
};

class VirtualizedContainerOld extends React.Component {
  constructor(props) {
    super(props);
    this.itemHeight = 23;
    this.state = {
      data: props.data.filter((item, index) => index >= 0 && index < 100),
      scrollTop: 0,
      proportion: 0,
      extraItemsTop: 0,
      startIndex: 0,
      endIndex: 99,
      extraItemsBottom: 50,
      firstVisibleIndex: 0
    };
    this.totalHeight = props.data.length * this.itemHeight;
    this.latestKnowScrollY = 0;
    this.ticking = false;
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidUpdate() {
    if (this.container.scrollTop !== this.state.scrollTop) {
      this.container.scrollTop = this.state.scrollTop;
    }
  }

  handleScroll = () => {
    this.ticking = false;
    const scrollTop = this.latestKnowScrollY;
    const itemIndex = Math.floor(scrollTop / this.itemHeight);
    const extraItemsTop = itemIndex < 50 ? itemIndex : 50;
    const extraItemsBottom =
      this.props.data.length - itemIndex < 50
        ? this.props.data.length - itemIndex
        : 50;
    const proportion = Math.floor(
      (scrollTop / this.itemHeight - itemIndex) * this.itemHeight
    );
    const data = this.props.data.slice(itemIndex - extraItemsTop, itemIndex + extraItemsBottom * 2);
    this.setState(() => ({
      scrollTop,
      data,
      proportion,
      extraItemsBottom,
      extraItemsTop
    }));
  };

  requestTick = () => {
    if (!this.ticking) {
      requestAnimationFrame(this.handleScroll);
    }
    this.ticking = true;
  };

  onScroll(e) {
    this.latestKnowScrollY = e.target.scrollTop;
    this.handleScroll();
  }

  render() {
    return (
      <div
        onScroll={this.onScroll}
        style={containerStyle}
        ref={(container) => {
          this.container = container;
        }}
      >
        <VirtualizedPanel
          scrollTop={this.state.scrollTop}
          height={this.totalHeight}
          data={this.state.data}
          List={this.props.List}
          Item={this.props.Item}
          proportion={this.state.proportion}
          extraItemsTop={this.state.extraItemsTop}
          extraItemsBottom={this.state.extraItemsBottom}
        />
      </div>
    );
  }
}
VirtualizedContainerOld.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  List: PropTypes.func.isRequired
};

export default VirtualizedContainerOld;

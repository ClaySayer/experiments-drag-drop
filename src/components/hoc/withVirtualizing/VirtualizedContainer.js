import React from 'react';
import PropTypes from 'prop-types';
import ResizableContainer from '../../Resizable/ResizableContainer';

class VirtualizedContainer extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape().isRequired)
  };

  constructor(props) {
    super(props);
    this.rowCount = props.data.length;
    this.itemHeight = 23;
    this.state = {
      scrollTop: 0
    };
    this.ticking = false;
    this.then = 0;
    this.latestScrollY = 0;
    this.handleScroll = this.handleScroll.bind(this);
    this.timeout = null;
  }

  onScroll = (e) => {
    clearTimeout(this.timeout);
    this.latestScrollY = e.target.scrollTop;
    this.requestTick();
    this.timeout = setTimeout(() => {
      cancelAnimationFrame(this.raf);
      this.handleScroll();
    }, 32);
  };

  requestTick = () => {
    this.now = Date.now();
    if (this.now - this.then === 0 || this.now - this.then > 16) {
      if (!this.ticking) {
        this.raf = requestAnimationFrame(this.handleScroll);
      }
      this.ticking = true;
    }
  };

  handleScroll() {
    this.setState(() => ({
      scrollTop: this.latestScrollY
    }));
    this.ticking = false;
    this.then = Date.now();
  }

  render() {
    const firstItemIndex = Math.floor(this.state.scrollTop / this.itemHeight);
    const beforeItems = firstItemIndex < 2 ? firstItemIndex : 2;
    const data = this.props.data.slice(
      firstItemIndex - beforeItems,
      firstItemIndex + 22
    );
    return (
      <div
        onScroll={this.onScroll}
        style={{ height: '100%', width: '80%', overflow: 'auto', position: 'absolute' }}
      >
        <ResizableContainer
          style={{
            height: this.itemHeight * this.rowCount + 15,
            width: '100%',
            position: 'relative'
          }}
        >
          {data.map((item, rowIndex) =>
            Object.keys(item).map((key, columnIndex) =>
              (
                <div
                  style={{
                    position: 'absolute',
                    top:
                      (firstItemIndex - beforeItems + rowIndex) *
                      this.itemHeight,
                    left: columnIndex * 100,
                    width: '100px',
                    overflow: 'hidden',
                    padding: 0,
                    margin: 0,
                    height: this.itemHeight,
                    borderWidth: 0
                  }}
                  key={`${firstItemIndex -
                    beforeItems +
                    rowIndex}${columnIndex}`}
                >
                  {item[key]}
                </div>
              )
            )
          )}
        </ResizableContainer>
      </div>
    );
  }
}

export default VirtualizedContainer;

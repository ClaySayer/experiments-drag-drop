import React from 'react';
import PropTypes from 'prop-types';

class VirtualizedPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upperHeight: props.scrollTop
    };
    this.itemRef = [];
    this.style = {
      height: `${this.props.height}px`
    };
  }

  componentDidMount() {
    const height = this.itemRef.reduce(
      (item, curr) => item.clientHeight + curr,
      0
    );
    console.log(height);
  }

  componentWillReceiveProps(nextProps) {
    const { scrollTop, proportion, extraItemsTop } = nextProps;
    this.setState({
      upperHeight: scrollTop - extraItemsTop * 23 - proportion
    });
  }

  render() {
    return (
      <div style={this.style}>
        <div style={{ height: `${this.state.upperHeight}px` }} />
        <this.props.List>
          {this.props.data.map((item, index) => (
            <this.props.Item
              ref={(ref) => {
                this.itemRef[index] = ref;
              }}
              item={item}
              key={index}
              index={index}
            />
          ))}
        </this.props.List>
        <div />
      </div>
    );
  }
}

VirtualizedPanel.propTypes = {
  height: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
  proportion: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default VirtualizedPanel;

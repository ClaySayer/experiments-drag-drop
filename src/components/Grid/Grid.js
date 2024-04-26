import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import Column from './Column';
import Row from './Row';

class Grid extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    showColHeader: PropTypes.bool
  };

  static defaultProps = {
    showColHeader: false
  };

  constructor(props) {
    super(props);
    this.rowHeight = 25;
    this.columnWidth = 150;
    this.resizeData = null;
    this.state = {
      columns: this.createColumns(),
      rows: this.createRows()
    };
    this.state.totalHeight = this.rowHeight * this.state.rows.length;
    this.state.totalWidth = this.state.columns.length * this.columnWidth;
    this.Grid = React.createRef();
  }

  onScroll = (e) => {
    this.header.scrollLeft = e.target.scrollLeft;
  };

  onMouseUp = (e) => {
    if (this.resizeData) {
      const { point, rangeIndex, direction } = this.resizeData;
      this.resizeData = null;
      if (
        direction === 'x' &&
        e.clientX + this.Grid.current.scrollLeft >
          this.state.columns[rangeIndex].left
      ) {
        const differenceX = e.clientX - point.x;
        const columns = this.state.columns.slice();
        columns[rangeIndex].width += differenceX;
        for (let i = rangeIndex + 1; i < columns.length; i += 1) {
          columns[i].left += differenceX;
        }
        const totalWidth = this.state.totalWidth + differenceX;
        this.setState({ columns, totalWidth });
      }
      if (direction === 'y' && e.clientY > this.state.rows[rangeIndex].top) {
        const differenceY = e.clientY - point.y;
        const rows = this.state.rows.slice();
        if (rows[rangeIndex].height + differenceY >= this.rowHeight) {
          rows[rangeIndex].height += differenceY;
          for (let i = rangeIndex + 1; i < rows.length; i += 1) {
            rows[i].top += differenceY;
          }
          const totalHeight = this.state.totalHeight + differenceY;
          this.setState({ rows, totalHeight });
        }
      }
    }
  };

  setColumnWidth = (index, width) => {
    const columns = this.state.columns.slice();
    const column = columns[index];
    const difference = width - column.width;
    column.width = width;
    for (let i = index + 1; i < columns.length; i += 1) {
      columns[i].left += difference;
    }
    const totalWidth = this.state.totalWidth + difference;
    this.setState({ columns, totalWidth });
  };

  setRowHeight = (index) => {
    const rows = this.state.rows.slice();
    const row = rows[index];
    const difference = this.rowHeight - row.height;
    row.height = this.rowHeight;
    for (let i = index + 1; i < rows.length; i += 1) {
      rows[i].top += difference;
    }
    const totalHeight = this.state.totalHeight + difference;
    this.setState({ rows, totalHeight });
  };

  createColumns = () => {
    const columns = [];
    let indexOffset = 0;
    Object.keys(this.props.data[0]).map((column, index) => (
      columns[index + indexOffset] = {
        index: index + indexOffset,
        width: this.columnWidth,
        left: (index + indexOffset) * this.columnWidth,
        value: column
      }
    ));
    return columns;
  };

  createRows = () => {
    const rows = [];
    let indexOffset = 0;
    if (this.props.showColHeader) {
      indexOffset = 1;
      // Object.keys(this.props.data[0]).map((column, index)=>(
      //   rows[0] = {
      //     index: 0,
      //     height: this.rowHeight,
      //     top: 0,
      //     value: column
      //   }
      // ));
      const keys = Object.keys(this.props.data[0]);
      const value = {}
      for(let key in keys){
        value[keys[key]] = keys[key];
      }
      rows[0] = {
        index: 0,
        height: this.rowHeight,
        top: 0,
        value: value
      }
    }
    this.props.data.map((row, index) => (
      rows[index + indexOffset] = {
        index: index + indexOffset,
        height: this.rowHeight,
        top: (index + indexOffset) * this.rowHeight,
        value: row
      }
    ));
    return rows;
  };

  resizeStart = (index, direction) => (e) => {
    this.resizeData = {
      point: { x: e.clientX, y: e.clientY },
      rangeIndex: index,
      direction
    };
  };

  render() {
    const columns = [];
    const rows = [];
    for (let i = 0; i < this.state.columns.length; i += 1) {
      columns[i] = [];
      for (let j = 0; j < this.state.rows.length; j += 1) {
        if (!rows[j]) {
          rows[j] = [];
        }
        const column = this.state.columns[i];
        const row = this.state.rows[j];
        columns[i][j] = (
          <Cell
            key={`${i}, ${j}`}
            height={row.height}
            width={column.width}
            top={row.top}
            left={0}
          >
            {row.value[`${column.value}`]}
          </Cell>
        );
      }
    }
    return (
      <div
        role="grid"
        tabIndex="0"
        aria-roledescription="Grid"
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          position: 'absolute',
          color: "black"
        }}
        onMouseUp={this.onMouseUp}
      >
        {/* <div
          id="header"
          style={{
            flex: '0 1 auto',
            position: 'absolute',
            height: this.rowHeight,
            width: this.state.totalWidth,
            top: 0,
            zIndex: 800,
            backgroundColor: 'white'
          }}
          ref={(element) => {
            this.header = element;
          }}
        >
          {this.state.columns.map((column, index) => (
            <Column
              width={column.width}
              height={this.rowHeight}
              index={index}
              key={column.index}
              top={0}
              left={0}
              handleMouseDown={this.resizeStart(index, 'x')}
              resizable
              setColumnWidth={this.setColumnWidth}
            >
              <Cell
                height={this.rowHeight}
                width={column.width}
                left={column.left}
                top={0}
                key={`headerCell${index}`}
                style={{ zIndex: 0 }}
              >
                {column.value}
              </Cell>
            </Column>
          ))}
          <div
            style={{
              width: 17,
              position: 'absolute',
              left:
                this.state.columns[this.state.columns.length - 1].left +
                this.state.columns[this.state.columns.length - 1].width,
              height: this.rowHeight,
              top: 0
            }}
          />
        </div> */}
        <div
          onScroll={this.onScroll}
          style={{
            flex: '0 1 auto',
            position: 'relative',
            height: '100%',
            width: '100%',
            overflow: 'auto',
            zIndex: 1
          }}
          ref={this.Grid}
        >
          {this.state.rows.map((row, rowIndex) => (
            <Row
              height={row.height + 3}
              width={this.state.totalWidth}
              left={0}
              top={row.top}
              handleMouseDown={this.resizeStart(rowIndex, 'y')}
              resizable
              index={rowIndex}
              setRowHeight={this.setRowHeight}
              key={`row${rowIndex}`}
            />
          ))}
          {this.state.columns.map((column, columnIndex) => (
            <Column
              height={this.state.totalHeight}
              width={column.width}
              left={column.left}
              top={0}
              handleMouseDown={this.resizeStart(columnIndex, 'x')}
              index={columnIndex}
              resizable
              setColumnWidth={this.setColumnWidth}
              key={`column${columnIndex}`}
            >
              {columns[columnIndex].map((cell) => {
                return cell;
              })}
            </Column>
          ))}
        </div>
      </div>
    );
  }
}

export default Grid;

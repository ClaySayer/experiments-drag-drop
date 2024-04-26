import React from 'react';
import Grid from './Grid';

const rowHeader = ['a', 'b', 'c', 'd'];
const columnHeader = [
  'id',
  'firstName',
  'lastName'
];
const data = [
  { id: 0, firstName: 'Fred', lastName: 'Flintstone' },
  { id: 1, firstName: 'Wilma', lastName: 'Flintstone' },
  { id: 2, firstName: 'Barney', lastName: 'Rubble' },
  { id: 3, firstName: 'Betty', lastName: 'Rubble' }
];

const App = () => (
  <Grid data={data} rowHeader={rowHeader} columnHeader={columnHeader} />
);

export default App;

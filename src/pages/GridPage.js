import Grid from '../components/Grid/Grid'

const data = [
  { id: 0, firstName: 'Fred', lastName: 'Flintstone' },
  { id: 1, firstName: 'Wilma', lastName: 'Flintstone' },
  { id: 2, firstName: 'Barney', lastName: 'Rubble' },
  { id: 3, firstName: 'Betty', lastName: 'Rubble' }
];

function GridPage() {
    return <Grid data={data} showColHeader />
}

export default GridPage;
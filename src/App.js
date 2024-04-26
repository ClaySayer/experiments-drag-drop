import './App.css'
import Route from './components/Route'

import SideBar from './components/SideBar'
import GridPage from './pages/GridPage';
import ResizablePage from './pages/ResizablePage';

function App() {
  return(
    <div className="app">

      <SideBar />
      <div className="main">
        <Route path='/'>
          <div>HOME PAGE</div>
        </Route>
        <Route path='/grid'>
          <GridPage />
        </Route>
        <Route path='/resizable'>
          <ResizablePage />
        </Route>
      </div>
    </div>
  )
}

export default App;

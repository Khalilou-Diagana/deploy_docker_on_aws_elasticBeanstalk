import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import NotFoundFile from './pages/NotFoundFile';
const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/About' exact component={About} />
              <Route component= {NotFoundFile} />
          </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

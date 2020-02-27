import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OffersList from './components/OffersList';
import OfferDetails from './components/OfferDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={OffersList} />
        <Route path='/offer/:id' component={OfferDetails} />
      </Switch>
    </Router>
  );
}

export default App;

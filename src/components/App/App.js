import React, {useEffect, useState} from 'react';
import Nav from "../Nav/Nav";
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from "../Homepage/Homepage";
import Shop from "../Shop/Shop";

function App() {

  return (
      <BrowserRouter>
          <div className="App">
              <Nav />
              <Switch>
                  <Route exact path="/" component={Homepage} />
                  <Route path="/shop" component={Shop} />
              </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;

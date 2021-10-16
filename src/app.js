import React, { Component } from 'react'
import { render } from 'react-dom'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from 'react-router-dom';
// import Home from '../client/components/Home';

const App = () => {
  return(
    <Router>
      <Switch>
        {/* <Route path='/' component={}/> */}
        {/* render component when current route is an exact match to provided path, '/' */}
        <Route path='/' exact component={Home}/>
      </Switch>
    </Router>
  )   
}
const Home = () => {
  let history = useHistory();
  return(
    <div>
      <h1>u are home c:</h1>
    </div>
  )
}


render(<App />, document.querySelector("#root"));

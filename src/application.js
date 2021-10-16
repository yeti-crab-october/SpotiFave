import React, { Component } from 'react'
import { render } from 'react-dom'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from 'react-router-dom';
import Home from '../client/components/Home';
import LogIn from '../client/components/LogIn';

const App = () => {
  return(
    <Router>
      <Switch>
        {/* <Route path='/' component={}/> */}
        {/* render component when current route is an exact match to provided path, '/' */}        
        <Route path='/home' exact component={Home}/>
        <Route path='/login' exact component={LogIn}/>
        
              
                

      </Switch>
    </Router>
  )   
}

render(<App />, document.getElementById('root'));
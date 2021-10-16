import React from 'react';
// react hook that gives you access to the array of browser paths
import { useHistory } from 'react-router-dom';


const Home = () => {
  let history = useHistory();
  return(
    <div>
      <h1>u are home c:</h1>
    </div>
  )
}

export default Home;
import React, { useState } from "react";

const LogIn = () => {

  
  const sendLogin = () => {
    console.log('we did the click');
    fetch('/api/LogIn', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    })
  })
    .then(console.log('do something w/ redirect'))
  }
   
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      return console.log('wtf');
      }}>
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '40px'}}>
        Novel Novels<br /><br />
        </div>
        <div>
          Username<br />
          <input type="text" id="username" />
        </div>
        <div>
          Password<br />
          <input type="password" id="password" />
        </div>
        <div>
          Age (optional)<br />
          <input type="number" id="age" />
        </div>
        <br />
        {/* <input type="button" value='Log In' onClick={() => {console.log('omfg')}} /><br /><br /> */}
        {/* <input type="button" value='Go to Main' onClick={() => {handleLogin()}} /><br /> */}
        <button>HECC</button>
      </div>
    </form>
  );
}


  
  

export default LogIn;
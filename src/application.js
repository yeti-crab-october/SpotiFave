// import React, { Component } from 'react'
// import { render } from 'react-dom'
// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	useHistory,
// } from 'react-router-dom';
// import Home from '../client/components/Home';
// import LogIn from '../client/components/LogIn';
// import SpotifyWebApi from 'spotify-web-api-js';
// const spotifyApi = new SpotifyWebApi();

// const App = () => {
//   return(
//     <Router>
//       <Switch>    
//         {/* <Route path='/home' component={Home}/> */}
//         <Route path='/login' component={LogIn}/>
//         {/* <Route path='/' exact/> */}
//       </Switch>
//     </Router>
//   )   
// }

// render(<App />, document.getElementById('root'));

import React, { Component } from "react";
import { render } from 'react-dom'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    // console.log('params', params)
    const token = params['LogIn/access_token'];
    // console.log(token)
    if (token) {
      // console.log({'token received': token})
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {name: 'Not Checked', albumArt: ''}, 
      recentlyPlayed: [] 
    }
    // console.log(this.state)
  }

  getHashParams() {
    // console.log('in getHashParams')
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g, 
    q=window.location.hash.substring(1);
    // console.log(window)
    // console.log({"q": q})
    e = r.exec(q)
    // console.log({'e': e})
    while (e) {
      // console.log({"hash params before 60": hashParams})
       hashParams[e[1]] = decodeURIComponent(e[2]);
      //  console.log({"hash params after 60": hashParams})
       e = r.exec(q);
      //  console.log({'e': e})
      //  console.log({'hashParams[e[1]]': hashParams[e[2]]})
    }
    // console.log({'hashParams': hashParams})
    return hashParams;
  }

  getHistory() {
    spotifyApi.getMyRecentlyPlayedTracks()
    .then((response) => {
      console.log('recently played tracks', response.items);
      this.setState({
        recentlyPlayed: response.items
      })
      // items[i].track.name
      // items[i].track.artists[0].name
    });
  }


  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState() 
      .then((response) => {
        console.log(response)
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
    }
    
    
    render() {
      
      const songsArray = [];
      for (let i = 0; i < this.state.recentlyPlayed.length; i++) {
        songsArray.push(<Song 
          key={i}
          song={this.state.recentlyPlayed[i].track.name}
          artist={this.state.recentlyPlayed[i].track.artists[0].name}
        />)
      }


      return (
        <div className="App">
          <a href='http://localhost:8888'>Login to Spotify </a> 

          <div>
            Now Playing: { this.state.loggedIn && this.state.nowPlaying.name }
          </div>

          <div>
            <img src={ this.state.loggedIn && this.state.nowPlaying.albumArt} style={{ height:150 }}/>
          </div>

          <div>
            {songsArray}
          </div>

          {this.state.loggedIn && <button onClick={ () => this.getNowPlaying() }>
              Check Now Playing 
            </button>
          }
          
          {this.state.loggedIn && <button onClick={ () => this.getHistory() }>
              Get History
            </button>
          }        

        </div>
      )
  }
}

class Song extends Component {
  render() {
    return(
      <div>
        {this.props.song} by {this.props.artist}
      </div>
    )
  }
}


render(<App />, document.getElementById('root'));

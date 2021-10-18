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
      nowPlaying: {name: 'Nothing is playing', albumArt: ''}, 
      recentlyPlayed: [] 
    }
    // console.log(this.state)
  }

  //getHashParams grabs access token + refresh token from URL and places them as values into hashParams
  getHashParams() {
    // console.log('in getHashParams')
    let hashParams = {};
    let e;
    let r = /([^&;=]+)=?([^&;]*)/g; 
    let q = window.location.hash.substring(1);
    // console.log(window)
    // console.log({"q": q})
    // create substring of q based on regex
    e = r.exec(q)
    console.log({'e': e})
    while (e) {
      // console.log({"hash params before 60": hashParams})
      // populating hashParams object with a property that has a key equal to e[1] (name of login/access token) and a value equal to e[2] (token)
       hashParams[e[1]] = decodeURIComponent(e[2]);
       console.log({"hash params after 60": hashParams})
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
    });
  }


  getNowPlaying() {
    //invokes method  from the imported module, grabbing the name and album art from the response and uses that information to set the current state (just the now playing prop, doesnt change the login status)
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
      // initialize songsArray to hold response array after invoking .getMyRecentlyPlayedTracks
      const songsArray = [];
      for (let i = 0; i < this.state.recentlyPlayed.length; i++) {
        // create a Song component for each song element in songsArray
        songsArray.push(<Song 
          key={i}
          song={this.state.recentlyPlayed[i].track.name}
          artist={this.state.recentlyPlayed[i].track.artists[0].name}
        />)
      }


      return (
        <div className="App">
          <a href='http://localhost:3000/login'>Login to Spotify </a> 

          <div>
            Currently Playing: { this.state.loggedIn && this.state.nowPlaying.name }
          </div>

          <div>
            <img src={ this.state.loggedIn && this.state.nowPlaying.albumArt} style={{ height:150 }}/>
          </div>

          <div>
            <h3>Song History</h3>
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

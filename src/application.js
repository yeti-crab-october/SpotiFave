import React, { Component } from "react";
import { render } from 'react-dom'
import SpotifyWebApi from 'spotify-web-api-js';
import SpotiFave_Logo from '../assets/SpotiFave_Logo.png'
const spotifyApi = new SpotifyWebApi();
import '../assets/style.css'
class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params['LogIn/access_token'];
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {name: null, artists: null, albumArt: ''}, 
      recentlyPlayed: [],
      faves: {artist: [], timesPlayed: null},
      popularity: 0
    }
  }

  //getHashParams grabs access token + refresh token from URL and places them as values into hashParams
  getHashParams() {
    let hashParams = {};
    let e;
    let r = /([^&;=]+)=?([^&;]*)/g; 
    let q = window.location.hash.substring(1);
    // create substring of q based on regex
    e = r.exec(q)
    while (e) {
      // populating hashParams object with a property that has a key equal to e[1] (name of login/access token) and a value equal to e[2] (token)
       hashParams[e[1]] = decodeURIComponent(e[2]);
       console.log({"hash params after 60": hashParams})
       e = r.exec(q);
    }
    return hashParams;
  }

  getHistory() {
    spotifyApi.getMyRecentlyPlayedTracks({limit: 50})
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
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artist: response.item.artists[0].name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
  }

  getFaves() {
    spotifyApi.getMyRecentlyPlayedTracks({limit: 50})
      .then((response) => {
        const cache = {};
        for (let i = 0; i < response.items.length; i++) {
          if (!cache.hasOwnProperty(response.items[i].track.artists[0].name)) {
            cache[response.items[i].track.artists[0].name] = 1;
          }
          else cache[response.items[i].track.artists[0].name] += 1  
        }
        const faves = [];
        let max = Math.max(...Object.values(cache));
        for (let key in cache) {
          if (cache[key] === max) faves.push(key);
        }
        this.setState({
          faves: {
            artist: faves,
            timesPlayed: max
          }
        })
      })
  }

  getPopularity () {
    spotifyApi.getMyRecentlyPlayedTracks({limit: 50})
      .then((response) => {
        let totalPopularityScore = 0;
        for (let i = 0; i < response.items.length; i++) {
          totalPopularityScore += response.items[i].track.popularity
        }
        this.setState({
          popularity: Math.floor(totalPopularityScore/response.items.length)
        })
      })
  }
    
    
  render() {
    const favesArray = [];
    for (let i = 0; i < this.state.faves.artist.length; i++) {
      favesArray.push(<Faves
        key={i}
        artist={this.state.faves.artist[i]}
        timesPlayed={this.state.faves.timesPlayed}
    />)
    }


    // initialize songsArray to hold response array after invoking .getMyRecentlyPlayedTracks
    const songsArray = [];
    for (let i = 0; i < this.state.recentlyPlayed.length; i++) {
      // create a Song component for each song element in songsArray
      songsArray.push(<Song 
        key={i}
        song={this.state.recentlyPlayed[i].track.name}
        artist={this.state.recentlyPlayed[i].track.artists[0].name}
        link={this.state.recentlyPlayed[i].track.external_urls.spotify}
      />)
    }


  return (
    <div className="App" style={{textAlign: "center",}}>

      <div>
        <img src={SpotiFave_Logo} />
      </div>
      
      { !this.state.loggedIn && <a href='http://localhost:3000/login'> <button> Login to Spotify </button> </a> }

      <div>
        { this.state.nowPlaying.name && 
        <text>
          Currently Playing: { this.state.loggedIn && this.state.nowPlaying.name }
        </text> 
          }
      </div>  

      <div>
        { this.state.nowPlaying.artist && 
        <text>
          by: {this.state.nowPlaying.artist}
        </text> 
          }
      </div>

      <div>
        <img src={ this.state.loggedIn && this.state.nowPlaying.albumArt } style={{ height:150 }}/>
      </div>

      
      { this.state.loggedIn && 
        <button 
          onClick={ () => this.getNowPlaying() }>
          Check Now Playing 
        </button>
        }

      { this.state.loggedIn && 
        <button onClick ={ () => {
          this.getPopularity(); 
          this.setState({faves:{artist: []}}); 
          this.setState({recentlyPlayed: []})
          }}>
          Get Popularity
        </button>
        }
      
      { this.state.loggedIn && 
        <button onClick={ () => {
          this.getHistory(); 
          this.setState({popularity: 0}); 
          this.setState({faves:{artist: []}})
          }}>
        Get History
        </button>
        }  

      { this.state.loggedIn && 
        <button onClick={ () => {
          this.getFaves(); 
          this.setState({popularity: 0}); 
          this.setState({recentlyPlayed: []}) 
          }}>
        Get Faves
        </button>
        }     

      <div>
        <br/>
        { this.state.loggedIn && 
          this.state.popularity !== 0 && 
          <text>
            <h3>
              Artist Popularity 
            </h3> 
            {this.state.popularity}/100
          </text>
          }
      </div>
      
      <div>
        { this.state.loggedIn && 
          this.state.recentlyPlayed.length !== 0 && 
          <h3>
            Song History
          </h3>
          }
          {songsArray}
      </div>

      <div>
        { this.state.loggedIn && 
          this.state.faves.artist.length !== 0 && 
          <h3>
            Favorite Artists
          </h3>
          }
          {favesArray}
      </div> 
    </div>
  )}
}

class Song extends Component {
  render() {
    return(
      <div className='songDiv'>
        <a href={this.props.link} 
          target="_blank">
          {this.props.song} by <i>{this.props.artist}</i>
        </a>
      </div>
    )
  }
}

class Faves extends Component {
  render() {
    return(
      <div>
        You played {this.props.timesPlayed} songs by {this.props.artist}!
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));

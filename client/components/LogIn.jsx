import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class LogIn extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      console.log('access token received')
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {name: 'Not Checked', albumArt: ''} 
    }
  }

  getHashParams() {
    console.log('in getHashParams')
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        console.log('WE DID A THING')
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
    }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888'>Login to Spotify </a> 

        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>

        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height:150 }}/>
        </div>

        {this.state.loggedIn && <button onClick={ () => this.getNowPlaying() }>
            Check Now Playing
          </button>
        }

      </div>
    )
  }
}






    // return (
    //   <div>
    //     <div style={{textAlign: 'center'}}>
    //       <div style={{fontSize: '40px'}}>
    //       </div>
    //     <div>
    //        SpotiFave<br /><br />
    //       <a href='http://localhost:8888'>Login to Spotify </a> 

    //       <div>
    //         Now Playing: { this.state.nowPlaying.name }
    //       </div>

    //       <div>
    //         <img src={this.state.nowPlaying.albumArt} style={{ height:150 }}/>
    //       </div>

    //       {this.state.loggedIn && <button onClick={ () => this.getNowPlaying() }>
    //         Check Now Playing
    //       </button>
    //     }
    //     </div>
    //   </div>
    //   </div>
    //     {/* </div>
    //   </div> */}
    // // );
    // )}
export default LogIn;
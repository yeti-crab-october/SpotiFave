// handle Spotify oAuth2 flow
const express = require('express'); 
const request = require('request'); 
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.static('assets'));
app.use(express.static(__dirname + '/assets'));
app.use(cors());
app.use(cookieParser());
PORT = 3000;

const client_id = ""; 
const client_secret = ""; 
const redirect_uri = ""; 

//generates a random string with upper and lower case letters/numbers with input length
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/login', function(req, res) {
  let state = generateRandomString(16);
  res.cookie('spotify_auth_state', state);

  // set authorization scope and redirect url
  const scope = 'user-read-playback-state user-read-recently-played';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // requests refresh and access tokens after checking the state parameter, code and state are provided by the request (in this case clicking the login button)
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;
  // error handling
  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie('spotify_auth_state');
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    // different way of performing a request for information from server
    // read docs for request node module: https://www.npmjs.com/package/request
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
  
        let access_token = body.access_token,
            refresh_token = body.refresh_token;

        let options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:8080/#LogIn/' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});
//necessary in the event a token has expired
app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// handle redirect after error
// app.use((res, req) => {
//   res.status(404).redirect(301, 'http://localhost:8080');
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});

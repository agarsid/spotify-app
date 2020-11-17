var SpotifyWebApi = require('spotify-web-api-node');

const spotifyConfig = {
    clientId: "2ce3942e9cad41d7b05b2dff7c5c04de",
    clientSecret: "00d0d0d639ce4abd9fdaf299f8b290c9",
    redirectUri: "com.spotifytest://oauthredirect"
};

var spotifyApi = new SpotifyWebApi(spotifyConfig);

async function proxySpotifyToken(_req, res){
    //Retrieve code from request
    const code = _req.body.code;
    const refreshToken = _req.body.refresh_token;
    
    if(!code && !refreshToken){
        return res.status(403).json({success: false, data: "Not authorized"});
    }

    if(refreshToken){ 
        console.log('ref:',refreshToken)
        //Refresh token is available, retrieve a new access token
        spotifyApi.setRefreshToken(refreshToken);
        spotifyApi.refreshAccessToken().then(
            data => { 
                data.body.refreshToken = refreshToken;
                return res.json(data.body);
            },
            error => {
                console.log('Could not refreesh access token',error);
            }
        ).catch(onError => {
            return(res.json(onError))
        });
        // return res.json({ todo: "Refresh accesstoken"});
    }

    if(code){
        //Retrieve new refresh token and access token
        console.log('code:',code)
        spotifyApi.authorizationCodeGrant(code).then(
            data => {
                return res.json(data.body);
            },
            err => {console.log('Somethig went wrong',err);}
        ).catch(onError => {
            return(res.json(onError))
        });
        // return res.json({ todo: "Get refresh token & access token"});
    }


}

module.exports = {
    proxySpotifyToken
};
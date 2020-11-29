/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
import { authorize, refresh } from 'react-native-app-auth';

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: '2ce3942e9cad41d7b05b2dff7c5c04de',
      clientSecret: '00d0d0d639ce4abd9fdaf299f8b290c9',
      redirectUrl: 'com.spotifytest://oauthredirect',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
        'user-read-recently-played',
        'user-read-currently-playing',
        'user-modify-playback-state',
        'user-read-private'
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }
  async onLogin() {
    try {
      console.log('kin')
      const result = await authorize(this.spotifyAuthConfig);
      return result;
    } catch (error) {
      console.log('error');
      console.log(JSON.stringify(error));
    }
  }

  async refreshLogin(refreshToken) {
    try {
      console.log('sup')
      const result = await refresh(this.spotifyAuthConfig, {
        refreshToken: refreshToken,
      });
      return result;
    } catch (e) {
      console.log("potty: ", e)
    }
  }
}

const authHandler = new AuthenticationHandler();

export default authHandler;

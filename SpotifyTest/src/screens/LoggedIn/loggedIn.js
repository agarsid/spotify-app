import * as React from 'react';
import { Text } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-js';

import { db } from '../../config';


let addItem = item => {
    db.ref('/data').push({
      name: item
    });
  };

export default function LoggedIn(props) {
    let spotifyApi = new SpotifyWebApi();
    const { accessToken } = props;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMyCurrentPlayingTrack()
        .then(
            (data) => {
                console.log(JSON.stringify(data))
                addItem(data)
            },
            (err) => console.log(err)
        )

    return (
        <Text>{accessToken}</Text>
    );
}
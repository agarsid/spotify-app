import * as React from 'react';
import { Text } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-js';
import {addSong} from '../../backend/routes';

export default function LoggedIn(props) {
    let spotifyApi = new SpotifyWebApi();
    const { accessToken } = props;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMyCurrentPlayingTrack()
        .then(
            (data) => {
                console.log(JSON.stringify(data));
                addSong(data);
            },
            (err) => console.log(err)
        )

    return (
        <Text>{accessToken}</Text>
    );
}
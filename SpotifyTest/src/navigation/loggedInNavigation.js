import * as React from 'react';
import { Text } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-js';

export default function LoggedInNavigation(props) {
    let spotifyApi = new SpotifyWebApi();
    const { authentication } = props;
    spotifyApi.setAccessToken(authentication);

    spotifyApi.getMyCurrentPlayingTrack()
        .then(
            (data) => console.log(JSON.stringify(data)),
            (err) => console.log(err)
        )

    return (
        <Text>{authentication}</Text>
    );
}
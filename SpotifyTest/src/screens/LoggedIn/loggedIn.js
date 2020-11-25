import * as React from 'react';
import { Text, PermissionsAndroid, View, Button } from 'react-native';
import SpotifyWebApi from 'spotify-web-api-js';
import Geolocation from '@react-native-community/geolocation'

export default function LoggedIn(props) {
    let spotifyApi = new SpotifyWebApi();
    const { accessToken } = props;
    spotifyApi.setAccessToken(accessToken);
    // iOS geoloc
    Geolocation.setRNConfiguration({ skipPermissionRequests: true, authorizationLevel: "always" });

    const requestPermission = async () => {
        try {
            const res = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Information required",
                    message: "We need your location in order to tag songs",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (res === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Granted")
                Geolocation.getCurrentPosition(info => console.log(info))
            } else {
                console.log("lmao")
            }
        } catch (e) {
            console.warn(e)
        }
    }

    spotifyApi.getMyCurrentPlayingTrack()
        .then(
            (data) => console.log(JSON.stringify(data)),
            (err) => console.log(err)
        )

    return (
        <View>
            <Text>{accessToken}</Text>
            <Button onPress={requestPermission} title="Get Location" />
        </View>
    );
}
import React, { Component, useState, useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Button, PermissionsAndroid } from 'react-native';
import images from '../../../constants/images';
import SpotifyWebApi from 'spotify-web-api-js';
import Geolocation from '@react-native-community/geolocation';
import {addSong} from '../../backend/routes';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const users = [
    { id: 1, song: "What You Need", artist: "KAYTRANADA", art: images.bubba }
]

export default function TagScreen(props){
    const [song, setSong] = useState(null);
    let spotifyApi = new SpotifyWebApi();
    const { accessToken } = props;
    spotifyApi.setAccessToken(accessToken); 
    Geolocation.setRNConfiguration({ skipPermissionRequests: true, authorizationLevel: "always" });

    useEffect(() =>{
        spotifyApi.getMyCurrentPlayingTrack()
        .then(
            (data) => {
                console.log(JSON.stringify(data));
                setSong(data);
            },
            (err) => console.log(err)
        )
    }, [])

    const onRefresh = () => {
        spotifyApi.getMyCurrentPlayingTrack()
        .then(
            (data) => {
                console.log(JSON.stringify(data));
                setSong(data);
            },
            (err) => console.log(err)
        )
    }

    const onClickHandler = async () => {
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
                Geolocation.getCurrentPosition(info => {
                    console.log(info)
                    addSong(song, info)
                })
            } else {
                console.log("lmao")
            }
        } catch (e) {
            console.log('a')
            console.warn(e)
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 10}}>
            {
                song ? <Fragment>
                <View style={{height: SCREEN_HEIGHT - 150, width: SCREEN_WIDTH - 25, position: 'absolute' }}>
                    <Image 
                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }} 
                        source={{uri: song.item.album.images[0].url}} 
                    />
                    <View style={{...StyleSheet.absoluteFillObject, top: 440, backgroundColor:"rgba(0,0,0,.5)", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 10}}>
                        <Text style={{position: "relative", top: 0, left: 20, color:"white", fontSize:30, fontWeight: "bold"}}>{song.item.name}</Text>
                        <Text style={{position: "relative", top: 7, left: 20, color:"white", fontSize:15}}>{song.item.artists.map(artist => artist.name)}</Text>
                    </View>
                </View>
                <Button title="Tag song" onPress={onClickHandler} />
                <Button title="Refresh" onPress={onRefresh} />
                </Fragment> : <Text>No song playing</Text>
            }
        </View>
    );
}
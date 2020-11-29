import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, PanResponder, PermissionsAndroid, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getSongs, updateSongLike } from '../../backend/routes';
import SpotifyWebApi from 'spotify-web-api-js'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default class Swiper extends React.Component {

    constructor(props) {
        super(props)

        this.position = new Animated.ValueXY()
        this.state = {
            currentIndex: 0,
            songs: []
        }

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        })

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()
            ]
        }

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        })
        this.dislikeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        })

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        })

        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        })

        this.spotify = new SpotifyWebApi();
        this.spotify.setAccessToken(this.props.accessToken)
        this.PanResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })

            },
            onPanResponderRelease: (evt, gestureState) => {
                let index;
                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        useNativeDriver: true
                    }).start(() => {
                        index = this.state.currentIndex;
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                        var song_id = this.state.songs[index].database_id;
                        updateSongLike(song_id)
                    })
                }
                else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: true
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })

                    })
                }
                else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4,
                        useNativeDriver: true,
                    }).start()
                }

            }
        })

    }

    async componentDidMount() {
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
            console.log('nn')
            if (res === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Granted")
                Geolocation.getCurrentPosition(info => {
                    console.log(info)
                    console.log(getSongs(info))
                    getSongs(info)
                        .then(data => {
                            this.setState({ songs: data })
                            console.log('hi', data)
                        })
                        .catch((e) => console.log(e))

                })
            } else {
                console.log("lmao")
            }
        } catch (e) {
            console.log('a')
            console.warn(e)
        }
    }

    onClick = (id) => {
        const sid = `spotify:track:${id}`
        this.spotify.play({ uris: [sid] }).then(() => console.log(`playing ${sid}`)).catch((err) => console.log(err))
    }

    renderUsers = () => {
        return this.state.songs.map((song, i) => {
            let item = song.song
            if (i < this.state.currentIndex) {
                return null
            }

            else if (i == this.state.currentIndex) {
                return (
                    <Animated.View {...this.PanResponder.panHandlers} key={i} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 150, width: SCREEN_WIDTH - 25, position: 'absolute' }]}>

                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 100 }}>
                            <Text style={{ borderWidth: 1, borderColor: "green", color: "green", fontSize: 32, fontWeight: "800", padding: 10 }}>
                                LIKED
                            </Text>
                        </Animated.View>

                        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 100 }}>
                            <Text style={{ borderWidth: 1, borderColor: "red", color: "red", fontSize: 32, fontWeight: "800", padding: 10 }}>
                                NOPE
                            </Text>
                        </Animated.View>

                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={{ uri: item.albumImg }}
                        />
                        <View style={{ ...StyleSheet.absoluteFillObject, top: 440, backgroundColor: "rgba(0,0,0,.5)", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 10 }}>
                            <Text style={{ position: "relative", top: 0, left: 20, color: "white", fontSize: 30, fontWeight: "bold" }}>{item.name}</Text>
                            <Text style={{ position: "relative", top: 7, left: 20, color: "white", fontSize: 15 }}>{item.artist.map(a => a)}</Text>
                        </View>
                        <Button onPress={() => this.onClick(this.state.songs[i].song.song_id)} title="Play song"></Button>
                    </Animated.View>
                )
            }

            else {
                return (
                    <Animated.View {...this.PanResponder.panHandlers} key={i} style={[{ opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }], height: SCREEN_HEIGHT - 150, width: SCREEN_WIDTH - 25, position: 'absolute' }]}>
                        <Image
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                            source={{ uri: item.albumImg }} />
                        <View style={{ ...StyleSheet.absoluteFillObject, top: 440, backgroundColor: "rgba(0,0,0,.5)", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 10 }}>
                            <Text style={{ position: "relative", top: 0, left: 20, color: "white", fontSize: 30, fontWeight: "bold" }}>{item.name}</Text>
                            <Text style={{ position: "relative", top: 7, left: 20, color: "white", fontSize: 15 }}>{item.artist.map(a => a)}</Text>
                        </View>
                        <Button onPress={() => this.onClick(this.state.songs[i].song.song_id)} title="Play song"></Button>
                    </Animated.View>
                )
            }
        }).reverse()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                    {this.state.songs ?
                        this.renderUsers() : <Text>Loading</Text>
                    }
                </View>
            </View>
        )
    }
}
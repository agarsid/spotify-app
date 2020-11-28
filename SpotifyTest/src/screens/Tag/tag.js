import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, PanResponder } from 'react-native';
import images from '../../../constants/images';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const users = [
    { id: 1, song: "What You Need", artist: "KAYTRANADA", art: images.bubba }
]

export default class TagScreen extends Component {
    render(){
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 10}}>
                <View style={{height: SCREEN_HEIGHT - 150, width: SCREEN_WIDTH - 25, position: 'absolute' }}>
                <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                        source={users[0].art} 
                        />
                        <View style={{...StyleSheet.absoluteFillObject, top: 440, backgroundColor:"rgba(0,0,0,.5)", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 10}}>
                        <Text style={{position: "relative", top: 0, left: 20, color:"white", fontSize:30, fontWeight: "bold"}}>{users[0].song}</Text>
                        <Text style={{position: "relative", top: 7, left: 20, color:"white", fontSize:15}}>{users[0].artist}</Text>
                </View>
                </View>
            </View>
        );
    }
}
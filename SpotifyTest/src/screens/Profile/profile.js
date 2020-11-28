import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';

import { connect } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../../constants/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white
    },
    view: {
        alignItems: "center",
      },
      logo: {
        width: '50%',
        height: '50%'
      },
      logoSpotify: {
        flex: .15,
        marginRight: 10
      },
    
      button: {
        flexDirection: "row",
        backgroundColor: COLORS.spotifyGreen,
        marginTop: SIZES.padding * 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: 300,
        elevation: 10
      }

}
)

export default class ProfileScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={["#7ec53a", "#acef6d"]}
                    style={{ flex: 1 }}
                >
                    <View style={{ ...styles.view, flex: 3, justifyContent: "flex-start", alignItems: "center", paddingTop: "20%" }}>
                        <Image
                            source={images.dummyprofile}
                            resizeMode="cover"
                            style={styles.logo}
                            
                        />
                        <View style={{ alignItems: "center", marginHorizontal: SIZES.padding, justifyContent:"flex-start" }}>
                            <Text style={{ color: COLORS.white, marginTop: SIZES.padding / 2, textAlign: "center", ...FONTS.h2 }}>Jane Doe</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.view, flex: 1, justifyContent: "flex-start", marginBottom: "12%" }}>
                        
                        <TouchableOpacity style={styles.button} activeOpacity={0.5}>
                            
                            <Text style={{ color: COLORS.white, ...FONTS.body3, fontWeight: "bold" }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        )

    }
}
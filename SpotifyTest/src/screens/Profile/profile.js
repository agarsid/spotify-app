import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';
import { setNull } from '../../redux/features/authentication/authenticationSlice'
import { connect } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import images, { dummyprofile } from '../../../constants/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SpotifyWebApi from 'spotify-web-api-js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    view: {
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 100,
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


class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName : "John Doe",
            imageUri : "", 
        }
    }
    componentDidMount(){
        const spotify = new SpotifyWebApi();
        spotify.setAccessToken(this.props.accessToken)
        spotify.getMe()
            .then(user => {
                let name = user.display_name || "John Doe"
                let image = user.images[0]?.url
                this.setState({
                    userName: name,
                    imageUri: image
                })
            })
            .catch()
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={["#7ec53a", "#acef6d"]}
                    style={{ flex: 1 }}
                >
                    <View style={{ ...styles.view, flex: 3, justifyContent: "flex-start", alignItems: "center", paddingTop: "20%" }}>
                        <Image
                            source={this.state.imageUri ? {uri: this.state.imageUri} : images.dummyprofile}
                            resizeMode="cover"
                            style={styles.logo}
                        />
                        <View style={{ alignItems: "center", marginHorizontal: SIZES.padding, justifyContent: "flex-start" }}>
        <Text style={{ color: COLORS.white, marginTop: SIZES.padding / 2, textAlign: "center", ...FONTS.h2 }}>{this.state.userName}</Text>
                        </View>
                    </View>
                    <View style={{ ...styles.view, flex: 1, justifyContent: "flex-start", marginBottom: "12%" }}>

                        <TouchableOpacity style={styles.button} activeOpacity={0.5}>

                            <Text style={{ color: COLORS.white, ...FONTS.body3, fontWeight: "bold" }} onPress={this.props.setNull}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
        accessToken: state.authentication.accessToken,
        refreshToken: state.authentication.refreshToken,
    };
};

const mapDispatchToProps = {
    setNull
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
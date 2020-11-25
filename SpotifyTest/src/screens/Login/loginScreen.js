/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';

import { connect } from 'react-redux';

import authHandler from '../../utils/authHandler';

import {
  setAccessToken,
  setRefreshToken,
  setSigingIn,
} from '../../redux/features/authentication/authenticationSlice';
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
    borderRadius: 15,
    width: 300,
    elevation: 10
  }
})

class LoginScreen extends Component {
  state = {};

  onPressLogin = async () => {
    const authenticationObject = await authHandler.onLogin();
    this.props.setAccessToken({ accessToken: authenticationObject.accessToken });
    this.props.setRefreshToken({
      refreshToken: authenticationObject.refreshToken,
    });
  };


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#fbc2eb", "#a6c1ee"]}
          style={{ flex: 1 }}
        >
          <View style={{ ...styles.view, flex: 1, justifyContent: "center" }}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <View style={{ ...styles.view, flex: 1, justifyContent: "flex-start" }}>
            <View style={{ alignItems: "center", marginHorizontal: SIZES.padding }}>
              <Text style={{ ...FONTS.h2 }}>Welcome to GeoJam</Text>
              <Text style={{ color: COLORS.white, marginTop: SIZES.padding / 2, textAlign: "center", ...FONTS.body3 }}>Discover new and exciting music that people are listening right around you!</Text>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={this.onPressLogin}>
              <Image
                source={images.spotify}
                resizeMode="contain"
                style={styles.logoSpotify}
              />
              <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Login with Spotify</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = { setAccessToken, setRefreshToken, setSigingIn };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

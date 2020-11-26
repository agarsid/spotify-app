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
    }
}
)

export default class ProfileScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={["#fbc2eb", "#a6c1ee"]}
                    style={{ flex: 1 }}
                >
                </LinearGradient>
            </SafeAreaView>
        )

    }
}
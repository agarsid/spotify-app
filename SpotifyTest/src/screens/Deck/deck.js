import * as React from 'react';
import Swiper from 'react-native-deck-swiper';
import { Button, Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        flex: 1,
        borderRadius: 16,
        // borderWidth: 2,
        // borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white",
        elevation: 10
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});

export default function GuestNavigation() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Swiper
                    cards={[{ name: 'Nav' }, { name: 'sid' }]}
                    renderCard={(card) => {
                        return (
                            <View style={styles.card}>
                                <Text style={styles.text}>{card.name}</Text>
                            </View>
                        )
                    }}
                    onSwiped={(cardIndex) => { console.log(cardIndex) }}
                    onSwipedAll={() => { console.log('onSwipedAll') }}
                    cardIndex={1}
                    backgroundColor={COLORS.spotifyGreen}
                    stackSize={2}
                    infinite={true}
                >
                </Swiper>
            </View>
        </SafeAreaView>
    );
}


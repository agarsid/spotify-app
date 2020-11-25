import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// import Profile from '../screens/Profile/profile';
// import Discover from '../screens/Discover/discover';
// import Tag from '../screens/Tag/tag';

function ProfileScreen(){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    )
}

function DiscoverScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Discover!</Text>
        </View>
    )
}

function TagScreen(){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tag a song!</Text>
        </View>
    )
}

const Tab = createBottomTabNavigator();

export default function UserNavigation(props) {
    const {accessToken} = props;
    return (
        <Tab.Navigator >
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Discover" component={Discover} />
          <Tab.Screen name="Tag" component={Tag} />
        </Tab.Navigator>
    );
  }



import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import ProfileScreen from '../screens/Profile/profile';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// import Tag from '../screens/Tag/tag';

// function ProfileScreen(){
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Profile!</Text>
//         </View>
//     )
// }


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
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Discover" component={DiscoverScreen} />
          <Tab.Screen name="Tag" component={TagScreen} />
        </Tab.Navigator>
    );
  }



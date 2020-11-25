import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Guest from '../screens/Guest/guest';

const Stack = createStackNavigator()

export default function GuestNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Guest} />
        </Stack.Navigator>
    );
}
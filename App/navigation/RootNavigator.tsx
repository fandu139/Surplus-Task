import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import LoginScreen from '../screens/Auth/Login';


const Root = createNativeStackNavigator();

function RootNavigator(): ReactElement {
  const defaultHeaderOptions = {};

  return (
    <Root.Navigator
      initialRouteName="LoginScreen"
    >
      <Root.Screen
        options={{ headerShown: false }}
        name="MainNavigator"
        component={MainNavigator}
      />
      <Root.Screen
        options={{ headerShown: false, title: '' }}
        name="LoginScreen"
        component={LoginScreen}
      />
    </Root.Navigator>
  );
}

export default RootNavigator;

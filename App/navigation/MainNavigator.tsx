/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function MainNavigator(): ReactElement {
  const defaultHeaderOptions = {};

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
    >
      <Stack.Screen
        options={{ ...defaultHeaderOptions, headerShown: false }}
        name="MainScreen"
        component={MainScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: 20,
    paddingVertical: 15,
  },
});

export default MainNavigator;

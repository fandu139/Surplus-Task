/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from './App/context/Auth';
import AppSplashScreen from './App/screens/Splash';
import RootNavigator from './App/navigation/RootNavigator';

function App(): JSX.Element {
  const [showSplashScreen, setIsShowSplashScreen] = useState(true);
  const [accountData, setAccountData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 5000);
  }, []);

  if(showSplashScreen) {
    return <AppSplashScreen />
  }

  return (
    <AuthContext.Provider value={{
      accountData,
      setAccountData,
      isAuthenticated,
      setIsAuthenticated,
    }}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

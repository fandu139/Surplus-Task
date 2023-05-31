import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, RefreshControl } from 'react-native';
import HomeHeader from './components/HomeHeader';
import AppStyles from '../../theme/appStyles';
import Colors from '../../theme/colors';
import Banner from './components/Banner';
import OrderListHome from './components/OrderListHome';
import AuthContext from '../../context/Auth';
import Text from '../../uikit/Text';
import Fonts from '../../theme/fonts';

const HomeScreen = () => {
  const { accountData } = React.useContext(AuthContext);

  return (
    <View style={styles.container} testID="home-screen" accessibilityLabel="home-screen">
      <HomeHeader headerBarAction={<Text.Bold style={styles.textName}>Hi, {accountData[0]?.name}</Text.Bold>}/>
      <View style={styles.container}>
        <Banner />
        <OrderListHome />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  textName: {
    color: Colors.WHITE,
  },
});

export default HomeScreen;

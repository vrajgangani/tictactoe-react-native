/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import PlayWithAi from './components/PlayWithAi';
import PlayWithFriends from './components/PlayWithFriends';
import Home from './components/Home';
import BannerAdsComponent from './components/BannerAdsComponent';
import {StyleSheet, Text, View} from 'react-native';
import {BannerAdSize} from '@react-native-admob/admob';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <View style={styles.outerContainer}>
        <View style={styles.appContainer}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AI" component={PlayWithAi} />
              <Stack.Screen name="Friends" component={PlayWithFriends} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
        <View style={styles.bannerAdContainer}>
          <BannerAdsComponent />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
  },
  bannerAdContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50dp',
  },
});

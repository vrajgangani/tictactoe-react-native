/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
/* colors: #0080df, #e21e57 */

export default function Home({navigation}) {
  return (
    <>
      
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/home-background.jpg')}
          resizeMode="cover"
          style={styles.imgeBackground}>
          <View style={styles.secondContainer}>
            <View style={styles.playWithContainer}>
              <Image
                source={require('../assets/computer.png')}
                style={styles.computerImage}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  navigation.navigate('AI');
                }}>
                <Text style={[styles.button, styles.playWithAIButton]}>
                  PLAY WITH AI
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.playWithContainer}>
              <Image
                source={require('../assets/people.png')}
                style={styles.computerImage}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Friends');
                }}
                style={styles.buttonContainer}>
                <Text style={styles.button}>PLAY WITH FRIENDS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  secondContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imgeBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    color: '#fff',
    backgroundColor: '#0080df',
    fontSize: 20,
    borderRadius: 5,
  },
  playWithAIButton: {
    backgroundColor: '#e21e57',
  },
  computerImage: {
    height: 200,
    width: 200,
    zIndex: 1,
  },
  playWithContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  bannerAdContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
  },
});

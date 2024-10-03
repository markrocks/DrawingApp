import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/loadingImage.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default LoadingView;

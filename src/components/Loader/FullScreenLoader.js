import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const FullScreenLoader = ({whitebackground = false}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: whitebackground ? '#FFFFFF' : 'rgba(0,0,0,0.2)'},
      ]}>
      <View style={[styles.loaderContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    zIndex: 999,
  },
  gifLoader: {
    width: 30,
    height: 40,
    alignSelf: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
  },
});
export default FullScreenLoader;

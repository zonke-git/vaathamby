import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, StyleSheet} from 'react-native';

const GradientBorderView = ({children, borderWidth = 1}) => {
  return (
    <LinearGradient
      colors={['#FF00FF', '#00FFFF']} // Your gradient colors
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientWrapper}>
      <View style={[styles.content, {padding: borderWidth}]}>{children}</View>
    </LinearGradient>
  );
};

export default GradientBorderView;

const styles = StyleSheet.create({
  gradientWrapper: {
    borderRadius: 10, // Your desired border radius
    padding: 1, // Small padding to make gradient visible
  },
  content: {
    backgroundColor: 'white', // Or your desired background
    borderRadius: 9, // Slightly less than wrapper to account for border
  },
});

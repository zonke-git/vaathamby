import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, StyleSheet} from 'react-native';

const GradientBorderCard = ({
  children,
  borderWidth = 1,
  colors = ['#FF00FF', '#00FFFF'],
}) => {
  return (
    <View style={styles.container}>
      {/* Background gradient - acts as border */}
      <LinearGradient
        colors={colors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.gradientBackground, {borderRadius: 10 + borderWidth}]}
      />

      {/* Main content */}
      <View
        style={[
          styles.content,
          {
            borderRadius: 10,
            margin: borderWidth,
          },
        ]}>
        {children}
      </View>
    </View>
  );
};

export default GradientBorderCard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: 'white', // Or your desired background
  },
});

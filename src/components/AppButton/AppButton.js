import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const AppButton = ({
  onPress,
  title,
  width = '100%',
  useColors = [],
  buttonStyle = {},
  textStyle = {},
  gradientStyle = {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, {width}, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <LinearGradient
        colors={useColors}
        style={[styles.button, gradientStyle]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={[styles.btnText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    alignSelf: 'center',
    width: 150,
    borderRadius: 10,
    backgroundColor: colors.white,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },

  button: {
    minHeight: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
    zIndex: 999,
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: typography.Medium_500,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    textAlign: 'center',
    paddingVertical: 14,
  },
});

export default AppButton;

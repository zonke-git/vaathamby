import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const CheckBox = ({
  label,
  value,
  onToggle,
  labelStyle,
  containerStyle,
  childDiv,
  error,
}) => {
  return (
    <>
      <Pressable
        style={[styles.container, containerStyle]}
        onPress={onToggle}
        hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
        <View style={[styles.checkbox, value && styles.checked]}>
          {value && (
            <Image
              source={require('../../assets/images/checkTick.png')}
              style={styles.tickIcon}
            />
          )}
        </View>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        {childDiv}
      </Pressable>
      {error && <Text style={[styles.error]}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 12,
    color: '#6F6F6F',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 2.67,
    borderWidth: 1,
    borderColor: '#8F8F8F',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#FA5117',
    borderColor: '#FA5117',
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
  tickIcon: {
    width: 15,
    height: 15,
    tintColor: colors.white,
  },
});

export default CheckBox;

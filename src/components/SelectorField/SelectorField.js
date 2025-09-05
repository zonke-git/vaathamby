import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../Theme/colors';
import {i18n} from '../../localization';
import {typography} from '../../Theme/typography';

const SelectorField = ({
  label = i18n.t('OutletLocation'),
  value,
  placeholder = `${i18n.t('Select')} ${i18n.t('Location')}`,
  error,
  touched,
  onSelectPress,
  required = true,
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon = require('../../assets/images/location.png'),
  rightIcon = require('../../assets/images/ChevronDown.png'),
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TouchableOpacity
        style={[styles.selectableBox, touched && error && styles.inputError]}
        onPress={onSelectPress}
        activeOpacity={0.8}>
        {showLeftIcon && (
          <Image source={leftIcon} style={styles.locationIcon} />
        )}
        <View style={styles.valueWrapper}>
          <Text
            style={[
              styles.boxDataText,
              {
                color: value ? colors.EerieBlack : colors.SilverGray,
              },
            ]}
            numberOfLines={1}>
            {value || placeholder}
          </Text>
        </View>
        {showRightIcon && <Image source={rightIcon} style={styles.rightIcon} />}
      </TouchableOpacity>

      {touched && error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.DimGray,
    lineHeight: 12 * 1.6,
    fontFamily: typography.Medium_500,
  },
  required: {
    color: colors.FireEngineRed,
  },
  selectableBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.white,
    shadowColor: colors.Gainsboro,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 2,
  },
  locationIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  valueWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  boxDataText: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
  inputError: {
    borderColor: colors.FireEngineRed,
  },
  rightIcon: {
    height: 24,
    width: 24,
    marginLeft: 8,
    resizeMode: 'contain',
    tintColor: colors.DimGray,
  },
});

export default SelectorField;

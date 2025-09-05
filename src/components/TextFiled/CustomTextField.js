/* eslint-disable no-sparse-arrays */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const CustomTextField = ({
  label,
  required = false,
  placeholder,
  value,
  onChangeText,
  error,
  placeholderTextColor = colors.SilverGray,
  style,
  inputStyle,
  errorStyle,
  labelStyle,
  showSearchIcon = false,
  onBlur,
  onFocus,
  secureTextEntry = false,
  keyboardType = 'default',
  showRightIcon = false,
  rightIconSource,
  onRightIconPress,
  leftComponent = null,
  countryPhoneCode,
  countryPhoneFlag,
  setOpenCountryModal,
  maxLength,
  disable = true,
  disableContrySelection = false,
  showLocationIcon = false,
  showVerification = false,
  multiline = false,
  multilineInputStyle,
  numberOfLines = 1,
  textAlignVertical = multiline ? 'top' : 'center',
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}>*</Text>}
          </Text>
        )}
        {showVerification && (
          <Image
            source={rightIconSource ?? require('../../assets/images/check.png')}
            style={styles.tickIcon}
          />
        )}
      </View>
      <View
        style={[
          styles.shadowContainer,
          inputStyle,
          error && styles.inputError,
          multiline && styles.multilineContainer,
          {
            backgroundColor: !disable ? '#F3F3F3' : colors.white,
            minHeight: numberOfLines * (14 * 1.4) + 16,
          },
        ]}>
        {showSearchIcon && (
          <Image
            source={require('../../assets/images/search.png')}
            style={styles.leftIcon}
          />
        )}
        {showLocationIcon && (
          <Image
            source={require('../../assets/images/location.png')}
            style={styles.leftIcon}
          />
        )}
        {leftComponent && (
          <>
            <TouchableOpacity
              onPress={() => setOpenCountryModal(true)}
              style={styles.countryContainer}
              disabled={disableContrySelection}>
              <Text style={styles.countryCodeFlag}>{countryPhoneFlag}</Text>
              <Text
                style={styles.countryCodeText}>{`(${countryPhoneCode})`}</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
          </>
        )}
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            multiline && multilineInputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={text => {
            let formattedText = text
              .replace(/^\s+/, '') // remove leading spaces
              .replace(/ {2,}/g, ' '); // replace multiple spaces with single space

            // Allow only a single trailing space (or none)
            formattedText = formattedText.replace(/(\S)( {2,})$/g, '$1 ');

            onChangeText(formattedText);
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          // keyboardType="numeric"
          maxLength={maxLength}
          editable={disable}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          textAlignVertical={textAlignVertical}
          // textBreakStrategy="simple"
          // scrollEnabled={true}
        />
        {showRightIcon && rightIconSource && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Image source={rightIconSource} style={styles.rightIcon} />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.DimGray,
    lineHeight: 12 * 1.6,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  tickIcon: {
    width: 12,
    height: 12,
    marginLeft: 8,
  },
  required: {
    color: colors.FireEngineRed,
  },
  shadowContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 14,
    minHeight: 46, // Changed from fixed height to minHeight
    shadowColor: colors.Gainsboro,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 2,
  },
  multilineContainer: {
    alignItems: 'flex-start', // Align items to top for multiline
    paddingVertical: 10, // Add more vertical padding
    height: undefined, // Remove fixed height
  },

  multilineInput: {
    textAlignVertical: 'top', // Ensure text starts from top
    paddingTop: 8, // Add some top padding
    paddingBottom: 8, // Add some bottom padding
    // minHeight: 120,
  },
  leftIcon: {
    width: 16.27,
    height: 16.27,
    marginRight: 2.5,
  },
  input: {
    alignSelf: 'center',
    flex: 1,
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  inputError: {
    borderColor: colors.FireEngineRed,
  },
  rightIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },

  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeFlag: {
    fontSize: 20,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    marginRight: 12,
  },
  verticalLine: {
    width: 1,
    height: '100%', // Or use a fixed height like 25
    backgroundColor: '#EDF1F3',
    // marginHorizontal: 8,
    alignSelf: 'center',
    marginRight: 10,
  },
});

export default CustomTextField;

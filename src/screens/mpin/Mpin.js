import React from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {i18n} from '../../localization';
import AuthLayout from '../layout/AuthLayout';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import OtpCodeField from '../../components/Otp/OtpCodeField';
import CheckBox from '../../components/CheckBox/CheckBox';
import AppButton from '../../components/AppButton/AppButton';
import {useMpin} from '../../hooks';

const Mpin = () => {
  const {
    otpValue,
    setOtpValue,
    invalidOtp,
    fingerPrintORfaceIDCheckBox,
    setFingerPrintORfaceIDCheckBox,
    handleSumbit,
    isLoader,
    reEnterOtpValue,
    setReEnterOtpValue,
    reEnterStatus,
    setReEnterStatus,
  } = useMpin();

  return (
    <AuthLayout
      title={`${i18n.t('Create')} MPIN`}
      subTitle={i18n.t(
        'SetYouPersonal4_digitMPIN_ItWillBeUsedForSecureAndFastSignIn',
      )}
      loader={isLoader}>
      <View style={styles.container}>
        <View style={styles.insideContainer}>
          <Text style={styles.titleTxt}>
            {`${reEnterStatus ? i18n.t('Re_enter') : i18n.t('Enter')} MPIN`}
          </Text>
          <View style={styles.optView}>
            {/* Conditional rendering of OtpCodeField for better control over autoFocus */}
            {!reEnterStatus ? (
              <OtpCodeField
                value={otpValue}
                setValue={setOtpValue}
                invalidOtp={invalidOtp}
                CUSTOM_CELL_COUNT={4}
                showValues={false}
                customInputStyle={styles.otpBox}
                OTP_textColor={{color: colors.CharcoalGray}}
                autoFocus={true} // Auto-focus for the initial MPIN entry
              />
            ) : (
              <OtpCodeField
                key="reEnterOtpField" // Add a key to force remount when reEnterStatus changes
                value={reEnterOtpValue}
                setValue={setReEnterOtpValue}
                invalidOtp={invalidOtp} // You might want a separate invalidOtp for re-enter if logic differs
                CUSTOM_CELL_COUNT={4}
                showValues={false}
                customInputStyle={styles.otpBox}
                OTP_textColor={{color: colors.CharcoalGray}}
                autoFocus={true} // Auto-focus for the re-enter MPIN entry
              />
            )}
          </View>
          <CheckBox
            label={
              Platform.OS === 'android'
                ? i18n.t('EnableFingerprint_AlongWith_MPIN_Creation')
                : i18n.t('EnableFace_ID_AlongWith_MPIN_Creation')
            }
            labelStyle={styles.checkBoxLabel}
            value={fingerPrintORfaceIDCheckBox}
            onToggle={() => {
              setFingerPrintORfaceIDCheckBox(!fingerPrintORfaceIDCheckBox);
            }}
          />
        </View>

        <AppButton
          title={`${i18n.t('Create')} MPIN`}
          onPress={() => {
            reEnterStatus ? handleSumbit() : setReEnterStatus(true);
          }}
          disabled={
            reEnterStatus
              ? reEnterOtpValue?.length === 4
                ? false
                : true
              : otpValue?.length === 4
              ? false
              : true
          }
          useColors={
            reEnterStatus
              ? reEnterOtpValue?.length === 4
                ? [colors.appTheme, colors.appTheme]
                : [colors.white, colors.white]
              : otpValue?.length === 4
              ? [colors.appTheme, colors.appTheme]
              : [colors.white, colors.white]
          }
          textStyle={{
            color: reEnterStatus
              ? reEnterOtpValue?.length === 4
                ? colors.white
                : colors.LightSlateGray
              : otpValue?.length === 4
              ? colors.white
              : colors.LightSlateGray,
          }}
        />
      </View>
    </AuthLayout>
  );
};

export default Mpin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  insideContainer: {},
  titleTxt: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 20,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
    textAlign: 'center',
  },
  optView: {
    paddingHorizontal: 60,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
  },
  otpBox: {
    width: 54,
    height: 57,
  },
  checkBoxLabel: {
    fontSize: 12,
    color: colors.WarmGrayTone,
    lineHeight: 12 * 1.5,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
});

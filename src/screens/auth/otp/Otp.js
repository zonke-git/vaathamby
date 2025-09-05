import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useOTP} from '../../../hooks';
import AuthLayout from '../../layout/AuthLayout';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import OtpCodeField from '../../../components/Otp/OtpCodeField';
import {i18n} from '../../../localization';
import AppButton from '../../../components/AppButton/AppButton';
import {maskEmail} from '../../../utils/maskEmail';
import { maskPhoneNumber } from '../../../utils/maskMobileNo';

const OTP = () => {
  const {
    otpValue,
    setOtpValue,
    canResend,
    timeLeft,
    formatTime,
    handleResendOTP,
    handleSubmit,
    handleBack,
    verifyOtpError,
    verifyOtpErrorMessage,
    loading,
    handleChangeNumber,
    handleChangeEmailId,
    resendLoader,
    mpinError,
    isLoader,
    showEmailVerifyContent,
    handleManualSubmit,
    autoFocus,
    userInput,
    sentOTPtoEmail,
    isNavigatingChangeNo,
    setIsNavigatingChangeNo,
  } = useOTP();

  const isOtpValid = otpValue?.length === 6;

  return (
    <AuthLayout
      title={i18n.t('VerificationCode')}
      subTitle={
        showEmailVerifyContent
          ? i18n.t('OTP_HasBeenSentToYourEmail_ID') +
            ' ' +
            maskEmail(sentOTPtoEmail)
          : i18n.t('WeHaveSentTheVerificationCodeToYourPhoneNumber') +
            ' ' +
            userInput?.countrieDetails?.phoneCode +
            ' ' +
            maskPhoneNumber(userInput?.phoneNo?.replace(/\s+/g, ''))
      }
      loader={loading || resendLoader || isLoader}>
      <View style={styles.container}>
        <View>
          <View style={styles.optView}>
            <OtpCodeField
              value={otpValue}
              setValue={setOtpValue}
              invalidOtp={
                verifyOtpError ? verifyOtpErrorMessage : '' || mpinError
              }
              spacebetween={{marginHorizontal: 5}}
              shouldAutoFocus={autoFocus}
              askPermissionForSMSread={true}
            />
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

            <TouchableOpacity onPress={handleResendOTP} disabled={!canResend}>
              <Text
                style={[
                  styles.timerText,
                  styles.resendText,
                  {
                    color: !canResend ? colors.LightSlateGray : colors.appTheme,
                  },
                ]}>
                {i18n.t('ResendOTP')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <AppButton
            disabled={isOtpValid ? false : true}
            onPress={() => {
              handleManualSubmit();
            }}
            title={`${i18n.t('Verify')} OTP`}
            useColors={
              isOtpValid
                ? [colors.appTheme, colors.appTheme]
                : [colors.LightMistGray, colors.LightMistGray]
            }
            buttonStyle={styles.buttonContainer}
            textStyle={{
              color: isOtpValid ? colors.white : colors.LightSlateGray,
            }}
          />

          <AppButton
            onPress={
              showEmailVerifyContent ? handleChangeEmailId : handleChangeNumber
            }
            title={
              showEmailVerifyContent
                ? i18n.t('ChangeEmailID')
                : i18n.t('ChangeNumber')
            }
            useColors={[colors.white, colors.white]}
            disabled={isNavigatingChangeNo}
            textStyle={{
              color: colors.DarkCharcoal,
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 44,
  },

  optView: {
    paddingHorizontal: 60,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
  },

  buttonContainer: {
    marginBottom: 16,
  },

  timerContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: "center",
  },
  timerText: {
    fontSize: 12,
    color: colors.appTheme,
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  resendText: {
    textDecorationLine: 'underline',
    fontFamily: typography.SemiBold_600,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
});

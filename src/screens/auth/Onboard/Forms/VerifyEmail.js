import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useVerifyEmail} from '../../../../hooks';
import AuthLayout from '../../../layout/AuthLayout';
import {i18n} from '../../../../localization';
import OtpCodeField from '../../../../components/Otp/OtpCodeField';
import colors from '../../../../Theme/colors';
import AppButton from '../../../../components/AppButton/AppButton';
import {typography} from '../../../../Theme/typography';

const VerifyEmail = () => {
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
    resendLoader,
  } = useVerifyEmail();

  return (
    <AuthLayout
      title={i18n.t('VerificationCode')}
      subTitle={i18n.t('WeHaveSentTheVerificationCodeToYourPhoneNumber')}
      loader={loading || resendLoader}>
      <View style={styles.container}>
        <View>
          <View style={styles.optView}>
            <OtpCodeField
              value={otpValue}
              setValue={setOtpValue}
              invalidOtp={verifyOtpError ? verifyOtpErrorMessage : ''}
              spacebetween={{marginHorizontal: 5}}
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
            disabled={otpValue?.length === 6 ? false : true}
            onPress={handleSubmit}
            title={`${i18n.t('Verify')} OTP`}
            useColors={
              otpValue?.length === 6
                ? [colors.appTheme, colors.appTheme]
                : [colors.LightMistGray, colors.LightMistGray]
            }
            buttonStyle={styles.buttonContainer}
            textStyle={{
              color:
                otpValue?.length === 6 ? colors.white : colors.LightSlateGray,
            }}
          />

          <AppButton
            onPress={handleChangeNumber}
            title={i18n.t('ChangeNumber')}
            useColors={[colors.white, colors.white]}
            textStyle={{
              color: colors.DarkCharcoal,
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default VerifyEmail;

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
});

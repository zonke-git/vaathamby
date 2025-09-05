import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useForgotMpinOtp} from '../../hooks';
import AuthLayout from '../layout/AuthLayout';
import {i18n} from '../../localization';
import OtpCodeField from '../../components/Otp/OtpCodeField';
import colors from '../../Theme/colors';
import {AppButton} from '../../components';
import {typography} from '../../Theme/typography';

const ForgotMpinOtpScreen = () => {
  const {
    otpValue,
    setOtpValue,
    canResend,
    timeLeft,
    formatTime,
    handleResendOTP,
    handleSubmit,
    autoFocus,
    resendLoader,
    isLoader,
    mpinError,
  } = useForgotMpinOtp();

  const isOtpValid = otpValue?.length === 6;

  return (
    <AuthLayout
      title={i18n.t('VerificationCode')}
      subTitle={i18n.t('WeHaveSentTheVerificationCodeToYourPhoneNumber')}
      loader={resendLoader || isLoader}>
      <View style={styles.container}>
        <View>
          <View style={styles.optView}>
            <OtpCodeField
              value={otpValue}
              setValue={setOtpValue}
              invalidOtp={mpinError}
              spacebetween={{marginHorizontal: 5}}
              shouldAutoFocus={autoFocus}
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
        <AppButton
          disabled={!isOtpValid}
          onPress={handleSubmit}
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
      </View>
    </AuthLayout>
  );
};

export default ForgotMpinOtpScreen;

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
  timerContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerText: {
    fontSize: 12,
    color: colors.appTheme,
    fontFamily: typography.Medium_500,
  },
  resendText: {
    textDecorationLine: 'underline',
    fontFamily: typography.SemiBold_600,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});

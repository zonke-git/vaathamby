import React from 'react';
import {View, StyleSheet, Text, Image, Platform, Pressable} from 'react-native';
import AuthLayout from '../layout/AuthLayout';
import {useMpinLogin} from '../../hooks';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {i18n} from '../../localization';
import AppButton from '../../components/AppButton/AppButton';
import OtpCodeField from '../../components/Otp/OtpCodeField';

const MpinLogin = () => {
  const {
    MPIN,
    setMPIN,
    handleLoginBut,
    isLoader,
    handleBiometric,
    handleForgotMPIN,
    isErrorMsg,
    biometricEnabled,
  } = useMpinLogin();

  return (
    <AuthLayout title={i18n.t('LoginToYourAccount')} loader={isLoader}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleTxt}>{i18n.t('Enter')} MPIN</Text>
          <View style={styles.optView}>
            <OtpCodeField
              value={MPIN}
              setValue={setMPIN}
              invalidOtp={isErrorMsg}
              CUSTOM_CELL_COUNT={4}
              showValues={false}
              customInputStyle={styles.otpBox}
              OTP_textColor={{color: colors.CharcoalGray}}
            />
          </View>
          <View style={styles.forgot_View}>
            <Text style={styles.forgotTxt} onPress={handleForgotMPIN}>
              {i18n.t('Forgot')} MPIN ?
            </Text>
          </View>
          {biometricEnabled && (
            <Pressable
              style={styles.authButtonLoginView}
              onPress={handleBiometric}>
              <Image
                source={
                  Platform.OS === 'android'
                    ? require('../../assets/images/fingerPrint.png')
                    : require('../../assets/images/faceId.png')
                }
                style={styles.authIcon}
              />
              <Text style={styles.authLoginTxt}>
                {Platform.OS === 'android' ? 'Fingerprint' : 'Face ID'}
              </Text>
            </Pressable>
          )}
        </View>
        <View>
          <AppButton
            title={i18n.t('LogIn')}
            onPress={handleLoginBut}
            disabled={MPIN?.length === 4 ? false : true}
            useColors={
              MPIN?.length === 4
                ? [colors.appTheme, colors.appTheme]
                : [colors.LightMistGray, colors.LightMistGray]
            }
            textStyle={{
              color: MPIN?.length === 4 ? colors.white : colors.LightSlateGray,
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default MpinLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
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
  forgot_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  forgotTxt: {
    fontSize: 12,
    color: colors.appTheme,
    lineHeight: 12 * 1.4,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  authIcon: {
    width: 28,
    height: 28,
  },
  authButtonLoginView: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 23.5,
    paddingVertical: 10,
    backgroundColor: colors.appTheme,
    borderRadius: 30,

    // width: '100%',
    // height: 48,
    shadowColor: colors.appTheme,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  authLoginTxt: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    fontFamily: typography.Medium_500,
    marginLeft: 10,
  },
});

import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AuthLayout from '../../layout/AuthLayout';
import {useLogin} from '../../../hooks';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {i18n} from '../../../localization';
import AppButton from '../../../components/AppButton/AppButton';
import {PhoneNumberInput} from '../../../components';
import {setLoginDetails} from '../../../redux/slice/authSlice';

const LogIn = () => {
  const {
    userInput,
    isPhoneNumberInvalid,
    modalVisible,
    setModalVisible,
    validationErrorMsg,
    requestOtpErrorMessage,
    handleSignUP,
    loading,
    handleLogin,
    dispatch,
    setValidationErrorMsg,
  } = useLogin();

  return (
    <AuthLayout title={i18n.t('LoginToYourAccount')} loader={loading}>
      <View style={styles.container}>
        <PhoneNumberInput
          value={userInput?.phoneNo}
          countryDetails={userInput?.countrieDetails}
          inputStyle={styles.inputBox}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          showError={validationErrorMsg || requestOtpErrorMessage}
          onChangePhone={({phoneNo, phoneNoRaw, error}) => {
            dispatch(setLoginDetails({phoneNo, phoneNoRaw}));
            setValidationErrorMsg(error);
          }}
        />

        <View>
          <View style={styles.signup_view}>
            <Text style={styles.signup_txt}>
              {i18n.t('DontHaveA_Account')}{' '}
            </Text>
            <TouchableOpacity onPress={handleSignUP}>
              <Text style={[styles.signup_txt, {color: colors.appTheme}]}>
                {i18n.t('SignUp')}
              </Text>
            </TouchableOpacity>
          </View>

          <AppButton
            onPress={handleLogin}
            title={i18n.t('LogIn')}
            useColors={
              isPhoneNumberInvalid() || loading
                ? [colors.LightMistGray, colors.LightMistGray]
                : [colors.appTheme, colors.appTheme]
            }
            disabled={isPhoneNumberInvalid() || loading}
            textStyle={{
              color:
                isPhoneNumberInvalid() || loading
                  ? colors.LightSlateGray
                  : colors.white,
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  signup_view: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signup_txt: {
    fontSize: 14,
    color: colors.DimGray,
    fontFamily: typography.SemiBold_600,
    lineHeight: 14 * 1.4,
    marginBottom: 23,
  },
  buttonWrapper: {
    width: '100%',
    height: 48,

    borderRadius: 10,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
  inputBox: {
    borderColor: colors.LightMistGray,
  },
  rememberMe_Forgot_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBoxLabel: {
    fontSize: 12,
    color: colors.DimGray,
    lineHeight: 12 * 1.5,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
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

  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
});

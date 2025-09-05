import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AuthLayout from '../../layout/AuthLayout';
import {useSignUp} from '../../../hooks';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {i18n} from '../../../localization';
import AppButton from '../../../components/AppButton/AppButton';
import {PhoneNumberInput} from '../../../components';
import {setLoginDetails} from '../../../redux/slice/authSlice';

const SignUp = () => {
  const {
    userInput,
    handleSignUp,
    modalVisible,
    setModalVisible,
    loading,
    requestOtpErrorMessage,
    dispatch,
    isPhoneNumberInvalid,
    validationErrorMsg,
    isLoader,
    handleLogin,
    setValidationErrorMsg,
    forgotMPINErrorDetails,
  } = useSignUp();

  return (
    <AuthLayout
      title={i18n.t('SignUpToYourNewAccount')}
      loader={loading || isLoader}>
      <View style={styles.container}>
        <PhoneNumberInput
          value={userInput?.phoneNo}
          countryDetails={userInput?.countrieDetails}
          inputStyle={styles.inputBox}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          showError={
            validationErrorMsg ||
            requestOtpErrorMessage ||
            forgotMPINErrorDetails
          }
          onChangePhone={({phoneNo, phoneNoRaw, error}) => {
            dispatch(setLoginDetails({phoneNo, phoneNoRaw}));
            setValidationErrorMsg(error);
          }}
        />
        <View>
          <View style={styles.signup_view}>
            <Text style={styles.signup_txt}>
              {i18n.t('AlreadyHaveAnAccount')}{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={[styles.signup_txt, {color: colors.appTheme}]}>
                {i18n.t('Login')}
              </Text>
            </TouchableOpacity>
          </View>

          <AppButton
            onPress={handleSignUp}
            title={i18n.t('SendOTP')}
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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
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
  signup_view: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signup_txt: {
    fontSize: 14,
    color: colors.DimGray,
    fontFamily: typography.SemiBold_600,
    lineHeight: 14 * 1.4,
    // letterSpacing: 12 * (0 / 100),
    marginBottom: 23,
  },
});

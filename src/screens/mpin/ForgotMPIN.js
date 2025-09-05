import React from 'react';
import {View, StyleSheet} from 'react-native';
import AuthLayout from '../layout/AuthLayout';
import colors from '../../Theme/colors';
import {i18n} from '../../localization';
import AppButton from '../../components/AppButton/AppButton';
import {PhoneNumberInput} from '../../components';
import {setLoginDetails} from '../../redux/slice/authSlice';
import {useForgotMPIN} from '../../hooks';

const ForgotMPIN = () => {
  const {
    userInput,
    handleForgotMPIN,
    modalVisible,
    setModalVisible,
    loading,
    requestOtpErrorMessage,
    forgotMPINErrorDetails,
    dispatch,
    isPhoneNumberInvalid,
    validationErrorMsg,
    isLoader,
    setValidationErrorMsg,
  } = useForgotMPIN();

  return (
    <AuthLayout
      title="Reset MPIN"
      subTitle="Enter your registered mobile number to reset your MPIN"
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
        <AppButton
          onPress={handleForgotMPIN}
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
    </AuthLayout>
  );
};

export default ForgotMPIN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  inputBox: {
    borderColor: colors.LightMistGray,
  },
});

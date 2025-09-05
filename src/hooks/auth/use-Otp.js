import React, {useCallback, useEffect, useState} from 'react';
import {Alert, BackHandler, Platform} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';
import DeviceInfo from 'react-native-device-info';
import messaging, { getMessaging, getToken } from '@react-native-firebase/messaging';

import {
  resetVerifyOtpState,
  resetRequestOtpState,
} from '../../redux/slice/authSlice';
import {
  setContactDetails,
  setOnBoardFormNumber,
  setShowEmailVerifyContent,
} from '../../redux/slice/onBoardSlice';
import {resendOTP, verifyOTP} from '../../redux/action/authActions';
import {getAuthToken} from '../../utils/authStorage';
import {emailotp_verifyAPI} from '../../api/api';
import handleRequestEmail from '../../utils/handleRequestEmail';
import {saveSessionAndNavigate} from '../../utils/saveSessionAndNavigate';
import { getApp } from '@react-native-firebase/app';

const RESEND_OTP_TIME_LIMIT = 30;

export const useOTP = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otpValue, setOtpValue] = useState('');
  const [autoFocus, setAutoFocus] = useState(true);
  const [timeLeft, setTimeLeft] = useState(RESEND_OTP_TIME_LIMIT);
  const [canResend, setCanResend] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [mpinError, setMpinError] = useState('');
  const sentOTPtoEmail = useSelector(
    state => state?.onBoard?.contactDetails?.email,
  );
  const forgotMPINResponseDetails = useSelector(
    state => state?.auth?.forgotMPINResponseDetails,
  );

  // console.log('forgotMPINResponseDetails', forgotMPINResponseDetails);
  const {
    verifyOtpLoader: loading,
    requestOtpdata,
    verifyOtpError,
    verifyOtpErrorMessage,
    verifyOtpSuccess,
    loginDetails: userInput,
    authTokenInfo: token,
  } = useSelector(state => state.auth);

  const {showEmailVerifyContent, contactDetails} = useSelector(
    state => state.onBoard,
  );
  const [isNavigatingChangeNo, setIsNavigatingChangeNo] = useState(false);
  const verifyOtp_token = requestOtpdata?.token;
  const verifyEmail_id = contactDetails?.verifyEmail_id;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!timeLeft) {
        setCanResend(true);
        return;
      }
      const timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerId);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }, [timeLeft]),
  );

  useEffect(() => {
    if(Platform.OS === 'android'){
    if (otpValue?.length === 6) {
      showEmailVerifyContent ? handleVerifyEmailOTP() : handleSubmit();
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValue]);

  const formatTime = seconds => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const makeApiCall = async (
    apiCallFn,
    payload,
    token,
    successMessage,
    successCallback,
  ) => {
    setIsLoader(true);
    setAutoFocus(false);
    setMpinError('');
    try {
      const response = await apiCallFn(payload, token);
      if (response?.success || response) {
        // console.log('Email response', response);

        if (successMessage) {
          Toast.show(successMessage, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
        successCallback(response);
      } else {
        Toast.show(response?.message || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      setMpinError(error?.error);
      if (error?.error === 'Exceed attempts of invalid OTP') {
        Alert.alert(
          'Error',
          error?.error || 'Something went wrong',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      } else {
        Toast.show(error?.error || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }
    } finally {
      setIsLoader(false);
      setOtpValue('');
      setAutoFocus(true);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setMpinError('');
    setAutoFocus(false);
    setResendLoader(true);
    setTimeLeft(RESEND_OTP_TIME_LIMIT);
    setCanResend(false);
    setOtpValue('');
    dispatch(resetVerifyOtpState());

    try {
      if (showEmailVerifyContent) {
        handleRequestEmail({
          contactDetailsFormValues: contactDetails,
          token,
          dispatch,
          navigation,
          resetForm: {},
          setOtpValue,
          callback: ({success, response, error}) => {
            if (success) {
            } else {
              Toast.show(error?.message || 'Failed to resend Email OTP', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
              });
            }
            setAutoFocus(true); // Trigger auto focus after resend callback
          },
        });
      } else {
        const payload = {
          contact_number: userInput?.phoneNo?.replace(/\s+/g, ''),
        };
        const response = await dispatch(resendOTP(payload));
        if (response?.token || response?.message) {
          Toast.show(response?.message || 'OTP resent successfully', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
        setAutoFocus(true);
      }
    } catch (error) {
      Toast.show(error?.message || 'Failed to resend OTP', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setResendLoader(false);
      setAutoFocus(true);
    }
  };

  const handleVerifyEmailOTP = async () => {
    const auth_token = await getAuthToken();
    const payload = {otp: otpValue};
    await makeApiCall(
      emailotp_verifyAPI,
      payload,
      auth_token,
      'Email verified successfully!',
      () => {
        dispatch(setShowEmailVerifyContent(false));
        dispatch(setContactDetails({verifyEmail_id: true}));
        dispatch(setOnBoardFormNumber(3));
        navigation.navigate('Onboard');
      },
    );
  };


  const handleSubmit = async () => {
    console.log('handleSubmit');

    // Import these at the top of your file
    // import { getApp } from 'firebase/app';
    // import { getMessaging, getToken } from 'firebase/messaging';

    try {
        // Get FCM token using new API
        // const fcm_token = await getToken(getMessaging(getApp()));
        // console.log('fcm_token', fcm_token);

        const payload = {
            otp: otpValue,
            device_id: await DeviceInfo.getUniqueId(),
            device_model: DeviceInfo.getModel(),
            device_version: DeviceInfo.getSystemVersion(),
            device_platform: DeviceInfo.getSystemName(),
            app_version: DeviceInfo.getVersion(),
        };
        // console.log('payload, verifyOtp_token', payload, verifyOtp_token);

        dispatch(resetVerifyOtpState());
        setAutoFocus(false);

        const response = await dispatch(verifyOTP(payload, verifyOtp_token));
        await saveSessionAndNavigate(response, dispatch, navigation);

    } catch (error) {
        if (error.error === 'Exceed attempts of invalid OTP') {
            Alert.alert(
                'Error',
                error?.error || 'Something went wrong',
                [{text: 'OK', onPress: () => navigation.goBack()}],
                {cancelable: false},
            );
        } else {
            Toast.show(error.error || 'Something went wrong', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
            });
        }
    } finally {
        setOtpValue('');
        setAutoFocus(true);
    }
};

  // Change from auto-submit to explicit button press
  const handleManualSubmit = async () => {
    if (otpValue?.length !== 6) {
      Toast.show('Please enter 6-digit OTP', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      return;
    }

    if (showEmailVerifyContent) {
      await handleVerifyEmailOTP();
    } else {
      await handleSubmit();
    }
  };

  return {
    otpValue,
    setOtpValue,
    canResend,
    timeLeft,
    formatTime,
    handleResendOTP,
    handleSubmit,
    handleBack: () => navigation.goBack(),
    handleChangeNumber: () => {
      setIsNavigatingChangeNo(true);
      dispatch(resetRequestOtpState());
      navigation.goBack();
    },
    handleChangeEmailId: () => {
      dispatch(resetRequestOtpState());
      navigation.goBack();
    },
    verifyOtpError,
    verifyOtpErrorMessage,
    verifyOtpSuccess,
    loading,
    resendLoader,
    mpinError,
    isLoader,
    showEmailVerifyContent,
    handleVerifyEmailOTP,
    handleManualSubmit,
    autoFocus,
    userInput,
    sentOTPtoEmail,
    isNavigatingChangeNo,
    setIsNavigatingChangeNo,
  };
};

import {useCallback, useEffect, useState} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';

import {resetVerifyOtpState, setMerchant_id} from '../../redux/slice/authSlice';
import {getAuthToken, setMerchant_id_} from '../../utils/authStorage';
import {Resend_MPIN_API, VerifyOTP_MPIN_API} from '../../api/api';

const RESEND_OTP_TIME_LIMIT = 30;

export const useForgotMpinOtp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otpValue, setOtpValue] = useState('');
  const [autoFocus, setAutoFocus] = useState(true);
  const [timeLeft, setTimeLeft] = useState(RESEND_OTP_TIME_LIMIT);
  const [canResend, setCanResend] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [mpinError, setMpinError] = useState('');

  const forgotMPINResponseDetails = useSelector(
    state => state.auth.forgotMPINResponseDetails,
  );
  const userInput = useSelector(state => state.auth.loginDetails);

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
    if (otpValue?.length === 6) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValue]);

  const formatTime = seconds => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setAutoFocus(false);
    setResendLoader(true);
    setTimeLeft(RESEND_OTP_TIME_LIMIT);
    setCanResend(false);
    setOtpValue('');
    dispatch(resetVerifyOtpState());

    try {
      const auth_token = await getAuthToken();
      const payload = {
        contact_number: userInput?.phoneNo?.replace(/\s+/g, ''),
        country_code: userInput?.countrieDetails?.phoneCode,
      };

      const response = await Resend_MPIN_API(payload, auth_token);

      if (response?.message) {
        Toast.show('MPIN OTP resent successfully', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
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

  const handleSubmit = async () => {
    const auth_token = forgotMPINResponseDetails?.token;
    const merchant_id = forgotMPINResponseDetails?.id;

    const payload = {
      otp: otpValue,
      id: merchant_id,
    };

    setIsLoader(true);
    setAutoFocus(false);
    setMpinError('');

    try {
      dispatch(setMerchant_id(merchant_id));
      await setMerchant_id_(merchant_id);
      const response = await VerifyOTP_MPIN_API(payload, auth_token);

      if (response?.success || response) {
        Toast.show('MPIN OTP verified successfully!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        navigation.navigate('Mpin');
      } else {
        Toast.show(response?.message || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }
    } catch (error) {
      if (error?.error === 'Exceed attempts of invalid OTP') {
        Alert.alert(
          'Error',
          error?.error,
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      } else {
        setMpinError(error?.error);
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

  return {
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
  };
};

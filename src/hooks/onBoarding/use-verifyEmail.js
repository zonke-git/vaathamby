import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import {BackHandler} from 'react-native';

const RESEND_OTP_TIME_LIMIT = 3;

export const useVerifyEmail = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(RESEND_OTP_TIME_LIMIT);
  const [canResend, setCanResend] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const loading = useSelector(state => state.auth.verifyOtpLoader);
  const verifyOtp_token = useSelector(
    state => state?.auth?.requestOtpdata?.token,
  );
  const verifyOtpError = useSelector(state => state?.auth?.verifyOtpError);
  const verifyOtpErrorMessage = useSelector(
    state => state?.auth?.verifyOtpErrorMessage,
  );
  const verifyOtpSuccess = useSelector(state => state?.auth?.verifyOtpSuccess);
  const verifyOtpData = useSelector(state => state?.auth?.verifyOtpData);
  const userInput = useSelector(state => state?.auth?.loginDetails);
  //

  // console.log('verifyOtp_token', verifyOtp_token);

  // console.log('verifyOtpError', verifyOtpError);
  // console.log('verifyOtpErrorMessage', verifyOtpErrorMessage);
  // console.log('verifyOtpSuccess', verifyOtpSuccess);
  // console.log('verifyOtpData', verifyOtpData);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Navigate to 'Home' instead of going back
        // navigation.navigate('SignUp');
        navigation.goBack();
        return true; // Prevent default back behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
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

      // 🔴 Clear timer when user leaves screen
      return () => {
        clearInterval(timerId);
      };
    }, [timeLeft]),
  );

  useEffect(() => {
    if (otpValue?.length === 6) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValue]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleResendOTP = async () => {
    try {
      // Early return if resend is not allowed
      if (!canResend) {
        return;
      }

      setResendLoader(true);

      // Reset timer and OTP state
      setTimeLeft(RESEND_OTP_TIME_LIMIT);
      setCanResend(false);
      setOtpValue('');
      //   dispatch(resetVerifyOtpState());

      const payload = {
        contact_number: userInput?.phoneNo?.replace(/\s+/g, ''),
      };

      // Make the API call
      //   const response = await dispatch(resendOTP(payload));

      // Handle response
      //   if (response?.token || response?.message) {
      //     Toast.show(response?.message || 'OTP resent successfully', {
      //       duration: Toast.durations.SHORT,
      //       position: Toast.positions.BOTTOM,
      //     });
      //   }
    } catch (error) {
      console.error('Resend Error:', error);
      Toast.show(error?.message || 'Failed to resend OTP', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setResendLoader(false);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      otp: otpValue,
    };
    // console.log('payload', payload);

    // dispatch(verifyOTP(payload, verifyOtp_token))
    //   .then(response => {
    //     console.log('Verify OTP Response :', response);
    //     if (response?.merchant) {
    //       dispatch(authToken(response?.token));
    //       // dispatch(
    //       //   setOnBoardFormNumber(
    //       //     // response?.merchant?.current_step_no === 3
    //       //     //   ? response?.merchant?.current_step_no + 1
    //       //     //   :
    //       //     response?.merchant?.current_step_no,
    //       //   ),
    //       // );
    //       // dispatch(
    //       //   setBusinessDetails({
    //       //     businessCategory_id: response?.merchant?.business_type,
    //       //     CIPCRegistrationNumber: response?.merchant?.registration_number,
    //       //   }),
    //       // );
    //       navigation.navigate('Onboard');
    //       // message
    //     } else if (response?.success && response?.new_user) {
    //       dispatch(resetBusinessDetails());
    //       navigation.navigate('Onboard');
    //     }
    //     Toast.show(response?.message, {
    //       duration: Toast.durations.SHORT,
    //       position: Toast.positions.BOTTOM,
    //     });
    //     setOtpValue('');
    //   })
    //   .catch(error => {
    //     console.error('Verify OTP Error :', error);
    //     setOtpValue('');
    //   });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangeNumber = () => {
    // dispatch(resetRequestOtpState());
    // navigation.navigate('SignUp');
  };
  return {
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
    verifyOtpSuccess,
    loading,
    handleChangeNumber,
    resendLoader,
  };
};

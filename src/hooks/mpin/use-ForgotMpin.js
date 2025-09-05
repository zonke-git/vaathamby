import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BackHandler} from 'react-native';
import Toast from 'react-native-root-toast';
import {validateSouthAfricanMobile} from '../../screens/validation/Validation';
import {ForgotMPIN_API} from '../../api/api';
import {
  setForgotMPINErrorDetails,
  setForgotMPINResponseDetails,
} from '../../redux/slice/authSlice';
import {parseApiError} from '../../utils/errorHandler';

export const useForgotMPIN = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState('');

  const userInput = useSelector(state => state?.auth?.loginDetails);
  const loading = useSelector(state => state.auth.requestOtpLoader);
  const forgotMPINErrorDetails = useSelector(
    state => state?.auth?.forgotMPINErrorDetails,
  );
  const requestOtpErrorMessage = useSelector(
    state => state?.auth?.requestOtpErrorMessage,
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  const isPhoneNumberInvalid = () => {
    const code = userInput?.countrieDetails?.code;
    const phoneNo = userInput?.phoneNoRaw;
    const phoneNoLength = phoneNo?.length;

    if (!phoneNo) return true;

    if (code === 'ZA') return !validateSouthAfricanMobile(phoneNo);
    if (['IN', 'US', 'AU'].includes(code)) return phoneNoLength !== 10;
    if (code === 'AE') return phoneNoLength !== 9;
    return phoneNoLength !== 4;
  };

  const handleForgotMPIN = async () => {
    setIsLoader(true);
    let payload = {
      contact_number: userInput?.phoneNoRaw,
      country_code: userInput?.countrieDetails?.phoneCode,
    };

    await ForgotMPIN_API(payload)
      .then(response => {
        if (response) {
          dispatch(setForgotMPINResponseDetails(response));
          navigation.navigate('ForgotMpinOtpScreen');
        } else {
          Toast.show(response?.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
        setIsLoader(false);
      })
      .catch(error => {
        setIsLoader(false);
        const errorMessage = parseApiError(error);
        dispatch(setForgotMPINErrorDetails(errorMessage));
      });
  };

  return {
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
  };
};

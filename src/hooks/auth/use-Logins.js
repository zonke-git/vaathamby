/* eslint-disable curly */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {handleGenerateOTPforMob} from '../../utils/handleGenerateOTPforMob';
import {validateSouthAfricanMobile} from '../../screens/validation/Validation';
import {Alert, BackHandler} from 'react-native';
import {setForgotMPINErrorDetails} from '../../redux/slice/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInput = useSelector(state => state?.auth?.loginDetails);
  const [validationErrorMsg, setValidationErrorMsg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const requestOtpErrorMessage = useSelector(
    state => state?.auth?.requestOtpErrorMessage,
  );
  const loading = useSelector(state => state.auth.requestOtpLoader);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Confirm exit
        Alert.alert('Exit App', 'Are you sure you want to exit the app?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ]);
        return true; // prevent default back behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const isPhoneNumberInvalid = () => {
    const code = userInput?.countrieDetails?.code;
    const phoneNo = userInput?.phoneNoRaw;
    const phoneNoLength = phoneNo?.length;

    if (!phoneNo) return true;

    if (code === 'ZA') {
      return !validateSouthAfricanMobile(phoneNo);
    } else if (['IN', 'US', 'AU'].includes(code)) {
      return phoneNoLength !== 10;
    } else if (code === 'AE') {
      return phoneNoLength !== 9;
    } else {
      return phoneNoLength !== 4;
    }
  };

  const handleSignUP = () => {
    dispatch(setForgotMPINErrorDetails(''));
    navigation.navigate('SignUp');
  };

  const handleLogin = async () => {
    handleGenerateOTPforMob({userInput, dispatch, navigation});
  };

  return {
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
  };
};

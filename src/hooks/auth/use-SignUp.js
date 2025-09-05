import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {validateSouthAfricanMobile} from '../../screens/validation/Validation';
import {handleGenerateOTPforMob} from '../../utils/handleGenerateOTPforMob';
import {Alert, BackHandler} from 'react-native';
// import PushNotification from 'react-native-push-notification';

export const useSignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState('');
  const userInput = useSelector(state => state?.auth?.loginDetails);
  const loading = useSelector(state => state.auth.requestOtpLoader);
  const forgotMPINErrorDetails = useSelector(
    state => state?.auth?.forgotMPINErrorDetails,
  );
  const requestOtpError = useSelector(state => state?.auth?.requestOtpError);
  const requestOtpSuccess = useSelector(
    state => state?.auth?.requestOtpSuccess,
  );
  const requestOtpErrorMessage = useSelector(
    state => state?.auth?.requestOtpErrorMessage,
  );
  const requestOtpdata = useSelector(state => state?.auth?.requestOtpdata);

  //  useEffect(() => {
  //   const onAllowNotification = () => {
  //     PushNotification.requestPermissions();
  //   };
  //   onAllowNotification();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit the app?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
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

    // For South Africa (ZA)
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

  const handleSignUp = async () => {
    handleGenerateOTPforMob({userInput, dispatch, navigation});
  };

  const handleLogin = () => {
    navigation.navigate('LogIn');
  };

  return {
    forgotMPINErrorDetails,
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
  };
};

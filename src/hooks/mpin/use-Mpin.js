import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {CreateMPIN_API} from '../../api/api';
import {useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';
import {
  enableMPIN,
  getAuthToken,
  removeBioMetrics,
  setBioMetrics,
} from '../../utils/authStorage';
import {Alert, BackHandler} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import DeviceInfo from 'react-native-device-info';

const rnBiometrics = new ReactNativeBiometrics();

export const useMpin = () => {
  const navigation = useNavigation();
  const [otpValue, setOtpValue] = useState('');
  const [reEnterOtpValue, setReEnterOtpValue] = useState('');
  const [reEnterStatus, setReEnterStatus] = useState(false);
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [fingerPrintORfaceIDCheckBox, setFingerPrintORfaceIDCheckBox] =
    useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [biometricKeys, setBiometricKeys] = useState(null);
  const token = useSelector(state => state?.auth?.authTokenInfo);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  useEffect(() => {
    if (otpValue?.length === 4) {
      setReEnterStatus(true);
    }
    if (reEnterOtpValue?.length === 4) {
      handleSumbit();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValue, reEnterOtpValue]);

  useEffect(() => {
    if (fingerPrintORfaceIDCheckBox) {
      rnBiometrics
        .simplePrompt({promptMessage: 'Confirm fingerprint or face'})
        .then(async resultObject => {
          const {success} = resultObject;

          if (success) {
            console.log('Biometric authentication successful');

            const {publicKey} = await rnBiometrics.createKeys();
            setBiometricKeys(publicKey);

            // Alert.alert('Success', 'Biometric Auth succeeded');
          } else {
            Alert.alert('Cancelled', 'User cancelled biometric prompt');
            setFingerPrintORfaceIDCheckBox(false);
          }
        })
        .catch(() => {
          Alert.alert('Error', 'Biometric Auth failed');
        });
    }
  }, [fingerPrintORfaceIDCheckBox]);

  const handleNavigation = () => {
    navigation.navigate('LogIn');
  };

  // console.log('biometricKeys', biometricKeys);
  const handleSumbit = async () => {
    if (otpValue !== reEnterOtpValue) {
      Alert.alert('Error', 'MPINs do not match');
      Toast.show('MPINs do not match', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      setOtpValue('');
      setReEnterOtpValue('');
      setReEnterStatus(false);
      return;
    } else {
      setIsLoader(true);
      const auth_token = await getAuthToken();
      let payload = {
        pin: otpValue,
        device_id: await DeviceInfo.getUniqueId(),
        ...(biometricKeys && {finger: biometricKeys}),
        // faceId
      };
      // console.log('payload', payload);

      CreateMPIN_API(payload, auth_token)
        .then(async response => {
          // console.log('MPIN Response :', response);
          if (response?.success) {
            await enableMPIN();
            navigation.navigate('MpinCreatedSuccessfully');
            if (biometricKeys) {
              await setBioMetrics('true');
            } else {
              removeBioMetrics();
            }
          } else {
            Toast.show(response?.message || 'Something went wrong', {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
            });
          }

          setIsLoader(false);
        })
        .catch(error => {
          setIsLoader(false);
          console.error('MPIN Error :', error);
          Toast.show(error?.error || 'Something went wrong', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        });
    }
  };

  return {
    otpValue,
    setOtpValue,
    invalidOtp,
    handleNavigation,
    fingerPrintORfaceIDCheckBox,
    setFingerPrintORfaceIDCheckBox,
    handleSumbit,
    isLoader,
    reEnterOtpValue,
    setReEnterOtpValue,
    reEnterStatus,
    setReEnterStatus,
  };
};

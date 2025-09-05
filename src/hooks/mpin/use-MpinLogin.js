import {useCallback, useEffect, useState} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-root-toast';
import ReactNativeBiometrics from 'react-native-biometrics';

import {VerifyMPIN_API} from '../../api/api';
import {getBioMetrics, getMerchant_id} from '../../utils/authStorage';
import {saveSessionAndNavigate} from '../../utils/saveSessionAndNavigate';
import {setShowForgotPage} from '../../redux/slice/authSlice';

const rnBiometrics = new ReactNativeBiometrics();

export const useMpinLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [MPIN, setMPIN] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isErrorMsg, setIsErrorMsg] = useState('');
  const [biometricKeys, setBiometricKeys] = useState(null);
  const [biometricEnabled, setBiometricEnabled] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    (async () => {
      const enabled = await getBioMetrics();
      setBiometricEnabled(enabled);
    })();
  }, []);

  useEffect(() => {
    if (MPIN?.length === 4) {
      verifyMpin(); // auto verify when 4 digits are entered
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MPIN]);

  const verifyMpin = async (biometricKeys_params = null) => {
    const merchant_id = await getMerchant_id();
    let payload;
    if (biometricKeys_params) {
      payload = {
        finger: biometricKeys_params,
        id: merchant_id,
      };
    } else {
      payload = {
        pin: MPIN,
        id: merchant_id,
      };
    }

    setIsLoader(true);
    // console.log('payload', payload);

    try {
      const response = await VerifyMPIN_API(payload);
      // console.log('response', response);

      if (response?.success) {
        await saveSessionAndNavigate(response, dispatch, navigation);
      } else {
        showToast(response?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Verify MPIN Error :', error);
      setIsErrorMsg(error?.error);
      showToast(error?.error || 'Something went wrong');
    } finally {
      setMPIN('');
      setIsLoader(false);
    }
  };

  const handleLoginBut = () => {
    verifyMpin(); // manually triggered login
  };

  const handleBiometric = () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint or face'})
      .then(async ({success}) => {
        if (success) {
          console.log('Biometric authentication successful');
          const {publicKey} = await rnBiometrics.createKeys();
          setBiometricKeys(publicKey);
          // Optionally trigger login here with biometric key
          verifyMpin(publicKey);
        } else {
          Alert.alert('Cancelled', 'User cancelled biometric prompt');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Biometric Auth failed');
      });
  };

  const handleForgotMPIN = () => {
    dispatch(setShowForgotPage(true));
    navigation.navigate('ForgotMPIN');
  };

  const showToast = message => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
  };

  return {
    MPIN,
    setMPIN,
    handleLoginBut,
    isLoader,
    handleBiometric,
    handleForgotMPIN,
    isErrorMsg,
    biometricEnabled,
  };
};

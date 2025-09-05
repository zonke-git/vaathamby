import {getMerchantDetails} from '../redux/action/businessProfileActions';
import {
  authToken,
  setMerchant_details,
  setMerchant_id,
} from '../redux/slice/authSlice';
import {
  businessDetails_submitOnBoard_reset,
  setCheckMPINflow,
  setOnBoardFormNumber,
} from '../redux/slice/onBoardSlice';
import {
  enableMPIN,
  getMPIN,
  saveAuthToken,
  setBioMetrics,
  setMerchant_id_,
} from './authStorage';

export const saveSessionAndNavigate = async (
  response,
  dispatch,
  navigation,
) => {
  // console.log('response', response);

  const token = response?.authToken || response?.token;
  const merchant = response?.merchant;
  const merchantId = merchant?._id;

  // Save auth token
  if (token) {
    dispatch(authToken(token));
    await saveAuthToken(token);
  }

  // Save merchant info
  if (merchant) {
    dispatch(setMerchant_details(merchant));
    dispatch(setMerchant_id(merchantId));
    await setMerchant_id_(merchantId);
  }

  // Handle new user onboarding
  if (response?.newUser) {
    dispatch(businessDetails_submitOnBoard_reset());
    dispatch(setOnBoardFormNumber(1));
    navigation.navigate('Onboard');
    return;
  }

  // Proceed only if token exists
  if (!token) return;

  // Refresh merchant details from API
  dispatch(getMerchantDetails(token));

  // console.log(
  //   'dshbfdbg',
  //   !merchant?.step1_completed,
  //   !merchant?.step2_completed,
  //   !merchant?.step3_completed,
  //   !merchant?.step4_completed,
  // );

  // Step-wise navigation
  if (!merchant?.step1_completed) {
    dispatch(setOnBoardFormNumber(1));
    navigation.navigate('Onboard');
    return;
  }

  if (!merchant?.step2_completed) {
    dispatch(setOnBoardFormNumber(2));
    const mpin = await getMPIN();
    console.log('mpin', mpin);

    navigation.navigate(mpin ? 'Onboard' : 'Mpin');
    return;
  }

  // if (!merchant?.step3_completed) {
  //   dispatch(setOnBoardFormNumber(3));
  //   navigation.navigate('Onboard');
  //   return;
  // }

  if (!merchant?.step4_completed) {
    dispatch(setOnBoardFormNumber(4));
    navigation.navigate('Onboard');
    return;
  }

  // Final MPIN logic after all steps
  if (response?.mpinset) {
    if (response?.fingerSet) {
      await setBioMetrics('true');
    }
    await enableMPIN();
    navigation.navigate('MainApp');
  } else if (response?.mpinset === false) {
    dispatch(setCheckMPINflow(true));
    navigation.navigate('Mpin');
  } else {
    navigation.navigate('MainApp');
  }
};

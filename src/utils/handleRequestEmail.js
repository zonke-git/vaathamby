// src/utils/handleRequestEmail.js

import Toast from 'react-native-root-toast';
import {contactDetails_RequestEmail_OTP} from '../redux/action/onBoardActions';
import {
  contactDetails_submitOnBoardFormFailure,
  setOnBoardFormNumber,
  setShowEmailVerifyContent,
} from '../redux/slice/onBoardSlice';
import {resetVerifyOtpState} from '../redux/slice/authSlice';

/**
 * Handle email OTP request
 * @param {Object} params
 * @param {Object} params.contactDetailsFormValues - Form values object
 * @param {string} params.token - Auth token
 * @param {Function} params.dispatch - Redux dispatch function
 * @param {Object} params.navigation - React Navigation object
 */
const handleRequestEmail = ({
  contactDetailsFormValues,
  token,
  dispatch,
  navigation,
  resetForm,
  setOtpValue,
  callback,
}) => {
  const payload = {
    email: contactDetailsFormValues?.email,
  };

  // console.log('Request Email Payload:', payload);

  dispatch(contactDetails_RequestEmail_OTP(payload, token?.token))
    .then(response => {
      // console.log('Request Email Response :', response);

      if (response) {
        dispatch(setShowEmailVerifyContent(true));
        dispatch(resetVerifyOtpState());
        navigation.navigate('OTP');
      } else {
        Toast.show(response?.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        dispatch(contactDetails_submitOnBoardFormFailure('Submission failed'));
      }

      if (callback) callback({success: true, response});
    })

    .catch(error => {
      console.error('Request Email Error :', error);
      if (callback) callback({success: false, error});
    });
};

export default handleRequestEmail;

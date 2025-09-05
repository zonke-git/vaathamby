import {
  deleteAccountAPI,
  deleteoptionsAPI,
  getCountries,
  logoutAPI,
  requestOtp,
  resendOtp,
  verifyOtp,
} from '../../api/api';
import {
  setCountriesListFailure,
  setCountriesListLoader,
  setCountriesListSuccess,
  setRequestOtpFailure,
  setRequestOtpLoader,
  setRequestOtpSuccess,
  setVerifyOtpFailure,
  setVerifyOtpLoader,
  setVerifyOtpSuccess,
} from '../slice/authSlice';

export const fetchCountries = () => async dispatch => {
  try {
    dispatch(setCountriesListLoader());
    const response = await getCountries();
    // console.log('Countries List Response :', response);
    dispatch(setCountriesListSuccess(response));
    return response;
  } catch (error) {
    console.log('Countries List Error :', error);
    dispatch(
      setCountriesListFailure(
        error.message || 'Failed to fetch Countries List',
      ),
    );
    throw error;
  }
};

export const generateOTP = payload => async dispatch => {
  try {
    dispatch(setRequestOtpLoader());
    const response = await requestOtp(payload);
    // console.log('SignUp Request OTP Response :', response);
    if (response.token) {
      dispatch(setRequestOtpSuccess(response));
    } else {
      dispatch(
        setRequestOtpFailure(response.message || 'OTP generation failed'),
      );
    }
    return response;
  } catch (error) {
    console.log('SignUp Request OTP Response Error', error);

    dispatch(setRequestOtpFailure(error.error || 'ApiError'));
    throw error;
  }
};

export const verifyOTP = (payload, token) => async dispatch => {
  try {
    dispatch(setVerifyOtpLoader());
    const response = await verifyOtp(payload, token);
    // console.log('Verify OTP Response :', response);
    if (response.success) {
      dispatch(setVerifyOtpSuccess(response));
    } else {
      dispatch(
        setVerifyOtpFailure(response.message || 'OTP verification failed'),
      );
    }
    return response;
  } catch (error) {
    dispatch(setVerifyOtpFailure(error.error || 'ApiError'));
    throw error;
  }
};

export const resendOTP = payload => async dispatch => {
  try {
    const response = await resendOtp(payload);
    console.log('Resend OTP Response :', response);
    return response;
  } catch (error) {
    console.log('Resend OTP Error :', error);
    throw error;
  }
};

export const logOut = token => async dispatch => {
  try {
    const response = await logoutAPI(token);
    // console.log('logout Response :', response);

    return response;
  } catch (error) {
    console.log('logout Error :', error);
    throw error;
  }
};

export const deleteoptions = token => async dispatch => {
  try {
    const response = await deleteoptionsAPI(token);
    // console.log('Delete Options Response :', response);
    return response;
  } catch (error) {
    console.log('Delete Options Error :', error);
    throw error;
  }
};

export const deleteAccount = (token, id, payload) => async dispatch => {
  try {
    const response = await deleteAccountAPI(token, id, payload);
    // console.log('Delete Account Response :', response);
    return response;
  } catch (error) {
    console.log('Delete Account Error :', error);
    throw error;
  }
};

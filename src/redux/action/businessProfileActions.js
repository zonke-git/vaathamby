import {
  merchantDetailsAPI,
  profileBankDetailsAPI,
  profileBusinessDetailsAPI,
  profileContactDetailsAPI,
  profileFinanceDetailsAPI,
} from '../../api/api';
import {
  setMerchantDetailsFailure,
  setMerchantDetailsLoader,
  setMerchantDetailsSuccess,
  submitBankDetailsFormFailure,
  submitBankDetailsFormLoader,
  submitBankDetailsFormSuccess,
  submitbusinessProfileAndActivityFormFailure,
  submitbusinessProfileAndActivityFormLoader,
  submitbusinessProfileAndActivityFormSuccess,
  submitContactDetailsFormFailure,
  submitContactDetailsFormLoader,
  submitContactDetailsFormSuccess,
  submitfinanceDetailsFormFailure,
  submitfinanceDetailsFormLoader,
  submitfinanceDetailsFormSuccess,
} from '../slice/businessProfileSlice';

export const getMerchantDetails = token => async dispatch => {
  try {
    dispatch(setMerchantDetailsLoader());
    const response = await merchantDetailsAPI(token);
    // console.log('Merchant Details Form Response :', response);
    dispatch(setMerchantDetailsSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('Merchant Details Form Error :', error);
    dispatch(setMerchantDetailsFailure(error || 'Submission failed'));
    throw error;
  }
};

export const profileBusinessDetailsForm =
  (payload, token) => async dispatch => {
    try {
      dispatch(submitbusinessProfileAndActivityFormLoader());
      const response = await profileBusinessDetailsAPI(payload, token);
      // console.log('Business Profile And Activity Response :', response);
      if (response) {
        dispatch(submitbusinessProfileAndActivityFormSuccess(response));
      } else {
        dispatch(
          submitbusinessProfileAndActivityFormFailure(
            response.message || 'Business Profile And Activity failed',
          ),
        );
      }
      return response;
    } catch (error) {
      console.log('Business Profile And Activity Error', error);

      dispatch(
        submitbusinessProfileAndActivityFormFailure(error.error || 'ApiError'),
      );
      throw error;
    }
  };

export const profileContactDetailsForm = (payload, token) => async dispatch => {
  try {
    dispatch(submitContactDetailsFormLoader());
    const response = await profileContactDetailsAPI(payload, token);
    // console.log('Business Contact Details Response :', response);
    if (response) {
      dispatch(submitContactDetailsFormSuccess(response));
    } else {
      dispatch(
        submitContactDetailsFormFailure(
          response.message || 'Business Contact Details failed',
        ),
      );
    }
    return response;
  } catch (error) {
    console.log('Business Contact Details Error', error);

    dispatch(submitContactDetailsFormFailure(error.error || 'ApiError'));
    throw error;
  }
};

export const profileFinanceDetailsForm = (payload, token) => async dispatch => {
  try {
    dispatch(submitfinanceDetailsFormLoader());
    const response = await profileFinanceDetailsAPI(payload, token);
    // console.log('Finance Details Response :', response);
    if (response) {
      dispatch(submitfinanceDetailsFormSuccess(response));
    } else {
      dispatch(
        submitfinanceDetailsFormFailure(
          response.message || 'Finance Details failed',
        ),
      );
    }
    return response;
  } catch (error) {
    console.log('Finance Details Error', error);

    dispatch(submitfinanceDetailsFormFailure(error.error || 'ApiError'));
    throw error;
  }
};

export const profileBankDetailsForm = (payload, token) => async dispatch => {
  try {
    dispatch(submitBankDetailsFormLoader());
    const response = await profileBankDetailsAPI(payload, token);
    // console.log('Bank Details Response :', response);
    if (response) {
      dispatch(submitBankDetailsFormSuccess(response));
    } else {
      dispatch(
        submitBankDetailsFormFailure(response.message || 'Bank Details failed'),
      );
    }
    return response;
  } catch (error) {
    console.log('Bank Details Error', error);

    dispatch(submitBankDetailsFormFailure(error.error || 'ApiError'));
    throw error;
  }
};

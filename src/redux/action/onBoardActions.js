import {
  annuxureSubmitAPI,
  businessDetailsAPI,
  complianceFinancialDetailsAPI,
  contactDetailsAPI,
  engagementModelDetailsAPI,
  get_annexuresAPI,
  getBusinessCategories,
  getPrivacyPolicys_API,
  getTermsAndConditions_API,
  requestEmailOtpAPI,
} from '../../api/api';
import {
  setCategoriesLoader,
  setCategoriesSuccess,
  setCategoriesFailure,
  businessDetails_submitOnBoardFormLoader,
  businessDetails_submitOnBoardFormSuccess,
  businessDetails_submitOnBoardFormFailure,
  contactDetails_submitOnBoardFormSuccess,
  contactDetails_submitOnBoardFormLoader,
  contactDetails_submitOnBoardFormFailure,
  complianceFinancialDetails_submitOnBoardFormLoader,
  complianceFinancialDetails_submitOnBoardFormSuccess,
  complianceFinancialDetails_submitOnBoardFormFailure,
  engagementModelDetails_submitOnBoardFormLoader,
  engagementModelDetails_submitOnBoardFormSuccess,
  engagementModelDetails_submitOnBoardFormFailure,
  contactDetails_RequestEmail_OTP_Loader,
  contactDetails_RequestEmail_OTP_Success,
  contactDetails_RequestEmail_OTP_Failure,
  setAnnexureListLoader,
  setAnnexureListSuccess,
  setAnnexureListFailure,
  annexureList_submitOnBoardFormLoader,
  annexureList_submitOnBoardFormSuccess,
  annexureList_submitOnBoardFormFailure,
  setPrivacyPolicysLoader,
  setPrivacyPolicysSuccess,
  setPrivacyPolicysFailure,
  setTermsAndConditionsLoader,
  setTermsAndConditionsSuccess,
  setTermsAndConditionsFailure,
} from '../slice/onBoardSlice';

export const fetchCategories = token => async dispatch => {
  try {
    dispatch(setCategoriesLoader());
    const response = await getBusinessCategories(token);
    // console.log('Business Categories Response :', response);
    dispatch(setCategoriesSuccess(response));
    return response;
  } catch (error) {
    dispatch(setCategoriesFailure(error.error || 'Failed to fetch categories'));
    throw error;
  }
};

export const getPublicIPv6 = async () => {
  try {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    // console.log('Public IPv6:', data.ip);
    return data.ip;
  } catch (error) {
    console.error('Failed to get public IP:', error);
    return null;
  }
};

export const businessDetails_submitOnBoardForm =
  (payload, token) => async dispatch => {
    try {
      // 1. Dispatch loading action
      dispatch(businessDetails_submitOnBoardFormLoader());

      // 2. Make API call
      const response = await businessDetailsAPI(payload, token);

      // 3. On success:
      // console.log('Business Details Form Response :', response);
      dispatch(businessDetails_submitOnBoardFormSuccess(response || 'Success'));
      return response;
    } catch (error) {
      // 4. On error:
      console.log('Business Details Form Error :', error);
      const rawError = error?.error || 'Submission failed';
      const cleanedError = rawError.replace(/\s*\n\s*/g, ' ').trim();

      dispatch(businessDetails_submitOnBoardFormFailure(cleanedError));
      throw error;
    }
  };

export const contactDetails_submitOnBoardForm =
  (payload, token) => async dispatch => {
    try {
      dispatch(contactDetails_submitOnBoardFormLoader());
      const response = await contactDetailsAPI(payload, token);
      // console.log('Contact Details Form Response :', response);
      dispatch(contactDetails_submitOnBoardFormSuccess(response || 'Success'));
      return response;
    } catch (error) {
      console.log('Contact Details Form Error :', error);
      dispatch(
        contactDetails_submitOnBoardFormFailure(
          error?.error || 'Submission failed',
        ),
      );
      throw error;
    }
  };

export const contactDetails_RequestEmail_OTP =
  (payload, token) => async dispatch => {
    try {
      dispatch(contactDetails_RequestEmail_OTP_Loader());
      const response = await requestEmailOtpAPI(payload, token);
      // console.log('Contact Details Request Email OTP Response :', response);
      dispatch(contactDetails_RequestEmail_OTP_Success(response || 'Success'));
      return response;
    } catch (error) {
      console.log('Contact Details Request Email OTP Error :', error?.error);
      dispatch(
        contactDetails_RequestEmail_OTP_Failure(
          error?.error || 'Submission failed',
        ),
      );
      throw error;
    }
  };

export const complianceFinancialDetails_submitOnBoardForm =
  (payload, token) => async dispatch => {
    try {
      dispatch(complianceFinancialDetails_submitOnBoardFormLoader());
      const response = await complianceFinancialDetailsAPI(payload, token);
      // console.log('Compliance Financial Details Form Response :', response);
      dispatch(
        complianceFinancialDetails_submitOnBoardFormSuccess(
          response || 'Success',
        ),
      );
      return response;
    } catch (error) {
      console.log('Compliance Financial Details Form Error :', error);
      dispatch(
        complianceFinancialDetails_submitOnBoardFormFailure(
          error?.error || 'Submission failed',
        ),
      );
      throw error;
    }
  };

export const engagementModelDetails_submitOnBoardForm =
  (payload, token) => async dispatch => {
    try {
      dispatch(engagementModelDetails_submitOnBoardFormLoader());
      const response = await engagementModelDetailsAPI(payload, token);
      // console.log('Engagement Model Details Form Response :', response);
      dispatch(
        engagementModelDetails_submitOnBoardFormSuccess(response || 'Success'),
      );
      return response;
    } catch (error) {
      console.log('Engagement Model Details Form Error :', error);
      dispatch(
        engagementModelDetails_submitOnBoardFormFailure(
          error?.error || 'Submission failed',
        ),
      );
      throw error;
    }
  };

export const get_annexures = (payload, token) => async dispatch => {
  try {
    dispatch(setAnnexureListLoader());
    const response = await get_annexuresAPI(payload, token);
    // console.log('AnnexureList Response :', response);
    dispatch(setAnnexureListSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('AnnexureList Form Error :', error);
    dispatch(
      setAnnexureListFailure(error?.error || 'Getting Annexure List failed'),
    );
    throw error;
  }
};

export const annexureList_submitOnBoardForm =
  (payload, token) => async dispatch => {
    try {
      dispatch(annexureList_submitOnBoardFormLoader());
      const response = await annuxureSubmitAPI(payload, token);
      // console.log('Annexure List Response :', response);
      dispatch(annexureList_submitOnBoardFormSuccess(response || 'Success'));
      return response;
    } catch (error) {
      console.log('Annexure List Error :', error);
      dispatch(
        annexureList_submitOnBoardFormFailure(
          error?.error || 'Submission failed',
        ),
      );
      throw error;
    }
  };

export const getPrivacyPolicys = (payload, token) => async dispatch => {
  try {
    dispatch(setPrivacyPolicysLoader());
    const response = await getPrivacyPolicys_API(payload, token);
    // console.log('Privacy Policys Response :', response);
    dispatch(setPrivacyPolicysSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('Privacy Policys Error :', error);
    dispatch(
      setPrivacyPolicysFailure(
        error?.error || 'Getting Privacy Policys failed',
      ),
    );
    throw error;
  }
};

export const getTermsAndConditions = (payload, token) => async dispatch => {
  try {
    dispatch(setTermsAndConditionsLoader());
    const response = await getTermsAndConditions_API(payload, token);
    // console.log('Terms And Conditions Response :', response);
    dispatch(setTermsAndConditionsSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('Terms And Conditions Error :', error);
    dispatch(
      setTermsAndConditionsFailure(
        error?.error || 'Getting Terms And Conditions failed',
      ),
    );
    throw error;
  }
};

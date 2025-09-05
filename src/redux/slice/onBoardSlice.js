import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  onBoardFormNumber: 1,

  categories: [],
  categoriesLoading: false,
  categoriesError: null,

  checkMPINflow: false,
  businessDetails: {
    businessName: '',
    CIPCRegistrationNumber: '',
    // CIPCRegistrationNumber: '1962/000738/06',
    businessCategory_id: '',
    businessCategory: '',
    businessCategory_name: '',
    businessLocation: '',
    businessLocation_name: '',
    termsAndConditionCheckBox: false,
  },

  contactDetails: {
    firstName: '',
    lastName: '',
    email: '',
    verifyEmail_id: false,
  },

  showEmailVerifyContent: false,

  ComplianceAndFinancialsDetails: {
    CIPCRegistrationNumber: '',
    registerationCertificate: '',
    TaxNumber: '',
    taxCertificate: '',
  },

  EngagementModelDetails: {
    scan_pay: false,
    scan_cashback_percentage: 0,
    payment_link: false,
    paymentlink_cashback_percentage: 0,
  },

  businessDetails_IsSubmitting: false,
  businessDetails_SubmitSuccess: false,
  businessDetails_SubmitError: null,
  businessDetails_SubmitSuccessMessage: '',
  businessDetails_SubmitErrorMessage: '',

  contactDetails_RequestEmail_OTP_IsSubmitting: false,
  contactDetails_RequestEmail_OTP_SubmitSuccess: false,
  contactDetails_RequestEmail_OTP_SubmitError: null,
  contactDetails_RequestEmail_OTP_SubmitSuccessMessage: '',
  contactDetails_RequestEmail_OTP_SubmitErrorMessage: '',

  contactDetails_VerifyEmail_OTP_IsSubmitting: false,
  contactDetails_VerifyEmail_OTP_SubmitSuccess: false,
  contactDetails_VerifyEmail_OTP_SubmitError: null,
  contactDetails_VerifyEmail_OTP_SubmitSuccessMessage: '',
  contactDetails_VerifyEmail_OTP_SubmitErrorMessage: '',

  contactDetails_IsSubmitting: false,
  contactDetails_SubmitSuccess: false,
  contactDetails_SubmitError: null,
  contactDetails_SubmitSuccessMessage: '',
  contactDetails_SubmitErrorMessage: '',

  complianceFinancialDetails_IsSubmitting: false,
  complianceFinancialDetails_SubmitSuccess: false,
  complianceFinancialDetails_SubmitError: null,
  complianceFinancialDetails_SubmitSuccessMessage: '',
  complianceFinancialDetails_SubmitErrorMessage: '',

  engagementModelDetails_IsSubmitting: false,
  engagementModelDetails_SubmitSuccess: false,
  engagementModelDetails_SubmitError: null,
  engagementModelDetails_SubmitSuccessMessage: '',
  engagementModelDetails_SubmitErrorMessage: '',

  annexureList: [],
  annexureListLoading: false,
  annexureListError: null,

  privacyPolicys: [],
  privacyPolicysLoading: false,
  privacyPolicysError: null,

  termsAndConditions: [],
  termsAndConditionsLoading: false,
  termsAndConditionsError: null,

  annexureList_IsSubmitting: false,
  annexureList_SubmitSuccess: false,
  annexureList_SubmitError: null,
  annexureList_SubmitSuccessMessage: '',
  annexureList_SubmitErrorMessage: '',
};

const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState,
  reducers: {
    setOnBoardFormNumber: (state, action) => {
      state.onBoardFormNumber = action.payload;
    },

    setCheckMPINflow: (state, action) => {
      state.checkMPINflow = action.payload;
    },

    setCategoriesLoader: state => {
      state.categoriesLoading = true;
      state.categoriesError = null;
    },
    setCategoriesSuccess: (state, action) => {
      state.categoriesLoading = false;
      state.categories = action.payload;
    },
    setCategoriesFailure: (state, action) => {
      state.categoriesLoading = false;
      state.categoriesError = action.payload;
    },

    setBusinessDetails: (state, action) => {
      state.businessDetails = {...state.businessDetails, ...action.payload};
    },

    setContactDetails: (state, action) => {
      state.contactDetails = {...state.contactDetails, ...action.payload};
    },

    setShowEmailVerifyContent: (state, action) => {
      state.showEmailVerifyContent = action.payload;
    },

    setEngagementModelDetails: (state, action) => {
      state.EngagementModelDetails = {
        ...state.EngagementModelDetails,
        ...action.payload,
      };
    },

    setComplianceFinancialDetails: (state, action) => {
      state.ComplianceAndFinancialsDetails = {
        ...state.ComplianceAndFinancialsDetails,
        ...action.payload,
      };
    },

    businessDetails_submitOnBoardFormLoader: state => {
      state.businessDetails_IsSubmitting = true;
      state.businessDetails_SubmitSuccess = false;
      state.businessDetails_SubmitError = null;
      state.businessDetails_SubmitErrorMessage = '';
    },
    businessDetails_submitOnBoardFormSuccess: (state, action) => {
      state.businessDetails_IsSubmitting = false;
      state.businessDetails_SubmitSuccess = true;
      state.businessDetails_SubmitSuccessMessage = action.payload;
    },
    businessDetails_submitOnBoardFormFailure: (state, action) => {
      state.businessDetails_IsSubmitting = false;
      state.businessDetails_SubmitError = true;
      state.businessDetails_SubmitErrorMessage = action.payload;
    },

    businessDetails_submitOnBoard_reset: state => {
      state.businessDetails_IsSubmitting = false;
      state.businessDetails_SubmitSuccess = false;
      state.businessDetails_SubmitError = null;
      state.businessDetails_SubmitSuccessMessage = '';
      state.businessDetails_SubmitErrorMessage = '';
    },

    contactDetails_submitOnBoardFormLoader: state => {
      state.contactDetails_IsSubmitting = true;
      state.contactDetails_SubmitSuccess = false;
      state.contactDetails_SubmitError = null;
      state.contactDetails_SubmitErrorMessage = '';
    },
    contactDetails_submitOnBoardFormSuccess: (state, action) => {
      state.contactDetails_IsSubmitting = false;
      state.contactDetails_SubmitSuccess = true;
      state.contactDetails_SubmitSuccessMessage = action.payload;
    },
    contactDetails_submitOnBoardFormFailure: (state, action) => {
      state.contactDetails_IsSubmitting = false;
      state.contactDetails_SubmitError = true;
      state.contactDetails_SubmitErrorMessage = action.payload;
    },

    contactDetails_RequestEmail_OTP_Loader: state => {
      state.contactDetails_RequestEmail_OTP_IsSubmitting = true;
      state.contactDetails_RequestEmail_OTP_SubmitSuccess = false;
      state.contactDetails_RequestEmail_OTP_SubmitError = null;
      state.contactDetails_RequestEmail_OTP_SubmitErrorMessage = '';
    },
    contactDetails_RequestEmail_OTP_Success: (state, action) => {
      state.contactDetails_RequestEmail_OTP_IsSubmitting = false;
      state.contactDetails_RequestEmail_OTP_SubmitSuccess = true;
      state.contactDetails_RequestEmail_OTP_SubmitSuccessMessage =
        action.payload;
    },
    contactDetails_RequestEmail_OTP_Failure: (state, action) => {
      state.contactDetails_RequestEmail_OTP_IsSubmitting = false;
      state.contactDetails_RequestEmail_OTP_SubmitError = true;
      state.contactDetails_RequestEmail_OTP_SubmitErrorMessage = action.payload;
    },

    contactDetails_VerifyEmail_OTP_Loader: state => {
      state.contactDetails_VerifyEmail_OTP_IsSubmitting = true;
      state.contactDetails_VerifyEmail_OTP_SubmitSuccess = false;
      state.contactDetails_VerifyEmail_OTP_SubmitError = null;
      state.contactDetails_VerifyEmail_OTP_SubmitErrorMessage = '';
    },
    contactDetails_VerifyEmail_OTP_Success: (state, action) => {
      state.contactDetails_VerifyEmail_OTP_IsSubmitting = false;
      state.contactDetails_VerifyEmail_OTP_SubmitSuccess = true;
      state.contactDetails_VerifyEmail_OTP_SubmitSuccessMessage =
        action.payload;
    },
    contactDetails_VerifyEmail_OTP_Failure: (state, action) => {
      state.contactDetails_VerifyEmail_OTP_IsSubmitting = false;
      state.contactDetails_VerifyEmail_OTP_SubmitError = true;
      state.contactDetails_VerifyEmail_OTP_SubmitErrorMessage = action.payload;
    },

    complianceFinancialDetails_submitOnBoardFormLoader: state => {
      state.complianceFinancialDetails_IsSubmitting = true;
      state.complianceFinancialDetails_SubmitSuccess = false;
      state.complianceFinancialDetails_SubmitError = null;
      state.complianceFinancialDetails_SubmitErrorMessage = '';
    },
    complianceFinancialDetails_submitOnBoardFormSuccess: (state, action) => {
      state.complianceFinancialDetails_IsSubmitting = false;
      state.complianceFinancialDetails_SubmitSuccess = true;
      state.complianceFinancialDetails_SubmitSuccessMessage = action.payload;
    },
    complianceFinancialDetails_submitOnBoardFormFailure: (state, action) => {
      state.complianceFinancialDetails_IsSubmitting = false;
      state.complianceFinancialDetails_SubmitError = true;
      state.complianceFinancialDetails_SubmitErrorMessage = action.payload;
    },

    engagementModelDetails_submitOnBoardFormLoader: state => {
      state.engagementModelDetails_IsSubmitting = true;
      state.engagementModelDetails_SubmitSuccess = false;
      state.engagementModelDetails_SubmitError = null;
      state.engagementModelDetails_SubmitErrorMessage = '';
    },
    engagementModelDetails_submitOnBoardFormSuccess: (state, action) => {
      state.engagementModelDetails_IsSubmitting = false;
      state.engagementModelDetails_SubmitSuccess = true;
      state.engagementModelDetails_SubmitSuccessMessage = action.payload;
    },
    engagementModelDetails_submitOnBoardFormFailure: (state, action) => {
      state.engagementModelDetails_IsSubmitting = false;
      state.engagementModelDetails_SubmitError = true;
      state.engagementModelDetails_SubmitErrorMessage = action.payload;
    },

    annexureList_submitOnBoardFormLoader: state => {
      state.annexureList_IsSubmitting = true;
      state.annexureList_SubmitSuccess = false;
      state.annexureList_SubmitError = null;
      state.annexureList_SubmitErrorMessage = '';
    },
    annexureList_submitOnBoardFormSuccess: (state, action) => {
      state.annexureList_IsSubmitting = false;
      state.annexureList_SubmitSuccess = true;
      state.annexureList_SubmitSuccessMessage = action.payload;
    },
    annexureList_submitOnBoardFormFailure: (state, action) => {
      state.annexureList_IsSubmitting = false;
      state.annexureList_SubmitError = true;
      state.annexureList_SubmitErrorMessage = action.payload;
    },

    setAnnexureListLoader: state => {
      state.annexureListLoading = true;
      state.annexureListError = null;
    },
    setAnnexureListSuccess: (state, action) => {
      state.annexureListLoading = false;
      state.annexureList = action.payload;
    },
    setAnnexureListFailure: (state, action) => {
      state.annexureListLoading = false;
      state.annexureListError = action.payload;
    },

    setPrivacyPolicysLoader: state => {
      state.privacyPolicysLoading = true;
      state.privacyPolicysError = null;
    },
    setPrivacyPolicysSuccess: (state, action) => {
      state.privacyPolicysLoading = false;
      state.privacyPolicys = action.payload;
    },
    setPrivacyPolicysFailure: (state, action) => {
      state.privacyPolicysLoading = false;
      state.privacyPolicysError = action.payload;
    },

    setTermsAndConditionsLoader: state => {
      state.termsAndConditionsLoading = true;
      state.termsAndConditionsError = null;
    },
    setTermsAndConditionsSuccess: (state, action) => {
      state.termsAndConditionsLoading = false;
      state.termsAndConditions = action.payload;
    },
    setTermsAndConditionsFailure: (state, action) => {
      state.termsAndConditionsLoading = false;
      state.termsAndConditionsError = action.payload;
    },

    resetOnBoardForm: () => initialState,
    resetBusinessDetails: state => {
      state.businessDetails = {
        businessName: '',
        CIPCRegistrationNumber: '',
        businessCategory: '',
        businessCategory_name: '',
        businessLocation: '',
        businessLocation_name: '',
        termsAndConditionCheckBox: false,
      };
    },
  },
});

export const {
  setOnBoardFormNumber,
  setCheckMPINflow,
  setBusinessDetails,
  resetBusinessDetails,
  setContactDetails,
  setEngagementModelDetails,
  setComplianceFinancialDetails,
  businessDetails_submitOnBoardFormLoader,
  businessDetails_submitOnBoardFormSuccess,
  businessDetails_submitOnBoardFormFailure,
  businessDetails_submitOnBoard_reset,

  contactDetails_RequestEmail_OTP_Loader,
  contactDetails_RequestEmail_OTP_Success,
  contactDetails_RequestEmail_OTP_Failure,

  contactDetails_VerifyEmail_OTP_Loader,
  contactDetails_VerifyEmail_OTP_Success,
  contactDetails_VerifyEmail_OTP_Failure,

  setShowEmailVerifyContent,

  contactDetails_submitOnBoardFormLoader,
  contactDetails_submitOnBoardFormSuccess,
  contactDetails_submitOnBoardFormFailure,

  complianceFinancialDetails_submitOnBoardFormLoader,
  complianceFinancialDetails_submitOnBoardFormSuccess,
  complianceFinancialDetails_submitOnBoardFormFailure,

  engagementModelDetails_submitOnBoardFormLoader,
  engagementModelDetails_submitOnBoardFormSuccess,
  engagementModelDetails_submitOnBoardFormFailure,

  annexureList_submitOnBoardFormLoader,
  annexureList_submitOnBoardFormSuccess,
  annexureList_submitOnBoardFormFailure,

  resetOnBoardForm,

  setCategoriesLoader,
  setCategoriesSuccess,
  setCategoriesFailure,

  setAnnexureListLoader,
  setAnnexureListSuccess,
  setAnnexureListFailure,

  setPrivacyPolicysLoader,
  setPrivacyPolicysSuccess,
  setPrivacyPolicysFailure,

  setTermsAndConditionsLoader,
  setTermsAndConditionsSuccess,
  setTermsAndConditionsFailure,
} = onBoardSlice.actions;

export default onBoardSlice.reducer;

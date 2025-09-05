import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  businessProfileFormNumber: 1,

  businessProfileSingleScreen: false,

  businessProfileActivityDetails: {
    businessName: '',
    BusinessStartDate: '',
    businessType: '',
    CIPCRegistrationNumber: '',
    taxNumber: '',
    zonkeBusinessCategory: '',
    numberOfBranches: '',
    brandNameOfOutlets: '',
    businessLocation: '',
    Merchant_ID: '',
    Wallet_ID: '',
    registeredAddress: '',
    postaldAddress: '',
    CurrentBalance: 'ZAR 0',
    AvailableBalance: 'ZAR 0',
  },

  contactAddressDetails: {
    contactPersonFirstName: '',
    contactPersonLastName: '',
    contactPersonDesignation: '',
    department: '',
    contactMobileNumber: '',
    contactEmailAddress: '',
    websiteURL: '',
    registeredAddress: '',
    postalCode: '',
    province: '',
    postalAddressCheckBox: false,
    postalAddressLines: '',
    businessLocation: '',
  },

  businessProfileEngagementModelDetails: {
    scan_pay: false,
    scan_cashback_percentage: 0,
    payment_link: false,
    paymentlink_cashback_percentage: 0,
    platformFeePercentage: '',
  },

  businessProfileComplianceAndFinancialsDetails: {
    CIPCRegistrationNumber: '',
    registerationCertificate: '',
    taxNumber: '',
    taxCertificate: '',
  },

  businessProfileBankAccountDetails: {
    bankProvince: '',
    bankProvince_name: '',
    bankName: '',
    bankName_name: '',
    bankAccountHolderName: '',
    bankAccountNumber: '',
    IBAN_Code: '',
    Swift_Code: '',
  },

  merchantDetailsLoader: false,
  merchantDetailsSuccess: false,
  merchantDetailsError: false,
  merchantDetailsErrorMessage: '',
  merchantDetailsSuccessVersion: 0,
  merchantDetailsErrorVersion: 0,
  merchantDetailsdata: {},

  businessProfileAndActivityDetailsLoader: false,
  businessProfileAndActivityDetailsSuccess: false,
  businessProfileAndActivityDetailsError: false,
  businessProfileAndActivityDetailsErrorMessage: '',
  businessProfileAndActivityDetailsSuccessVersion: 0,
  businessProfileAndActivityDetailsErrorVersion: 0,
  businessProfileAndActivityDetailsData: {},

  contactDetailsLoader: false,
  contactDetailsSuccess: false,
  contactDetailsError: false,
  contactDetailsErrorMessage: '',
  contactDetailsSuccessVersion: 0,
  contactDetailsErrorVersion: 0,
  contactDetailsData: {},

  financeDetailsLoader: false,
  financeDetailsSuccess: false,
  financeDetailsError: false,
  financeDetailsErrorMessage: '',
  financeDetailsSuccessVersion: 0,
  financeDetailsErrorVersion: 0,
  financeDetailsData: {},

  bankDetailsLoader: false,
  bankDetailsSuccess: false,
  bankDetailsError: false,
  bankDetailsErrorMessage: '',
  bankDetailsSuccessVersion: 0,
  bankDetailsErrorVersion: 0,
  bankDetailsData: {},

  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
  submitSuccessMessage: '',
  submitErrorMessage: '',
  version: 0,
};

const businessProfileSlice = createSlice({
  name: 'businessProfile',
  initialState,
  reducers: {
    setbusinessProfileFormNumber: (state, action) => {
      state.businessProfileFormNumber = action.payload;
    },
    setbusinessProfileSingleScreen: (state, action) => {
      state.businessProfileSingleScreen = action.payload;
    },
    setBusinessProfileActivityDetails: (state, action) => {
      state.businessProfileActivityDetails = {
        ...state.businessProfileActivityDetails,
        ...action.payload,
      };
    },
    setContactAddressDetails: (state, action) => {
      state.contactAddressDetails = {
        ...state.contactAddressDetails,
        ...action.payload,
      };
    },

    setBusinessProfileEngagementModelDetails: (state, action) => {
      state.businessProfileEngagementModelDetails = {
        ...state.businessProfileEngagementModelDetails,
        ...action.payload,
      };
    },

    setBusinessProfileComplianceFinancialDetails: (state, action) => {
      state.businessProfileComplianceAndFinancialsDetails = {
        ...state.businessProfileComplianceAndFinancialsDetails,
        ...action.payload,
      };
    },

    setBankAccountDetails: (state, action) => {
      state.businessProfileBankAccountDetails = {
        ...state.businessProfileBankAccountDetails,
        ...action.payload,
      };
    },
    resetBankAccountDetails: state => {
      state.bankDetailsLoader = false;
      state.bankDetailsSuccess = false;
      state.bankDetailsError = false;
      state.bankDetailsErrorMessage = '';
      state.bankDetailsSuccessVersion = 0;
      state.bankDetailsErrorVersion = 0;
      state.bankDetailsData = {};
    },

    setMerchantDetailsLoader: state => {
      state.merchantDetailsLoader = true;
    },
    setMerchantDetailsSuccess: (state, action) => {
      state.merchantDetailsLoader = false;
      state.merchantDetailsSuccess = true;
      state.merchantDetailsdata = action.payload;
      state.merchantDetailsSuccessVersion += 1;
      state.merchantDetailsError = false;
      state.merchantDetailsErrorMessage = '';
    },
    setMerchantDetailsFailure: (state, action) => {
      state.merchantDetailsLoader = false;
      state.merchantDetailsError = true;
      state.merchantDetailsErrorMessage = action.payload;
      state.merchantDetailsErrorVersion += 1;
    },
    resetMerchantDetailsState: state => {
      state.merchantDetailsLoader = false;
      state.merchantDetailsSuccess = false;
      state.merchantDetailsError = false;
      state.merchantDetailsErrorMessage = '';
      state.merchantDetailsdata = {};
      state.merchantDetailsSuccessVersion = 0;
      state.merchantDetailsErrorVersion = 0;
    },

    //
    //
    //
    //
    //
    submitbusinessProfileAndActivityFormLoader: state => {
      state.businessProfileAndActivityDetailsLoader = true;
    },
    submitbusinessProfileAndActivityFormSuccess: (state, action) => {
      state.businessProfileAndActivityDetailsLoader = false;
      state.businessProfileAndActivityDetailsSuccess = true;
      state.businessProfileAndActivityDetailsData = action.payload;
      state.businessProfileAndActivityDetailsSuccessVersion += 1;
      state.businessProfileAndActivityDetailsError = false;
      state.businessProfileAndActivityDetailsErrorMessage = '';
    },
    submitbusinessProfileAndActivityFormFailure: (state, action) => {
      state.businessProfileAndActivityDetailsLoader = false;
      state.businessProfileAndActivityDetailsError = true;
      state.businessProfileAndActivityDetailsErrorMessage = action.payload;
      state.businessProfileAndActivityDetailsErrorVersion += 1;
    },
    resetbusinessProfileAndActivityDetailsState: state => {
      state.businessProfileAndActivityDetailsLoader = false;
      state.businessProfileAndActivityDetailsSuccess = false;
      state.businessProfileAndActivityDetailsError = false;
      state.businessProfileAndActivityDetailsErrorMessage = '';
      state.businessProfileAndActivityDetailsSuccessVersion = 0;
      state.businessProfileAndActivityDetailsErrorVersion = 0;
      state.businessProfileAndActivityDetailsData = {};
    },
    //
    //
    //
    //
    //
    submitContactDetailsFormLoader: state => {
      state.contactDetailsLoader = true;
    },
    submitContactDetailsFormSuccess: (state, action) => {
      state.contactDetailsLoader = false;
      state.contactDetailsSuccess = true;
      state.contactDetailsData = action.payload;
      state.contactDetailsSuccessVersion += 1;
      state.contactDetailsError = false;
      state.contactDetailsErrorMessage = '';
    },
    submitContactDetailsFormFailure: (state, action) => {
      state.contactDetailsLoader = false;
      state.contactDetailsError = true;
      state.contactDetailsErrorMessage = action.payload;
      state.contactDetailsErrorVersion += 1;
    },
    resetContactDetailsState: state => {
      state.contactDetailsLoader = false;
      state.contactDetailsSuccess = false;
      state.contactDetailsError = false;
      state.contactDetailsErrorMessage = '';
      state.contactDetailsSuccessVersion = 0;
      state.contactDetailsErrorVersion = 0;
      state.contactDetailsData = {};
    },
    //
    //
    //
    //
    //
    submitfinanceDetailsFormLoader: state => {
      state.financeDetailsLoader = true;
    },
    submitfinanceDetailsFormSuccess: (state, action) => {
      state.financeDetailsLoader = false;
      state.financeDetailsSuccess = true;
      state.financeDetailsData = action.payload;
      state.financeDetailsSuccessVersion += 1;
      state.financeDetailsError = false;
      state.financeDetailsErrorMessage = '';
    },
    submitfinanceDetailsFormFailure: (state, action) => {
      state.financeDetailsLoader = false;
      state.financeDetailsError = true;
      state.financeDetailsErrorMessage = action.payload;
      state.financeDetailsErrorVersion += 1;
    },
    resetFinanceDetailsState: state => {
      state.financeDetailsLoader = false;
      state.financeDetailsSuccess = false;
      state.financeDetailsError = false;
      state.financeDetailsErrorMessage = '';
      state.financeDetailsSuccessVersion = 0;
      state.financeDetailsErrorVersion = 0;
      state.financeDetailsData = {};
    },
    //
    //
    //
    //
    //
    submitBankDetailsFormLoader: state => {
      state.bankDetailsLoader = true;
    },
    submitBankDetailsFormSuccess: (state, action) => {
      state.bankDetailsLoader = false;
      state.bankDetailsSuccess = true;
      state.bankDetailsData = action.payload;
      state.bankDetailsSuccessVersion += 1;
      state.bankDetailsError = false;
      state.bankDetailsErrorMessage = '';
    },
    submitBankDetailsFormFailure: (state, action) => {
      state.bankDetailsLoader = false;
      state.bankDetailsError = true;
      state.bankDetailsErrorMessage = action.payload;
      state.bankDetailsErrorVersion += 1;
    },
    resetBankDetailsState: state => {
      state.bankDetailsLoader = false;
      state.bankDetailsSuccess = false;
      state.bankDetailsError = false;
      state.bankDetailsErrorMessage = '';
      state.bankDetailsSuccessVersion = 0;
      state.bankDetailsErrorVersion = 0;
      state.bankDetailsData = {};
    },

    resetbusinessProfileForm: () => initialState,
  },
});

export const {
  setbusinessProfileFormNumber,
  setbusinessProfileSingleScreen,
  setBusinessProfileActivityDetails,
  setContactAddressDetails,
  setBusinessProfileEngagementModelDetails,
  setBusinessProfileComplianceFinancialDetails,
  setBankAccountDetails,
  //

  submitbusinessProfileAndActivityFormLoader,
  submitbusinessProfileAndActivityFormSuccess,
  submitbusinessProfileAndActivityFormFailure,
  resetbusinessProfileForm,
  //
  submitContactDetailsFormLoader,
  submitContactDetailsFormSuccess,
  submitContactDetailsFormFailure,
  //
  submitfinanceDetailsFormLoader,
  submitfinanceDetailsFormSuccess,
  submitfinanceDetailsFormFailure,
  //
  submitBankDetailsFormLoader,
  submitBankDetailsFormSuccess,
  submitBankDetailsFormFailure,
  //

  setMerchantDetailsLoader,
  setMerchantDetailsSuccess,
  setMerchantDetailsFailure,
} = businessProfileSlice.actions;

export default businessProfileSlice.reducer;

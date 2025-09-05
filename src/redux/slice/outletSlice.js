import {createSlice} from '@reduxjs/toolkit';
import {countries} from '../../components/ContryCode/Countries';

const initialState = {
  outletFormumber: 1,
  outletSingleStep: false,

  outletFormStatusEdit: false,

  subCategories: [],
  subCategoriesLoading: false,
  subCategoriesError: null,

  province: [],
  provinceLoading: false,
  provinceError: null,

  area: [],
  areaLoading: false,
  areaError: null,

  facilitys: [],
  facilitysLoading: false,
  facilitysError: null,

  OutletFirstTime: false,

  Outlets: [],
  OutletsLoading: false,
  OutletsError: null,

  OutletByID: [],
  OutletByIDLoading: false,
  OutletByIDError: null,

  deleteOutletById: [],
  deleteOutletByIdLoading: false,
  deleteOutletByIdError: null,

  outletInfoDetails: {
    BusinessName: '',
    OutletName: '',
    ContactPersonFirstName: '',
    ContactPersonLastName: '',
    ContactPersonMobile: {
      mobileNo: '',
      mobileNoRaw: '',
      countrieDetails: countries[161],
    },
    ContactPersonEmail: '',
    MobileNumber_CustomerToReachOut: {
      mobileNo: '',
      mobileNoRaw: '',
      countrieDetails: countries[161],
    },
    SubCategories_id: '',
    About: '',
    OutletLocation: '',
    Address: '',
    ProvinceDetails: '',
    Province_name: '',
    AreaDetails: '',
    Area_name: '',
  },

  outletInfoDetailsLocationStatus: false,

  DocumentsDetails: {
    RegistrationNo: '',
    RegistrationDate: '',
    RegistrationCertificatePDF_JPG_PNG: '',
    TaxRegistrationNumber_TRN: '',
    TaxRegistrationDate: '',
    TaxCertificatePDF_JPG_PNG: '',
  },

  OutletCharacteristicsDetails: {},

  TimingsDetails: [
    {name: 'Monday', open: false, time: [{from: '09:00', to: '17:00'}]},
    {name: 'Tuesday', open: false, time: [{from: '09:00', to: '17:00'}]},
    {name: 'Wednesday', open: false, time: [{from: '09:00', to: '17:00'}]},
    {name: 'Thursday', open: false, time: [{from: '09:00', to: '17:00'}]},
    {name: 'Friday', open: false, time: [{from: '09:00', to: '17:00'}]},
    {name: 'Saturday', open: false, time: [{from: '09:00', to: '17:00'}]},
    {name: 'Sunday', open: false, time: [{from: '09:00', to: '17:00'}]},
  ],

  PhotosDetails: [
    {firstImg: '', liked: false},
    {secondImg: '', liked: false},
    {thirdImg: '', liked: false},
    {fourthImg: '', liked: false},
    {fifthImg: '', liked: false},
  ],

  EngagementModelDetails: {
    CashbackPercentage: '',
    paymentOptions: 'Scan & Pay (QR Code)',
  },

  outletInfoDetails_IsSubmitting: false,
  outletInfoDetails_SubmitSuccess: false,
  outletInfoDetails_SubmitError: null,
  outletInfoDetails_SubmitSuccessMessage: '',
  outletInfoDetails_SubmitErrorMessage: null,

  documentDetails_IsSubmitting: false,
  documentDetails_SubmitSuccess: false,
  documentDetails_SubmitError: null,
  documentDetails_SubmitSuccessMessage: '',
  documentDetails_SubmitErrorMessage: '',

  outletCharacteristicsDetails_IsSubmitting: false,
  outletCharacteristicsDetails_SubmitSuccess: false,
  outletCharacteristicsDetails_SubmitError: null,
  outletCharacteristicsDetails_SubmitSuccessMessage: '',
  outletCharacteristicsDetails_SubmitErrorMessage: '',

  timingsDetails_IsSubmitting: false,
  timingsDetails_SubmitSuccess: false,
  timingsDetails_SubmitError: null,
  timingsDetails_SubmitSuccessMessage: '',
  timingsDetails_SubmitErrorMessage: '',

  engagementModelDetails_IsSubmitting: false,
  engagementModelDetails_SubmitSuccess: false,
  engagementModelDetails_SubmitError: null,
  engagementModelDetails_SubmitSuccessMessage: '',
  engagementModelDetails_SubmitErrorMessage: '',

  photosDetails_IsSubmitting: false,
  photosDetails_SubmitSuccess: false,
  photosDetails_SubmitError: null,
  photosDetails_SubmitSuccessMessage: '',
  photosDetails_SubmitErrorMessage: '',
};

const onBoardSlice = createSlice({
  name: 'outlet',
  initialState,
  reducers: {
    resetOutletOnBoardForm: () => initialState,
    setOutletFormumber: (state, action) => {
      state.outletFormumber = action.payload;
    },

    setOutletSingleStep: (state, action) => {
      state.outletSingleStep = action.payload;
    },

    setOutletFirstTime: (state, action) => {
      state.OutletFirstTime = action.payload;
    },

    setOutletInfoDetails: (state, action) => {
      state.outletInfoDetails = {...state.outletInfoDetails, ...action.payload};
    },

    setOutletInfoDetailsLocationStatus: (state, action) => {
      state.outletInfoDetailsLocationStatus = action.payload;
    },

    setDocumentsDetails: (state, action) => {
      state.DocumentsDetails = {
        ...state.DocumentsDetails,
        ...action.payload,
      };
    },

    setOutletCharacteristicsDetails: (state, action) => {
      state.OutletCharacteristicsDetails = {
        ...state.OutletCharacteristicsDetails,
        ...action.payload,
      };
    },

    setTimingsDetails: (state, action) => {
      state.TimingsDetails = {
        ...state.TimingsDetails,
        ...action.payload,
      };
    },

    setPhotosDetails: (state, action) => {
      state.PhotosDetails = {
        ...state.PhotosDetails,
        ...action.payload,
      };
    },

    setEngagementModelDetails: (state, action) => {
      state.EngagementModelDetails = {
        ...state.EngagementModelDetails,
        ...action.payload,
      };
    },

    setOutletFormStatusEdit: (state, action) => {
      state.outletFormStatusEdit = action.payload;
    },

    resetOutletInfoDetails: state => {
      state.outletInfoDetails = {
        BusinessName: '',
        OutletName: '',
        ContactPersonFirstName: '',
        ContactPersonLastName: '',
        ContactPersonMobile: {
          mobileNo: '',
          mobileNoRaw: '',
          countrieDetails: countries[161],
        },
        ContactPersonEmail: '',
        MobileNumber_CustomerToReachOut: {
          mobileNo: '',
          mobileNoRaw: '',
          countrieDetails: countries[161],
        },
        SubCategories_id: '',
        About: '',
        OutletLocation: '',
        Address: '',
        ProvinceDetails: '',
        Province_name: '',
        AreaDetails: '',
        Area_name: '',
      };
    },

    resetDocumentsDetails: state => {
      state.DocumentsDetails = {
        RegistrationNo: '',
        RegistrationDate: '',
        RegistrationCertificatePDF_JPG_PNG: '',
        TaxRegistrationNumber_TRN: '',
        TaxRegistrationDate: '',
        TaxCertificatePDF_JPG_PNG: '',
      };
    },

    resetTimingsDetails: state => {
      state.TimingsDetails = [
        {name: 'Monday', open: false, time: [{from: '09:00', to: '17:00'}]},
        {name: 'Tuesday', open: false, time: [{from: '09:00', to: '17:00'}]},
        {name: 'Wednesday', open: false, time: [{from: '09:00', to: '17:00'}]},
        {name: 'Thursday', open: false, time: [{from: '09:00', to: '17:00'}]},
        {name: 'Friday', open: false, time: [{from: '09:00', to: '17:00'}]},
        {name: 'Saturday', open: false, time: [{from: '09:00', to: '17:00'}]},
        {name: 'Sunday', open: false, time: [{from: '09:00', to: '17:00'}]},
      ];
    },

    resetPhotosDetails: state => {
      state.PhotosDetails = [
        {firstImg: '', liked: true},
        {secondImg: '', liked: false},
        {thirdImg: '', liked: false},
        {fourthImg: '', liked: false},
        {fifthImg: '', liked: false},
      ];
    },

    resetEngagementModelDetails: state => {
      state.EngagementModelDetails = {
        CashbackPercentage: '',
        paymentOptions: 'Scan & Pay (QR Code)',
      };
    },

    resetOutletCharacteristicsDetails: state => {
      state.OutletCharacteristicsDetails = {};
    },

    //
    //
    //
    //

    setSubCategoriesLoader: state => {
      state.subCategoriesLoading = true;
      state.subCategoriesError = null;
    },
    setSubCategoriesSuccess: (state, action) => {
      state.subCategoriesLoading = false;
      state.subCategories = action.payload;
    },
    setSubCategoriesFailure: (state, action) => {
      state.subCategoriesLoading = false;
      state.subCategoriesError = action.payload;
    },

    setProvinceLoader: state => {
      state.provinceLoading = true;
      state.provinceError = null;
    },
    setProvinceSuccess: (state, action) => {
      state.provinceLoading = false;
      state.province = action.payload;
    },
    setProvinceFailure: (state, action) => {
      state.provinceLoading = false;
      state.provinceError = action.payload;
    },

    setAreaLoader: state => {
      state.areaLoading = true;
      state.areaError = null;
    },
    setAreaSuccess: (state, action) => {
      state.areaLoading = false;
      state.area = action.payload;
    },
    setAreaFailure: (state, action) => {
      state.areaLoading = false;
      state.areaError = action.payload;
    },

    setFacilitysLoader: state => {
      state.facilitysLoading = true;
      state.facilitysError = null;
    },
    setFacilitysSuccess: (state, action) => {
      state.facilitysLoading = false;
      state.facilitys = action.payload;
    },
    setFacilitysFailure: (state, action) => {
      state.facilitysLoading = false;
      state.facilitysError = action.payload;
    },

    setOutletsLoader: state => {
      state.OutletsLoading = true;
      state.OutletsError = null;
    },
    setOutletsSuccess: (state, action) => {
      state.OutletsLoading = false;
      state.Outlets = action.payload;
    },
    setOutletsFailure: (state, action) => {
      state.OutletsLoading = false;
      state.OutletsError = action.payload;
    },

    setOutletByIDLoader: state => {
      state.OutletByIDLoading = true;
      state.OutletByIDError = null;
    },
    setOutletByIDSuccess: (state, action) => {
      state.OutletByIDLoading = false;
      state.OutletByID = action.payload;
    },
    setOutletByIDFailure: (state, action) => {
      state.OutletByIDLoading = false;
      state.OutletByIDError = action.payload;
    },

    setDeleteOutletByIdLoader: state => {
      state.deleteOutletByIdLoading = true;
      state.deleteOutletByIdError = null;
    },
    setDeleteOutletByIdSuccess: (state, action) => {
      state.deleteOutletByIdLoading = false;
      state.deleteOutletById = action.payload;
    },
    setDeleteOutletByIdFailure: (state, action) => {
      state.deleteOutletByIdLoading = false;
      state.deleteOutletByIdError = action.payload;
    },

    outletInfoDetails_submitOnBoardFormLoader: state => {
      state.outletInfoDetails_IsSubmitting = true;
      state.outletInfoDetails_SubmitSuccess = false;
      state.outletInfoDetails_SubmitError = null;
      state.outletInfoDetails_SubmitErrorMessage = '';
    },
    outletInfoDetails_submitOnBoardFormSuccess: (state, action) => {
      state.outletInfoDetails_IsSubmitting = false;
      state.outletInfoDetails_SubmitSuccess = true;
      state.outletInfoDetails_SubmitSuccessMessage = action.payload;
    },
    outletInfoDetails_submitOnBoardFormFailure: (state, action) => {
      state.outletInfoDetails_IsSubmitting = false;
      state.outletInfoDetails_SubmitError = true;
      state.outletInfoDetails_SubmitErrorMessage = action.payload;
    },
    outletInfoDetails_submitOnBoard_reset: state => {
      state.outletInfoDetails_IsSubmitting = false;
      state.outletInfoDetails_SubmitSuccess = false;
      state.outletInfoDetails_SubmitError = null;
      state.outletInfoDetails_SubmitSuccessMessage = '';
      state.outletInfoDetails_SubmitErrorMessage = '';
    },

    documentDetails_submitOnBoardFormLoader: state => {
      state.documentDetails_IsSubmitting = true;
      state.documentDetails_SubmitSuccess = false;
      state.documentDetails_SubmitError = null;
      state.documentDetails_SubmitErrorMessage = '';
    },
    documentDetails_submitOnBoardFormSuccess: (state, action) => {
      state.documentDetails_IsSubmitting = false;
      state.documentDetails_SubmitSuccess = true;
      state.documentDetails_SubmitSuccessMessage = action.payload;
    },
    documentDetails_submitOnBoardFormFailure: (state, action) => {
      state.documentDetails_IsSubmitting = false;
      state.documentDetails_SubmitError = true;
      state.documentDetails_SubmitErrorMessage = action.payload;
    },
    documentDetails_submitOnBoard_reset: state => {
      state.documentDetails_IsSubmitting = false;
      state.documentDetails_SubmitSuccess = false;
      state.documentDetails_SubmitError = null;
      state.documentDetails_SubmitSuccessMessage = '';
      state.documentDetails_SubmitErrorMessage = '';
    },

    outletCharacteristicsDetails_submitOnBoardFormLoader: state => {
      state.outletCharacteristicsDetails_IsSubmitting = true;
      state.outletCharacteristicsDetails_SubmitSuccess = false;
      state.outletCharacteristicsDetails_SubmitError = null;
      state.outletCharacteristicsDetails_SubmitErrorMessage = '';
    },
    outletCharacteristicsDetails_submitOnBoardFormSuccess: (state, action) => {
      state.outletCharacteristicsDetails_IsSubmitting = false;
      state.outletCharacteristicsDetails_SubmitSuccess = true;
      state.outletCharacteristicsDetails_SubmitSuccessMessage = action.payload;
    },
    outletCharacteristicsDetails_submitOnBoardFormFailure: (state, action) => {
      state.outletCharacteristicsDetails_IsSubmitting = false;
      state.outletCharacteristicsDetails_SubmitError = true;
      state.outletCharacteristicsDetails_SubmitErrorMessage = action.payload;
    },
    outletCharacteristicsDetails_submitOnBoard_reset: state => {
      state.outletCharacteristicsDetails_IsSubmitting = false;
      state.outletCharacteristicsDetails_SubmitSuccess = false;
      state.outletCharacteristicsDetails_SubmitError = null;
      state.outletCharacteristicsDetails_SubmitSuccessMessage = '';
      state.outletCharacteristicsDetails_SubmitErrorMessage = '';
    },

    timingsDetails_submitOnBoardFormLoader: state => {
      state.timingsDetails_IsSubmitting = true;
      state.timingsDetails_SubmitSuccess = false;
      state.timingsDetails_SubmitError = null;
      state.timingsDetails_SubmitErrorMessage = '';
    },
    timingsDetails_submitOnBoardFormSuccess: (state, action) => {
      state.timingsDetails_IsSubmitting = false;
      state.timingsDetails_SubmitSuccess = true;
      state.timingsDetails_SubmitSuccessMessage = action.payload;
    },
    timingsDetails_submitOnBoardFormFailure: (state, action) => {
      state.timingsDetails_IsSubmitting = false;
      state.timingsDetails_SubmitError = true;
      state.timingsDetails_SubmitErrorMessage = action.payload;
    },
    timingsDetails_submitOnBoard_reset: state => {
      state.timingsDetails_IsSubmitting = false;
      state.timingsDetails_SubmitSuccess = false;
      state.timingsDetails_SubmitError = null;
      state.timingsDetails_SubmitSuccessMessage = '';
      state.timingsDetails_SubmitErrorMessage = '';
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
    engagementModelDetails_submitOnBoard_reset: state => {
      state.engagementModelDetails_IsSubmitting = false;
      state.engagementModelDetails_SubmitSuccess = false;
      state.engagementModelDetails_SubmitError = null;
      state.engagementModelDetails_SubmitSuccessMessage = '';
      state.engagementModelDetails_SubmitErrorMessage = '';
    },

    photosDetails_submitOnBoardFormLoader: state => {
      state.photosDetails_IsSubmitting = true;
      state.photosDetails_SubmitSuccess = false;
      state.photosDetails_SubmitError = null;
      state.photosDetails_SubmitErrorMessage = '';
    },
    photosDetails_submitOnBoardFormSuccess: (state, action) => {
      state.photosDetails_IsSubmitting = false;
      state.photosDetails_SubmitSuccess = true;
      // state.photosDetails_SubmitSuccessMessage = action.payload;
      state.photosDetails_SubmitSuccessMessage =
        typeof action.payload === 'string' ? action.payload : 'Success';
    },
    photosDetails_submitOnBoardFormFailure: (state, action) => {
      state.photosDetails_IsSubmitting = false;
      state.photosDetails_SubmitError = true;
      // state.photosDetails_SubmitErrorMessage = action.payload;
      state.photosDetails_SubmitErrorMessage =
        typeof action.payload === 'string' ? action.payload : 'Unknown error';
    },
    photosDetails_submitOnBoard_reset: state => {
      state.photosDetails_IsSubmitting = false;
      state.photosDetails_SubmitSuccess = false;
      state.photosDetails_SubmitError = null;
      state.photosDetails_SubmitSuccessMessage = '';
      state.photosDetails_SubmitErrorMessage = '';
    },
  },
});

export const {
  resetOutletOnBoardForm,
  setOutletFormumber,
  setOutletSingleStep,
  setOutletFormStatusEdit,
  setOutletFirstTime,
  //
  //
  setOutletInfoDetailsLocationStatus,
  setOutletInfoDetails,
  setDocumentsDetails,
  setPhotosDetails,
  setOutletCharacteristicsDetails,
  setTimingsDetails,
  setEngagementModelDetails,

  resetOutletInfoDetails,
  resetDocumentsDetails,
  resetEngagementModelDetails,
  resetOutletCharacteristicsDetails,
  resetPhotosDetails,
  resetTimingsDetails,

  setSubCategoriesLoader,
  setSubCategoriesSuccess,
  setSubCategoriesFailure,

  setProvinceLoader,
  setProvinceSuccess,
  setProvinceFailure,

  setAreaLoader,
  setAreaSuccess,
  setAreaFailure,

  setFacilitysLoader,
  setFacilitysSuccess,
  setFacilitysFailure,

  setOutletsLoader,
  setOutletsSuccess,
  setOutletsFailure,

  setOutletByIDLoader,
  setOutletByIDSuccess,
  setOutletByIDFailure,

  setDeleteOutletByIdLoader,
  setDeleteOutletByIdSuccess,
  setDeleteOutletByIdFailure,

  outletInfoDetails_submitOnBoardFormLoader,
  outletInfoDetails_submitOnBoardFormSuccess,
  outletInfoDetails_submitOnBoardFormFailure,
  outletInfoDetails_submitOnBoard_reset,
  //
  documentDetails_submitOnBoardFormLoader,
  documentDetails_submitOnBoardFormSuccess,
  documentDetails_submitOnBoardFormFailure,
  documentDetails_submitOnBoard_reset,
  //
  outletCharacteristicsDetails_submitOnBoardFormLoader,
  outletCharacteristicsDetails_submitOnBoardFormSuccess,
  outletCharacteristicsDetails_submitOnBoardFormFailure,
  outletCharacteristicsDetails_submitOnBoard_reset,
  //
  timingsDetails_submitOnBoardFormLoader,
  timingsDetails_submitOnBoardFormSuccess,
  timingsDetails_submitOnBoardFormFailure,
  timingsDetails_submitOnBoard_reset,
  //
  engagementModelDetails_submitOnBoardFormLoader,
  engagementModelDetails_submitOnBoardFormSuccess,
  engagementModelDetails_submitOnBoardFormFailure,
  engagementModelDetails_submitOnBoard_reset,
  //
  photosDetails_submitOnBoardFormLoader,
  photosDetails_submitOnBoardFormSuccess,
  photosDetails_submitOnBoardFormFailure,
  photosDetails_submitOnBoard_reset,
  //
} = onBoardSlice.actions;

export default onBoardSlice.reducer;

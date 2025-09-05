import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  menuStatusEdit: false,

  menusList: [],
  menusListLoading: false,
  menusListError: null,

  menuProductTypes: [],
  menuProductTypesLoading: false,
  menuProductTypesError: null,

  menuTagTypes: [],
  menuTagTypesLoading: false,
  menuTagTypesError: null,

  menuTagValues: [],
  menuTagValuesLoading: false,
  menuTagValuesError: null,

  selectDropDownMenu: {
    selectedMenuList: '',
    selectedMenuList_name: '',
  },

  addMenuDetails: {
    Outlet: '',
    Outlet_name: '',
    ProductName: '',
    ProductType: '',
    ProductType_name: '',
    TagValue: '',
    TagValue_name: '',
    Price: '',
    Description: '',
    Photo: '',
  },

  addMenu: '',
  addMenuLoading: false,
  addMenuError: null,

  deleteMenu: '',
  deleteMenuLoading: false,
  deleteMenuError: null,

  // addMenuDetails_IsSubmitting: false,
  // addMenuDetails_SubmitSuccess: false,
  // addMenuDetails_SubmitError: null,
  // addMenuDetails_SubmitSuccessMessage: '',
  // addMenuDetails_SubmitErrorMessage: '',
};

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    resetOnBoardForm: () => initialState,

    setMenusListLoader: state => {
      state.menusListLoading = true;
      state.menusListError = null;
    },
    setMenusListSuccess: (state, action) => {
      state.menusListLoading = false;
      state.menusList = action.payload;
    },
    setMenusListFailure: (state, action) => {
      state.menusListLoading = false;
      state.menusListError = action.payload;
    },

    setMenuProductTypesLoader: state => {
      state.menuProductTypesLoading = true;
      state.menuProductTypesError = null;
    },
    setMenuProductTypesSuccess: (state, action) => {
      state.menuProductTypesLoading = false;
      state.menuProductTypes = action.payload;
    },
    setMenuProductTypesFailure: (state, action) => {
      state.menuProductTypesLoading = false;
      state.menuProductTypesError = action.payload;
    },
    resetMenuProductTypes: state => {
      state.menuProductTypes = [];
      state.menuProductTypesLoading = false;
      state.menuProductTypesError = null;
    },

    setMenuTagTypesLoader: state => {
      state.menuTagTypesLoading = true;
      state.menuTagTypesError = null;
    },
    setMenuTagTypesSuccess: (state, action) => {
      state.menuTagTypesLoading = false;
      state.menuTagTypes = action.payload;
    },
    setMenuTagTypesFailure: (state, action) => {
      state.menuTagTypesLoading = false;
      state.menuTagTypesError = action.payload;
    },
    resetMenuTagTypes: state => {
      state.menuTagTypes = [];
      state.menuTagTypesLoading = false;
      state.menuTagTypesError = null;
    },

    setMenuTagValuesLoader: state => {
      state.menuTagValuesLoading = true;
      state.menuTagValuesError = null;
    },
    setMenuTagValuesSuccess: (state, action) => {
      state.menuTagValuesLoading = false;
      state.menuTagValues = action.payload;
    },
    setMenuTagValuesFailure: (state, action) => {
      state.menuTagValuesLoading = false;
      state.menuTagValuesError = action.payload;
    },
    resetMenuTagValues: state => {
      state.menuTagValues = [];
      state.menuTagValuesLoading = false;
      state.menuTagValuesError = null;
    },

    setAddMenuLoader: state => {
      state.addMenuLoading = true;
      state.addMenuError = null;
    },
    setAddMenuSuccess: (state, action) => {
      state.addMenuLoading = false;
      state.addMenu = action.payload;
    },
    setAddMenuFailure: (state, action) => {
      state.addMenuLoading = false;
      state.addMenuError = action.payload;
    },

    setDeleteMenuLoader: state => {
      state.deleteMenuLoading = true;
      state.deleteMenuError = null;
    },
    setDeleteMenuSuccess: (state, action) => {
      state.deleteMenuLoading = false;
      state.deleteMenu = action.payload;
    },
    setDeleteMenuFailure: (state, action) => {
      state.deleteMenuLoading = false;
      state.deleteMenuError = action.payload;
    },

    setSelectDropDownMenu: (state, action) => {
      state.selectDropDownMenu = {
        ...state.selectDropDownMenu,
        ...action.payload,
      };
    },

    setAddMenuDetails: (state, action) => {
      state.addMenuDetails = {...state.addMenuDetails, ...action.payload};
    },

    setMenuStatusEdit: (state, action) => {
      state.menuStatusEdit = action.payload;
    },

    // addMenuDetails_submitOnBoardFormLoader: state => {
    //   state.addMenuDetails_IsSubmitting = true;
    //   state.addMenuDetails_SubmitSuccess = false;
    //   state.addMenuDetails_SubmitError = null;
    //   state.addMenuDetails_SubmitErrorMessage = '';
    // },
    // addMenuDetails_submitOnBoardFormSuccess: (state, action) => {
    //   state.addMenuDetails_IsSubmitting = false;
    //   state.addMenuDetails_SubmitSuccess = true;
    //   state.addMenuDetails_SubmitSuccessMessage = action.payload;
    // },
    // addMenuDetails_submitOnBoardFormFailure: (state, action) => {
    //   state.addMenuDetails_IsSubmitting = false;
    //   state.addMenuDetails_SubmitError = true;
    //   state.addMenuDetails_SubmitErrorMessage = action.payload;
    // },

    // addMenuDetails_submitOnBoard_reset: state => {
    //   state.addMenuDetails_IsSubmitting = false;
    //   state.addMenuDetails_SubmitSuccess = false;
    //   state.addMenuDetails_SubmitError = null;
    //   state.addMenuDetails_SubmitSuccessMessage = '';
    //   state.addMenuDetails_SubmitErrorMessage = '';
    // },

    resetAddMenuDetails: state => {
      state.addMenuDetails = {
        Outlet: '',
        Outlet_name: '',
        ProductName: '',
        ProductType: '',
        ProductType_name: '',
        Price: '',
        Description: '',
        Photo: '',
      };
    },
  },
});

export const {
  setMenuStatusEdit,

  resetOnBoardForm,

  setMenusListLoader,
  setMenusListSuccess,
  setMenusListFailure,

  setMenuProductTypesLoader,
  setMenuProductTypesSuccess,
  setMenuProductTypesFailure,
  resetMenuProductTypes,

  setMenuTagTypesLoader,
  setMenuTagTypesSuccess,
  setMenuTagTypesFailure,
  resetMenuTagTypes,

  setMenuTagValuesLoader,
  setMenuTagValuesSuccess,
  setMenuTagValuesFailure,
  resetMenuTagValues,

  setSelectDropDownMenu,

  setAddMenuDetails,

  resetAddMenuDetails,

  setAddMenuLoader,
  setAddMenuSuccess,
  setAddMenuFailure,

  setDeleteMenuLoader,
  setDeleteMenuSuccess,
  setDeleteMenuFailure,

  // addMenuDetails_submitOnBoardFormLoader,
  // addMenuDetails_submitOnBoardFormSuccess,
  // addMenuDetails_submitOnBoardFormFailure,
  // addMenuDetails_submitOnBoard_reset,
} = catalogueSlice.actions;

export default catalogueSlice.reducer;

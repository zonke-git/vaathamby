import {
  areaAPI,
  decryptedAPI,
  deleteOutletAPI,
  getFacilitys,
  getOutletByIDAPI,
  getOutletsAPI,
  outletCharacteristicsAPI,
  outletCoverPhotoAPI,
  outletDocumentsAPI,
  outletEngagementmodelAPI,
  outletInfoAPI,
  outletTimingAPI,
  provinceAPI,
  subCategorysAPI,
  updateOutletInfoAPI,
} from '../../api/api';
import {
  documentDetails_submitOnBoardFormFailure,
  documentDetails_submitOnBoardFormLoader,
  documentDetails_submitOnBoardFormSuccess,
  engagementModelDetails_submitOnBoardFormFailure,
  engagementModelDetails_submitOnBoardFormLoader,
  engagementModelDetails_submitOnBoardFormSuccess,
  outletCharacteristicsDetails_submitOnBoardFormFailure,
  outletCharacteristicsDetails_submitOnBoardFormLoader,
  outletCharacteristicsDetails_submitOnBoardFormSuccess,
  outletInfoDetails_submitOnBoardFormFailure,
  outletInfoDetails_submitOnBoardFormLoader,
  outletInfoDetails_submitOnBoardFormSuccess,
  photosDetails_submitOnBoardFormFailure,
  photosDetails_submitOnBoardFormLoader,
  photosDetails_submitOnBoardFormSuccess,
  setAreaFailure,
  setAreaLoader,
  setAreaSuccess,
  setDeleteOutletByIdFailure,
  setDeleteOutletByIdLoader,
  setDeleteOutletByIdSuccess,
  setFacilitysFailure,
  setFacilitysLoader,
  setFacilitysSuccess,
  setOutletByIDFailure,
  setOutletByIDLoader,
  setOutletByIDSuccess,
  setOutletsFailure,
  setOutletsLoader,
  setOutletsSuccess,
  setProvinceFailure,
  setProvinceLoader,
  setProvinceSuccess,
  setSubCategoriesFailure,
  setSubCategoriesLoader,
  setSubCategoriesSuccess,
  timingsDetails_submitOnBoardFormFailure,
  timingsDetails_submitOnBoardFormLoader,
  timingsDetails_submitOnBoardFormSuccess,
} from '../slice/outletSlice';

export const decrypted = (payload, token) => async dispatch => {
  try {
    const response = await decryptedAPI(payload, token);
    // console.log('decry pted API Response :', response);
    return response;
  } catch (error) {
    console.log('decry pted API Error :', error);

    throw error;
  }
};

export const fetchSubCategories =
  (token, business_category_id) => async dispatch => {
    try {
      dispatch(setSubCategoriesLoader());
      const response = await subCategorysAPI(token, business_category_id);
      // console.log('Outlet Sub Categories Response :', response);
      dispatch(setSubCategoriesSuccess(response));
      return response;
    } catch (error) {
      dispatch(
        setSubCategoriesFailure(
          error.error || 'Failed to fetch sub categories',
        ),
      );
      throw error;
    }
  };

export const fetchProvince = token => async dispatch => {
  try {
    dispatch(setProvinceLoader());
    const response = await provinceAPI(token);
    // console.log('Outlet Province Response :', response);
    dispatch(setProvinceSuccess(response));
    return response;
  } catch (error) {
    dispatch(setProvinceFailure(error.error || 'Failed to fetch Province'));
    throw error;
  }
};

export const fetchArea =
  (token, limit = 30, page = 1, search) =>
  async dispatch => {
    try {
      dispatch(setAreaLoader());
      const response = await areaAPI(token, limit, page, search);
      // console.log('Outlet Area Response :', response);
      dispatch(setAreaSuccess(response));
      return response;
    } catch (error) {
      dispatch(setAreaFailure(error.error || 'Failed to fetch Area'));
      throw error;
    }
  };

export const fetchFacilitys = (token, outlet_ID) => async dispatch => {
  try {
    dispatch(setFacilitysLoader());
    const response = await getFacilitys(token, outlet_ID);
    // console.log('Facilitys Response :', response);
    dispatch(setFacilitysSuccess(response));
    return response;
  } catch (error) {
    dispatch(setFacilitysFailure(error.error || 'Failed to fetch Facilitys'));
    throw error;
  }
};

export const fetchOutlets = token => async dispatch => {
  try {
    dispatch(setOutletsLoader());
    const response = await getOutletsAPI(token);
    // console.log('Outlets Response :', response);
    dispatch(setOutletsSuccess(response));
    return response;
  } catch (error) {
    dispatch(setOutletsFailure(error.error || 'Failed to fetch Outlets'));
    throw error;
  }
};

export const fetchOutletByID = (token, id) => async dispatch => {
  try {
    dispatch(setOutletByIDLoader());
    const response = await getOutletByIDAPI(token, id);
    // console.log('Outlet By ID Response :', response);
    dispatch(setOutletByIDSuccess(response));
    return response;
  } catch (error) {
    dispatch(
      setOutletByIDFailure(error.error || 'Failed to fetch Outlet By ID'),
    );
    throw error;
  }
};

export const outletInfoDetails_submitOnBoardForm =
  (payload, token, id) => async dispatch => {
    try {
      dispatch(outletInfoDetails_submitOnBoardFormLoader());
      // if (!id) {
      //   throw new Error('Outlet ID is missing');
      // }
      const response = id
        ? await updateOutletInfoAPI(payload, token, id)
        : await outletInfoAPI(payload, token, id);
      // console.log('Outlet Info Details Details Form Response :', response);
      dispatch(
        outletInfoDetails_submitOnBoardFormSuccess(response || 'Success'),
      );
      return response;
    } catch (error) {
      console.error('Outlet Info Details Error:', error);

      // ✅ Correct extraction from API response
      const errorMessages = error?.response?.data?.message || [
        error?.message || 'Submission failed',
      ];

      // ✅ Join into a single string for display/storage
      const formattedError = Array.isArray(errorMessages)
        ? errorMessages.join('. ')
        : errorMessages.toString();

      // Dispatch formatted string to Redux
      dispatch(outletInfoDetails_submitOnBoardFormFailure(formattedError));

      throw error;
    }
  };

export const documentsDetails_submitOnBoardForm =
  (payload, token) => async dispatch => {
    try {
      dispatch(documentDetails_submitOnBoardFormLoader());
      const response = await outletDocumentsAPI(payload, token);
      // console.log('Outlet document Details Details Form Response :', response);
      dispatch(documentDetails_submitOnBoardFormSuccess(response || 'Success'));
      return response;
    } catch (error) {
      console.log('Outlet document Details Details Form Error :', error);
      dispatch(
        documentDetails_submitOnBoardFormFailure(error || 'Submission failed'),
      );
      throw error;
    }
  };

export const outletCharacteristics_Form =
  (payload, token, outlet_ID) => async dispatch => {
    try {
      dispatch(outletCharacteristicsDetails_submitOnBoardFormLoader());
      const response = await outletCharacteristicsAPI(
        payload,
        token,
        outlet_ID,
      );
      // console.log('Outlet Characteristics Form Response :', response);
      dispatch(
        outletCharacteristicsDetails_submitOnBoardFormSuccess(
          response || 'Success',
        ),
      );
      return response;
    } catch (error) {
      console.log('Outlet Characteristics Form Error :', error);
      dispatch(
        outletCharacteristicsDetails_submitOnBoardFormFailure(
          error || 'Submission failed',
        ),
      );
      throw error;
    }
  };

export const outletTiming_Form =
  (payload, token, outlet_ID) => async dispatch => {
    try {
      dispatch(timingsDetails_submitOnBoardFormLoader());
      const response = await outletTimingAPI(payload, token, outlet_ID);
      // console.log('Outlet Timing Form Response :', response);
      dispatch(timingsDetails_submitOnBoardFormSuccess(response || 'Success'));
      return response;
    } catch (error) {
      console.log('Outlet Timing Form Error :', error);
      dispatch(
        timingsDetails_submitOnBoardFormFailure(
          Array.isArray(error?.message)
            ? error.message.join('\n') // join with new lines for readability
            : error?.message || 'Submission failed',
        ),
      );
      throw error;
    }
  };

export const outletCoverPhoto_Form =
  (payload, token, outlet_ID) => async dispatch => {
    try {
      dispatch(photosDetails_submitOnBoardFormLoader());
      const response = await outletCoverPhotoAPI(payload, token, outlet_ID);
      // console.log('Outlet Cover Photo Form Response :', response);
      dispatch(photosDetails_submitOnBoardFormSuccess(response || 'Success'));
      return response;
    } catch (error) {
      console.log('Outlet Cover Photo Form Error :', error);
      dispatch(
        photosDetails_submitOnBoardFormFailure(error || 'Submission failed'),
      );
      throw error;
    }
  };

export const outletEngagementmodel_Form =
  (payload, token, outlet_ID) => async dispatch => {
    try {
      dispatch(engagementModelDetails_submitOnBoardFormLoader());
      const response = await outletEngagementmodelAPI(
        payload,
        token,
        outlet_ID,
      );
      // console.log('Outlet Engagement model Form Response :', response);
      dispatch(
        engagementModelDetails_submitOnBoardFormSuccess(response || 'Success'),
      );
      return response;
    } catch (error) {
      console.log('Outlet Engagement model Form Error :', error);
      dispatch(
        engagementModelDetails_submitOnBoardFormFailure(
          error || 'Submission failed',
        ),
      );
      throw error;
    }
  };

export const deleteOutlet = (payload, token, outlet_ID) => async dispatch => {
  try {
    dispatch(setDeleteOutletByIdLoader());
    const response = await deleteOutletAPI(payload, token, outlet_ID);
    console.log('Delete Outlet Response :', response);
    dispatch(setDeleteOutletByIdSuccess(response || 'Success'));
    return response;
  } catch (error) {
    console.log('Delete Outlet Error :', error);
    dispatch(setDeleteOutletByIdFailure(error || 'Submission failed'));
    throw error;
  }
};

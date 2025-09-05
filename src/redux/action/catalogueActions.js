import {
  addMenuAPI,
  deleteMenuAPI,
  fetchTagTypesAPI,
  fetchTagValuesAPI,
  getMenus,
  menuProductTypesubCategorysAPI,
  updateMenuAPI,
} from '../../api/api';
import {
  setAddMenuFailure,
  setAddMenuLoader,
  setAddMenuSuccess,
  setDeleteMenuFailure,
  setDeleteMenuLoader,
  setDeleteMenuSuccess,
  setMenuProductTypesFailure,
  setMenuProductTypesLoader,
  setMenuProductTypesSuccess,
  setMenusListFailure,
  setMenusListLoader,
  setMenusListSuccess,
  setMenuTagTypesFailure,
  setMenuTagTypesLoader,
  setMenuTagTypesSuccess,
  setMenuTagValuesFailure,
  setMenuTagValuesLoader,
  setMenuTagValuesSuccess,
} from '../slice/catalogueSlice';

export const fetchMenus = (token, outlet_ID, page, limit) => async dispatch => {
  try {
    dispatch(setMenusListLoader());
    const response = await getMenus(token, outlet_ID, page, limit);
    // console.log('Menus List Response :', response);
    dispatch(setMenusListSuccess(response));
    return response;
  } catch (error) {
    console.log('Menus List Error :', error);
    dispatch(
      setMenusListFailure(error.message || 'Failed to fetch Menus List'),
    );
    throw error;
  }
};

export const addUpdateMenu = (payload, token, menuId) => async dispatch => {
  try {
    dispatch(setAddMenuLoader());
    const response = menuId
      ? await updateMenuAPI(payload, token, menuId)
      : await addMenuAPI(payload, token);
    // console.log('Add Menu Response :', response);
    dispatch(setAddMenuSuccess(response));
    return response;
  } catch (error) {
    console.log('Add Menu Error :', error);
    dispatch(setAddMenuFailure(error.message || 'Failed to Add Menu'));
    throw error;
  }
};

export const delete_Menu = (token, menuID) => async dispatch => {
  try {
    dispatch(setDeleteMenuLoader());
    const response = await deleteMenuAPI(token, menuID);
    // console.log('Delete Menu Response :', response);
    dispatch(setDeleteMenuSuccess(response));
    return response;
  } catch (error) {
    console.log('Delete Menu Error :', error);
    dispatch(setDeleteMenuFailure(error.message || 'Failed to Delete Menu'));
    throw error;
  }
};

export const menuProductTypesubCategorys =
  (token, subcategoryId, merchantId) => async dispatch => {
    try {
      dispatch(setMenuProductTypesLoader());
      const response = await menuProductTypesubCategorysAPI(
        token,
        subcategoryId,
        merchantId,
      );
      // console.log('Menu Product Types Response :', response);
      dispatch(setMenuProductTypesSuccess(response));
      return response;
    } catch (error) {
      console.log('Menu Product Types Error :', error);
      dispatch(
        setMenuProductTypesFailure(
          error.message || 'Failed to fetch Menu Product Types',
        ),
      );
      throw error;
    }
  };

export const fetchTagTypes = (token, catelogueId) => async dispatch => {
  try {
    dispatch(setMenuTagTypesLoader());
    const response = await fetchTagTypesAPI(token, catelogueId);
    // console.log('Menu Tag Types Response :', response);
    dispatch(setMenuTagTypesSuccess(response));
    return response;
  } catch (error) {
    console.log('Menu Tag Types Error :', error);
    dispatch(
      setMenuTagTypesFailure(error.message || 'Failed to fetch Menu Tag Types'),
    );
    throw error;
  }
};

export const fetchTagValues = (token, catelogueId) => async dispatch => {
  try {
    dispatch(setMenuTagValuesLoader());
    const response = await fetchTagValuesAPI(token, catelogueId);
    // console.log('Menu Tag Values Response :', response);
    dispatch(setMenuTagValuesSuccess(response));
    return response;
  } catch (error) {
    console.log('Menu Tag Values Error :', error);
    dispatch(
      setMenuTagValuesFailure(
        error.message || 'Failed to fetch Menu Tag Values',
      ),
    );
    throw error;
  }
};

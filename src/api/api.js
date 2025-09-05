import {Url} from './url';
import {get, post, del, put} from './methods';

export const requestOtp = async payload => {
  const url = `${Url.URL_V4}/login`;
  return await post(url, payload);
};

export const resendOtp = async payload => {
  const url = `${Url.URL_V4}/resend/otp`;
  return await post(url, payload);
};

export const verifyOtp = async (payload, token) => {
  const url = `${Url.URL_V4}/otp_verify`;
  return await post(url, payload, token);
};

export const getPrivacyPolicys_API = async token => {
  const url = `${Url.URL_V4}/privacy_policys`;
  return await get(url, '', token);
};

export const getTermsAndConditions_API = async token => {
  const url = `${Url.URL_V4}/terms_and_conditions`;
  return await get(url, '', token);
};

export const getBusinessCategories = async token => {
  // const url = `${Url.URL_V4}/categorys`;
  const url = `${Url.URL_V4}/allcategorys`;
  return await get(url, '', token);
};

export const businessDetailsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/step1`;
  return await post(url, payload, token);
};

export const requestEmailOtpAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/send_email_otp`;
  return await post(url, payload, token);
};

export const emailotp_verifyAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/emailotp_verify`;
  return await post(url, payload, token);
};

export const contactDetailsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/step2`;
  return await post(url, payload, token);
};

export const complianceFinancialDetailsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/step3`;
  return await post(url, payload, token);
};

export const engagementModelDetailsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/step4`;
  return await post(url, payload, token);
};

export const get_annexuresAPI = async (token, annexures_ID) => {
  let url = `${Url.URL_V4}/annexures`;
  if (annexures_ID) {
    url += `/${annexures_ID}`;
  }
  return await get(url, '', token);
};

export const annuxureSubmitAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/annuxure/submit`;
  return await post(url, payload, token);
};

//
//
//
//
//

export const subCategorysAPI = async (token, outlets_ID) => {
  // let url = `${Url.URL_V4}/subCategorys`;
  let url = `${Url.URL_V4}/allsubcategories`;
  if (outlets_ID) {
    url += `?category=${outlets_ID}`;
  }

  // console.log('Sub Categorys API URL ::', url);

  return await get(url, '', token);
};

export const menuProductTypesubCategorysAPI = async (
  token,
  subcategoryId,
  merchantId,
) => {
  // let url = `${Url.URL_V4}/catelogues`;
  let url = `${Url.URL_V4}/allcatelogues`;
  const queryParams = [];
  if (subcategoryId) {
    queryParams.push(`subcategory=${subcategoryId}`);
  }
  if (merchantId) {
    queryParams.push(`merchant=${merchantId}`);
  }
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }
  // console.log('Product Type URL ::', url);

  return await get(url, '', token);
};

export const fetchTagTypesAPI = async (token, catelogueId) => {
  let url = `${Url.URL_V4}/tagtypes`;
  const queryParams = [];
  if (catelogueId) {
    queryParams.push(`catelogue=${catelogueId}`);
  }
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  console.log('Product Tag Types URL ::', url);
  return await get(url, '', token);
};

export const fetchTagValuesAPI = async (token, tagTypeId) => {
  let url = `${Url.URL_V4}/tagvalues`;
  const queryParams = [];
  if (tagTypeId) {
    queryParams.push(`tagtype=${tagTypeId}`);
  }
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }
  console.log('Product Tag Values URL ::', url);
  return await get(url, '', token);
};

export const provinceAPI = async token => {
  const url = `${Url.URL_V4}/states`;
  return await get(url, '', token);
};

export const areaAPI = async (token, limit = 30, page = 1, search) => {
  let url = `${Url.URL_V4}/citys?limit=${limit}&page=${page}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  return await get(url, '', token);
};

//
//
//
//
export const getOutletsAPI = async (token, limit = 10, page = 1) => {
  const url = `${Url.URL_V4}/outlets?limit=${limit}&page=${page}`;
  return await get(url, '', token);
};

export const getOutletByIDAPI = async (token, id) => {
  const url = `${Url.URL_V4}/outlet${id ? '/' + id : ''}`;
  return await get(url, '', token);
};

export const outletInfoAPI = async (payload, token, id) => {
  const url = `${Url.URL_V4}/outlet${id ? '/' + id : ''}`;
  return await post(url, payload, token);
};

export const updateOutletInfoAPI = async (payload, token, id) => {
  const url = `${Url.URL_V4}/outlet${id ? '/' + id : ''}`;
  return await put(url, payload, token);
};

export const outletDocumentsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/outlet/documents/:id`;
  return await put(url, payload, token);
};

export const getFacilitys = async (token, outlet_ID) => {
  const url = `${Url.URL_V4}/facilitys?${
    outlet_ID ? `category=${outlet_ID}` : ''
  }`;

  // console.log('URL ::', url);

  return await get(url, '', token);
};

export const outletCharacteristicsAPI = async (payload, token, outlet_ID) => {
  const url = `${Url.URL_V4}/outlet/characteristics/${outlet_ID}`;
  return await put(url, payload, token);
};

export const outletTimingAPI = async (payload, token, outlet_ID) => {
  const url = `${Url.URL_V4}/outlet/timing/${outlet_ID}`;
  return await put(url, payload, token);
};

export const outletCoverPhotoAPI = async (payload, token, outlet_ID) => {
  const url = `${Url.URL_V4}/outlet/coverPhoto/${outlet_ID}`;
  return await put(url, payload, token);
};

export const outletEngagementmodelAPI = async (payload, token, outlet_ID) => {
  const url = `${Url.URL_V4}/outlet/engagementmodel/${outlet_ID}`;
  return await put(url, payload, token);
};

export const deleteOutletAPI = async (payload, token, outlet_ID) => {
  const url = `${Url.URL_V4}/outlet/${outlet_ID}`;
  return await del(url, payload, token);
};

//
//
//
export const CreateMPIN_API = async (payload, token) => {
  const url = `${Url.URL_V4}/mpin`;
  return await post(url, payload, token);
};

export const VerifyMPIN_API = async (payload, token) => {
  const url = `${Url.URL_V4}/verify/mpin`;
  return await post(url, payload, token);
};

export const ForgotMPIN_API = async payload => {
  const url = `${Url.URL_V4}/forgot/mpin`;
  return await post(url, payload);
};

export const VerifyOTP_MPIN_API = async (payload, token) => {
  const url = `${Url.URL_V4}/verify/otp/mpin`;
  return await post(url, payload, token);
};

export const Resend_MPIN_API = async (payload, token) => {
  const url = `${Url.URL_V4}/resend/otp/mpin`;
  return await post(url, payload, token);
};

//

export const profileBusinessDetailsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/profileBusinessDetails`;
  return await put(url, payload, token);
};

export const profileContactDetailsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/profileContactDetails`;
  return await put(url, payload, token);
};

export const profileFinanceDetailsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/profileFinanceDetails`;
  return await put(url, payload, token);
};

export const profileBankDetailsAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/profileBankDetails`;
  return await post(url, payload, token);
};

//
//
//
//

//
//
//
//
export const fetchGoogleLocation = async (token, params) => {
  const url = `${Url.URL_V4}/googlelocation`;
  return await post(url, params, token);
};

export const getMenus = async (token, outlet_ID, page = 1, limit = 10) => {
  let queryParams = [];

  if (limit) queryParams.push(`limit=${limit}`);
  if (page) queryParams.push(`page=${page}`);
  if (outlet_ID) queryParams.push(`outlet=${outlet_ID}`);

  const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
  const url = `${Url.URL_V4}/menus${queryString}`;
  // const url = `${Url.URL_V4}/allcatelogues${queryString}`;

  return await get(url, '', token);
};

export const addMenuAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/menu`;
  return await post(url, payload, token);
};

export const updateMenuAPI = async (payload, token, menuId) => {
  const url = `${Url.URL_V4}/menu/${menuId}`;
  return await put(url, payload, token);
};

export const deleteMenuAPI = async (token, menuId) => {
  const url = `${Url.URL_V4}/menu/${menuId}`;
  return await del(url, {}, token);
};

//
//
//
//

export const merchantDetailsAPI = async token => {
  const url = `${Url.URL_V4}/merchant`;
  return await get(url, '', token);
};

export const decryptedAPI = async (payload, token) => {
  const url = `${Url.URL_V4}/decrypted`;
  return await post(url, payload, token);
};

export const logoutAPI = async token => {
  const url = `${Url.URL_V4}/logout`;
  return await post(url, {}, token);
};

export const deleteoptionsAPI = async token => {
  const url = `${Url.URL_V4}/deleteoptions`;
  return await get(url, {}, token);
};

export const deleteAccountAPI = async (token, id, payload) => {
  const url = `${Url.URL_V4}/merchant/${id}`;
  return await put(url, payload, token);
};

export const check_build_versionAPI = async (token, payload) => {
  const url = `${Url.URL_V4}/check/build_version`;
  return await post(url, payload, token);
};

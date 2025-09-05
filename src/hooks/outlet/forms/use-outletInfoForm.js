import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  outletInfoDetails_submitOnBoardFormFailure,
  setOutletFormumber,
  setOutletSingleStep,
} from '../../../redux/slice/outletSlice';
import {
  fetchArea,
  fetchProvince,
  fetchSubCategories,
  outletInfoDetails_submitOnBoardForm,
} from '../../../redux/action/outletActions';
import Toast from 'react-native-root-toast';
import {validateSouthAfricanMobile} from '../../../screens/validation/Validation';
import {useNavigation} from '@react-navigation/native';

export const useOutletInfoForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const outletInfoFormValues = useSelector(
    state => state?.outlet?.outletInfoDetails,
  );
  const outletSingleStep = useSelector(
    state => state?.outlet?.outletSingleStep,
  );
  const [openTermsAndConditionModal, setOpenTermsAndConditionModal] =
    useState(false);
  const [contactPersonValidationErrorMsg, setcontactPersonValidationErrorMsg] =
    useState('');
  const [validationErrorMsg, setValidationErrorMsg] = useState('');
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const subCategoriesList = useSelector(
    state => state?.outlet?.subCategories?.SubCategorys,
  );
  const provinceList = useSelector(state => state?.outlet?.province?.States);
  const areaList = useSelector(state => state?.outlet?.area?.Citys);
  const outletInfoDetails_SubmitErrorMessage = useSelector(
    state => state?.outlet?.outletInfoDetails_SubmitErrorMessage,
  );
  const business_category_id = useSelector(
    state =>
      state?.businessProfile?.merchantDetailsdata?.merchant?.business_category
        ?._id,
  );
  // console.log('business_category_id', business_category_id);

  useEffect(() => {
    dispatch(fetchSubCategories(token, business_category_id));
    dispatch(fetchProvince(token));
    dispatch(fetchArea(token));
  }, [business_category_id, dispatch, token]);

  const handleSubmit = async values => {
    // console.log('OutletInfo Details Form submitted values:', values);

    const payload = {
      about: values?.About,
      address: values?.Address,
      area: values?.AreaDetails?._id,
      contactName: values?.ContactPersonFirstName,
      contactNumber: values?.ContactPersonMobile?.mobileNoRaw,
      email: values?.ContactPersonEmail,
      landline: values?.MobileNumber_CustomerToReachOut?.mobileNo,
      lastName: values?.ContactPersonLastName,
      location: values?.OutletLocation,
      lat: values?.lat,
      lng: values?.lng,
      outletName: values?.OutletName,
      province: values?.ProvinceDetails?._id,
      // values?.Province_name,
      subcategory: values?.SubCategories_id,
      type: 'Mobile',
      // subcategory: values?.SubCategories_id?.map(item => item._id),
      // regNo: '1962/000738/06',
      // businessVerify: '684aaab438ce2b6af74bc451',
      // businessName: values?.BusinessName,
    };

    // console.log('Payload :', payload);
    // dispatch(outletInfoDetails_submitOnBoard_reset());
    dispatch(
      outletInfoDetails_submitOnBoardForm(
        payload,
        token,
        outletInfoFormValues?.outlet_id,
      ),
    )
      .then(response => {
        // console.log('Outlet Info Details Response :', response);
        if (response?.success) {
          if (outletSingleStep) {
            dispatch(setOutletFormumber(1));
            dispatch(setOutletSingleStep(false));
            navigation.navigate('OutletList');
          } else {
            dispatch(setOutletFormumber(2));
          }
          // navigation.navigate('outletInfoDetailsVerifiedSuccessfully');
        } else {
          Toast.show(response?.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
          dispatch(
            outletInfoDetails_submitOnBoardFormFailure('Submission failed'),
          );
        }
      })
      .catch(error => {
        // console.error('Outlet Info Details Error :', error?.message);
        // dispatch(
        //   outletInfoDetails_submitOnBoardFormFailure(
        //     error?.message || 'Submission failed',
        //   ),
        // );
        Toast.show(error?.error || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      });
  };

  const isContactPhoneInvalid = () => {
    const code =
      outletInfoFormValues?.ContactPersonMobile?.countrieDetails?.code;
    const phoneNo = outletInfoFormValues?.ContactPersonMobile?.mobileNoRaw;
    if (!phoneNo) return true;
    if (code === 'ZA') return !validateSouthAfricanMobile(phoneNo);
    if (['IN', 'US', 'AU'].includes(code)) return phoneNo.length !== 10;
    if (code === 'AE') return phoneNo.length !== 9;
    return phoneNo.length < 4;
  };

  const isCustomerReachPhoneInvalid = () => {
    const code =
      outletInfoFormValues?.MobileNumber_CustomerToReachOut?.countrieDetails
        ?.code;
    const phoneNo =
      outletInfoFormValues?.MobileNumber_CustomerToReachOut?.mobileNoRaw;
    if (!phoneNo) return true;
    if (code === 'ZA') return !validateSouthAfricanMobile(phoneNo);
    if (['IN', 'US', 'AU'].includes(code)) return phoneNo.length !== 10;
    if (code === 'AE') return phoneNo.length !== 9;
    return phoneNo.length < 4;
  };

  const isPhoneNumberInvalid = () => {
    const code =
      outletInfoFormValues?.ContactPersonMobile?.countrieDetails?.code;
    const phoneNo = outletInfoFormValues?.ContactPersonMobile?.phoneNoRaw;
    const phoneNoLength = phoneNo?.length;

    if (!phoneNo) return true;

    // For South Africa (ZA)
    if (code === 'ZA') {
      return !validateSouthAfricanMobile(phoneNo);
    } else if (['IN', 'US', 'AU'].includes(code)) {
      return phoneNoLength !== 10;
    } else if (code === 'AE') {
      return phoneNoLength !== 9;
    } else {
      return phoneNoLength !== 4;
    }
  };

  return {
    outletInfoDetails_SubmitErrorMessage,
    navigation,
    outletSingleStep,
    handleSubmit,
    dispatch,
    openTermsAndConditionModal,
    setOpenTermsAndConditionModal,
    countryModalVisible,
    setCountryModalVisible,
    outletInfoFormValues,
    subCategoriesList,
    provinceList,
    areaList,
    validationErrorMsg,
    setValidationErrorMsg,
    contactPersonValidationErrorMsg,
    setcontactPersonValidationErrorMsg,
    isPhoneNumberInvalid,

    isContactPhoneInvalid,
    isCustomerReachPhoneInvalid,
  };
};

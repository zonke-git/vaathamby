import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NetworkInfo} from 'react-native-network-info';
import {
  businessDetails_submitOnBoardForm,
  fetchCategories,
  getPublicIPv6,
} from '../../redux/action/onBoardActions';
import {
  businessDetails_submitOnBoard_reset,
  businessDetails_submitOnBoardFormFailure,
  setBusinessDetails,
  setComplianceFinancialDetails,
  setOnBoardFormNumber,
} from '../../redux/slice/onBoardSlice';
import Toast from 'react-native-root-toast';
import {getMerchantDetails} from '../../redux/action/businessProfileActions';

export const useBusinessDetailsForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openCategoryModalVisible, setOpenCategoryModalVisible] =
    useState(false);
  const [openTermsAndConditionModal, setOpenTermsAndConditionModal] =
    useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const loginDetails = useSelector(state => state?.auth?.loginDetails);
  const categoriesList = useSelector(state => state?.onBoard?.categories);
  const businessDetailsFormValues = useSelector(
    state => state?.onBoard?.businessDetails,
  );
  const businessCategory_id = useSelector(
    state => state?.onBoard?.businessDetails?.businessCategory_id,
  );
  const businessDetails_SubmitError = useSelector(
    state => state?.onBoard?.businessDetails_SubmitError,
  );
  const businessDetails_SubmitErrorMessage = useSelector(
    state => state?.onBoard?.businessDetails_SubmitErrorMessage,
  );
  const businessDetails_IsLoader = useSelector(
    state => state?.onBoard?.businessDetails_IsSubmitting,
  );
  const businessDetails_SubmitSuccess = useSelector(
    state => state?.onBoard?.businessDetails_SubmitSuccess,
  );
  const onBoard = useSelector(state => state?.onBoard);
  // console.log('onBoard', onBoard);

  const businessDetails_SubmitSuccessMessage = useSelector(
    state => state?.onBoard?.businessDetails_SubmitSuccessMessage,
  );
  // console.log('businessDetails_SubmitSuccess', businessDetails_SubmitSuccess);

  // console.log(
  //   'businessDetails_SubmitErrorMessage',
  //   businessDetails_SubmitErrorMessage,
  // );

  useEffect(() => {
    dispatch(fetchCategories(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (businessCategory_id) {
      categoriesList?.map((item, index) => {
        if (businessCategory_id === item?.category_id) {
          dispatch(
            setBusinessDetails({
              businessCategory: item,
              businessCategory_name: item.name,
            }),
          );
        }
      });
    }
  }, [businessCategory_id, categoriesList, dispatch]);

  const handleLocationNavigation = () => {
    navigation.navigate('Location');
  };

  const handleBusinessDetailsFormSubmit = async values => {
    // const ipAddress = await NetworkInfo.getIPAddress();
    const ipAddress = await getPublicIPv6();
    // console.log('ipAddress', ipAddress);

    const payload = {
      business_name: values?.businessName || '',
      registration_number: values?.CIPCRegistrationNumber,
      business_category: businessDetailsFormValues?.businessCategory?._id,
      location: values?.businessLocation_name,
      agree: true,
      ipaddress: ipAddress,
      lat: values?.lat,
      lng: values?.lng,
    };
    // console.log('Payload :', payload);
    dispatch(businessDetails_submitOnBoard_reset());
    dispatch(businessDetails_submitOnBoardForm(payload, token))
      .then(response => {
        // console.log('Business Details Response :', response);
        if (response?.success) {
          handleMerchantDetails();
        } else {
          dispatch(
            businessDetails_submitOnBoardFormFailure('Business Details failed'),
          );
        }
        Toast.show(response?.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      })
      .catch(error => {
        console.error('Business Details Error :', error);
      });
  };

  const handleMerchantDetails = () => {
    dispatch(getMerchantDetails(token))
      .then(response => {
        // console.log('Busi Merchant Details Response :', response?.merchant);
        dispatch(
          setComplianceFinancialDetails({
            CIPCRegistrationNumber: response?.merchant?.registration_number,
            TaxNumber: response?.merchant?.company?.TaxNumber,
            registerationCertificate: '',
            taxCertificate: '',
          }),
        );

        dispatch(setOnBoardFormNumber(2));
        navigation.navigate('BusinessDetailsVerifiedSuccessfully');
      })
      .catch(error => {
        console.error('Merchant Details Error :', error);
      });
  };

  return {
    dispatch,
    categoriesList,
    businessDetailsFormValues,
    businessDetails_SubmitError,
    businessDetails_IsLoader,
    businessDetails_SubmitErrorMessage,
    openCategoryModalVisible,
    openTermsAndConditionModal,
    openPrivacyPolicy,

    setOpenCategoryModalVisible,
    handleLocationNavigation,
    setOpenTermsAndConditionModal,
    setOpenPrivacyPolicy,
    handleBusinessDetailsFormSubmit,
  };
};

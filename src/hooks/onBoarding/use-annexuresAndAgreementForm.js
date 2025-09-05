import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setOnBoardFormNumber} from '../../redux/slice/onBoardSlice';
import {useEffect, useState} from 'react';
import {
  annexureList_submitOnBoardForm,
  get_annexures,
} from '../../redux/action/onBoardActions';
import useMerchantDetails from '../../utils/callAPI/useMerchantDetails';
import {fetchOutletByID} from '../../redux/action/outletActions';
import {formatSouthAfricanPhone} from '../../screens/validation/Validation';
import {countries} from '../../components/ContryCode/Countries';
import {
  setEngagementModelDetails,
  setOutletFirstTime,
  setOutletFormumber,
  setOutletInfoDetails,
} from '../../redux/slice/outletSlice';

export const useAnnexuresAndAgreementForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const annexureContent = useSelector(
    state => state?.onBoard?.annexureList?.Annexures,
  );
  const annexureListLoading = useSelector(
    state => state?.onBoard?.annexureListLoading,
  );
  const [termsAndConditionCheckBox, setTermsAndConditionCheckBox] =
    useState(false);
  const [shouldFetchMerchant, setShouldFetchMerchant] = useState(false);

  // ✅ Fetch annexures on mount
  useEffect(() => {
    dispatch(get_annexures(token));
  }, [dispatch, token]);

  // ✅ Call hook only when flag is true
  useMerchantDetails(shouldFetchMerchant ? token : null, merchantData => {
    // console.log('merchantData', merchantData);
    setShouldFetchMerchant(false);

    dispatch(fetchOutletByID(token, merchantData?.outlet[0]))
      .then(res => {
        // console.log('Respose ::', res);
        const physicalLines = [
          merchantData?.company?.PhysicalAddressLine1 ||
            merchantData?.company?.PhysicalAddress?.Line1,
          merchantData?.company?.PhysicalAddressLine2 ||
            merchantData?.company?.PhysicalAddress?.Line2,
          merchantData?.company?.PhysicalAddressLine3 ||
            merchantData?.company?.PhysicalAddress?.Line3,
          merchantData?.company?.PhysicalAddressLine4 ||
            merchantData?.company?.PhysicalAddress?.Line4,
          merchantData?.company?.PhysicalAddressPostCode ||
            merchantData?.company?.PhysicalAddress?.PostCode,
        ];
        const PhysicalAddress =
          merchantData?.location || physicalLines.filter(Boolean).join(', ');
        let updateOutletintoRedux = {
          outlet_id: res?.outlets?._id,
          BusinessName: merchantData?.business_name,
          OutletName: '',
          ContactPersonFirstName: merchantData?.first_name,
          ContactPersonLastName: merchantData?.last_name,
          ContactPersonMobile: {
            mobileNo: formatSouthAfricanPhone(merchantData?.contact_number),
            mobileNoRaw: merchantData?.contact_number,
            countrieDetails: countries[161],
          },
          ContactPersonEmail: merchantData?.email,
          MobileNumber_CustomerToReachOut: {
            mobileNo: '',
            mobileNoRaw: '',
            countrieDetails: countries[161],
          },
          SubCategories_id: '',
          SubCategories: '',
          About: '',
          OutletLocation: merchantData?.location,
          Address: PhysicalAddress,
          ProvinceDetails: '',
          Province_name: '',
          AreaDetails: '',
          Area_name: '',
        };
        const updateEng = {
          CashbackPercentage: merchantData?.scanAndPay?.scanAndPaycashback,
          paymentOptions: merchantData?.scanAndPay?.scanAndPay
            ? 'Scan & Pay (QR Code)'
            : merchantData?.scanAndPay?.scanAndPay,
        };
        // console.log('updateEng', updateEng);

        dispatch(setEngagementModelDetails(updateEng));
        dispatch(setOutletFormumber(1));
        dispatch(setOutletInfoDetails(updateOutletintoRedux));
        dispatch(setOutletFirstTime(true));

        navigation.navigate('Outlet');
      })
      .catch(err => {
        console.error('Error :', err);
      });
  });

  // ✅ Handle form submit
  const handleSubmit = () => {
    dispatch(annexureList_submitOnBoardForm({}, token))
      .then(response => {
        if (response?.success) {
          setShouldFetchMerchant(true); // ✅ Trigger merchant fetch
        }
      })
      .catch(error => {
        console.error('Annexure List Error :', error);
      });
  };

  return {
    handleSubmit,
    annexureContent,
    annexureListLoading,
    termsAndConditionCheckBox,
    setTermsAndConditionCheckBox,
  };
};

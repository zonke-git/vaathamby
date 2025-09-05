import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMerchantDetails} from '../../redux/action/businessProfileActions';
import {fetchCategories} from '../../redux/action/onBoardActions';
import {
  setBankAccountDetails,
  setBusinessProfileActivityDetails,
  setBusinessProfileComplianceFinancialDetails,
  setBusinessProfileEngagementModelDetails,
  setContactAddressDetails,
  setMerchantDetailsFailure,
} from '../../redux/slice/businessProfileSlice';
import {decrypted} from '../../redux/action/outletActions';
import {BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export const useBusinessProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const businessProfileFormNumber = useSelector(
    state => state?.businessProfile?.businessProfileFormNumber,
  );
  const token = useSelector(state => state?.auth?.authTokenInfo);
  // Loaders
  const merchantDetailsLoader = useSelector(
    state => state?.businessProfile?.merchantDetailsLoader,
  );
  const businessProfileAndActivityDetailsLoader = useSelector(
    state => state?.businessProfile?.businessProfileAndActivityDetailsLoader,
  );
  const contactDetailsLoader = useSelector(
    state => state?.businessProfile?.contactDetailsLoader,
  );
  const engagementModelDetailsLoader = useSelector(
    state => state?.onBoard?.engagementModelDetails_IsSubmitting,
  );
  const financeDetailsLoader = useSelector(
    state => state?.businessProfile?.financeDetailsLoader,
  );
  const bankDetailsLoader = useSelector(
    state => state?.businessProfile?.bankDetailsLoader,
  );

  // const categoriesList = useSelector(
  //   state => state?.onBoard?.categories?.Categorys,
  // );

  const merchantDetailsdata = useSelector(
    state => state?.businessProfile?.merchantDetailsdata?.merchant,
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('MainApp', {
          screen: 'MyAccount',
          params: {
            from: 'businessProfile',
          },
        });

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  // useEffect(() => {
  //   dispatch(fetchCategories(token));
  // }, [dispatch, token]);

  useEffect(() => {
    dispatch(getMerchantDetails(token))
      .then(async response => {
        // console.log('Busi Pro Merchant Details Response :', response?.merchant);

        if (response) {
          const physicalLines = [
            response?.merchant?.company?.PhysicalAddressLine1 ||
              response?.merchant?.company?.PhysicalAddress?.Line1,
            response?.merchant?.company?.PhysicalAddressLine2 ||
              response?.merchant?.company?.PhysicalAddress?.Line2,
            response?.merchant?.company?.PhysicalAddressLine3 ||
              response?.merchant?.company?.PhysicalAddress?.Line3,
            response?.merchant?.company?.PhysicalAddressLine4 ||
              response?.merchant?.company?.PhysicalAddress?.Line4,
            response?.merchant?.company?.PhysicalAddressPostCode ||
              response?.merchant?.company?.PhysicalAddress?.PostCode,
          ];

          const PhysicalAddress = physicalLines.filter(Boolean).join(', ');

          const postalLines = [
            response?.merchant?.company?.PostalAddressLine1 ||
              response?.merchant?.company?.PostalAddress?.Line1,
            response?.merchant?.company?.PostalAddressLine2 ||
              response?.merchant?.company?.PostalAddress?.Line2,
            response?.merchant?.company?.PostalAddressLine3 ||
              response?.merchant?.company?.PostalAddress?.Line3,
            response?.merchant?.company?.PostalAddressLine4 ||
              response?.merchant?.company?.PostalAddress?.Line4,
            response?.merchant?.company?.PostalAddressPostCode ||
              response?.merchant?.company?.PostalAddress?.PostCode,
          ];

          const PostalAddress = postalLines.filter(Boolean).join(', ');

          const updatedBusinessProfileDetails = {
            businessName: response?.merchant?.business_name,
            BusinessStartDate: response?.merchant?.company?.BusinessStartDate,
            businessType: response?.merchant?.company?.CompanyType,
            CIPCRegistrationNumber: response?.merchant?.registration_number,
            taxNumber: response?.merchant?.company?.TaxNumber,
            zonkeBusinessCategory: response?.merchant?.province?.name,
            numberOfBranches: '',
            brandNameOfOutlets: '',
            businessLocation: response?.merchant?.location,
            Merchant_ID: response?.merchant?.merchantID,
            Wallet_ID: JSON.stringify(
              response?.merchant?.walletId?.details?.data?.walletId,
            ),
            registeredAddress: PhysicalAddress,
            postaldAddress: PostalAddress,
            CurrentBalance: 'ZAR 0',
            AvailableBalance: 'ZAR 0',
            BusinessCategory: response?.merchant?.business_category?.name,
          };
          // console.log('updatedDetails', updatedBusinessProfileDetails);

          dispatch(
            setBusinessProfileActivityDetails(updatedBusinessProfileDetails),
          );

          const updatedcontactPersonDetails = {
            contactPersonFirstName: response?.merchant?.first_name,
            contactPersonLastName: response?.merchant?.last_name,
            contactPersonDesignation: '',
            department: '',
            contactMobileNumber: response?.merchant?.contact_number,
            contactEmailAddress: response?.merchant?.email,
            websiteURL: response?.merchant?.company?.Website,
            registeredAddress: PhysicalAddress,
            postalCode: '',
            province: response?.merchant?.province?.name,
            postalAddressCheckBox: false,
            postalAddressLines: PostalAddress,
            businessLocation: response?.merchant?.location,
          };

          // console.log(
          //   'updatedcontactPersonDetails',
          //   updatedcontactPersonDetails,
          // );

          dispatch(setContactAddressDetails(updatedcontactPersonDetails));

          const scanAndPay = {
            scan_pay: response?.merchant?.scanAndPay?.scanAndPay,
            payment_link: false,
            paymentlink_cashback_percentage: 10,
            scan_cashback_percentage:
              response?.merchant?.scanAndPay?.scanAndPaycashback,
            platformFeePercentage:
              response?.merchant?.scanAndPay?.platformFeePercentage,
          };
          dispatch(setBusinessProfileEngagementModelDetails(scanAndPay));

          //
          //
          //
          //
          //
          //
          //
          //
          //
          // console.log('response?.merchant', response?.merchant);

          let regBase64 = '';
          let taxBase64 = '';

          const regUrl = response?.merchant?.registerationCertificate?.value;
          const taxUrl = response?.merchant?.taxCertificate?.value;

          if (regUrl) {
            const payload = {url: regUrl};
            const reg = await dispatch(decrypted(payload, token));
            regBase64 = reg?.base64 || '';
            // console.log('reg', regBase64);
          }

          if (taxUrl) {
            const payload2 = {url: taxUrl};
            const tax = await dispatch(decrypted(payload2, token));
            taxBase64 = tax?.base64 || '';
            // console.log('tax', taxBase64);
          }

          const ComplianceAndFinancialsDetails = {
            CIPCRegistrationNumber: response?.merchant?.registration_number,
            registerationCertificate: regBase64,
            taxNumber:
              response?.merchant?.company?.TaxNumber ||
              response?.merchant?.company?.company?.TaxNumber,
            taxCertificate: taxBase64,
          };

          // console.log(
          //   'ComplianceAndFinancialsDetails',
          //   ComplianceAndFinancialsDetails,
          // );

          dispatch(
            setBusinessProfileComplianceFinancialDetails(
              ComplianceAndFinancialsDetails,
            ),
          );

          // console.log('', response?.merchant?.bandetails);
          // const find_bankProvince_Name =
          //   response?.merchant?.bandetails?.bankProvince;
          // const bankProvince = categoriesList.find(
          //   item => item._id === find_bankProvince_Name,
          // );

          // const bankProvince_name =
          //   categoriesList.find(item => item._id === find_bankProvince_Name)
          //     ?.name || '';

          // const find_bankName_Name = response?.merchant?.bandetails?.bankName;
          // const bankName = categoriesList.find(
          //   item => item._id === find_bankName_Name,
          // );
          // const bankName_name =
          //   categoriesList.find(item => item._id === find_bankName_Name)
          //     ?.name || '';

          // console.log('bankProvince_name', bankProvince_name);

          // const updateBankDetails = {
          //   bankProvince: bankProvince,
          //   bankProvince_name: bankProvince_name,
          //   bankName: bankName,
          //   bankName_name: bankName_name,
          //   bankAccountHolderName:
          //     response?.merchant?.bandetails?.bankAccHolderName,
          //   bankAccountNumber: response?.merchant?.bandetails?.accNo,
          //   IBAN_Code: response?.merchant?.bandetails?.ibanCode,
          //   Swift_Code: response?.merchant?.bandetails?.swiftCode,
          // };

          // console.log('updateBankDetails', updateBankDetails);

          // dispatch(setBankAccountDetails(updateBankDetails));
        } else {
          dispatch(setMerchantDetailsFailure('Submission failed'));
        }
      })
      .catch(error => {
        // console.error('Business Details Error :', error);
      });
  }, [dispatch, token]);

  return {
    businessProfileFormNumber,
    merchantDetailsLoader,
    businessProfileAndActivityDetailsLoader,
    contactDetailsLoader,
    engagementModelDetailsLoader,
    financeDetailsLoader,
    bankDetailsLoader,
  };
};

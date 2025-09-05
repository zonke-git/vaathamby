import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import {submitContactDetailsFormFailure} from '../../redux/slice/businessProfileSlice';
import {profileBankDetailsForm} from '../../redux/action/businessProfileActions';

export const useBankAccountDetailsForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const businessProfileBankAccountDetailsFormValues = useSelector(
    state => state?.businessProfile?.businessProfileBankAccountDetails,
  );
  const categoriesList = useSelector(
    state => state?.onBoard?.categories?.Categorys,
  );

  const handleBankAccountDetailsFormSubmit = values => {
    const payload = {
      bankProvince: values.bankProvince._id,
      bankName: values.bankName._id,
      bankAccHolderName: values.bankAccountHolderName,
      accNo: values.bankAccountNumber,
      ibanCode: values.IBAN_Code,
      swiftCode: values.Swift_Code,
    };
    // console.log('Bank Details Form Payload:', payload);
    dispatch(profileBankDetailsForm(payload, token))
      .then(response => {
        // console.log('Bank Details Response :', response);
        if (response?.success) {
          navigation.navigate('MainApp');
          // navigation.navigate('BusinessDetailsVerifiedSuccessfully');
        } else {
          dispatch(submitContactDetailsFormFailure('Submission failed'));
        }
        Toast.show(response?.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      })
      .catch(error => {
        console.error('Bank Details Error :', error);
      });
  };

  return {
    dispatch,
    businessProfileBankAccountDetailsFormValues,
    handleBankAccountDetailsFormSubmit,
    categoriesList,
  };
};

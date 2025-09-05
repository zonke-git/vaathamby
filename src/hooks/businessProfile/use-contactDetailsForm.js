import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  setbusinessProfileFormNumber,
  setbusinessProfileSingleScreen,
  submitContactDetailsFormFailure,
} from '../../redux/slice/businessProfileSlice';
import {
  getMerchantDetails,
  profileContactDetailsForm,
} from '../../redux/action/businessProfileActions';
import {useNavigation} from '@react-navigation/native';

export const useContactDetailsForm = () => {
  const dispatch = useDispatch();
  const loginDetails = useSelector(state => state?.auth?.loginDetails);
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const contactAddressDetailsFormValues = useSelector(
    state => state?.businessProfile?.contactAddressDetails,
  );
  const navigation = useNavigation();
  const businessProfileSingleScreen = useSelector(
    state => state?.businessProfile?.businessProfileSingleScreen,
  );

  const handleContactAddressDetailsFormSubmit = values => {
    const payload = {
      first_name: values.contactPersonFirstName,
      last_name: values.contactPersonLastName,
    };
    // console.log('Contact Details Form Payload:', payload);
    dispatch(profileContactDetailsForm(payload, token))
      .then(response => {
        // console.log('Contact Details Response :', response);

        if (response?.success) {
          if (businessProfileSingleScreen) {
            dispatch(getMerchantDetails(token));
            dispatch(setbusinessProfileSingleScreen(false));
            navigation.navigate('MainApp', {
              screen: 'MyAccount',
              params: {
                from: 'businessProfile',
              },
            });
          } else {
            dispatch(setbusinessProfileFormNumber(3));
          }
        } else {
          Toast.show(response?.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
          dispatch(submitContactDetailsFormFailure('Submission failed'));
        }
      })
      .catch(error => {
        console.error('Contact Details Error :', error);
      });
  };

  const handleCancel = () => {
    navigation.navigate('MainApp', {
      screen: 'MyAccount',
      params: {
        from: 'businessProfile',
      },
    });
  };

  return {
    dispatch,
    loginDetails,
    contactAddressDetailsFormValues,
    businessProfileSingleScreen,
    handleContactAddressDetailsFormSubmit,
    handleCancel,
  };
};

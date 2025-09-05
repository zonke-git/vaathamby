import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {contactDetails_submitOnBoardForm} from '../../redux/action/onBoardActions';
import {contactDetails_submitOnBoardFormFailure} from '../../redux/slice/onBoardSlice';
import Toast from 'react-native-root-toast';
import handleRequestEmail from '../../utils/handleRequestEmail';

export const useContactDetailsForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginDetails = useSelector(state => state?.auth?.loginDetails);
  const contactDetailsFormValues = useSelector(
    state => state?.onBoard?.contactDetails,
  );
  const merchant_details = useSelector(state => state?.auth?.merchant_details);
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const verifyEmail_id = useSelector(
    state => state?.onBoard?.contactDetails?.verifyEmail_id,
  );

  //
  const Email_Loader = useSelector(
    state => state?.onBoard?.contactDetails_RequestEmail_OTP_IsSubmitting,
  );

  const contactDetails_RequestEmail_OTP_SubmitErrorMessage = useSelector(
    state => state?.onBoard?.contactDetails_RequestEmail_OTP_SubmitErrorMessage,
  );

  const contactDetails_SubmitErrorMessage = useSelector(
    state => state?.onBoard?.contactDetails_SubmitErrorMessage,
  );

  const handleContactDetailsFormSubmit = values => {
    // console.log('Contact Details Form submitted:', values);
    const payload = {
      first_name: values?.firstName,
      last_name: values?.lastName,
      email: values?.email,
    };
    // console.log('Contact Details Form Payload:', payload);
    dispatch(contactDetails_submitOnBoardForm(payload, token))
      .then(response => {
        // console.log('Contact Details Response :', response);

        if (response?.success) {
          handleRequestEmailID();
        } else {
          dispatch(
            contactDetails_submitOnBoardFormFailure('Submission failed'),
          );
        }
        Toast.show(response?.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      })
      .catch(error => {
        console.error('Contact Details Error :', error);
      });
  };

  const handleRequestEmailID = values => {
    handleRequestEmail({
      contactDetailsFormValues,
      token,
      dispatch,
      navigation,
    });
  };

  return {
    loginDetails,
    dispatch,
    contactDetailsFormValues,
    handleContactDetailsFormSubmit,
    handleRequestEmailID,
    contactDetails_RequestEmail_OTP_SubmitErrorMessage,
    Email_Loader,
    contactDetails_SubmitErrorMessage,
    verifyEmail_id,
    merchant_details,
  };
};

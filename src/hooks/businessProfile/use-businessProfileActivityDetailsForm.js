import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  setbusinessProfileFormNumber,
  setbusinessProfileSingleScreen,
  submitbusinessProfileAndActivityFormFailure,
} from '../../redux/slice/businessProfileSlice';
import {profileBusinessDetailsForm} from '../../redux/action/businessProfileActions';
import {useNavigation} from '@react-navigation/native';

export const useBusinessProfileActivityDetailsForm = () => {
  const dispatch = useDispatch();
  const businessProfileFormNumber = useSelector(
    state => state?.businessProfile?.businessProfileFormNumber,
  );
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const businessProfileActivityDetails = useSelector(
    state => state?.businessProfile?.businessProfileActivityDetails,
  );
  const navigation = useNavigation();
  const businessProfileSingleScreen = useSelector(
    state => state?.businessProfile?.businessProfileSingleScreen,
  );

  const handleBusinessDetailsFormSubmit = values => {
    const payload = {
      province: '684aabdb169a3afcd0a03243',
    };
    // console.log('Business Profile And Activity Form Payload:', payload);
    dispatch(profileBusinessDetailsForm(payload, token))
      .then(response => {
        // console.log('Business Profile And Activity Response :', response);
        if (response?.success) {
          if (businessProfileSingleScreen) {
            dispatch(setbusinessProfileSingleScreen(false));
            navigation.goBack();
          } else {
            dispatch(setbusinessProfileFormNumber(2));
          }
        } else {
          Toast.show(response?.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
          dispatch(
            submitbusinessProfileAndActivityFormFailure('Submission failed'),
          );
        }
      })
      .catch(error => {
        console.error('Business Profile And Activity Error :', error);
        Toast.show(error?.error || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
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
    businessProfileSingleScreen,
    businessProfileActivityDetails,

    dispatch,
    handleBusinessDetailsFormSubmit,
    handleCancel,
  };
};

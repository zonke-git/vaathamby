import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useOnboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const onBoardFormNumber = useSelector(
    state => state?.onBoard?.onBoardFormNumber,
  );
  const businessDetails_IsLoader = useSelector(
    state => state?.onBoard?.businessDetails_IsSubmitting,
  );

  const RequestEmail_OTP_Loader = useSelector(
    state => state?.onBoard?.contactDetails_RequestEmail_OTP_IsSubmitting,
  );

  //
  const contactDetails_Loader = useSelector(
    state => state?.onBoard?.contactDetails_IsSubmitting,
  );

  const complianceFinancialDetails_Loader = useSelector(
    state => state?.onBoard?.complianceFinancialDetails_IsSubmitting,
  );

  const engagementModelDetails_Loader = useSelector(
    state => state?.onBoard?.engagementModelDetails_IsSubmitting,
  );

  const annexureList_Loader = useSelector(
    state => state?.onBoard?.annexureList_IsSubmitting,
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (onBoardFormNumber > 1) {
          // Go back one step in the form
          // dispatch({
          //   type: 'onBoard/setOnBoardFormNumber',
          //   payload: onBoardFormNumber - 1,
          // });
          return true; // prevent default behavior (exit)
        } else {
          // Optional: Confirm exit
          Alert.alert('Exit', 'Are you sure you want to exit onboarding?', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Yes', onPress: () => navigation.navigate('SignUp')},
          ]);
          return true; // prevent default
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [onBoardFormNumber, navigation]),
  );

  return {
    onBoardFormNumber,
    dispatch,
    businessDetails_IsLoader,
    RequestEmail_OTP_Loader,
    contactDetails_Loader,
    complianceFinancialDetails_Loader,
    engagementModelDetails_Loader,
    annexureList_Loader,
  };
};

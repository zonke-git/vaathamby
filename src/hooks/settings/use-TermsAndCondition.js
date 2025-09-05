import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTermsAndConditions} from '../../redux/action/onBoardActions';

export const useTermsAndCondition = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const {termsAndConditions, termsAndConditionsLoading} = useSelector(
    state => state?.onBoard,
  );

  useEffect(() => {
    dispatch(getTermsAndConditions(token));
  }, [dispatch, token]);

  const handleNavigation = () => {
    navigation.navigate('MainApp', {
      screen: 'MyAccount',
    });
  };

  return {
    width,
    termsAndConditions,
    termsAndConditionsLoading,
    handleNavigation,
  };
};

import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getPrivacyPolicys} from '../../redux/action/onBoardActions';

export const usePrivacyPolicy = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const {privacyPolicys, privacyPolicysLoading} = useSelector(
    state => state?.onBoard,
  );

  useEffect(() => {
    dispatch(getPrivacyPolicys(token));
  }, [dispatch, token]);

  const handleNavigation = () => {
    navigation.navigate('MainApp', {
      screen: 'MyAccount',
    });
  };

  return {
    width,
    privacyPolicys,
    privacyPolicysLoading,
    handleNavigation,
  };
};

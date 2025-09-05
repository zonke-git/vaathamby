import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';
import {
  setbusinessProfileFormNumber,
  setMerchantDetailsFailure,
} from '../../redux/slice/businessProfileSlice';
import {getMerchantDetails} from '../../redux/action/businessProfileActions';
import {setSelectDropDownMenu} from '../../redux/slice/catalogueSlice';
import {checkAppVersion} from '../../utils/versionChecker';

export const useHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const merchantDetailsLoader = useSelector(
    state => state?.businessProfile?.merchantDetailsLoader,
  );

  useEffect(() => {
    checkAppVersion(token);
  }, [token]);

  useEffect(() => {
    dispatch(getMerchantDetails(token))
      .then(res => {
        const merchant = res?.merchant;
        if (!merchant) {
          dispatch(setMerchantDetailsFailure('Submission failed'));
          return;
        }
        // console.log('merchant', merchant);
        // if (merchant?.outlet?.length === 0) {
        //   navigation.navigate('OutletList');
        // }
      })
      .catch(() => {
        dispatch(setMerchantDetailsFailure('Failed to fetch merchant details'));
      });
  }, [dispatch, navigation, token]);

  const handleMenuSelection = item => {
    if (item?.navigation) {
      dispatch(setbusinessProfileFormNumber(1));
      navigation.navigate(item?.navigation);
      dispatch(
        setSelectDropDownMenu({
          selectedMenuList: '',
          selectedMenuList_name: '',
        }),
      );
    } else {
      Toast.show('Coming Soon', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  };
  return {handleMenuSelection, merchantDetailsLoader};
};

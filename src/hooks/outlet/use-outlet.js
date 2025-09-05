import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../../redux/action/onBoardActions';
import {BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  setOutletFirstTime,
  setOutletFormumber,
} from '../../redux/slice/outletSlice';

export const useOutlet = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const outletFormumber = useSelector(state => state?.outlet?.outletFormumber);
  const outletInfoDetails_IsLoader = useSelector(
    state => state?.outlet?.outletInfoDetails_IsSubmitting,
  );
  const documentDetails_IsLoader = useSelector(
    state => state?.outlet?.documentDetails_IsSubmitting,
  );
  const outletCharacteristicsDetails_IsLoader = useSelector(
    state => state?.outlet?.outletCharacteristicsDetails_IsSubmitting,
  );
  const timingsDetails_IsLoader = useSelector(
    state => state?.outlet?.timingsDetails_IsSubmitting,
  );
  const engagementModelDetails_IsLoader = useSelector(
    state => state?.outlet?.engagementModelDetails_IsSubmitting,
  );
  const photosDetails_IsLoader = useSelector(
    state => state?.outlet?.photosDetails_IsSubmitting,
  );
  const subCategoriesLoading = useSelector(
    state => state?.outlet?.subCategoriesLoading,
  );
  const IsFacilitysLoader = useSelector(
    state => state?.outlet?.facilitysLoading,
  );
  const outletFormStatusEdit = useSelector(
    state => state?.outlet?.outletFormStatusEdit,
  );
  const outletSingleStep = useSelector(
    state => state?.outlet?.outletSingleStep,
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (outletSingleStep) {
          navigation.navigate('OutletList');
        } else {
          if (outletFormumber > 1) {
            dispatch(setOutletFormumber(outletFormumber - 1));
            return true;
          } else {
            navigation.navigate('OutletList');
          }
        }
        dispatch(setOutletFirstTime(false));
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [dispatch, navigation, outletFormumber, outletSingleStep]),
  );

  const backButtonFunction = () => {
    dispatch(setOutletFirstTime(false));
    navigation.navigate('OutletList');
    // navigation.navigate('MainApp', {
    //   screen: 'OutletList',
    // });
  };

  useEffect(() => {
    dispatch(fetchCategories(token));
  }, [dispatch, token]);

  return {
    outletFormumber,
    subCategoriesLoading,
    outletInfoDetails_IsLoader,
    documentDetails_IsLoader,
    engagementModelDetails_IsLoader,
    photosDetails_IsLoader,
    outletCharacteristicsDetails_IsLoader,
    timingsDetails_IsLoader,
    IsFacilitysLoader,
    outletFormStatusEdit,
    backButtonFunction,
    dispatch,
  };
};

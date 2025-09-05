import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BackHandler} from 'react-native';
import {fetchArea} from '../../redux/action/outletActions';
import {areaAPI} from '../../api/api';
import {
  setAreaFailure,
  setAreaSuccess,
  setOutletInfoDetails,
} from '../../redux/slice/outletSlice';

export const useCities = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const areaList = useSelector(state => state?.outlet?.area);
  const areaLoading = useSelector(state => state?.outlet?.areaLoading);
  const OutletArea_name = useSelector(
    state => state?.outlet?.outletInfoDetails?.Area_name,
  );
  const [searchValue, setSearchValue] = useState(OutletArea_name);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  useEffect(() => {
    dispatch(fetchArea(token));
  }, [dispatch, token]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearch(searchValue); // triggers API call
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounce); // cleanup on change
  }, [searchValue]);

  useEffect(() => {
    if (debouncedSearch !== '') {
      searchAreaAPI(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const searchAreaAPI = async query => {
    try {
      dispatch(fetchArea(token, 30, 1, query));
      // dispatch(setAreaLoader());
      // const response = await areaAPI(token, 30, 1, query);
      // dispatch(setAreaSuccess(response));
    } catch (error) {
      dispatch(setAreaFailure(error.message || 'Failed to fetch more areas'));
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleNavigation = item => {
    dispatch(
      setOutletInfoDetails({
        AreaDetails: item,
        Area_name: item.name,
      }),
    );
    navigation.navigate('Outlet');
  };

  const handleSearchLocationTick = () => {
    navigation.navigate('Outlet');
  };

  const loadMore = async () => {
    if (
      isLoadingMore ||
      areaList?.currentPage >= areaList?.totalPages ||
      !canLoadMore
    ) {
      return;
    }

    setIsLoadingMore(true);
    try {
      const response = await areaAPI(
        token,
        10,
        areaList?.currentPage + 1,
        searchValue,
      );
      const updatedData = {
        ...response,
        Citys: [...(areaList?.Citys || []), ...(response.Citys || [])],
      };

      dispatch(setAreaSuccess(updatedData));
      setCanLoadMore(response.currentPage < response.totalPages);
    } catch (error) {
      dispatch(setAreaFailure(error.message || 'Failed to fetch more areas'));
    } finally {
      setIsLoadingMore(false);
    }
  };

  return {
    searchValue,
    areaList,
    canLoadMore,
    areaLoading,

    setSearchValue,
    handleNavigation,
    dispatch,
    handleSearchLocationTick,
    loadMore,
    setCanLoadMore,
    isLoadingMore, // optional
    searchAreaAPI,
  };
};

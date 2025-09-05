import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setBusinessDetails} from '../../redux/slice/onBoardSlice';
import {BackHandler, PermissionsAndroid, Platform} from 'react-native';
import Toast from 'react-native-root-toast';
import Geolocation from '@react-native-community/geolocation';
import {
  setOutletInfoDetails,
  setOutletInfoDetailsLocationStatus,
} from '../../redux/slice/outletSlice';

export const useLocation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const businessLocation_name = useSelector(
    state => state?.onBoard?.businessDetails?.businessLocation_name,
  );
  const outletInfoDetailsLocationStatus = useSelector(
    state => state?.outlet?.outletInfoDetailsLocationStatus,
  );
  const OutletLocation = useSelector(
    state => state?.outlet?.outletInfoDetails?.OutletLocation,
  );
  const [searchValue, setSearchValue] = useState(
    outletInfoDetailsLocationStatus
      ? OutletLocation || ''
      : businessLocation_name || '',
  );

const [isCategoryList, setIsCategoryList] = useState([
    {name: 'Cape Town', lat: -33.9249, lng: 18.4241},
    {name: 'Johannesburg', lat: -26.2041, lng: 28.0473},
    {name: 'Gqeberha', lat: -33.9608, lng: 25.6022},
    {name: 'Durban', lat: -29.8587, lng: 31.0218},
    {name: 'Pretoria', lat: -25.7479, lng: 28.2293},
    {name: 'Bloemfontein', lat: -29.0852, lng: 26.1596},
    {name: 'East London', lat: -33.0292, lng: 27.8546},
    {name: 'Knysna', lat: -34.0351, lng: 23.0465},
    {name: 'Mbombela', lat: -25.4658, lng: 30.9855},
    {name: 'Plettenberg Bay', lat: -34.0526, lng: 23.3716},
]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // navigation.navigate('Onboard');
        navigation.goBack();
        return true; // prevent default behavior (e.g., exiting the app)
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  const handleNavigation = async values => {

    if (outletInfoDetailsLocationStatus) {
      dispatch(
        setOutletInfoDetails({
          OutletLocation_id: values?.name,
          OutletLocation: values?.name,
          Address: values?.name,
          lat: values?.lat,
          lng: values?.lng,
        }), 
      );
      dispatch(setOutletInfoDetailsLocationStatus(false));
      navigation.navigate('Outlet');
    } else {
      dispatch(
        setBusinessDetails({
          businessLocation: values?.name,
          businessLocation_name: values?.name,
          lat: values?.lat,
          lng: values?.lng,
        }),
      );
      await navigation.navigate('Onboard');
    }
  };

  const handleSearchLocationTick = async values => {
    if (outletInfoDetailsLocationStatus) {
      dispatch(setOutletInfoDetailsLocationStatus(false));
      navigation.navigate('Outlet');
    } else {
      navigation.navigate('Onboard');
    }
  };


  const handleCurrentLocationNavigation = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('LocationMap');
      } else {
        Toast.show('Location permission denied', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }
    } catch (err) {
      console.warn('Permission request error: ' + err.message);
    }
  } else {
    // ✅ iOS
    try {
      Geolocation.requestAuthorization(); // triggers system popup (doesn't return anything)

      Geolocation.getCurrentPosition(
        position => {
          navigation.navigate('LocationMap', {
            currentLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        },
        error => {
          console.warn('Location error:', error);

          let errorMessage = 'Failed to get location';
          if (error.code === 1) {
            errorMessage = 'Location permission denied';
          } else if (error.code === 2) {
            errorMessage = 'Location unavailable';
          } else if (error.code === 3) {
            errorMessage = 'Location request timed out';
          }

          Toast.show(errorMessage, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      console.warn('Location permission error: ' + err.message);
    }
  }
};


  return {
    searchValue,
    isCategoryList,
    outletInfoDetailsLocationStatus,

    setSearchValue,
    handleNavigation,
    handleCurrentLocationNavigation,
    dispatch,
    handleSearchLocationTick,
  };
};

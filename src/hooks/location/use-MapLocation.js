import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setBusinessDetails} from '../../redux/slice/onBoardSlice';
import {
  Alert,
  AppState,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {getAvailableLocationProviders} from 'react-native-device-info';
import {
  setOutletInfoDetails,
  setOutletInfoDetailsLocationStatus,
} from '../../redux/slice/outletSlice';

export const useMapLocation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);
  const [location, setLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState(null);
  const [error, setError] = useState(null);
  const [showGpsPrompt, setShowGpsPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationAddress, setSelectedLocationAddress] = useState(null);
  const [fetchingAddress, setFetchingAddress] = useState(false);
  const mapRef = useRef(null);
  const isMounted = useRef(true);
  const outletInfoDetailsLocationStatus = useSelector(
    state => state?.outlet?.outletInfoDetailsLocationStatus,
  );

  // Google Maps API Key
  const GOOGLE_API_KEY = 'AIzaSyCE4n2FNNx1tUYVwsLwnqbCkwoygOetgQA';

  // Check GPS status using getAvailableLocationProviders
  const checkGpsStatus = async () => {
    try {
      const providers = await getAvailableLocationProviders();
      const isGpsAvailable = providers.gps || providers.network;
      return isGpsAvailable;
    } catch (error) {
      console.log('Error checking location providers:', error);
      return false;
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        getLocation();
      }
      setAppState(nextAppState);
    });

    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  const hasLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');
      return status === 'granted';
    }

    // Android handling
    if (Platform.Version < 23) return true;

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return status === PermissionsAndroid.RESULTS.GRANTED;
    
  } catch (error) {
    console.error('Location permission error:', error);
    return false;
  }
};

  const getLocation = useCallback(async () => {
    try {
      const gpsAvailable = await checkGpsStatus();
      if (!gpsAvailable) {
        setError('Location services are disabled');
        setShowGpsPrompt(true);
        return;
      }

      setLoading(true);
      setError(null);

      const hasPermission = await hasLocationPermission();
      if (!hasPermission) {
        setError('Location permission denied');
        Alert.alert(
          'Permission Required',
          'Please enable location permissions in settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openLocationSettings},
          ],
        );
        return;
      }

      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          resolve,
          error => {
            console.log('High accuracy failed, trying lower accuracy:', error);
            Geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 15000,
              maximumAge: 10000,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        );
      });

      const {latitude, longitude} = position.coords;
      const loc = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      const addressData = await fetchAddress(latitude, longitude);
      if (!isMounted.current) return;

      setLocation(loc);
      setLocationAddress(addressData);
      setSelectedLocation(loc);
      setSelectedLocationAddress(addressData);

      if (mapRef.current) {
        mapRef.current.animateToRegion(loc, 1000);
      }
    } catch (error) {
      console.log('Location error:', error);
      if (!isMounted.current) return;

      setError('Unable to get current location');
      if (error.code === 2) {
        setShowGpsPrompt(true);
      }

      // Fallback to default location
      setLocation({
        latitude: -30.5595,
        longitude: 22.9375,
        latitudeDelta: 5,
        longitudeDelta: 5,
      });
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  // Unified address fetching function
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
      );
      const data = await response.json();

      if (data.status !== 'OK' || !data.results.length) {
        console.log('Geocoding error:', data.status);
        return {city: 'Unknown', address: 'Address unavailable'};
      }

      const result = data.results[0];
      const components = result.address_components || [];

      const city =
        components.find(c => c.types?.includes('locality'))?.long_name ||
        components.find(c => c.types?.includes('administrative_area_level_2'))
          ?.long_name ||
        'Unknown City';

      return {
        city,
        address: result.formatted_address || 'Address unavailable',
      };
    } catch (error) {
      console.log('Geocoding failed:', error);
      return {city: 'Unknown', address: 'Address unavailable'};
    }
  };

  // Debounced map press handler
  const handleMapPress = async e => {
    const {coordinate} = e.nativeEvent;
    setSelectedLocation(coordinate);
    setFetchingAddress(true);

    const addressData = await fetchAddress(
      coordinate.latitude,
      coordinate.longitude,
    );
    if (!isMounted.current) return;

    setSelectedLocationAddress(addressData);
    setFetchingAddress(false);
  };

  const handleSelect = async () => {
    if (!selectedLocation) {
      Alert.alert(
        'No Location Selected',
        'Please tap on the map to select a location',
      );
      return;
    }

    const addressData = await fetchAddress(
      selectedLocation.latitude,
      selectedLocation.longitude,
    );

    if (!isMounted.current) return;

    setSelectedLocationAddress(addressData);
    if (outletInfoDetailsLocationStatus) {
      dispatch(
        setOutletInfoDetails({
          OutletLocation_id: selectedLocation,
          OutletLocation: addressData.city,
          Address: addressData.city,
        }),
      );
      dispatch(setOutletInfoDetailsLocationStatus(false));
      navigation.navigate('Outlet');
    } else {
      dispatch(
        setBusinessDetails({
          businessLocation: selectedLocation,
          businessLocation_name: addressData.city,
        }),
      );
      navigation.navigate('Onboard');
    }
  };

  const showEnableGpsDialog = () => {
    Alert.alert(
      'Enable Location Services',
      'Please enable GPS for accurate location detection',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open Settings', onPress: openLocationSettings},
      ],
    );
  };

  const openLocationSettings = () => {
    if (Platform.OS === 'android') {
      Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
    } else {
      Linking.openURL('App-Prefs:Privacy&path=LOCATION');
    }
  };

  return {
    mapRef,
    fetchingAddress,
    selectedLocationAddress,
    locationAddress,
    location,
    selectedLocation,
    loading,
    error,
    showGpsPrompt,

    showEnableGpsDialog,
    handleMapPress,
    handleSelect,
  };
};

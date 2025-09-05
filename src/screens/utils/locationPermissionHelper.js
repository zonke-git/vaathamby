// locationPermissionHelper.js
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

/**
 * Request location permission and handle different scenarios.
 * @param {Function} onPermissionGranted - Callback when permission is granted
 */
export const requestLocationPermission = async onPermissionGranted => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to show your current position on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        onPermissionGranted();
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Required',
          'You have permanently denied location permission. Please enable it from app settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      } else {
        Alert.alert('Permission Denied', 'Location permission is required.');
      }
    } catch (err) {
      console.warn('Location Permission Error:', err);
    }
  } else {
    onPermissionGranted(); // iOS automatically handles permissions
  }
};

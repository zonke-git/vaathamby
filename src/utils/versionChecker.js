import {Alert, Platform, Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {check_build_versionAPI} from '../api/api';

export const checkAppVersion = async token => {
  try {
    const payload = {
      version: DeviceInfo.getVersion(),
      type: Platform.OS,
    };

    // console.log('payload', payload);

    const response = await check_build_versionAPI(token, payload);
    console.log('response', response);

    if (response?.mandatoryUpdate) {
      Alert.alert(
        'Update Required',
        'A new version of the app is available. Please update to continue.',
        [
          {
            text: 'Update Now',
            onPress: () => {
              const playStoreUrl =
                'https://play.google.com/store/apps/details?id=com.zonke&pli=1';
              Linking.openURL(playStoreUrl);
            },
          },
        ],
        {cancelable: false},
      );
    } else if (response?.optionalUpdate) {
      Alert.alert(
        'Update Available',
        'A new version of the app is available. Please consider updating for the best experience.',
        [
          {text: 'Later', style: 'cancel'},
          {
            text: 'Update Now',
            onPress: () => {
              const playStoreUrl =
                'https://play.google.com/store/apps/details?id=com.yourapp';
              Linking.openURL(playStoreUrl);
            },
          },
        ],
      );
    }
  } catch (e) {
    console.warn('Version check failed', e);
  }
};

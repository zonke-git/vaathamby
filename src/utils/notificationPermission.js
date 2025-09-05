// notificationPermission.js
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Notification permission granted:', authStatus);
    const fcmToken = await messaging().getToken();
    // console.log('FCM Token:', fcmToken);
    return fcmToken; // return the token so caller can use it
  } else {
    console.log('Notification permission denied');
    return null;
  }
}

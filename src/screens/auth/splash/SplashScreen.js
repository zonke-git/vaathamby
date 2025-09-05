import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [playAnimation, setPlayAnimation] = useState(true);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       StatusBar.setHidden(true, 'none'); // Hide status bar

  //       const token = await requestUserPermission();
  //       if (token) {
  //         console.log('FCM token:', token);
  //       }

  //       messaging().onMessage(remoteMessage => {
  //         console.log('Foreground notification:', remoteMessage);
  //       });

  //       const opened = await messaging().getInitialNotification();
  //       if (opened) {
  //         console.log('App opened from quit state via notification:', opened);
  //       }

  //       setPlayAnimation(true); // Start animation
  //     } catch (error) {
  //       console.error('Error during splash setup:', error);
  //       setPlayAnimation(true);
  //     }
  //   };

  //   init();

  //   return () => {
  //     StatusBar.setHidden(false, 'slide'); // Restore status bar
  //   };
  // }, []);

  const handleAnimationFinish = () => {
    navigation.replace('Welcome');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {playAnimation && (
        <LottieView
          source={require('./splash_animation.json')}
          autoPlay
          loop={false}
          onAnimationFinish={handleAnimationFinish}
          style={StyleSheet.absoluteFillObject} // Fullscreen animation
          resizeMode="cover"
          onAnimationFailure={error => console.error('Lottie error:', error)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default SplashScreen;

import 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {RootSiblingParent} from 'react-native-root-siblings';
import FullScreenLoader from './components/Loader/FullScreenLoader';
import AppNavigator from './navigation/AppNavigator';
import {getMPIN} from './utils/authStorage';

const App = () => {
  const [initialScreen, setInitialScreen] = useState(null);

  useEffect(() => {
    let didSet = false;

    const checkInitialScreen = async () => {
      try {
        const [hasLaunched, mpin] = await Promise.all([
          AsyncStorage.getItem('hasLaunched'),
          getMPIN(),
        ]);

        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setInitialScreen('SplashScreen');
        } else if (mpin) {
          setInitialScreen('MpinLogIn');
        } else {
          setInitialScreen('LogIn');
        }

        didSet = true;
      } catch (err) {
        console.error('Launch check failed:', err);
        setInitialScreen('LogIn');
        didSet = true;
      }
    };

    checkInitialScreen();

    const fallbackTimeout = setTimeout(() => {
      if (!didSet && !initialScreen) {
        console.warn('Fallback triggered. Setting screen to LogIn');
        setInitialScreen('LogIn');
      }
    }, 1000);

    return () => clearTimeout(fallbackTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootSiblingParent>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {initialScreen ? (
        <Provider store={store}>
          <NavigationContainer>
            <AppNavigator initialRouteName={initialScreen} />
          </NavigationContainer>
        </Provider>
      ) : (
        <FullScreenLoader />
      )}
    </RootSiblingParent>
  );
};

export default App;

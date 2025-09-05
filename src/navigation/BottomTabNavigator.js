/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dashboard, Home, MyAccount} from '../screens';
import colors from '../Theme/colors';
import {BackHandler, Image, ToastAndroid} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // You can also show toast: "Press again to exit"
        ToastAndroid.show(
          'Back is disabled on this screen',
          ToastAndroid.SHORT,
        );
        return true; // Returning true disables default back action
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <Tab.Navigator
      initialRouteName="Home" // Set Home as the default tab
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.appTheme, // Use your theme color
        tabBarInactiveTintColor: colors.DimGray, // Use your theme color
        tabBarStyle: {
          backgroundColor: colors.white, // Optional: set tab bar background
          borderTopWidth: 0, // Optional: remove top border
          elevation: 8, // Optional: add shadow (Android)
          shadowOpacity: 0.1, // Optional: add shadow (iOS)
          // height: 60,
          paddingBottom: 0,
        },
        tabBarIcon: ({focused, tabcolor, size}) => {
          let icon;

          switch (route.name) {
            case 'Home':
              icon = require('../assets/images/bottomTab/home.png');
              break;
            case 'Dashboard':
              icon = require('../assets/images/bottomTab/dashboard.png');
              break;
            case 'MyAccount':
              icon = require('../assets/images/bottomTab/profile.png');
              break;
            default:
              icon = require('../assets/images/bottomTab/home.png');
          }

          return (
            <Image
              source={icon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? colors.appTheme : colors.DimGray,
              }}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12, // Customize label font size
          marginBottom: 4, // Adjust label position
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{title: 'Home'}} // Customize tab label
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: 'Dashboard'}}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{title: 'Account'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

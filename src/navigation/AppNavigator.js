import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import {
  AddProduct,
  BusinessDetailsVerifiedSuccessfully,
  BusinessProfile,
  ImageViewerScreen,
  Location,
  LocationMap,
  LogIn,
  CatalogueList,
  Mpin,
  MpinCreatedSuccessfully,
  MpinLogin,
  Onboard,
  OTP,
  Outlet,
  OutletList,
  PdfViewerScreen,
  PrivacyPolicy,
  SignUp,
  SplashScreen,
  TermsAndCondition,
  WalletCreatedSuccessfully,
  Welcome,
  Cities,
  DeleteAccount,
  ForgotMPIN,
  ForgotMpinOtpScreen,
} from '../screens';

const Stack = createStackNavigator();

const AppNavigator = ({initialRouteName}) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({route}) => ({
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="LocationMap" component={LocationMap} />
      <Stack.Screen name="MpinLogIn" component={MpinLogin} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen
        name="WalletCreatedSuccessfully"
        component={WalletCreatedSuccessfully}
      />
      <Stack.Screen name="BusinessProfile" component={BusinessProfile} />
      <Stack.Screen
        name="BusinessDetailsVerifiedSuccessfully"
        component={BusinessDetailsVerifiedSuccessfully}
      />
      <Stack.Screen name="Mpin" component={Mpin} />
      <Stack.Screen name="ForgotMPIN" component={ForgotMPIN} />
      <Stack.Screen
        name="ForgotMpinOtpScreen"
        component={ForgotMpinOtpScreen}
      />
      <Stack.Screen
        name="MpinCreatedSuccessfully"
        component={MpinCreatedSuccessfully}
      />
      <Stack.Screen name="OutletList" component={OutletList} />
      <Stack.Screen name="Outlet" component={Outlet} />
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen name="CatalogueList" component={CatalogueList} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
      <Stack.Screen name="PdfViewerScreen" component={PdfViewerScreen} />
      <Stack.Screen name="ImageViewerScreen" component={ImageViewerScreen} />
      <Stack.Screen name="Cities" component={Cities} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

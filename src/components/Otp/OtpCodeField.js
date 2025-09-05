import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
// import {addListener, getHash, removeListener} from 'react-native-otp-verify';

function OtpCodeField({
  value,
  setValue,
  invalidOtp,
  CUSTOM_CELL_COUNT,
  showValues = true,
  customInputStyle,
  OTP_textColor,
  spacebetween = {marginHorizontal: 14},
  autoFocus = true,
  shouldAutoFocus = false,
  askPermissionForSMSread = false,
}) {
  const CELL_COUNT = CUSTOM_CELL_COUNT ?? 6;
  const codeFieldRef = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [hash, setHash] = useState(null);
  const listenerRef = useRef(null);

  // // Request SMS permission for Android
  // const requestSMSPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_SMS,
  //         {
  //           title: 'SMS Permission',
  //           message: 'This app needs access to your SMS to autofill OTP',
  //           buttonPositive: 'OK',
  //         }
  //       );
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn('Permission error:', err);
  //       return false;
  //     }
  //   }
  //   return true; // iOS doesn't need this permission
  // };

  // // Improved OTP extraction
  // const extractOtp = (message) => {
  //   try {
  //     // Try different OTP patterns
  //     const patterns = [
  //       /\b\d{6}\b/, // Standard 6-digit OTP
  //       /(\d{6})/, // Any 6 consecutive digits
  //       /code[ :](\d{6})/i, // "Code: 123456"
  //       /otp[ :](\d{6})/i, // "OTP: 123456"
  //       /is[ :](\d{6})/i, // "Your OTP is 123456"
  //     ];

  //     for (const pattern of patterns) {
  //       const match = message.match(pattern);
  //       if (match && match[1]) {
  //         const otp = match[1];
  //         console.log('Extracted OTP:', otp);
  //         setValue(otp);
  //         return;
  //       }
  //     }
  //     console.log('No OTP found in message:', message);
  //   } catch (error) {
  //     console.error('Error extracting OTP:', error);
  //   }
  // };

  // // Setup OTP listener
  // const setupOtpListener = async () => {
  //   try {
  //     // 1. Request permissions first
  //     const hasPermission = await requestSMSPermission();
  //     if (!hasPermission) {
  //       console.log('SMS permission denied');
  //       return;
  //     }

  //     // 2. Get app hash (important for SMS retriever API)
  //     const appHash = await getHash();
  //     console.log('App Hash:', appHash);
  //     setHash(appHash);

  //     // 3. Add listener
  //     listenerRef.current = addListener((message) => {
  //       console.log('Received OTP message:', message);
  //       extractOtp(message);
  //     });

  //     console.log('OTP listener successfully set up');
  //   } catch (error) {
  //     console.error('Failed to setup OTP listener:', error);
  //   }
  // };

  // useEffect(() => {
  //   setupOtpListener();

  //   return () => {
  //     if (listenerRef.current) {
  //       removeListener();
  //       listenerRef.current = null;
  //     }
  //   };
  // }, []);

  // Rest of your existing code remains the same...
  // [Keep all your existing useEffects, renderCell, and return statement]

  // Use useEffect to focus the CodeField when shouldAutoFocus changes
  useEffect(() => {
    if (shouldAutoFocus && codeFieldRef.current) {
      codeFieldRef.current.focus();
    }
  }, [codeFieldRef, shouldAutoFocus]);

  // Dismiss keyboard when OTP is fully filled
  useEffect(() => {
    if (value.length === CELL_COUNT) {
      Keyboard.dismiss();
    }
  }, [value, CELL_COUNT]);

  const renderCell = ({index, symbol, isFocused}) => {
    let child;

    if (symbol) {
      child = <Text>{showValues ? symbol : '•'}</Text>;
    } else if (isFocused) {
      child = '|'; // Static cursor
    } else {
      child = '-';
    }

    return (
      <View
        key={index}
        style={[
          styles.input,
          spacebetween,
          customInputStyle,
          isFocused && styles.inputFocus,
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        <Text style={[styles.digits_txt, OTP_textColor]}>{child}</Text>
      </View>
    );
  };

  return (
    <View>
      <CodeField
        autoFocus={autoFocus}
        textContentType="oneTimeCode"
        ref={codeFieldRef}
        {...props}
        value={value}
        onChangeText={text => {
          const numericText = text.replace(/[^0-9]/g, '');
          setValue(numericText);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={renderCell}
      />
      <View style={styles.errorView}>
        {invalidOtp && <Text style={styles.InvalidOTP_txt}>{invalidOtp}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  codeFiledRoot: {},
  input: {
    width: 48,
    height: 57,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: colors.VeryLightGray,
  },
  inputFocus: {
    borderColor: colors.appTheme,
  },
  invalidInput: {
    borderColor: colors.FireEngineRed,
  },
  digits_txt: {
    fontSize: 24,
    color: colors.MediumGray,
    fontWeight: '500',
    fontFamily: typography.Regular_400,
  },
  errorView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  InvalidOTP_txt: {
    fontSize: 14,
    color: colors.FireEngineRed,
    fontWeight: '500',
    fontFamily: typography.Regular_400,
    marginTop: 4,
    textAlign: 'left',
  },
});

export default OtpCodeField;

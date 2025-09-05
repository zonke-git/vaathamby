import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../../Theme/colors';
import {typography} from '../../../../Theme/typography';
import {setEngagementModelDetails} from '../../../../redux/slice/onBoardSlice';
import {useEngagementModelForm} from '../../../../hooks/onBoarding/use-engagementModelForm';
import AppButton from '../../../../components/AppButton/AppButton';
import {i18n} from '../../../../localization';
import {CustomTextField} from '../../../../components';

const EngagementModel = ({handleRedux}) => {
  const {
    options,
    dispatch,
    EngagementModelDetailsFormValues,
    handleEngagementModelDetailsFormSubmit,
  } = useEngagementModelForm();

  return (
    <View style={styles.container}>
      <View>
        {options?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index + '$'}
              style={[
                styles.box,
                {
                  borderColor:
                    (item.name === 'Scan & Pay (QR Code)' &&
                      EngagementModelDetailsFormValues?.scan_pay) ||
                    (item.name === 'Payment Link' &&
                      EngagementModelDetailsFormValues?.payment_link)
                      ? colors.appTheme
                      : colors.LightGray,
                  backgroundColor:
                    (item.name === 'Scan & Pay (QR Code)' &&
                      EngagementModelDetailsFormValues?.scan_pay) ||
                    (item.name === 'Payment Link' &&
                      EngagementModelDetailsFormValues?.payment_link)
                      ? colors.SoftPeach
                      : colors.white,
                },
              ]}
              onPress={() => {
                if (item.name === 'Scan & Pay (QR Code)') {
                  dispatch(
                    setEngagementModelDetails({
                      scan_pay: !EngagementModelDetailsFormValues?.scan_pay,
                    }),
                  );
                } else if (item.name === 'Payment Link') {
                  dispatch(
                    setEngagementModelDetails({
                      payment_link:
                        !EngagementModelDetailsFormValues?.payment_link,
                    }),
                  );
                }
              }}>
              <Image
                source={item.ImageData}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      (item.name === 'Scan & Pay (QR Code)' &&
                        EngagementModelDetailsFormValues?.scan_pay) ||
                      (item.name === 'Payment Link' &&
                        EngagementModelDetailsFormValues?.payment_link)
                        ? colors.appTheme
                        : colors.black,
                  },
                ]}
              />
              <Text
                style={[
                  styles.optionName_txt,
                  {
                    fontFamily:
                      (item.name === 'Scan & Pay (QR Code)' &&
                        EngagementModelDetailsFormValues?.scan_pay) ||
                      (item.name === 'Payment Link' &&
                        EngagementModelDetailsFormValues?.payment_link)
                        ? typography.Bold_700
                        : typography.Regular_400,
                  },
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <CustomTextField
          label={i18n.t('CashbackPercentage')}
          required
          placeholder={i18n.t('CashbackPercentage')}
          placeholderTextColor={colors.SilverGray}
          value={EngagementModelDetailsFormValues?.scan_cashback_percentage}
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, ''); // Allow only digits
            const num = parseInt(numericText, 10);

            if (!numericText || (num >= 1 && num <= 99)) {
              dispatch(
                setEngagementModelDetails({
                  scan_cashback_percentage: numericText,
                }),
              );
            }
          }}
          // error={
          //   (touched.CIPCRegistrationNumber && errors.CIPCRegistrationNumber) ||
          //   businessDetails_SubmitErrorMessage?.registration_number
          // }
          keyboardType="number-pad"
        />
      </View>
      <AppButton
        buttonStyle={{marginBottom: 16}}
        title={i18n.t('Submit')}
        onPress={handleEngagementModelDetailsFormSubmit}
        disabled={
          !(
            EngagementModelDetailsFormValues?.scan_pay ||
            EngagementModelDetailsFormValues?.payment_link
          )
        }
        useColors={
          EngagementModelDetailsFormValues?.scan_pay ||
          EngagementModelDetailsFormValues?.payment_link
            ? [colors.appTheme, colors.appTheme]
            : [colors.LightMistGray, colors.LightMistGray]
        }
        textStyle={{
          color:
            EngagementModelDetailsFormValues?.scan_pay ||
            EngagementModelDetailsFormValues?.payment_link
              ? colors.white
              : colors.LightSlateGray,
        }}
      />
    </View>
  );
};
export default EngagementModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.LightGray,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.white,
    // For box shadow - React Native handles shadows differently
    shadowColor: colors.Gainsboro,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.24, // Converted from 3D to decimal (3D ≈ 0.24)
    shadowRadius: 2,
    elevation: 2, // For Android
  },
  iconStyle: {
    height: 32,
    width: 32,
    marginRight: 8,
  },
  optionName_txt: {
    fontSize: 16,
    color: colors.EerieBlack,
    fontFamily: typography.Regular_400,
    // fontWeight: "400",
  },

  buttonWrapper: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
    fontFamily: typography.Regular_400,
  },
});

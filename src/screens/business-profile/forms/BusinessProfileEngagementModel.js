import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useBusinessProfileEngagementModelForm} from '../../../hooks/businessProfile/use-businessProfileEngagmentModalForm';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import AppButton from '../../../components/AppButton/AppButton';
import {i18n} from '../../../localization';
import {setBusinessProfileEngagementModelDetails} from '../../../redux/slice/businessProfileSlice';
import CustomTextField from '../../../components/TextFiled/CustomTextField';

const BusinessProfileEngagementModel = ({}) => {
  const {
    options,
    dispatch,
    businessProfileEngagementModelDetailsFormValues,
    handlebusinessProfileEngagementModelDetailsFormSubmit,
    handleCancel,
  } = useBusinessProfileEngagementModelForm();

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
                      businessProfileEngagementModelDetailsFormValues?.scan_pay) ||
                    (item.name === 'Payment Link' &&
                      businessProfileEngagementModelDetailsFormValues?.payment_link)
                      ? colors.appTheme
                      : colors.LightGray,
                  backgroundColor:
                    (item.name === 'Scan & Pay (QR Code)' &&
                      businessProfileEngagementModelDetailsFormValues?.scan_pay) ||
                    (item.name === 'Payment Link' &&
                      businessProfileEngagementModelDetailsFormValues?.payment_link)
                      ? colors.SoftPeach
                      : colors.white,
                },
              ]}
              onPress={() => {
                if (item.name === 'Scan & Pay (QR Code)') {
                  dispatch(
                    setBusinessProfileEngagementModelDetails({
                      scan_pay:
                        !businessProfileEngagementModelDetailsFormValues?.scan_pay,
                    }),
                  );
                } else if (item.name === 'Payment Link') {
                  dispatch(
                    setBusinessProfileEngagementModelDetails({
                      payment_link:
                        !businessProfileEngagementModelDetailsFormValues?.payment_link,
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
                        businessProfileEngagementModelDetailsFormValues?.scan_pay) ||
                      (item.name === 'Payment Link' &&
                        businessProfileEngagementModelDetailsFormValues?.payment_link)
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
                        businessProfileEngagementModelDetailsFormValues?.scan_pay) ||
                      (item.name === 'Payment Link' &&
                        businessProfileEngagementModelDetailsFormValues?.payment_link)
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
          label={`${i18n.t('PlatformFee')} %`}
          required
          placeholder={`${i18n.t('PlatformFee')}%`}
          placeholderTextColor={colors.SilverGray}
          keyboardType="numeric"
          value={
            businessProfileEngagementModelDetailsFormValues?.platformFeePercentage
          }
          disable={false}
        />
        <CustomTextField
          label={`${i18n.t('Cashback')} %`}
          required
          placeholder={`${i18n.t('Cashback')} %`}
          placeholderTextColor={colors.SilverGray}
          keyboardType="numeric"
          value={
            businessProfileEngagementModelDetailsFormValues?.scan_cashback_percentage
          }
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, ''); // Allow only digits
            const num = parseInt(numericText, 10);

            if (!numericText || (num >= 1 && num <= 99)) {
              dispatch(
                setBusinessProfileEngagementModelDetails({
                  scan_cashback_percentage: numericText,
                }),
              );
            }
          }}
          // onBlur={handleBlur('scan_cashback_percentage')}
          // error={touched.scan_cashback_percentage && errors.scan_cashback_percentage}
          // disable={false}
        />
        {/* Cashback Percentage */}
      </View>

      <View style={styles.btnView}>
        <AppButton
          onPress={handleCancel}
          title={i18n.t('Cancel')}
          useColors={[colors.white, colors.white]}
          textStyle={{color: colors.appTheme}}
          buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
        />
        <AppButton
          title={i18n.t('Submit')}
          onPress={handlebusinessProfileEngagementModelDetailsFormSubmit}
          disabled={
            !(
              businessProfileEngagementModelDetailsFormValues?.scan_pay ||
              businessProfileEngagementModelDetailsFormValues?.payment_link
            )
          }
          useColors={
            businessProfileEngagementModelDetailsFormValues?.scan_pay ||
            businessProfileEngagementModelDetailsFormValues?.payment_link
              ? [colors.appTheme, colors.appTheme]
              : [colors.LightMistGray, colors.LightMistGray]
          }
          textStyle={{
            color:
              businessProfileEngagementModelDetailsFormValues?.scan_pay ||
              businessProfileEngagementModelDetailsFormValues?.payment_link
                ? colors.white
                : colors.LightSlateGray,
          }}
          buttonStyle={styles.btnStyles}
        />
      </View>
    </View>
  );
};
export default BusinessProfileEngagementModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: "red",
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

  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 16,
  },
  preBtnStyles: {
    borderWidth: 1.5,
    borderColor: colors.appTheme,
  },
  btnStyles: {
    width: '45%',
  },
});

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import AppButton from '../../../components/AppButton/AppButton';
import {i18n} from '../../../localization';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import {setEngagementModelDetails} from '../../../redux/slice/outletSlice';
import {useEngagementModelForm} from '../../../hooks';

const EngagementModelForm = ({handleRedux}) => {
  const {
    options,
    dispatch,
    EngagementModelDetailsFormValues,
    handleEngagementModelDetailsFormSubmit,
    handlePrevious,
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
                    EngagementModelDetailsFormValues?.paymentOptions ===
                    item.name
                      ? colors.appTheme
                      : colors.LightGray,
                  backgroundColor:
                    EngagementModelDetailsFormValues?.paymentOptions ===
                    item.name
                      ? colors.SoftPeach
                      : colors.white,
                },
              ]}
              onPress={() => {
                if (handleRedux === 'businessProfile') {
                  dispatch(
                    setEngagementModelDetails({
                      paymentOptions: item.name,
                    }),
                  );
                } else {
                  dispatch(
                    setEngagementModelDetails({paymentOptions: item.name}),
                  );
                }
              }}>
              <Image
                source={item.ImageData}
                style={[
                  styles.iconStyle,
                  {
                    tintColor:
                      EngagementModelDetailsFormValues?.paymentOptions ===
                      item.name
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
                      EngagementModelDetailsFormValues?.paymentOptions ===
                      item.name
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
          label={i18n.t('Cashback') + ' %'}
          required
          placeholder={i18n.t('Cashback')}
          placeholderTextColor={colors.NeutralGray}
          value={EngagementModelDetailsFormValues?.CashbackPercentage}
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, ''); // Allow only digits
            const num = parseInt(numericText, 10);

            if (!numericText || (num >= 1 && num <= 99)) {
              dispatch(
                setEngagementModelDetails({
                  CashbackPercentage: numericText,
                }),
              );
            }
          }}
          keyboardType="numeric"
          // style={{marginBottom: 0}}
        />
      </View>
      <View style={styles.btnView}>
        <AppButton
          onPress={handlePrevious}
          title={i18n.t('Previous')}
          useColors={[colors.white, colors.white]}
          textStyle={{color: colors.appTheme}}
          buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
        />

        <AppButton
          disabled={
            EngagementModelDetailsFormValues?.paymentOptions !== ''
              ? false
              : true
          }
          onPress={handleEngagementModelDetailsFormSubmit}
          title={i18n.t('Submit')}
          useColors={
            EngagementModelDetailsFormValues?.paymentOptions !== ''
              ? [colors.appTheme, colors.appTheme]
              : [colors.LightMistGray, colors.LightMistGray]
          }
          textStyle={{
            color:
              EngagementModelDetailsFormValues?.paymentOptions !== ''
                ? colors.white
                : colors.LightSlateGray,
          }}
          buttonStyle={styles.btnStyles}
          //   loading={TimingsFormDetails_IsLoader}
        />
      </View>
    </View>
  );
};
export default EngagementModelForm;

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
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  preBtnStyles: {
    borderWidth: 1.5,
    borderColor: colors.appTheme,
  },
  btnStyles: {
    width: '45%',
  },
});

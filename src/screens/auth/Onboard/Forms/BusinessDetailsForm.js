/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {onboardBusinessDetailsValidationSchema} from '../../../schema/validationSchemas';
import CustomTextField from '../../../../components/TextFiled/CustomTextField';
import colors from '../../../../Theme/colors';
import BottomModal from '../../../../components/BottomModal/BottomModal';
import {typography} from '../../../../Theme/typography';
import {setBusinessDetails} from '../../../../redux/slice/onBoardSlice';
import {i18n} from '../../../../localization';
import CheckBox from '../../../../components/CheckBox/CheckBox';
import MessageModal from '../../../../components/MessageModal/MessageModal';
import {useBusinessDetailsForm} from '../../../../hooks/onBoarding/use-businessDetailsForm';
import AppButton from '../../../../components/AppButton/AppButton';

const BusinessDetailsForm = ({loader}) => {
  const {
    dispatch,
    categoriesList,
    businessDetailsFormValues,
    businessDetails_SubmitError,
    businessDetails_IsLoader,
    businessDetails_SubmitErrorMessage,
    openCategoryModalVisible,
    openTermsAndConditionModal,
    openPrivacyPolicy,

    setOpenCategoryModalVisible,
    handleLocationNavigation,
    setOpenTermsAndConditionModal,
    setOpenPrivacyPolicy,
    handleBusinessDetailsFormSubmit,
  } = useBusinessDetailsForm();

  return (
    <Formik
      initialValues={businessDetailsFormValues}
      validationSchema={onboardBusinessDetailsValidationSchema}
      enableReinitialize
      onSubmit={handleBusinessDetailsFormSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }) => {
        const renderTextField = (fieldName, label, options = {}) => (
          <CustomTextField
            label={label}
            required={options.required}
            placeholder={label}
            placeholderTextColor={colors.SilverGray}
            value={values[fieldName]}
            onChangeText={
              options.onChangeText ||
              (text => {
                setFieldValue(fieldName, text);
                dispatch(setBusinessDetails({[fieldName]: text}));
              })
            }
            onBlur={handleBlur(fieldName)}
            error={touched[fieldName] && errors[fieldName]}
            keyboardType={options.keyboardType}
            multiline={options.multiline}
            numberOfLines={options.numberOfLines}
          />
        );
        return (
          <>
            <View style={styles.formContainer}>
              <View>
                {renderTextField('businessName', i18n.t('BusinessName'), {
                  required: true,
                  onChangeText: text => {
                    const allowed = /^[a-zA-Z0-9&'() ]*$/;
                    if (allowed.test(text)) {
                      setFieldValue('businessName', text);
                      dispatch(setBusinessDetails({businessName: text}));
                    }
                  },
                })}

                <CustomTextField
                  label={`CIPC ${i18n.t('RegistrationNumber')}`}
                  required
                  placeholder="CIPC Registration Number"
                  placeholderTextColor={colors.SilverGray}
                  value={values?.CIPCRegistrationNumber}
                  onChangeText={text => {
                    // Remove all non-digit characters
                    const cleaned = text.replace(/\D/g, '');

                    let formatted = '';

                    if (cleaned.length <= 4) {
                      formatted = cleaned;
                    } else if (cleaned.length <= 10) {
                      formatted = `${cleaned.slice(0, 4)}/${cleaned.slice(4)}`;
                    } else {
                      formatted = `${cleaned.slice(0, 4)}/${cleaned.slice(
                        4,
                        10,
                      )}/${cleaned.slice(10, 12)}`;
                    }

                    setFieldValue('CIPCRegistrationNumber', formatted);
                    dispatch(
                      setBusinessDetails({CIPCRegistrationNumber: formatted}),
                    );
                  }}
                  onBlur={handleBlur('CIPCRegistrationNumber')}
                  error={
                    (touched.CIPCRegistrationNumber &&
                      errors.CIPCRegistrationNumber) ||
                    businessDetails_SubmitErrorMessage?.registration_number
                  }
                  keyboardType="number-pad"
                />

                <View style={styles.selectableBox_view}>
                  <Text style={styles.label}>
                    {i18n.t('BusinessCategory')}
                    <Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.selectableBox,
                      touched.businessCategory_name &&
                        errors.businessCategory_name &&
                        styles.inputError,
                    ]}
                    onPress={() => {
                      setFieldTouched('businessCategory_name', true);
                      setOpenCategoryModalVisible(true);
                    }}>
                    <Text
                      style={[
                        styles.boxData_txt,
                        {
                          color: values?.businessCategory_name
                            ? colors.EerieBlack
                            : colors.SilverGray,
                        },
                      ]}>
                      {values?.businessCategory_name ||
                        i18n.t('Select') + '' + i18n.t('BusinessCategory')}
                    </Text>
                  </TouchableOpacity>

                  {touched.businessCategory_name &&
                    errors.businessCategory_name && (
                      <Text style={styles.error}>
                        {errors.businessCategory_name}
                      </Text>
                    )}
                </View>
                <View style={styles.selectableBox_view}>
                  <Text style={styles.label}>
                    {i18n.t('Location')}
                    <Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.selectableBox,
                      touched.businessLocation_name &&
                        errors.businessLocation_name &&
                        styles.inputError,
                    ]}
                    onPress={() => {
                      setFieldTouched('location', true);
                      handleLocationNavigation();
                    }}>
                    <Image
                      source={require('../../../../assets/images/location.png')}
                      style={styles.locationIcon}
                    />
                    <Text
                      style={[
                        styles.boxData_txt,
                        {
                          color: values?.businessLocation_name
                            ? colors.EerieBlack
                            : colors.SilverGray,
                        },
                      ]}>
                      {values?.businessLocation_name ||
                        i18n.t('Select') + ' ' + i18n.t('Location')}
                    </Text>
                  </TouchableOpacity>

                  {touched.businessLocation_name &&
                    errors.businessLocation_name && (
                      <Text style={styles.error}>
                        {errors.businessLocation_name}
                      </Text>
                    )}
                </View>
                <CheckBox
                  value={values?.termsAndConditionCheckBox}
                  onToggle={() => {
                    const newValue = !values?.termsAndConditionCheckBox;
                    dispatch(
                      setBusinessDetails({
                        termsAndConditionCheckBox: newValue,
                      }),
                    );
                  }}
                  childDiv={
                    <>
                      <Text style={styles.checkBoxLabel_txt}>
                        {i18n.t('IHaveReadAndAcceptedTheEQPay')}{' '}
                        <Text
                          style={styles.clickableColor_txt}
                          onPress={() => {
                            setOpenTermsAndConditionModal(true);
                          }}>
                          {i18n.t('Terms__Conditions')}
                        </Text>{' '}
                        {i18n.t('And')}{' '}
                        <Text
                          style={styles.clickableColor_txt}
                          onPress={() => {
                            setOpenPrivacyPolicy(true);
                          }}>
                          {i18n.t('PrivacyPolicy')}
                        </Text>
                      </Text>
                    </>
                  }
                  error={
                    !isValid
                      ? !values?.termsAndConditionCheckBox
                        ? i18n.t('YouMustAcceptTheTermsAndConditions')
                        : ''
                      : ''
                  }
                />

                {businessDetails_SubmitError && (
                  <View style={styles.verificationError}>
                    <Image
                      source={require('../../../../assets/images/XCircle.png')}
                      style={styles.x_icon}
                    />
                    <Text style={styles.errorMsg}>
                      {businessDetails_SubmitErrorMessage}
                    </Text>
                  </View>
                )}
              </View>
              <AppButton
                onPress={handleSubmit}
                title={i18n.t('VerifyBusiness')}
                useColors={
                  !isValid
                    ? [colors.LightMistGray, colors.LightMistGray]
                    : [colors.appTheme, colors.appTheme]
                }
                // disabled={!isValid}
                textStyle={{
                  color: !isValid ? colors.LightSlateGray : colors.white,
                }}
                buttonStyle={{marginTop: 20}}
              />
            </View>

            <MessageModal
              title={
                openPrivacyPolicy ? 'Privacy Policy' : 'Terms and Condition'
              }
              visible={openTermsAndConditionModal || openPrivacyPolicy}
              message={'Coming Soon'}
              onClose={() => {
                setOpenTermsAndConditionModal(false);
                setOpenPrivacyPolicy(false);
              }}
            />

            <BottomModal
              visible={openCategoryModalVisible}
              onClose={() => setOpenCategoryModalVisible(false)}>
              <View style={{flex: 1}}>
                <Text style={styles.modalTitle_txt}>
                  {i18n.t('BusinessCategory')}
                </Text>
                <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                  {categoriesList?.Categorys?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.categoryList,
                        {
                          backgroundColor:
                            values?.businessCategory_name === item.name
                              ? colors.ReddishOrange
                              : colors.white,
                        },
                      ]}
                      onPress={() => {
                        setFieldValue('businessCategory_name', item.name);
                        setFieldTouched('businessCategory_name', false);
                        dispatch(
                          setBusinessDetails({
                            businessCategory: item,
                            businessCategory_name: item.name,
                          }),
                        );
                        setOpenCategoryModalVisible(false);
                      }}>
                      <View
                        style={[
                          styles.outerCircle,
                          {
                            backgroundColor:
                              values?.businessCategory_name === item.name
                                ? colors.white
                                : 'transparent',
                            borderColor:
                              values?.businessCategory_name === item.name
                                ? colors.appTheme
                                : colors.TaupeGray,
                          },
                        ]}>
                        <View
                          style={[
                            styles.innerCircle,
                            {
                              backgroundColor:
                                values?.businessCategory_name === item.name
                                  ? colors.appTheme
                                  : colors.white,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.categoryName_txt}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </BottomModal>
          </>
        );
      }}
    </Formik>
  );
};
export default BusinessDetailsForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  redColor: {color: colors.FireEngineRed},
  selectableBox_view: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.DimGray,
    lineHeight: 12 * 1.6,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  required: {
    color: colors.FireEngineRed,
  },
  selectableBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.white,
    //
    shadowColor: colors.Gainsboro,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 2, // for Android
  },
  inputError: {
    borderColor: colors.FireEngineRed,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
  locationIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 10,
  },
  boxData_txt: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
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
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
  modalTitle_txt: {
    fontSize: 22,
    color: colors.black,
    fontFamily: typography.Bold_700,
    paddingHorizontal: 16,
  },
  categoryList: {
    flexDirection: 'row',
    paddingVertical: 16,
    backgroundColor: colors.ReddishOrange,
    paddingHorizontal: 16,
  },
  outerCircle: {
    borderWidth: 2,
    // padding: 6,
    borderRadius: 30,
    borderColor: '#FA5117',
    width: 24,
    height: 24,
    // alignContent: "center",
    alignItems: 'center',
    // alignSelf: "center",
    justifyContent: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    backgroundColor: colors.appTheme,
    borderRadius: 30,
  },
  categoryName_txt: {
    fontSize: 16,
    color: colors.black,
    fontFamily: typography.Regular_400,
    marginLeft: 16,
  },
  verificationError: {
    marginTop: 20,
    marginBottom: 16,
    backgroundColor: colors.PowderPink,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  x_icon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  errorMsg: {
    color: colors.FireEngineRed,
    fontSize: 12,
    fontFamily: typography.SemiBold_600,
    flex: 1, // Allows text to wrap to the next line
    flexWrap: 'wrap', // Ensures text wraps if too long
  },

  checkBoxLabel_txt: {
    marginLeft: 8,
    fontSize: 12,
    color: colors.SimplyCharcoalDarkGray,
    lineHeight: 12 * 1.5,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
  },
  clickableColor_txt: {
    color: colors.appTheme,
    textDecorationLine: 'underline',
  },
});

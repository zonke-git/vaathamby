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
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import {i18n} from '../../../localization';
import colors from '../../../Theme/colors';
import AppButton from '../../../components/AppButton/AppButton';
import MessageModal from '../../../components/MessageModal/MessageModal';
import {
  DropdownFieldWithModal,
  PhoneNumberInput,
  SearchableDropdownTextField,
  SelectorField,
} from '../../../components';
import {
  setOutletInfoDetails,
  setOutletInfoDetailsLocationStatus,
} from '../../../redux/slice/outletSlice';
import {outletInfoDetailsValidationSchema} from '../../schema/validationSchemas';
import {typography} from '../../../Theme/typography';
import {useOutletInfoForm} from '../../../hooks';
import {post} from '../../../api/methods';

const OutletInfoForm = ({loader}) => {
  const {
    navigation,
    outletSingleStep,
    handleSubmit,
    dispatch,
    openTermsAndConditionModal,
    setOpenTermsAndConditionModal,
    countryModalVisible,
    setCountryModalVisible,
    outletInfoFormValues,
    subCategoriesList,
    provinceList,
    areaList,
    validationErrorMsg,
    outletInfoDetails_SubmitErrorMessage,

    setValidationErrorMsg,
    contactPersonValidationErrorMsg,
    setcontactPersonValidationErrorMsg,
    isPhoneNumberInvalid,
    isContactPhoneInvalid,
    isCustomerReachPhoneInvalid,
  } = useOutletInfoForm();

  // console.log('outletInfoFormValues', outletInfoFormValues);

  return (
    <Formik
      initialValues={outletInfoFormValues}
      validationSchema={outletInfoDetailsValidationSchema}
      enableReinitialize
      onSubmit={handleSubmit}>
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
        const renderTextField = (fieldName, label, options = {}) => {
          const handleChangeText = text => {
            let processedText = text;

            // Apply validation only to First and Last name fields
            if (
              fieldName === 'ContactPersonFirstName' ||
              fieldName === 'ContactPersonLastName'
            ) {
              // Allow only letters and spaces, and limit to 50 characters
              processedText = text.replace(/[^A-Za-z ]/g, '').slice(0, 50);
            }

            setFieldValue(fieldName, processedText);
            dispatch(setOutletInfoDetails({[fieldName]: processedText}));
          };

          return (
            <CustomTextField
              label={label}
              required={options.required}
              placeholder={label}
              placeholderTextColor={colors.SilverGray}
              value={values[fieldName]}
              onChangeText={options.onChangeText || handleChangeText}
              onBlur={handleBlur(fieldName)}
              error={touched[fieldName] && errors[fieldName]}
              keyboardType={options.keyboardType}
              multiline={options.multiline}
              numberOfLines={options.numberOfLines}
              multilineInputStyle={{alignSelf: 'flex-start'}}
            />
          );
        };

        // console.log('values', values);
        // console.log('subCategoriesList', subCategoriesList);

        return (
          <>
            <View style={styles.formContainer}>
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 10,
                  // marginBottom: 16,
                }}>
                {renderTextField('OutletName', i18n.t('OutletName'), {
                  required: true,
                  onChangeText: text => {
                    const allowed = /^[a-zA-Z0-9&'() ]*$/;
                    if (allowed.test(text)) {
                      setFieldValue('OutletName', text);
                      dispatch(setOutletInfoDetails({OutletName: text}));
                    }
                  },
                })}
                {renderTextField(
                  'ContactPersonFirstName',
                  i18n.t('ContactPersonFirstName'),
                  {required: true},
                )}

                {renderTextField(
                  'ContactPersonLastName',
                  i18n.t('ContactPersonLastName'),
                  {
                    required: true,
                  },
                )}

                <PhoneNumberInput
                  label_name={i18n.t('ContactPersonMobile')}
                  value={outletInfoFormValues?.ContactPersonMobile?.mobileNo}
                  countryDetails={
                    outletInfoFormValues?.ContactPersonMobile?.countrieDetails
                  }
                  inputStyle={styles.inputBox}
                  modalVisible={countryModalVisible}
                  setModalVisible={setCountryModalVisible}
                  showError={
                    contactPersonValidationErrorMsg
                    // || isContactPhoneInvalid()
                  }
                  onChangePhone={({phoneNo, phoneNoRaw, error}) => {
                    dispatch(
                      setOutletInfoDetails({
                        ContactPersonMobile: {
                          ...outletInfoFormValues.ContactPersonMobile,
                          mobileNo: phoneNo,
                          mobileNoRaw: phoneNoRaw,
                        },
                      }),
                    );
                    setcontactPersonValidationErrorMsg(error);
                  }}
                />

                {renderTextField(
                  'ContactPersonEmail',
                  i18n.t('ContactPersonEmail'),
                  {
                    keyboardType: 'email-address',
                  },
                )}

                <PhoneNumberInput
                  label_name={i18n.t('MobileNumber_CustomerToReachOut')}
                  value={
                    outletInfoFormValues?.MobileNumber_CustomerToReachOut
                      ?.mobileNo
                  }
                  countryDetails={
                    outletInfoFormValues?.MobileNumber_CustomerToReachOut
                      ?.countrieDetails
                  }
                  inputStyle={styles.inputBox}
                  modalVisible={countryModalVisible}
                  setModalVisible={setCountryModalVisible}
                  showError={
                    validationErrorMsg
                    // || isCustomerReachPhoneInvalid()
                  }
                  onChangePhone={({phoneNo, phoneNoRaw, error}) => {
                    dispatch(
                      setOutletInfoDetails({
                        MobileNumber_CustomerToReachOut: {
                          ...outletInfoFormValues.MobileNumber_CustomerToReachOut,
                          mobileNo: phoneNo,
                          mobileNoRaw: phoneNoRaw,
                        },
                      }),
                    );
                    setValidationErrorMsg(error);
                  }}
                />

                <DropdownFieldWithModal
                  required={true}
                  label={i18n.t('Subcategory')}
                  placeholder={i18n.t('Subcategory')}
                  options={subCategoriesList}
                  selectedValue={values.SubCategories || ''}
                  onSelect={item => {
                    setFieldValue('SubCategories_id', item._id);
                    dispatch(
                      setOutletInfoDetails({
                        SubCategories_id: item._id,
                        SubCategories: item,
                      }),
                    );
                  }}
                  getOptionLabel={item => item.name}
                  getOptionValue={item => item.name}
                  error={touched.SubCategories_id && errors.SubCategories_id}
                />

                {/* <DropdownFieldWithModal
                  label={i18n.t('Sub_CategoriesMax3')}
                  options={subCategoriesList}
                  selectedValue={values.SubCategories_id || []}
                  onSelect={selectedItems => {
                    setFieldValue('SubCategories_id', selectedItems);
                    const names = selectedItems.map(item => item.name);
                    dispatch(
                      setOutletInfoDetails({
                        SubCategories_id: selectedItems,
                        SubCategories: names.join(', '),
                      }),
                    );
                  }}
                  getOptionLabel={item => item.name}
                  getOptionValue={item => item._id}
                  placeholder={i18n.t('Sub_CategoriesMax3')}
                  maxSelections={3}
                  error={touched.SubCategories_id && errors.SubCategories_id}
                /> */}

                {renderTextField('About', i18n.t('About'), {
                  required: true,
                  multiline: true,
                  numberOfLines: 4,
                })}

                <SelectorField
                  showLeftIcon={true}
                  value={values?.OutletLocation}
                  error={errors.OutletLocation}
                  touched={touched.OutletLocation}
                  onSelectPress={() => {
                    setFieldTouched('OutletLocation', true);
                    navigation.navigate('Location');
                    dispatch(setOutletInfoDetailsLocationStatus(true));
                  }}
                />

                {renderTextField('Address', i18n.t('Address'), {
                  required: true,
                  multiline: true,
                  numberOfLines: 4,
                })}

                <DropdownFieldWithModal
                  required
                  label={i18n.t('Province')}
                  options={provinceList}
                  selectedValue={values.ProvinceDetails}
                  onSelect={item => {
                    setFieldValue('Province_name', item.name);
                    dispatch(
                      setOutletInfoDetails({
                        ProvinceDetails: item,
                        Province_name: item.name,
                      }),
                    );
                  }}
                  getOptionLabel={item => item.name}
                  getOptionValue={item => item.name}
                  placeholder={i18n.t('Province')}
                  error={touched.Province_name && errors.Province_name}
                />

                {/* <DropdownFieldWithModal
                  required
                  label={i18n.t('Area')}
                  options={areaList}
                  selectedValue={values.AreaDetails}
                  onSelect={item => {
                    setFieldValue('Area_name', item.name);
                    dispatch(
                      setOutletInfoDetails({
                        AreaDetails: item,
                        Area_name: item.name,
                      }),
                    );
                  }}
                  getOptionLabel={item => item.name}
                  getOptionValue={item => item.name}
                  placeholder={i18n.t('Area')}
                  error={touched.Area_name && errors.Area_name}
                /> */}

                <SelectorField
                  label={i18n.t('Area')}
                  placeholder={i18n.t('Area')}
                  showRightIcon={true}
                  value={values?.Area_name}
                  error={errors.Area_name}
                  touched={touched.Area_name}
                  onSelectPress={() => {
                    setFieldTouched('Area_name', true);
                    navigation.navigate('Cities');
                    // dispatch(
                    //   setOutletInfoDetails({
                    //     AreaDetails: item,
                    //     Area_name: item.name,
                    //   }),
                    // );
                  }}
                />

                {outletInfoDetails_SubmitErrorMessage && (
                  <View style={styles.verificationError}>
                    <Image
                      source={require('../../../assets/images/XCircle.png')}
                      style={styles.x_icon}
                    />
                    <Text style={styles.errorMsg}>
                      {outletInfoDetails_SubmitErrorMessage}
                    </Text>
                  </View>
                )}
              </ScrollView>

              <AppButton
                onPress={handleSubmit}
                title={outletSingleStep ? i18n.t('Save') : i18n.t('Save_Next')}
                useColors={
                  isContactPhoneInvalid() ||
                  isCustomerReachPhoneInvalid() ||
                  !isValid
                    ? [colors.LightMistGray, colors.LightMistGray]
                    : [colors.appTheme, colors.appTheme]
                }
                disabled={
                  isContactPhoneInvalid() ||
                  isCustomerReachPhoneInvalid() ||
                  !isValid
                }
                textStyle={{
                  color:
                    isContactPhoneInvalid() ||
                    isCustomerReachPhoneInvalid() ||
                    !isValid
                      ? colors.LightSlateGray
                      : colors.white,
                }}
              />
            </View>
            <MessageModal
              visible={openTermsAndConditionModal}
              message={'UnderDevelopment'}
              onClose={() => setOpenTermsAndConditionModal(false)}
            />
          </>
        );
      }}
    </Formik>
  );
};

export default OutletInfoForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  inputBox: {
    borderColor: colors.LightMistGray,
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
});

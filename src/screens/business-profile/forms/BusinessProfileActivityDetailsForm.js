import React from 'react';
import {Formik} from 'formik';
import {ScrollView, StyleSheet, View} from 'react-native';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {setBusinessProfileActivityDetails} from '../../../redux/slice/businessProfileSlice';
import AppButton from '../../../components/AppButton/AppButton';
import {i18n} from '../../../localization';
import {useBusinessProfileActivityDetailsForm} from '../../../hooks/businessProfile/use-businessProfileActivityDetailsForm';

const BusinessProfileActivityDetailsForm = ({}) => {
  const {
    businessProfileSingleScreen,
    businessProfileActivityDetails,

    dispatch,
    handleBusinessDetailsFormSubmit,
    handleCancel,
  } = useBusinessProfileActivityDetailsForm();

  return (
    <Formik
      initialValues={businessProfileActivityDetails}
      // validationSchema={businessProfileActivityDetailsValidationSchema}
      onSubmit={handleBusinessDetailsFormSubmit}
      enableReinitialize>
      {({
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
        isValid,
      }) => {
        const renderTextField = (
          fieldName,
          label,
          options = {},
          showVerification = false,
          showErrorMsg,
        ) => (
          <>
            <CustomTextField
              label={label}
              required={options.required}
              placeholder={label}
              placeholderTextColor={colors.SilverGray}
              value={values[fieldName]}
              onChangeText={text => {
                setFieldValue(fieldName, text);
                dispatch(
                  setBusinessProfileActivityDetails({[fieldName]: text}),
                );
              }}
              onBlur={handleBlur(fieldName)}
              error={showErrorMsg || (touched[fieldName] && errors[fieldName])}
              keyboardType={options.keyboardType}
              multiline={options.multiline}
              numberOfLines={options.numberOfLines}
              showVerification={showVerification}
              disable={!options.disabled}
            />
          </>
        );

        return (
          <View style={{flex: 1, position: 'relative'}}>
            <ScrollView>
              <View style={styles.formContainer}>
                {renderTextField('businessName', i18n.t('BusinessName'), {
                  // required: true,
                  disabled: true,
                  multiline: true,
                  numberOfLines: 3,
                })}

                {renderTextField('businessType', i18n.t('BusinessType'), {
                  // required: true,
                  disabled: true,
                })}

                {renderTextField(
                  'CIPCRegistrationNumber',
                  `CIPC ${i18n.t('RegistrationNumber')}`,
                  {
                    // required: true,
                    disabled: true,
                  },
                )}

                {renderTextField(
                  'BusinessStartDate',
                  i18n.t('RegistrationDate'),
                  {
                    // required: true,
                    disabled: true,
                  },
                )}

                {renderTextField(
                  'registeredAddress',
                  i18n.t('RegisteredAddress'),
                  {
                    // required: true,
                    disabled: true,
                    multiline: true,
                    numberOfLines: 3,
                  },
                )}

                {renderTextField('postaldAddress', i18n.t('PostalAddress'), {
                  // required: true,
                  disabled: true,
                  multiline: true,
                  numberOfLines: 3,
                })}

                {renderTextField('businessLocation', i18n.t('Province'), {
                  // required: true,
                  disabled: true,
                })}

                {renderTextField('taxNumber', i18n.t('TaxNumber'), {
                  // required: true,
                  disabled: true,
                })}
                {renderTextField(
                  'BusinessCategory',
                  i18n.t('BusinessCategory'),
                  {
                    // required: true,
                    disabled: true,
                  },
                )}
                {renderTextField('Merchant_ID', i18n.t('MerchantID'), {
                  // required: true,
                  disabled: true,
                })}

                {renderTextField('Wallet_ID', i18n.t('WalletID'), {
                  // required: true,
                  disabled: true,
                })}

                {renderTextField('CurrentBalance', i18n.t('CurrentBalance'), {
                  // required: true,
                  disabled: true,
                })}

                {renderTextField(
                  'AvailableBalance',
                  i18n.t('AvailableBalance'),
                  {
                    // required: true,
                    disabled: true,
                  },
                )}
              </View>
            </ScrollView>
            <View style={styles.fixedBtnContainer}>
              {!businessProfileSingleScreen ? (
                <AppButton
                  onPress={handleSubmit}
                  title={i18n.t('Continue')}
                  useColors={[colors.appTheme, colors.appTheme]}
                  textStyle={{color: colors.white}}
                  buttonStyle={[styles.btnStyles, {width: '100%'}]}
                />
              ) : (
                <>
                  <AppButton
                    onPress={handleCancel}
                    title={i18n.t('Back')}
                    useColors={[colors.appTheme, colors.appTheme]}
                    textStyle={{color: colors.white}}
                    // buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
                  />
                  {/* <AppButton
                    onPress={handleSubmit}
                    title={i18n.t('OK')}
                    useColors={[colors.appTheme, colors.appTheme]}
                    textStyle={{color: colors.white}}
                    buttonStyle={styles.btnStyles}
                  /> */}
                </>
              )}
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 50,
  },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.white,
    shadowColor: colors.Gainsboro,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 2,
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
  boxData_txt: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
  },
  downArrowStyle: {
    width: 24,
    height: 24,
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
    fontFamily: typography.Regular_400,
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
    borderRadius: 30,
    borderColor: '#FA5117',
    width: 24,
    height: 24,
    alignItems: 'center',
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
  fixedBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 16,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // borderTopWidth: 1,
    borderColor: colors.LightGray,
  },

  preBtnStyles: {
    borderWidth: 1.5,
    borderColor: colors.appTheme,
  },
  btnStyles: {
    width: '45%',
  },
});

export default BusinessProfileActivityDetailsForm;

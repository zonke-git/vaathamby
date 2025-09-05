import React from 'react';
import {Formik} from 'formik';
import {StyleSheet, View} from 'react-native';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import colors from '../../../Theme/colors';
import {businessContactAddressDetailsValidationSchema} from '../../schema/validationSchemas';
import {setContactAddressDetails} from '../../../redux/slice/businessProfileSlice';
import AppButton from '../../../components/AppButton/AppButton';
import {i18n} from '../../../localization';
import {useContactDetailsForm} from '../../../hooks/businessProfile/use-contactDetailsForm';

const ContactAddressDetailsForm = ({}) => {
  const {
    dispatch,
    loginDetails,
    contactAddressDetailsFormValues,
    businessProfileSingleScreen,
    handleContactAddressDetailsFormSubmit,
    handleCancel,
  } = useContactDetailsForm();

  return (
    <Formik
      initialValues={contactAddressDetailsFormValues}
      validationSchema={businessContactAddressDetailsValidationSchema}
      onSubmit={handleContactAddressDetailsFormSubmit}
      enableReinitialize>
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
      }) => {
        const renderTextField = (
          fieldName,
          label,
          options = {},
          disable = true,
        ) => (
          <CustomTextField
            label={label}
            required={options.required}
            placeholder={label}
            placeholderTextColor={colors.SilverGray}
            value={values[fieldName]}
            onChangeText={text => {
              setFieldValue(fieldName, text);
              dispatch(setContactAddressDetails({[fieldName]: text}));
            }}
            onBlur={handleBlur(fieldName)}
            error={touched[fieldName] && errors[fieldName]}
            keyboardType={options.keyboardType}
            multiline={options.multiline}
            numberOfLines={options.numberOfLines}
            disable={disable}
            showVerification={options.showVerification}
          />
        );

        return (
          <>
            <View style={styles.formContainer}>
              <View>
                {renderTextField(
                  'contactPersonFirstName',
                  'Contact First Person Name',
                  {
                    required: true,
                  },
                )}

                {renderTextField(
                  'contactPersonLastName',
                  'Contact Last Person Name',
                  {
                    required: true,
                  },
                )}

                {renderTextField(
                  'contactEmailAddress',
                  'Contact Email Address',
                  {
                    // required: true,
                    keyboardType: 'email-address',
                    showVerification: true,
                  },
                  false,
                )}

                <CustomTextField
                  label={i18n.t('PhoneNumber')}
                  placeholder={i18n.t('EnterMobileNumber')}
                  placeholderTextColor={colors.SilverGray}
                  value={values?.contactMobileNumber}
                  keyboardType="phone-pad"
                  leftComponent={true}
                  countryPhoneCode={loginDetails?.countrieDetails?.phoneCode}
                  countryPhoneFlag={loginDetails?.countrieDetails?.flag}
                  inputStyle={styles.inputBox}
                  disable={false}
                  showVerification={true}
                />
              </View>

              <View style={styles.btnView}>
                {!businessProfileSingleScreen ? (
                  <AppButton
                    title={i18n.t('SaveContinue')}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    useColors={
                      !isValid
                        ? [colors.LightMistGray, colors.LightMistGray]
                        : [colors.appTheme, colors.appTheme]
                    }
                    textStyle={{
                      color: !isValid ? colors.LightSlateGray : colors.white,
                    }}
                    buttonStyle={[styles.btnStyles, {width: '100%'}]}
                  />
                ) : (
                  <>
                    <AppButton
                      onPress={handleCancel}
                      title={i18n.t('Cancel')}
                      useColors={[colors.white, colors.white]}
                      textStyle={{color: colors.appTheme}}
                      buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
                    />
                    <AppButton
                      title={i18n.t('Save')}
                      buttonStyle={styles.btnStyles}
                      onPress={handleSubmit}
                      disabled={!isValid}
                      useColors={
                        !isValid
                          ? [colors.LightMistGray, colors.LightMistGray]
                          : [colors.appTheme, colors.appTheme]
                      }
                      textStyle={{
                        color: !isValid ? colors.LightSlateGray : colors.white,
                      }}
                    />
                  </>
                )}
              </View>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
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

export default ContactAddressDetailsForm;

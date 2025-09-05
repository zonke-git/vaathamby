import React from 'react';
import {Formik} from 'formik';
import {StyleSheet, Text, View} from 'react-native';
import {
  onboardContactDetailsEmailValidationSchema,
  onboardContactDetailsValidationSchema,
} from '../../../schema/validationSchemas';
import CustomTextField from '../../../../components/TextFiled/CustomTextField';
import colors from '../../../../Theme/colors';
import {typography} from '../../../../Theme/typography';
import {setContactDetails} from '../../../../redux/slice/onBoardSlice';
import {i18n} from '../../../../localization';
import {useContactDetailsForm} from '../../../../hooks/onBoarding/use-contactDetailsForm';
import AppButton from '../../../../components/AppButton/AppButton';

const ContactDetailsForm = ({}) => {
  const {
    dispatch,
    loginDetails,
    contactDetailsFormValues,
    handleContactDetailsFormSubmit,
    handleRequestEmailID,
    verifyEmail_id,
    contactDetails_RequestEmail_OTP_SubmitErrorMessage,
    Email_Loader,
    contactDetails_SubmitErrorMessage,
    merchant_details,
  } = useContactDetailsForm();

  return (
    <Formik
      initialValues={contactDetailsFormValues}
      validationSchema={
        verifyEmail_id
          ? onboardContactDetailsEmailValidationSchema
          : onboardContactDetailsValidationSchema
      }
      onSubmit={
        verifyEmail_id ? handleRequestEmailID : handleContactDetailsFormSubmit
      }
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
          <CustomTextField
            label={label}
            required={options.required}
            placeholder={label}
            placeholderTextColor={colors.SilverGray}
            value={values[fieldName]}
            onChangeText={text => {
              setFieldValue(fieldName, text);
              dispatch(setContactDetails({[fieldName]: text}));
            }}
            onBlur={handleBlur(fieldName)}
            error={showErrorMsg || (touched[fieldName] && errors[fieldName])}
            keyboardType={options.keyboardType}
            multiline={options.multiline}
            numberOfLines={options.numberOfLines}
            showVerification={showVerification}
            editable={!options.disabled}
          />
        );

        return (
          <View style={styles.formContainer}>
            <View style={styles.fieldsContainer}>
              <>
                {renderTextField(
                  'firstName',
                  `${i18n.t('Admin_Manager')} ${i18n.t('FirstName')}`,
                  {required: true},
                )}
                {renderTextField(
                  'lastName',
                  `${i18n.t('Admin_Manager')} ${i18n.t('LastName')}`,
                  {required: true},
                )}
              </>

              {renderTextField(
                'email',
                `${i18n.t('Admin_Manager')} ${i18n.t('EmailID')}`,
                {
                  required: true,
                  keyboardType: 'email-address',
                },
                verifyEmail_id,
                contactDetails_RequestEmail_OTP_SubmitErrorMessage,
              )}

              <CustomTextField
                label={i18n.t('PhoneNumber')}
                placeholder={i18n.t('EnterMobileNumber')}
                placeholderTextColor={colors.SilverGray}
                value={merchant_details?.contact_number}
                keyboardType="phone-pad"
                leftComponent={true}
                countryPhoneCode={loginDetails?.countrieDetails?.phoneCode}
                countryPhoneFlag={loginDetails?.countrieDetails?.flag}
                inputStyle={styles.inputBox}
                disable={false}
                showVerification={true}
              />
              {contactDetails_SubmitErrorMessage && (
                <Text style={[styles.error]}>
                  {contactDetails_SubmitErrorMessage}
                </Text>
              )}
            </View>

            <AppButton
              buttonStyle={styles.button}
              title={verifyEmail_id ? i18n.t('VerifyEmail') : i18n.t('Submit')}
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
          </View>
        );
      }}
    </Formik>
  );
};

export default ContactDetailsForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  fieldsContainer: {
    flex: 1,
  },
  button: {
    marginBottom: 16,
  },
  inputBox: {
    opacity: 0.7,
  },

  error: {
    color: colors.FireEngineRed,
    fontSize: 14,
    // marginTop: 4,
    fontFamily: typography.SemiBold_600,
  },
});

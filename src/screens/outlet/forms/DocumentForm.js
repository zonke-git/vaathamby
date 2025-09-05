import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Formik} from 'formik';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import {i18n} from '../../../localization';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {documentsDetailsValidationSchema} from '../../schema/validationSchemas';
import {setDocumentsDetails} from '../../../redux/slice/outletSlice';
import AppButton from '../../../components/AppButton/AppButton';
import {DatePickerField, DropdownFieldWithModal} from '../../../components';
import FileUploadField from '../../auth/Onboard/FileUploadField';
import { useDocumentsForm } from '../../../hooks';

const DocumentForm = ({loader}) => {
  const {
    dispatch,
    DocumentsFormValues,
    handleSubmits,
    handlePrevious,
    categoriesList,
    handleDocumentPick,
    handleCancel,
  } = useDocumentsForm();

  return (
    <Formik
      initialValues={DocumentsFormValues}
      validationSchema={documentsDetailsValidationSchema}
      enableReinitialize
      onSubmit={handleSubmits}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
        isValid,
      }) => {
        const renderTextField = (fieldName, label, options = {}) => (
          <>
            <CustomTextField
              label={label}
              required={options.required}
              placeholder={label}
              placeholderTextColor={colors.SilverGray}
              value={values[fieldName]}
              onChangeText={text => {
                setFieldValue(fieldName, text);
                dispatch(setDocumentsDetails({[fieldName]: text}));
              }}
              onBlur={handleBlur(fieldName)}
              error={touched[fieldName] && errors[fieldName]}
              keyboardType={options.keyboardType}
              multiline={options.multiline}
              numberOfLines={options.numberOfLines}
              disable={options.disable}
            />
          </>
        );

        return (
          <View style={styles.formContainer}>
            <View>
              {renderTextField(
                'RegistrationNo',
                `CIPC ${i18n.t('RegistrationNumber')}`,
                {
                  required: true,
                  disable: false,
                },
              )}

              <DatePickerField
                label={i18n.t('RegistrationDate')}
                value={values?.RegistrationDate}
                required={true}
                onConfirm={dateString => {
                  setFieldValue('RegistrationDate', dateString);
                  dispatch(setDocumentsDetails({RegistrationDate: dateString}));
                }}
                minimumDate={new Date(2020, 0, 1)}
                maximumDate={new Date(2025, 11, 31)}
                placeholder="DD/MM/YYYY"
                error={touched.RegistrationDate && errors.RegistrationDate}
              />

              <FileUploadField
                required={true}
                label={i18n.t('RegistrationCertificatePDF_JPG_PNG')}
                file={values?.RegistrationCertificatePDF_JPG_PNG}
                onPick={() =>
                  handleDocumentPick('RegistrationCertificatePDF_JPG_PNG')
                }
                onCancel={() =>
                  handleCancel('RegistrationCertificatePDF_JPG_PNG')
                }
                allowedTypes={['pdf', 'jpg', 'jpeg', 'png']}
                error={
                  touched.RegistrationCertificatePDF_JPG_PNG &&
                  errors.RegistrationCertificatePDF_JPG_PNG
                }
              />

              {renderTextField(
                'TaxRegistrationNumber_TRN',
                i18n.t('TaxRegistrationNumber_TRN'),
                {required: true},
              )}

              <DatePickerField
                label={i18n.t('TaxRegistrationDate')}
                value={values?.TaxRegistrationDate}
                required={true}
                onConfirm={dateString => {
                  setFieldValue('TaxRegistrationDate', dateString);
                  dispatch(
                    setDocumentsDetails({TaxRegistrationDate: dateString}),
                  );
                }}
                minimumDate={new Date(2020, 0, 1)}
                maximumDate={new Date(2025, 11, 31)}
                placeholder="DD/MM/YYYY"
                error={
                  touched.TaxRegistrationDate && errors.TaxRegistrationDate
                }
              />

              <FileUploadField
                required={true}
                label={i18n.t('TaxCertificatePDF_JPG_PNG')}
                file={values?.TaxCertificatePDF_JPG_PNG}
                onPick={() => handleDocumentPick('TaxCertificatePDF_JPG_PNG')}
                onCancel={() => handleCancel('TaxCertificatePDF_JPG_PNG')}
                allowedTypes={['pdf', 'jpg', 'jpeg', 'png']}
                error={
                  touched.TaxCertificatePDF_JPG_PNG &&
                  errors.TaxCertificatePDF_JPG_PNG
                }
              />
            </View>

            <View style={styles.btnView}>
              <AppButton
                onPress={handlePrevious}
                title={i18n.t('Previous')}
                useColors={[colors.white, colors.white]}
                textStyle={{
                  color: colors.appTheme,
                }}
                buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
              />
              <AppButton
                onPress={handleSubmit}
                title={i18n.t('Save_Next')}
                useColors={
                  isValid
                    ? [colors.appTheme, colors.appTheme]
                    : [colors.LightMistGray, colors.LightMistGray]
                }
                textStyle={{
                  color: isValid ? colors.white : colors.LightSlateGray,
                }}
                buttonStyle={styles.btnStyles}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default DocumentForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
});

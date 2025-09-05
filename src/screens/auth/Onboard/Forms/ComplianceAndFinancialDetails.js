import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {onboardComplianceAndFinancialDetailsValidationSchema} from '../../../schema/validationSchemas';
import CustomTextField from '../../../../components/TextFiled/CustomTextField';
import colors from '../../../../Theme/colors';
import {typography} from '../../../../Theme/typography';
import {setComplianceFinancialDetails} from '../../../../redux/slice/onBoardSlice';
import FileUploadField from '../FileUploadField';
import {useComplianceFinancialDetailsForm} from '../../../../hooks/onBoarding/use-complianceFinancialDetailsForm';
import AppButton from '../../../../components/AppButton/AppButton';
import {i18n} from '../../../../localization';

const ComplianceAndFinancialDetails = ({}) => {
  const {
    dispatch,
    ComplianceAndFinancialsDetailsFormValues,
    handleCancel,
    handleComplianceAndFinancialsDetailsFormSubmit,
    handleDocumentPick,
    merchant_details,
  } = useComplianceFinancialDetailsForm();

  return (
    <Formik
      initialValues={ComplianceAndFinancialsDetailsFormValues}
      validationSchema={onboardComplianceAndFinancialDetailsValidationSchema}
      onSubmit={handleComplianceAndFinancialsDetailsFormSubmit}
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
        dirty,
      }) => (
        <>
          <View style={styles.formContainer}>
            <View>
              <CustomTextField
                label={`CIPC ${i18n.t('RegistrationNumber')}`}
                required
                placeholder="CIPC Registration Number"
                placeholderTextColor={colors.SilverGray}
                value={
                  merchant_details?.RegistrationNumber ||
                  values?.CIPCRegistrationNumber
                }
                onBlur={handleBlur('CIPCRegistrationNumber')}
                keyboardType="number-pad"
                disable={false}
              />

              <FileUploadField
                label={i18n.t('RegistrationCertificate')}
                required={true}
                file={values?.registerationCertificate}
                onPick={() => handleDocumentPick('registerationCertificate')}
                onCancel={() => handleCancel('registerationCertificate')}
                error={errors.registerationCertificate}
              />
              <CustomTextField
                label={i18n.t('TaxNumber')}
                required
                placeholder={i18n.t('TaxNumber')}
                placeholderTextColor={colors.SilverGray}
                keyboardType="numeric"
                value={merchant_details?.TaxNumber || values?.TaxNumber}
                disable={false}
              />
              <FileUploadField
                label={i18n.t('TaxCertificate')}
                required
                file={values?.taxCertificate}
                onPick={() => handleDocumentPick('taxCertificate')}
                onCancel={() => handleCancel('taxCertificate')}
                error={errors.taxCertificate}
              />
            </View>

            <AppButton
              onPress={handleSubmit}
              title={i18n.t('SaveContinue')}
              useColors={
                !isValid
                  ? [colors.LightMistGray, colors.LightMistGray]
                  : [colors.appTheme, colors.appTheme]
              }
              textStyle={{
                color: !isValid ? colors.LightSlateGray : colors.white,
              }}
              // disabled={!isValid}
            />
          </View>
        </>
      )}
    </Formik>
  );
};
export default ComplianceAndFinancialDetails;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
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
  filedStyle: {
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
  showSelectedImage: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.WhisperGray,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedFileIconShower: {
    // width: 32,
    // height: 32,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginRight: 8,
    // alignItems: "center",
    // alignContent: "center",
    alignSelf: 'center',
  },
  selectedFileIcon: {
    width: 20,
    height: 20,
  },
  showFileName_view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '75%',
  },
  fileName_txt: {
    fontSize: 12,
    lineHeight: 16.8,
    letterSpacing: 12 * (0 / 100),
    // color: colors.DarkBluishGray,
    color: colors.textSecondaryColor,
    fontFamily: typography.Regular_400,
    marginBottom: 4,
  },
  fileSize_txt: {
    fontSize: 11,
    lineHeight: 11 * 1,
    letterSpacing: 12 * (0 / 100),
    color: colors.textSecondaryColor,
    fontFamily: typography.Regular_400,
  },
  card: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.LightGray,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  uploadButtonText: {
    fontSize: 12,
    color: colors.JetBlack,
    lineHeight: 19,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  uploadButton2LineText: {
    fontSize: 10,
    color: colors.textSecondaryColor,
    lineHeight: 19,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Regular_400,
  },
});

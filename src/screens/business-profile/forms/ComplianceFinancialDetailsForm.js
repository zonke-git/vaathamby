import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {businessProfileComplianceAndFinancialsDetailsValidationSchema} from '../../schema/validationSchemas';
import {setBusinessProfileComplianceFinancialDetails} from '../../../redux/slice/businessProfileSlice';
import FileUploadField from '../../auth/Onboard/FileUploadField';
import {i18n} from '../../../localization';
import AppButton from '../../../components/AppButton/AppButton';
import {useComplianceAndFinancialDetailsForm} from '../../../hooks/businessProfile/use-complianceAndFinancialDetailsForm';

const ComplianceFinancialDetailsForm = ({}) => {
  const {
    ComplianceAndFinancialsDetailsFormValues,
    dispatch,
    handleCancel,
    handleComplianceAndFinancialsDetailsFormSubmit,
    handleDocumentPick,
    businessProfileSingleScreen,
    handleCancelExit,
  } = useComplianceAndFinancialDetailsForm();

  return (
    <Formik
      initialValues={ComplianceAndFinancialsDetailsFormValues}
      validationSchema={
        businessProfileComplianceAndFinancialsDetailsValidationSchema
      }
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
                  setBusinessProfileComplianceFinancialDetails({
                    [fieldName]: text,
                  }),
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
          <>
            <View style={styles.formContainer}>
              <View>
                {renderTextField(
                  'CIPCRegistrationNumber',
                  `CIPC ${i18n.t('RegistrationNumber')}`,
                  {
                    required: true,
                    disabled: true,
                  },
                )}

                <View style={styles.fullWidthImageWrapper}>
                  {values?.registerationCertificate ? (
                    <>
                      <FileUploadField
                        label="Registration Certificate"
                        required={true}
                        file={values?.registerationCertificate}
                        onPick={() =>
                          handleDocumentPick('registerationCertificate')
                        }
                        onCancel={() =>
                          handleCancel('registerationCertificate')
                        }
                        error={errors?.registerationCertificate}
                      />
                    </>
                  ) : (
                    <>
                      <FileUploadField
                        label="Registration Certificate"
                        required={true}
                        file={values?.registerationCertificate}
                        onPick={() =>
                          handleDocumentPick('registerationCertificate')
                        }
                        onCancel={() =>
                          handleCancel('registerationCertificate')
                        }
                        error={errors?.registerationCertificate}
                      />
                    </>
                  )}
                </View>

                {/* {renderTextField('taxNumber', 'Tax Number', {
                  required: true,
                  disabled: true,
                })}

                <View style={styles.fullWidthImageWrapper}>
                  {values?.taxCertificate ? (
                    <>
                      <FileUploadField
                        label="Tax Certificate"
                        required={true}
                        file={values?.taxCertificate}
                        onPick={() => handleDocumentPick('taxCertificate')}
                        onCancel={() => handleCancel('taxCertificate')}
                        error={errors.taxCertificate}
                      />
                    </>
                  ) : (
                    <>
                      <FileUploadField
                        label="Tax Certificate"
                        required={true}
                        file={values?.taxCertificate}
                        onPick={() => handleDocumentPick('taxCertificate')}
                        onCancel={() => handleCancel('taxCertificate')}
                        error={errors.taxCertificate}
                      />
                    </>
                  )}
                </View> */}
              </View>

              <View style={styles.btnView}>
                {!businessProfileSingleScreen ? (
                  <AppButton
                    title={i18n.t('SaveContinue')}
                    onPress={handleSubmit}
                    useColors={
                      values?.registerationCertificate
                        ? [colors.LightMistGray, colors.LightMistGray]
                        : [colors.appTheme, colors.appTheme]
                    }
                    textStyle={{
                      color: values?.registerationCertificate
                        ? colors.LightSlateGray
                        : colors.white,
                    }}
                    buttonStyle={[styles.btnStyles, {width: '100%'}]}
                    //   disabled={
                    // !isValid ? colors.LightSlateGray : colors.white,
                    //   }
                  />
                ) : (
                  <>
                    <AppButton
                      onPress={handleCancelExit}
                      title={i18n.t('Cancel')}
                      useColors={[colors.white, colors.white]}
                      textStyle={{color: colors.appTheme}}
                      buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
                    />
                    <AppButton
                      title={i18n.t('Save')}
                      onPress={handleSubmit}
                      useColors={
                        values?.registerationCertificate
                          ? [colors.appTheme, colors.appTheme]
                          : [colors.LightMistGray, colors.LightMistGray]
                      }
                      textStyle={{
                        color: values?.registerationCertificate ? colors.white : colors.LightSlateGray,
                      }}
                      buttonStyle={styles.btnStyles}
                      disabled={!values?.registerationCertificate}
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
export default ComplianceFinancialDetailsForm;

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

  selectableBox_view: {
    marginBottom: 20,
  },
  selectableBox: {
    justifyContent: 'space-between',
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
    fontSize: 12,
    marginTop: 4,
  },
  boxData_txt: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
  },
  calendar: {
    width: 24,
    height: 24,
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
  fullWidthImageWrapper: {},
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 16,
    aspectRatio: 2,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  addIcon: {
    width: 22,
    height: 22,
    tintColor: colors.FireEngineRed,
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

import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Formik} from 'formik';
import {i18n} from '../../../localization';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import AppButton from '../../../components/AppButton/AppButton';
import {setOutletCharacteristicsDetails} from '../../../redux/slice/outletSlice';
import YesNoOption from '../../../components/YesNoOption/YesNoOption';
import {useOutletCharacteristicsForm} from '../../../hooks';

const OutletCharacteristics = ({}) => {
  const {
    outletSingleStep,
    OutletCharacteristicsFormValues,
    facilitysList,
    outlet_ErrorMessage,

    dispatch,
    handlePrevious,
    handleMySubmit,
    isFormValid,
  } = useOutletCharacteristicsForm();

  return (
    <Formik
      initialValues={OutletCharacteristicsFormValues}
      enableReinitialize
      onSubmit={() => {
        handleMySubmit(); // Manually triggering submit logic
      }}>
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
        const handleSelectionChange = (fieldName, value) => {
          setFieldValue(fieldName, value);
          dispatch(setOutletCharacteristicsDetails({[fieldName]: value}));
        };

        const renderOptionField = (fieldName, label) => (
          <YesNoOption
            label={label}
            initialValue={values[fieldName]}
            onSelectionChange={value => handleSelectionChange(fieldName, value)}
            selectedOption={values[fieldName]}
          />
        );

        return (
          <>
            <ScrollView>
              <View style={styles.formContainer}>
                <View style={styles.fieldsContainer}>
                  {facilitysList?.map(field => (
                    <View key={field._id} style={styles.fieldWrapper}>
                      {renderOptionField(field._id, field.name)}
                    </View>
                  ))}

                  {outlet_ErrorMessage && (
                    <View style={styles.submitError}>
                      <Image
                        source={require('../../../assets/images/XCircle.png')}
                        style={styles.x_icon}
                      />
                      <Text style={styles.errorMsg}>{outlet_ErrorMessage}</Text>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={styles.btnView}>
              {outletSingleStep ? (
                <AppButton
                  onPress={handleSubmit}
                  title={i18n.t('Save')}
                  buttonStyle={[styles.btnStyles, {width: '100%'}]}
                  useColors={
                    !isFormValid()
                      ? [colors.LightMistGray, colors.LightMistGray]
                      : [colors.appTheme, colors.appTheme]
                  }
                  textStyle={{
                    color: !isFormValid()
                      ? colors.sliverBorderColor
                      : colors.white,
                  }}
                  disabled={!isFormValid()}
                />
              ) : (
                <>
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
                    buttonStyle={styles.btnStyles}
                    onPress={handleSubmit}
                    title={i18n.t('Save_Next')}
                    useColors={
                      !isFormValid()
                        ? [colors.LightMistGray, colors.LightMistGray]
                        : [colors.appTheme, colors.appTheme]
                    }
                    textStyle={{
                      color: !isFormValid()
                        ? colors.sliverBorderColor
                        : colors.white,
                    }}
                    disabled={!isFormValid()}
                  />
                </>
              )}
            </View>
          </>
        );
      }}
    </Formik>
  );
};

export default OutletCharacteristics;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  fieldsContainer: {
    marginBottom: 20,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  redColor: {color: colors.FireEngineRed},
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.EerieBlack,
    lineHeight: 16 * 1.4,
    fontFamily: typography.SemiBold_600,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preBtnStyles: {
    borderWidth: 1.5,
    borderColor: colors.appTheme,
  },
  btnStyles: {width: '45%'},
  submitError: {
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

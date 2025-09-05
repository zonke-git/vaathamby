import React from 'react';
import {Formik} from 'formik';
import {StyleSheet, View} from 'react-native';
import CustomTextField from '../../../components/TextFiled/CustomTextField';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {bankAccountDetailsValidationSchema} from '../../schema/validationSchemas';
import {setBankAccountDetails} from '../../../redux/slice/businessProfileSlice';
import AppButton from '../../../components/AppButton/AppButton';
import {i18n} from '../../../localization';
import {DropdownFieldWithModal} from '../../../components';
import {useBankAccountDetailsForm} from '../../../hooks/businessProfile/use-bankAccountDetailsForm';

const BankAccountDetailsForm = ({}) => {
  const {
    businessProfileBankAccountDetailsFormValues,
    dispatch,
    handleBankAccountDetailsFormSubmit,
    categoriesList,
  } = useBankAccountDetailsForm();

  return (
    <Formik
      initialValues={businessProfileBankAccountDetailsFormValues}
      validationSchema={bankAccountDetailsValidationSchema}
      onSubmit={handleBankAccountDetailsFormSubmit}
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
        const renderTextField = (fieldName, label, options = {}) => (
          <CustomTextField
            label={label}
            required={options.required}
            placeholder={label}
            placeholderTextColor={colors.SilverGray}
            value={values[fieldName]}
            onChangeText={text => {
              setFieldValue(fieldName, text);
              dispatch(setBankAccountDetails({[fieldName]: text}));
            }}
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
                <DropdownFieldWithModal
                  required={true}
                  label={'Bank Province'}
                  options={categoriesList}
                  selectedValue={values.bankProvince}
                  onSelect={item => {
                    setFieldValue('bankProvince_name', item.name);
                    dispatch(
                      setBankAccountDetails({
                        bankProvince: item,
                        bankProvince_name: item.name,
                      }),
                    );
                  }}
                  getOptionLabel={item => item.name}
                  getOptionValue={item => item.name}
                  placeholder={'Bank Province'}
                  error={touched.bankProvince_name && errors.bankProvince_name}
                />

                <DropdownFieldWithModal
                  required={true}
                  label={'Bank Name'}
                  options={categoriesList}
                  selectedValue={values.bankName}
                  onSelect={item => {
                    setFieldValue('bankName_name', item.name);
                    dispatch(
                      setBankAccountDetails({
                        bankName: item,
                        bankName_name: item.name,
                      }),
                    );
                  }}
                  getOptionLabel={item => item.name}
                  getOptionValue={item => item.name}
                  placeholder={'Bank Name'}
                  error={touched.bankName_name && errors.bankName_name}
                />

                {renderTextField(
                  'bankAccountHolderName',
                  'Bank Account Holder Name',
                  {
                    required: true,
                  },
                )}

                {renderTextField('bankAccountNumber', 'Bank Account Number', {
                  keyboardType: 'numeric',
                  required: true,
                })}

                {renderTextField('IBAN_Code', 'IBAN Code', {required: false})}

                {renderTextField('Swift_Code', 'Swift Code', {required: false})}
              </View>
              <AppButton
                buttonStyle={{marginBottom: 16}}
                title={i18n.t('SaveContinue')}
                onPress={handleSubmit}
                // disabled={!isValid}
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
          </>
        );
      }}
    </Formik>
  );
};
export default BankAccountDetailsForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: "red",
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
  checkBoxLabel_txt: {
    fontSize: 12,
    color: colors.DimGray,
    lineHeight: 14 * 1.6,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
  },
});

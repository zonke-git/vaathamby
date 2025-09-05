import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DashLayout from '../layout/DashLayout';
import {i18n} from '../../localization';
import AppButton from '../../components/AppButton/AppButton';
import colors from '../../Theme/colors';
import {Formik} from 'formik';
import {useAddProduct} from '../../hooks';
import {CustomTextField, DropdownFieldWithModal} from '../../components';
import {setAddMenuDetails} from '../../redux/slice/catalogueSlice';
import {addMenuDetailsValidationSchema} from '../schema/validationSchemas';
import FileUploadField from '../auth/Onboard/FileUploadField';
import {typography} from '../../Theme/typography';
import {getDisplayImageUri} from '../../utils/getDisplayImageUri';
import {Text} from 'react-native';

const AddProduct = () => {
  const {
    IsLoader,
    menuProductTypesLoading,
    OutletsLoading,
    subCategoriesLoading,
    menuTagValuesLoading,
    isPhotoLoader,
    isModalVisible,
    addMenuFormDetails,
    OutletsList,
    menuProductTypes,
    menuTagValues,
    menuTagTypes,
    menuStatusEdit,

    setIsModalVisible,
    handleOutletSelect,
    handleDocumentPick,
    handleImagePick,
    handleCancel,
    handleAddMenuSubmit,
    dispatch,
    handleProductType,
    getImageUri,
    backButtonFunction,
  } = useAddProduct();

  return (
    <DashLayout
      title={i18n.t('Catalogue')}
      subTitleBelow={i18n.t('AddProduct')}
      backButton
      loader={
        IsLoader ||
        isPhotoLoader ||
        menuProductTypesLoading ||
        OutletsLoading ||
        subCategoriesLoading ||
        menuTagValuesLoading
      }
      backButtonFunction={backButtonFunction}>
      <Formik
        initialValues={addMenuFormDetails}
        validationSchema={addMenuDetailsValidationSchema}
        onSubmit={handleAddMenuSubmit}
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
              onChangeText={
                options.onChangeText ||
                (text => {
                  let processedText = text;

                  // If custom sanitizer provided, apply it
                  if (typeof options.onTextChange === 'function') {
                    processedText = options.onTextChange(text);
                  }

                  setFieldValue(fieldName, processedText);
                  dispatch(setAddMenuDetails({[fieldName]: processedText}));
                })
              }
              onBlur={handleBlur(fieldName)}
              error={showErrorMsg || (touched[fieldName] && errors[fieldName])}
              keyboardType={options.keyboardType}
              multiline={options.multiline}
              numberOfLines={options.numberOfLines}
              showVerification={showVerification}
              editable={!options.disabled}
              multilineInputStyle={{alignSelf: 'flex-start'}}
            />
          );

          return (
            <>
              <View style={styles.formContainer}>
                <ScrollView style={styles.container}>
                  {/* <View style={styles.fieldsContainer}> */}
                  <DropdownFieldWithModal
                    required={true}
                    label={i18n.t('SelectOutlet')}
                    options={OutletsList}
                    selectedValue={values.Outlet}
                    onSelect={item => {
                      setFieldValue('Outlet_name', item.outletName);
                      handleOutletSelect(item);
                    }}
                    getOptionLabel={item => item.outletName}
                    getOptionValue={item => item.outletName}
                    placeholder={i18n.t('SelectOutlet')}
                    error={errors.Outlet_name}
                  />

                  {renderTextField('ProductName', `${i18n.t('ProductName')}`, {
                    required: true,
                    onChangeText: text => {
                      const allowed = /^[a-zA-Z0-9&'() ]*$/;
                      if (allowed.test(text)) {
                        setFieldValue('ProductName', text);
                        dispatch(setAddMenuDetails({ProductName: text}));
                      }
                    },
                  })}

                  <DropdownFieldWithModal
                    required={true}
                    label={i18n.t('ProductType')}
                    options={menuProductTypes}
                    selectedValue={values.ProductType}
                    onSelect={item => {
                      setFieldValue('ProductType_name', item.name);
                      handleProductType(item);
                    }}
                    getOptionLabel={item => item.name}
                    getOptionValue={item => item.name}
                    placeholder={i18n.t('ProductType')}
                    error={touched.ProductType_name && errors.ProductType_name}
                  />

                  <DropdownFieldWithModal
                    // required={true}
                    label={i18n.t('TagValue')}
                    options={menuTagValues}
                    selectedValue={values.TagValue}
                    onSelect={item => {
                      setFieldValue('TagValue_name', item.name);
                      dispatch(
                        setAddMenuDetails({
                          TagValue: item,
                          TagValue_name: item.name,
                        }),
                      );
                    }}
                    getOptionLabel={item => item.name}
                    getOptionValue={item => item.name}
                    placeholder={i18n.t('TagValue')}
                    error={touched.TagValue_name && errors.TagValue_name}
                  />

                  {renderTextField('Price', `${i18n.t('Price')}`, {
                    required: true,
                    keyboardType: 'numeric',
                    onTextChange: text => {
                      // Keep only digits
                      const sanitized = text.replace(/[^0-9]/g, '');

                      // Allow only up to 6 digits
                      if (sanitized.length > 6) return sanitized.slice(0, 6);

                      return sanitized;
                    },
                  })}

                  {renderTextField('Description', `${i18n.t('Description')} `, {
                    required: false,
                    multiline: true,
                    numberOfLines: 4,
                  })}

                  <View style={styles.fullWidthImageWrapper}>
                    {addMenuFormDetails?.Photo ? (
                      <>
                        <Text style={styles.label}>Photo</Text>
                        <View style={styles.imageContainer}>
                          <Image
                            source={{
                              uri: getDisplayImageUri(
                                addMenuFormDetails?.Photo,
                              ),
                            }}
                            style={styles.image}
                          />

                          <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
                              handleImagePick('Photo');
                            }}>
                            <Image
                              source={require('../../assets/images/Close.png')}
                              style={styles.addIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        <FileUploadField
                          label={i18n.t('Photo')}
                          required={false}
                          file={values?.Photo}
                          onPick={() => {
                            handleImagePick('Photo');
                          }}
                          onCancel={() => handleCancel('Photo')}
                          error={errors.registerationCertificate}
                          PreViewImage={true}
                        />
                      </>
                    )}
                  </View>
                  {/* </View> */}
                </ScrollView>
                <View style={{padding: 24, paddingTop: 0}}>
                  <AppButton
                    buttonStyle={styles.button}
                    title={
                      menuStatusEdit
                        ? i18n.t('EditProduct')
                        : i18n.t('AddProduct')
                    }
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
              </View>
            </>
          );
        }}
      </Formik>
    </DashLayout>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    // justifyContent: "space-between",
    padding: 24,
    // justifyContent: 'flex-end',
    // marginBottom: 50,
    // paddingBottom: 54,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
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
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  placeholder: {
    color: '#999',
  },
  icon: {
    height: 24,
    width: 24,
    marginLeft: 8,
    color: '#666',
  },
  fullWidthImageWrapper: {
    marginBottom: 24,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 16,
    aspectRatio: 2, // Wider aspect ratio for the first image
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },

  addIcon: {
    width: 22,
    height: 22,
    tintColor: colors.FireEngineRed,
    // alignSelf: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    // alignSelf: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  button: {
    // marginBottom: 50,
    // margin: 24,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.DimGray,
    lineHeight: 12 * 1.6,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
});

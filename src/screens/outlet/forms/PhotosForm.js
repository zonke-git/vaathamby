/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import {i18n} from '../../../localization';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import AppButton from '../../../components/AppButton/AppButton';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {ConfirmActionModal} from '../../../components';
import {usePhotoForm} from '../../../hooks';

const PhotosForm = ({loader}) => {
  const {
    outletSingleStep,
    PhotosFormDetails_SubmitError,
    PhotosFormDetails_IsLoader,
    PhotosFormDetails_SubmitErrorMessage,
    PhotosFormValues,
    photosArray,
    firstPhoto,
    remainingPhotos,
    visible,
    imageToDeleteIndex,

    handlePhotosDetailsFormSubmit,
    handlePrevious,
    dispatch,
    getImageUri,
    handleDeleteImage,
    handleImagePicker,
    handleLikeImage,
    setVisible,
    setImageToDeleteIndex,
    isAtLeastOneImageSelected,
    isFormValid,
  } = usePhotoForm();

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.labelStyle}>
            {i18n.t('YouCanAddAaximum_5_photos')}
          </Text>

          <View style={styles.fullWidthImageWrapper}>
            {getImageUri(firstPhoto) ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: getImageUri(firstPhoto)}}
                  style={styles.image}
                />
                <TouchableOpacity
                  style={[
                    styles.deleteButton,
                    {
                      right: 48,
                    },
                  ]}
                  onPress={() => handleLikeImage(0)}>
                  <Image
                    source={
                      firstPhoto?.liked
                        ? require('../../../assets/images/filledStar.png')
                        : require('../../../assets/images/star.png')
                    }
                    style={styles.colorChange}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    setImageToDeleteIndex(0);
                    setVisible(true);
                  }}>
                  <Image
                    source={require('../../../assets/images/delete.png')}
                    style={styles.deteleIcon}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.selectImageBox}
                onPress={() => handleImagePicker(0)}>
                  <Text>+</Text>
                {/* <Icon name="add" size={24} color={colors.LightGray} /> */}
              </TouchableOpacity>
            )}
          </View>

          {/* 2x2 grid for remaining photos */}
          <View style={styles.gridContainer}>
            {remainingPhotos.map((photo, index) => (
              // We use index + 1 because we've removed the first photo
              <View key={index + 1} style={styles.gridImageWrapper}>
                {getImageUri(photo) ? (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: getImageUri(photo)}}
                      style={styles.image}
                    />
                    <TouchableOpacity
                      style={[
                        styles.deleteButton,
                        {
                          right: 48,
                        },
                      ]}
                      onPress={() => handleLikeImage(index + 1)}>
                      <Image
                        source={
                          photo?.liked
                            ? require('../../../assets/images/filledStar.png')
                            : require('../../../assets/images/star.png')
                        }
                        style={styles.colorChange}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => {
                        setImageToDeleteIndex(index + 1);
                        setVisible(true);
                      }}>
                      <Image
                        source={require('../../../assets/images/delete.png')}
                        style={styles.deteleIcon}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.selectImageBox}
                    onPress={() => handleImagePicker(index + 1)}>
                      <Text>+</Text>
                    {/* <Icon name="add" size={24} color={colors.LightGray} /> */}
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        <ConfirmActionModal
          visible={visible}
          onCancel={() => setVisible(false)}
          onConfirm={() => {
            handleDeleteImage(imageToDeleteIndex);
            setVisible(false);
          }}
          title={i18n.t('AreYouSureYouWantToRemoveThisPhoto')}
          cancelText={i18n.t('Cancel')}
          confirmText={i18n.t('RemovePhoto')}
        />
      </ScrollView>

      {outletSingleStep ? (
        <AppButton
          onPress={handlePhotosDetailsFormSubmit}
          title={i18n.t('Save')}
          buttonStyle={[styles.btnStyles, {width: '100%'}]}
          useColors={
            !isFormValid()
              ? [colors.LightMistGray, colors.LightMistGray]
              : [colors.appTheme, colors.appTheme]
          }
          textStyle={{
            color: !isFormValid() ? colors.sliverBorderColor : colors.white,
          }}
          disabled={!isFormValid()}
        />
      ) : (
        <>
          <View style={styles.btnView}>
            <AppButton
              onPress={handlePrevious}
              title={i18n.t('Previous')}
              useColors={[colors.white, colors.white]}
              textStyle={{color: colors.appTheme}}
              buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
            />
            <AppButton
              onPress={handlePhotosDetailsFormSubmit}
              title={i18n.t('Save_Next')}
              buttonStyle={styles.btnStyles}
              useColors={
                !isFormValid()
                  ? [colors.LightMistGray, colors.LightMistGray]
                  : [colors.appTheme, colors.appTheme]
              }
              textStyle={{
                color: !isFormValid() ? colors.sliverBorderColor : colors.white,
              }}
              disabled={!isFormValid()}
            />
          </View>
        </>
      )}
    </>
  );
};

export default PhotosForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    paddingTop: 20,
  },
  labelStyle: {
    fontSize: 16,
    marginBottom: 16,
    color: colors.EerieBlack,
    lineHeight: 16 * 1.4,
    letterSpacing: 16 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '48%',
    marginBottom: 16,
    aspectRatio: 1,
  },
  selectImageBox: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.LightGray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.BoxShadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        shadowColor: colors.BoxShadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.48,
        shadowRadius: 4,
        elevation: 4,
      },
    }),
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
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
  deteleIcon: {
    width: 17,
    height: 17,
    tintColor: colors.FireEngineRed,
  },
  colorChange: {width: 17, height: 17, tintColor: colors.AmberOrange},
  fullWidthImageWrapper: {
    width: '100%',
    marginBottom: 16,
    aspectRatio: 2, // Wider aspect ratio for the first image
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridImageWrapper: {
    width: '48%',
    marginBottom: 16,
    aspectRatio: 1,
  },
  //modal
});

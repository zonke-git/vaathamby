/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  Image,
  BackHandler,
} from 'react-native';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {i18n} from '../../../localization';
import AppButton from '../../../components/AppButton/AppButton';
import {ConfirmActionModal} from '../../../components';
import {useFocusEffect} from '@react-navigation/native';

const ProductBottomModal = ({
  visible,
  onClose,
  children,
  item,
  handleDeleteMenuByID,
  handleEditMenuByID,
  setOpenDeleteModal,
  openDeleteModal,
  setDeleteProductDataId,
}) => {
  // console.log('ProductBottomModal item ::', item);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          onClose();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [visible, onClose]),
  );

  return (
    <>
      {openDeleteModal ? (
        <>
          {/* <ConfirmActionModal
            visible={openDeleteModal}
            onCancel={() => setOpenDeleteModal(false)}
            onConfirm={() => {
              handleDeleteMenuByID(item?._id);
              setOpenDeleteModal(false);
              onClose();
            }}
            title={i18n.t('AreYouSAureYouWantToDeleteThisProduct')}
            cancelText={i18n.t('No')}
            confirmText={i18n.t('Yes')}
          /> */}
        </>
      ) : (
        <Modal
          transparent
          visible={visible}
          animationType="slide"
          statusBarTranslucent>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.handle} />

              <Text style={styles.title_text}>{item.name}</Text>

              <View style={styles.img_view}>
                <Image
                  source={
                    item.coverPhoto
                      ? {uri: item.coverPhoto}
                      : require('../../../assets/images/image-missing.png')
                  }
                  style={[
                    styles.imagePreview,
                    {
                      backgroundColor: item.coverPhoto
                        ? colors.white
                        : colors.VeryLightGray,
                      resizeMode: item.coverPhoto ? 'cover' : 'contain',
                    },
                  ]}
                />
              </View>

              <View style={styles.content_view}>
                <View style={styles.row_view}>
                  <View style={styles.full_space_view}>
                    <Text style={styles.label_text}>{i18n.t('MenuType')}</Text>
                    <Text style={styles.label_value_text}>
                      {item.type?.name}
                    </Text>
                  </View>
                  <View style={styles.full_space_view}>
                    <Text style={styles.label_text}>{i18n.t('Price')}</Text>
                    <Text style={styles.label_value_text}>R{item.price}</Text>
                  </View>
                </View>
                {item.description && (
                  <>
                    <Text style={styles.label_text}>
                      {i18n.t('Description')}
                    </Text>
                    <Text style={styles.label_value_text} numberOfLines={4}>
                      {item.description}
                    </Text>
                  </>
                )}

                <View style={styles.btnView}>
                  <AppButton
                    onPress={() => {
                      setOpenDeleteModal(true);
                      setDeleteProductDataId(item);
                    }}
                    title={i18n.t('DeleteProduct')}
                    useColors={[colors.white, colors.white]}
                    textStyle={{
                      color: colors.appTheme,
                    }}
                    buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
                  />
                  <AppButton
                    onPress={() => handleEditMenuByID(item)}
                    title={i18n.t('Edit')}
                    useColors={
                      false
                        ? [colors.LightMistGray, colors.LightMistGray]
                        : [colors.appTheme, colors.appTheme]
                    }
                    textStyle={{
                      color: false ? colors.LightSlateGray : colors.white,
                    }}
                    buttonStyle={styles.btnStyles}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    // height: '50%',
  },
  handle: {
    width: 48,
    height: 5,
    backgroundColor: '#9C9FA9',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 27,
  },
  content_view: {
    padding: 16,
  },
  title_text: {
    fontSize: 22,
    color: colors.black,
    lineHeight: 24,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Bold_700,
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  img_view: {
    aspectRatio: 375 / 197,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  row_view: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  full_space_view: {
    flex: 1,
  },
  label_text: {
    fontSize: 12,
    color: colors.DeepTwilight,
    lineHeight: 16,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Regular_400,
    marginBottom: 2,
  },
  label_value_text: {
    fontSize: 14,
    color: colors.DeepTwilight,
    lineHeight: 18,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  preBtnStyles: {
    borderWidth: 1.5,
    borderColor: colors.appTheme,
  },
  btnStyles: {width: '45%'},
});

export default ProductBottomModal;

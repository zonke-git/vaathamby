import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {i18n} from '../../../localization';
import AppButton from '../../../components/AppButton/AppButton';
import StatusLabel from './StatusLabel';

const OutletBottomModal = ({
  visible,
  onClose,
  data,
  handleDeleteOutlet,
  handleEdit,
  setOpenDeleteModal,
  openDeleteModal,
  setOpenDeleteModalData,
}) => {
  const subcategoryNames = data?.subcategory?.name;
  // data?.subcategory?.map(item => item.name).join(', ');


const coverPhoto = data?.coverPhoto?.find(photo => photo?.coverphoto === true);
const coverPhotoUrl = coverPhoto?.value || '';

  return (
    <>
      {!openDeleteModal && (
        <Modal
          transparent
          visible={visible}
          animationType="slide"
          onRequestClose={onClose}
          statusBarTranslucent>
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.handle} />

              <Text style={styles.title_text}>{data?.outletName}</Text>
              <TouchableOpacity
                style={styles.outletCard}
                // onPress={() => handleOpenBottomModal(data)}
              >
                {coverPhotoUrl ? (
                  <>
                    <Image
                      source={{uri: coverPhotoUrl}}
                      style={styles.food_imag}
                    />
                  </>
                ) : (
                  <View style={styles.missing_img_view}>
                    <Image
                      source={require('../../../assets/images/image-missing.png')}
                      style={styles.missingImg}
                    />
                  </View>
                )}
                <StatusLabel
                  status={data?.status}
                  style={styles.outletStatus_text}
                />
              </TouchableOpacity>
              <View style={styles.content_view}>
                <View style={styles.row_view}>
                  <View style={styles.full_space_view}>
                    <Text style={styles.label_text}>{i18n.t('Locality')}</Text>
                    <Text style={styles.label_value_text}>
                      {data?.location}
                    </Text>
                  </View>
                </View>
                <View style={styles.row_view}>
                  <View style={styles.full_space_view}>
                    <Text style={styles.label_text}>
                      {i18n.t('ContactPerson')}
                    </Text>
                    <Text style={styles.label_value_text}>
                      {data?.contactName}
                    </Text>
                  </View>
                  <View style={styles.full_space_view}>
                    <Text style={styles.label_text}>
                      {i18n.t('EngagementModel')}
                    </Text>
                    <Text style={styles.label_value_text}>
                      {data?.scanAndPay?.scanAndPay
                        ? 'Scan & Pay (QR Code)'
                        : ''}
                    </Text>
                  </View>
                </View>
                <View style={styles.row_view}>
                  <View style={styles.full_space_view}>
                    <Text style={styles.label_text}>
                      {i18n.t('Cashback') + ' %'}
                    </Text>
                    <Text style={styles.label_value_text}>
                      {data?.scanAndPay?.scanAndPaycashback}
                      {' %'}
                    </Text>
                  </View>
                  <View style={styles.full_space_view}>
                    <Text style={styles.label_text}>
                      {i18n.t('PlatformFee')}
                    </Text>
                    <Text style={styles.label_value_text}>
                      {data?.scanAndPay?.platformFeePercentage} %
                    </Text>
                  </View>
                </View>

                <Text style={styles.label_text}>{i18n.t('Sub_Category')}</Text>
                <Text style={styles.label_value_text}>{subcategoryNames}</Text>

                <View style={styles.btnView}>
                  <AppButton
                    onPress={() => {
                      setOpenDeleteModal(true);
                      setOpenDeleteModalData(data);
                    }}
                    title={i18n.t('DeleteOutlet')}
                    useColors={[colors.white, colors.white]}
                    textStyle={{
                      color: colors.appTheme,
                    }}
                    buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
                  />
                  <AppButton
                    onPress={() => handleEdit(data)}
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
  outletCard: {
    position: 'relative',
    // marginBottom: 8,
    // alignItems: 'center',
    // margin: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        elevation: 4,
      },
      android: {
        elevation: 2,
      },
    }),

    borderWidth: 0.5,
    borderColor: '#EDEDED',
    shadowColor: '#CED3DA',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.45,
    shadowRadius: 6,
  },
  food_imag: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // marginBottom: 8,
  },
  missing_img_view: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.VeryLightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingImg: {
    width: 152,
    height: 152,
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
  outletStatus_text: {
    position: 'absolute',
    fontSize: 14,
    color: colors.EerieBlack,
    fontFamily: typography.SemiBold_600,
    lineHeight: 18,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
    right: 12,
    top: 12,
  },
  content_view: {
    padding: 16,
  },
  row_view: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
    marginRight: 10,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 42,
    marginBottom: 20,
  },
  preBtnStyles: {
    borderWidth: 1.5,
    borderColor: colors.appTheme,
  },
  btnStyles: {width: '45%'},
});

export default OutletBottomModal;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import StatusLabel from './StatusLabel';

const options = [
  {id: 1, name: 'Edit'},
  // {id: 2, name: 'Menu'},
  {id: 5, name: 'Delete Outlet'},
];

const OutletCard = ({
  setOpenShowOptions,
  openShowOptions,
  // coverPhoto,
  outletName,
  status,
  handleDelete,
  outlet_ID,
  index__,
  setOpenIndex,
  openIndex,
  handleOpenBottomModal,
  data,
  handleEdit,
  area,
  address,
  setOpenDeleteModal,
  openDeleteModal,
  handleMenuNavigation,
  setOpenDeleteModalData,
}) => {
  const isMenuOpen = openShowOptions && index__ === openIndex;

// Find the cover photo (where coverphoto: true)
const coverPhoto = data?.coverPhoto?.find(photo => photo?.coverphoto === true);
const coverPhotoUrl = coverPhoto?.value || '';


  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setOpenDeleteModal(false);
          setOpenDeleteModalData(null);
          if (isMenuOpen) {
            setOpenShowOptions(false);
            setOpenIndex(null);
          } else {
            handleOpenBottomModal(data);
          }
        }}>
        <View style={styles.outletCard}>
          {coverPhotoUrl ? (
            <Image source={{uri: coverPhotoUrl}} style={styles.food_imag} />
          ) : (
            <View style={styles.missing_img_view}>
              <Image
                source={require('../../../assets/images/image-missing.png')}
                style={styles.missingImg}
              />
            </View>
          )}

          <View style={styles.nameInfo_view}>
            <Text style={styles.restaurant_name_text}>{outletName}</Text>
            <Text style={styles.restaurant_dec_text}>{data?.location}</Text>
            <Text style={styles.restaurant_dec_text} numberOfLines={3}>
              {data?.subcategory?.name}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setOpenShowOptions(!openShowOptions);
              setOpenIndex(index__);
            }}
            style={styles.selectDotOption}>
            <Image
              source={require('../../../assets/images/dotOptions.png')}
              style={styles.dotOption_img}
            />
          </TouchableOpacity>

          <StatusLabel status={status} style={styles.outletStatus_text} />

          {isMenuOpen && (
            <View style={styles.optionsList_view}>
              {options
                .filter(item => !(status === 'DRAFT' && item.name === 'Menu'))
                .map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      setOpenShowOptions(false);
                      setOpenIndex(null);
                      if (item.name === 'Delete Outlet') {
                        setOpenDeleteModal(true);
                        setOpenDeleteModalData(data);
                      } else if (item.name === 'Edit') {
                        handleEdit();
                      } else {
                        handleMenuNavigation(data);
                      }
                    }}>
                    <Text
                      style={[
                        styles.optionsList_text,
                        {
                          color:
                            item.name === 'Delete Outlet'
                              ? colors.FireEngineRed
                              : colors.EerieBlack,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  outletCard: {
    position: 'relative',
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#EDEDED',
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  food_imag: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  missing_img_view: {
    width: '100%',
    height: 200,
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
  nameInfo_view: {
    margin: 12,
    marginTop: 8,
  },
  restaurant_name_text: {
    fontSize: 16,
    color: colors.RichBlack,
    fontFamily: typography.SemiBold_600,
    lineHeight: 20,
    marginBottom: 2,
  },
  restaurant_dec_text: {
    fontSize: 12,
    color: colors.CharcoalGray,
    fontFamily: typography.Regular_400,
    lineHeight: 16,
    marginBottom: 2,
  },
  selectDotOption: {
    position: 'absolute',
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 30,
    right: 12,
    top: 12,
  },
  dotOption_img: {
    width: 22,
    height: 22,
  },
  optionsList_view: {
    right: 12,
    top: 46,
    position: 'absolute',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    ...Platform.select({
      ios: {elevation: 4},
      android: {elevation: 2},
    }),
    borderWidth: 0.5,
    borderColor: '#EDEDED',
    shadowColor: '#CED3DA',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.45,
    shadowRadius: 6,
  },
  optionsList_text: {
    fontSize: 14,
    fontFamily: typography.Regular_400,
    lineHeight: 18,
    marginBottom: 2,
    padding: 15,
  },
  outletStatus_text: {
    position: 'absolute',
    fontSize: 14,
    fontFamily: typography.SemiBold_600,
    lineHeight: 18,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
    right: 56,
    top: 12,
  },
});

export default OutletCard;

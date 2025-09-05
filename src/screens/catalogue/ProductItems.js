import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {ConfirmActionModal} from '../../components';
import {i18n} from '../../localization';

const options = [
  {id: 1, name: 'Edit'},
  {id: 5, name: 'Delete'},
];

const ProductItems = ({
  handleMenuSelection,
  MenuList,
  handleLoadMore,
  MenuListData,
  setOpenIndex,
  openShowOptions,
  setOpenShowOptions,
  openIndex,
  openDeleteModal,
  setOpenDeleteModal,
  handleDeleteMenuByID,
  handleEditMenuByID,
  setDeleteProductDataId,
}) => {
  const renderItem = ({item, index}) => {
    const isMenuOpen = openShowOptions && index === openIndex;
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            handleMenuSelection(item);
            setOpenShowOptions(false);
            setOpenIndex(null);
          }}
          style={styles.menuBox}
          key={item._id}>
          <View style={styles.img_view}>
            <Image
              source={
                item.coverPhoto
                  ? {uri: item.coverPhoto}
                  : require('../../assets/images/image-missing.png')
              }
              style={[
                styles.imagePreview,
                {resizeMode: item.coverPhoto ? 'cover' : 'contain'},
              ]}
            />
          </View>
          <View style={styles.text_View}>
            <Text style={styles.price_text}>ZAR R{item.price}</Text>
            <Text
              style={styles.name_text}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.name}
            </Text>
            {item.description && (
              <Text style={styles.dec_text} numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              setOpenShowOptions(!openShowOptions);
              setOpenIndex(index);
            }}
            style={styles.selectDotOption}>
            <Image
              source={require('../../assets/images/dotOptions.png')}
              style={styles.dotOption_img}
            />
          </TouchableOpacity>
          {isMenuOpen && (
            <View style={styles.optionsList_view}>
              {options.map(item_OP => (
                <TouchableOpacity
                  key={item_OP.id}
                  onPress={() => {
                    setOpenShowOptions(false);
                    setOpenIndex(null);
                    if (item_OP.name === 'Delete') {
                      setOpenDeleteModal(true);
                      setDeleteProductDataId(item);
                    } else if (item_OP.name === 'Edit') {
                      handleEditMenuByID(item);
                    }
                  }}>
                  <Text
                    style={[
                      styles.optionsList_text,
                      {
                        color:
                          item_OP.name === 'Delete'
                            ? colors.FireEngineRed
                            : colors.EerieBlack,
                      },
                    ]}>
                    {item_OP.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <FlatList
        data={MenuList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{paddingHorizontal: 16}}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          MenuListData?.currentPage < MenuListData?.totalPages ? (
            <ActivityIndicator />
          ) : null
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
  },
  menuBox: {
    marginHorizontal: 5,
    width: '48%',
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#EDEDED',
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#CED3DA73',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  img_view: {
    aspectRatio: 166 / 110,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.VeryLightGray,
  },
  text_View: {
    padding: 8,
    paddingBottom: 12,
  },
  price_text: {
    fontSize: 14,
    color: colors.RichBlack,
    lineHeight: 16,
    fontFamily: typography.SemiBold_600,
    marginBottom: 4,
  },
  name_text: {
    fontSize: 12,
    color: colors.Onyx,
    lineHeight: 20,
    fontFamily: typography.SemiBold_600,
    marginBottom: 4,
  },
  dec_text: {
    fontSize: 10,
    color: colors.CharcoalGray,
    lineHeight: 14,
    fontFamily: typography.Regular_400,
    marginBottom: 4,
  },
  selectDotOption: {
    position: 'absolute',
    backgroundColor: colors.white,
    padding: 3,
    borderRadius: 30,
    right: 5,
    top: 5,
  },
  dotOption_img: {
    width: 15,
    height: 15,
  },
  optionsList_view: {
    right: 12,
    top: 26,
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
    padding: 5,
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

export default ProductItems;

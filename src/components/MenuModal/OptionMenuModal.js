import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {typography} from '../../Theme/typography';
import colors from '../../Theme/colors';
import {i18n} from '../../localization';
import AppButton from '../AppButton/AppButton';

const ArrowIcon = ({down}) => (
  <Image
    source={
      down
        ? require('../../assets/images/downArrow.png')
        : require('../../assets/images/rightArrow.png')
    }
    style={styles.arrowIcon}
  />
);

const OptionMenuModal = ({
  visible,
  onClose,
  menuList,
  title = i18n.t('EditOutlet'),
  themeColors = {
    selected: '#FF5722',
    unselected: '#FFFFFF',
    border: '#999999',
    text: '#000000',
    dot: '#FF5722',
  },
  handleNavigation = () => {},
  handleCancel = () => {},
  handleContinueSetup = () => {},
  ContinueSetupBtnName = '',
}) => {
  //   console.log('menuList', menuList);

  const renderItem = ({item, index}) => (
    <>
      {/* {console.log('item', item)} */}
      <TouchableOpacity
        disabled={!(item?.openEdit || item?.needToEdit)}
        style={styles.menuItem}
        onPress={() => handleNavigation(item)}>
        <View style={styles.OptionsBtnName_view}>
          {item?.needToEdit ? (
            <View style={styles.tickIcon_View}>
              <Image
                source={require('../../assets/images/checkTick.png')}
                style={styles.tickIcon}
              />
            </View>
          ) : (
            <View
              style={[
                styles.outerCircle,
                {
                  borderColor:
                    item?.openEdit || item?.needToEdit
                      ? colors.appTheme
                      : colors.SilverGray,
                },
              ]}>
              {(item?.openEdit || item?.needToEdit) && (
                <View style={[styles.innerCircle]} />
              )}
            </View>
          )}
          <Text
            style={[
              styles.menuText,
              {
                color:
                  item?.openEdit || item?.needToEdit
                    ? colors.RichBlack
                    : colors.SilverGray,
              },
            ]}>
            {item.name}
          </Text>
        </View>
        <ArrowIcon />
      </TouchableOpacity>

      {menuList?.length - 1 === index ? (
        ''
      ) : (
        <View
          style={[
            styles.tickLine,
            {
              backgroundColor: item?.needToEdit
                ? colors.appTheme
                : colors.SilverGray,
            },
          ]}
        />
      )}
    </>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
        activeOpacity={1}
      />
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={styles.modalContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
          <FlatList
            data={menuList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />

          <View style={styles.btnView}>
            <AppButton
              onPress={handleCancel}
              title={i18n.t('Cancel')}
              useColors={[colors.white, colors.white]}
              textStyle={{color: colors.appTheme}}
              buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
            />
            <AppButton
              onPress={handleContinueSetup}
              title={
                ContinueSetupBtnName
                  ? ContinueSetupBtnName
                  : i18n.t('Edit')
              }
              useColors={[colors.appTheme, colors.appTheme]}
              textStyle={{color: colors.white}}
              buttonStyle={styles.btnStyles}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 20,

    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
  },

  OptionsBtnName_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tickIcon_View: {
    backgroundColor: colors.appTheme,
    borderRadius: 30,
    padding: 1.5,
    alignItems: 'center',
    width: 24,
    height: 24,
    // alignContent: 'center',
    // alignSelf: 'center',
    justifyContent: 'center',
  },
  tickIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
  },
  menuText: {
    fontSize: 14,
    color: colors.RichBlack,
    lineHeight: 18,
    fontFamily: typography.SemiBold_600,
    marginLeft: 10,
  },
  tickLine: {
    width: 2,
    height: 40,
    backgroundColor: colors.appTheme,
    left: 10,
  },
  menuTitle: {
    fontSize: 22,
    color: colors.black,
    lineHeight: 24,
    fontFamily: typography.Bold_700,
    paddingBottom: 20,
  },

  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    borderWidth: 2,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.appTheme,
    backgroundColor: colors.white,
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.appTheme,
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
  arrowIcon: {
    width: 30,
    height: 30,
    tintColor: colors.black,
  },
});

export default OptionMenuModal;

import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import DashLayout from '../../layout/DashLayout';
import {i18n} from '../../../localization';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {useAccount} from '../../../hooks';
import {ConfirmActionModal, OptionMenuModal} from '../../../components';
import DeviceInfo from 'react-native-device-info';
import {useRoute} from '@react-navigation/native';

const ArrowIcon = ({down}) => (
  <Image
    source={
      down
        ? require('../../../assets/images/downArrow.png')
        : require('../../../assets/images/rightArrow.png')
    }
    style={styles.arrowIcon}
  />
);

const MenuItem = ({label, onPress, showArrow = true}) => (
  <TouchableOpacity
    style={styles.menuBox}
    activeOpacity={0.8}
    onPress={onPress}>
    <View style={styles.row}>
      <Text style={styles.text}>{label}</Text>
      {showArrow && <ArrowIcon />}
    </View>
  </TouchableOpacity>
);

const MyAccount = () => {
  const route = useRoute();
  // console.log('route', route?.params?.from);

  const {
    isLoader,
    activeMenu,
    openShowOptionMenu,
    menuList,
    isShowLogOutModal,

    navigation,
    handleSelection,
    handleLogOut,
    setActiveMenu,
    setOpenShowOptionMenu,
    handleOptionMenuModalCancel,
    handleEditFormNavigation,
    handleContinueSetup,
    handleTermsAndCondition,
    handlePrivacyPolicy,
    setIsShowLogOutModal,
  } = useAccount();

  useEffect(() => {
    if (route?.params?.from) {
      toggleBusinessMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.from]);

  const toggleBusinessMenu = () => {
    const shouldOpen = !(
      activeMenu === 'BusinessProfile' && openShowOptionMenu
    );
    setActiveMenu(shouldOpen ? 'BusinessProfile' : null);
    setOpenShowOptionMenu(shouldOpen);
  };

  // const buildNumber = DeviceInfo.getBuildNumber();
  const versionNumber = DeviceInfo.getVersion();
  // const formattedVersion = Number.isInteger(Number(buildNumber))
  //   ? `${buildNumber}.0`
  //   : buildNumber;

  return (
    <DashLayout name={true} loader={isLoader}>
      <View style={styles.container}>
        <View style={styles.overAllmenuBox}>
          <TouchableOpacity
            style={[styles.menuBox]}
            activeOpacity={0.8}
            onPress={toggleBusinessMenu}>
            <View style={styles.row}>
              <Text style={styles.text}>{i18n.t('BusinessProfile')}</Text>
              <ArrowIcon down={openShowOptionMenu} />
            </View>
          </TouchableOpacity>
        </View>

        <OptionMenuModal
          title={`Edit ${i18n.t('BusinessProfile')}`}
          visible={openShowOptionMenu}
          onClose={() => setOpenShowOptionMenu(false)}
          menuList={menuList}
          handleNavigation={handleEditFormNavigation}
          handleContinueSetup={handleContinueSetup}
          handleCancel={handleOptionMenuModalCancel}
        />

        <MenuItem
          label={i18n.t('PrivacyPolicy')}
          onPress={handlePrivacyPolicy}
        />
        <MenuItem
          label={i18n.t('TermsAndCondition')}
          onPress={handleTermsAndCondition}
        />
        {/* <MenuItem label={'Set Mpin'} onPress={() => handleSelection('Mpin')} /> */}
        <MenuItem
          label={i18n.t('Logout')}
          onPress={() => {
            setIsShowLogOutModal(true);
          }}
        />

        <MenuItem
          label={i18n.t('DeleteAccount')}
          onPress={() => {
            // setIsShowDeleteAccModal(true);
            navigation.navigate('DeleteAccount');
          }}
        />

        {/* App Version Section */}
        <View style={styles.versionContainer}>
          <Image
            source={require('../../../assets/images/appButtonIcon.png')}
            style={styles.appIcon}
          />
          <Text style={styles.versionText}>Version {versionNumber}</Text>
        </View>
      </View>

      <ConfirmActionModal
        visible={isShowLogOutModal}
        onCancel={() => setIsShowLogOutModal(false)}
        onConfirm={() => {
          handleLogOut();
          setIsShowLogOutModal(false);
        }}
        title={i18n.t('AreYouSureYouWantToLogout')}
        cancelText={i18n.t('No')}
        confirmText={i18n.t('Yes')}
      />
    </DashLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overAllmenuBox: {
    width: '100%',
    // marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  menuBox: {
    width: '100%',
    marginBottom: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#ECECEC',
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  text: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    fontFamily: typography.Medium_500,
  },
  arrowIcon: {
    width: 30,
    height: 30,
    tintColor: colors.black,
  },
  versionContainer: {
    marginTop: 'auto', // Pushes to bottom
    paddingVertical: 16,
    alignItems: 'center',
  },
  appIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  versionText: {
    fontSize: 12,
    color: colors.gray,
    fontFamily: typography.Regular_400,
  },
});

export default MyAccount;

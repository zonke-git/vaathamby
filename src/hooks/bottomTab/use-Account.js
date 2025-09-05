import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBusinessProfileActivityDetails,
  setBusinessProfileComplianceFinancialDetails,
  setBusinessProfileEngagementModelDetails,
  setbusinessProfileFormNumber,
  setbusinessProfileSingleScreen,
  setContactAddressDetails,
} from '../../redux/slice/businessProfileSlice';
import {
  removeAuthToken,
  removeBioMetrics,
  removeMerchant_id,
  removeMPIN,
} from '../../utils/authStorage';
import {logOut} from '../../redux/action/authActions';
import Toast from 'react-native-root-toast';
import {i18n} from '../../localization';
import {setShowForgotPage} from '../../redux/slice/authSlice';

export const useAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoader, setIsLoader] = useState(false);
  const [isShowLogOutModal, setIsShowLogOutModal] = useState(false);
  const [openShowOptionMenu, setOpenShowOptionMenu] = useState(false);
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const [activeMenu, setActiveMenu] = useState('');
  const [menuList] = useState([
    {
      id: 1,
      name: `${i18n.t('BusinessInfo')}`,
      route: '',
      openEdit: true,
      needToEdit: true,
    },
    {
      id: 2,
      name: `${i18n.t('Contact')} ${i18n.t('Details')}`,
      route: '',
      openEdit: true,
      needToEdit: true,
    },
    {
      id: 3,
      name: i18n.t('Documents'),
      route: '',
      openEdit: true,
      needToEdit: true,
    },
    {
      id: 4,
      name: `${i18n.t('Engagement')} ${i18n.t('Model')}`,
      route: '',
      openEdit: true,
      needToEdit: true,
    },
  ]);

  const handleLogOut = async () => {
    setIsLoader(true);
    try {
      const response = await dispatch(logOut(token));
      if (response) {
        await removeAuthToken();
        await removeMPIN();
        await removeMerchant_id();
        await removeBioMetrics();
        dispatch(setShowForgotPage(false));
        navigation.navigate('LogIn');
      } else {
        Toast.show(response?.message || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }
    } catch (error) {
      console.error('LogOut Error:', error);
      Toast.show('Logout failed. Please try again.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setIsLoader(false);
    }
  };

  const handleSelection = (item, formNo = 1) => {
    dispatch(setbusinessProfileFormNumber(formNo));
    dispatch(setbusinessProfileSingleScreen(true));
    navigation.navigate(item);
  };

  const handleOptionMenuModalCancel = () => {
    setOpenShowOptionMenu(false);
  };

  const handleEditFormNavigation = item => {
    dispatch(setBusinessProfileActivityDetails());
    dispatch(setContactAddressDetails());
    dispatch(setBusinessProfileEngagementModelDetails());
    dispatch(setBusinessProfileComplianceFinancialDetails());
    dispatch(setbusinessProfileFormNumber(item?.id));
    dispatch(setbusinessProfileSingleScreen(true));
    navigation.navigate('BusinessProfile');
    setOpenShowOptionMenu(false);
  };

  const handleContinueSetup = () => {
    dispatch(setbusinessProfileFormNumber(1));
    dispatch(setbusinessProfileSingleScreen(false));
    navigation.navigate('BusinessProfile');
    setOpenShowOptionMenu(false);
  };

  const handleTermsAndCondition = () => {
    navigation.navigate('TermsAndCondition');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  return {
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
  };
};

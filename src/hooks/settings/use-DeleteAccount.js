import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount, deleteoptions} from '../../redux/action/authActions';
import {
  getMerchant_id,
  removeAuthToken,
  removeBioMetrics,
  removeMerchant_id,
  removeMPIN,
} from '../../utils/authStorage';
import Toast from 'react-native-root-toast';
import {Linking} from 'react-native';

const otherOptionName = 'Other (please specify)';
export const useDeleteAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isShowDeleteAccModal, setIsShowDeleteAccModal] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [deleteOptions, setDeleteOptions] = useState(false);
  const token = useSelector(state => state?.auth?.authTokenInfo);

  // console.log('deleteOptions', deleteOptions);

  useEffect(() => {
    dispatch(deleteoptions(token))
      .then(response => {
        // console.log('Response ::', response?.DeleteOptions);
        const optionsWithOther = [
          ...response?.DeleteOptions,
          {_id: 'other', name: otherOptionName},
        ];
        setDeleteOptions(optionsWithOther);
      })
      .catch(error => {
        console.error('Delete Options Error:', error);
      });
  }, [dispatch, token]);

  const handleNavigation = () => {
    navigation.navigate('MainApp', {
      screen: 'MyAccount',
    });
  };

  const handleDeleteAccount = async () => {
    setIsLoader(true);
    try {
      let payload = {
        status: true,
        reason: selectedOption,
      };

      if (selectedOption === otherOptionName) {
        payload = {
          ...payload,
          reason: otherReason,
        };
      }

      const merchant_id = await getMerchant_id();
      const response = await dispatch(
        deleteAccount(token, merchant_id, payload),
      );
      if (response) {
        // console.log('Delete Account Response :', response);
        await removeAuthToken();
        await removeMPIN();
        await removeMerchant_id();
        await removeBioMetrics();
        Toast.show(response?.message || 'Delete Accounted', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        navigation.navigate('LogIn');
      } else {
        Toast.show(response?.message || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }
    } catch (error) {
      console.error('Delete Acc Error:', error);
      Toast.show('Delete Acc Failed. Please try again.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } finally {
      setIsLoader(false);
    }
  };

  const isButtonEnabled =
    selectedOption &&
    (selectedOption !== otherOptionName ||
      (selectedOption === otherOptionName && otherReason.trim().length > 0));

  const handleContactSupport = () => {
    const receiverEmail = 'support@zonkeypay.co.za';
    const subject = 'Need help before deleting my account';
    const body =
      'Hi Support Team,\n\nI would like to discuss something before deleting my account. Please assist me.\n\nThanks.';

    const mailUrl = `mailto:${receiverEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailUrl).catch(err =>
      console.warn('Failed to open mail app:', err),
    );
  };
  return {
    isLoader,
    deleteOptions,
    selectedOption,
    otherReason,
    isShowDeleteAccModal,
    otherOptionName,

    setIsLoader,
    handleNavigation,
    handleDeleteAccount,
    setSelectedOption,
    setOtherReason,
    isButtonEnabled,
    setIsShowDeleteAccModal,
    handleContactSupport,
  };
};

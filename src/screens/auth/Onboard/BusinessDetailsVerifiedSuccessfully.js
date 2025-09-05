import React, {useCallback} from 'react';
import {View, StyleSheet, Text, BackHandler} from 'react-native';
import FastImage from 'react-native-fast-image';
import SuccessfullyLayout from '../../layout/SuccessfullyLayout';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {i18n} from '../../../localization';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AppButton from '../../../components/AppButton/AppButton';
import {useSelector} from 'react-redux';

const BusinessDetailsVerifiedSuccessfully = () => {
  const navigation = useNavigation();
  const walletId = useSelector(
    state =>
      state?.businessProfile?.merchantDetailsdata?.merchant?.walletId?.details
        ?.data?.walletId,
  );
  const merchantID = useSelector(
    state => state?.businessProfile?.merchantDetailsdata?.merchant?.merchantID,
  );
  const businessName = useSelector(
    state =>
      state?.businessProfile?.merchantDetailsdata?.merchant?.business_name,
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <SuccessfullyLayout>
      <View style={styles.container}>
        <View style={styles.contentView}>
          <FastImage
            source={require('../../../assets/images/success.gif')}
            style={styles.tickIcon}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.successText}>Wallet Created Successfully!</Text>

          <View style={styles.detailsContainer}>
            {/* Wallet ID */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Wallet ID:</Text>
              <Text style={styles.value}>{walletId}</Text>
            </View>

            {/* Merchant Account Number */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Merchant Account Number:</Text>
              <Text style={styles.value}>{merchantID}</Text>
            </View>

            {/* Business Name */}
            <View style={styles.detailRow}>
              <Text style={styles.label}>Business Name:</Text>
              <Text style={styles.value}>{businessName}</Text>
            </View>
          </View>

          <Text style={styles.readyMsg_Text}>Your Zonke Wallet is ready.</Text>
          <Text style={styles.readyMsg_Text}>
            Complete your profile and sign your agreement to start receiving
            payments.
          </Text>
        </View>
        <AppButton
          buttonStyle={styles.buttonStyle}
          title={i18n.t('Continue')}
          onPress={() => navigation.navigate('Mpin')}
          useColors={[colors.appTheme, colors.appTheme]}
        />
      </View>
    </SuccessfullyLayout>
  );
};

export default BusinessDetailsVerifiedSuccessfully;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
    justifyContent: 'space-between',
  },
  contentView: {
    alignItems: 'center',
  },
  tickIcon: {
    width: 200,
    height: 200,
  },
  successText: {
    fontSize: 20,
    lineHeight: 36,
    color: colors.RichBlack,
    fontFamily: typography.SemiBold_600,
    marginBottom: 24,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    width: '45%',
    fontSize: 14,
    color: colors.SimplyCharcoal,
    fontFamily: typography.Regular_400,
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: colors.SimplyCharcoal,
    fontFamily: typography.SemiBold_600,
  },
  readyMsg_Text: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.SimplyCharcoalDarkGray,
    fontFamily: typography.Regular_400,
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonStyle: {
    marginBottom: 16,
  },
});

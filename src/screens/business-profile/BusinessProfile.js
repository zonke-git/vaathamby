import React from 'react';
import {View, StyleSheet} from 'react-native';
import AuthLayout from '../layout/AuthLayout';
import ProgressBar from '../auth/Onboard/ProgressBar';
import {i18n} from '../../localization';
import BusinessProfileActivityDetailsForm from './forms/BusinessProfileActivityDetailsForm';
import ContactAddressDetailsForm from './forms/ContactAddressDetailsForm';
import ComplianceFinancialDetailsForm from './forms/ComplianceFinancialDetailsForm';
import BankAccountDetailsForm from './forms/BankAccountDetailsForm';
import {useBusinessProfile} from '../../hooks/businessProfile/use-businessProfile';
import BusinessProfileEngagementModel from './forms/BusinessProfileEngagementModel';

const BusinessProfile = () => {
  const {
    businessProfileFormNumber,
    merchantDetailsLoader,
    businessProfileAndActivityDetailsLoader,
    contactDetailsLoader,
    engagementModelDetailsLoader,
    financeDetailsLoader,
    bankDetailsLoader,
  } = useBusinessProfile();

  return (
    <AuthLayout
      title={i18n.t('BusinessProfile')}
      topStyle={{flex: 0.085}}
      loader={
        merchantDetailsLoader ||
        businessProfileAndActivityDetailsLoader ||
        contactDetailsLoader ||
        engagementModelDetailsLoader ||
        financeDetailsLoader ||
        bankDetailsLoader
      }>
      <View style={styles.container}>
        <ProgressBar
          CUSTOM_NUM_BARS={4}
          filledUpto={businessProfileFormNumber}
          title={
            businessProfileFormNumber === 1
              ? `${i18n.t('BusinessInfo')}`
              : businessProfileFormNumber === 2
              ? `${i18n.t('Contact')} ${i18n.t('Details')}`
              : businessProfileFormNumber === 3
              ? i18n.t('Documents')
              : businessProfileFormNumber === 4
              ? `${i18n.t('Engagement')} ${i18n.t('Model')}`
              : businessProfileFormNumber === 5
              ? 'Bank Account Details'
              : null
          }
        />
        {businessProfileFormNumber === 1 ? (
          <>
            <BusinessProfileActivityDetailsForm />
          </>
        ) : businessProfileFormNumber === 2 ? (
          <>
            <ContactAddressDetailsForm />
          </>
        ) : businessProfileFormNumber === 3 ? (
          <>
            <ComplianceFinancialDetailsForm />
          </>
        ) : businessProfileFormNumber === 4 ? (
          <>
            <BusinessProfileEngagementModel />
          </>
        ) : businessProfileFormNumber === 5 ? (
          <>
            <BankAccountDetailsForm />
          </>
        ) : null}
      </View>
    </AuthLayout>
  );
};

export default BusinessProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

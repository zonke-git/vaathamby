import React from 'react';
import {View, StyleSheet} from 'react-native';
import AuthLayout from '../../layout/AuthLayout';
import ProgressBar from './ProgressBar';
import ContactDetailsForm from './Forms/ContactDetailsForm';
import ComplianceAndFinancialDetails from './Forms/ComplianceAndFinancialDetails';
import EngagementModel from './Forms/EngagementModel';
import {useOnboard} from '../../../hooks';
import BusinessDetailsForm from './Forms/BusinessDetailsForm';
import {i18n} from '../../../localization';
import AnnexuresAndAgreementForm from './Forms/AnnexuresAndAgreementForm';

const Onboard = () => {
  const {
    onBoardFormNumber,
    dispatch,
    businessDetails_IsLoader,
    RequestEmail_OTP_Loader,
    contactDetails_Loader,
    complianceFinancialDetails_Loader,
    engagementModelDetails_Loader,
    annexureList_Loader,
  } = useOnboard();

  return (
    <AuthLayout
      title={i18n.t('HelloLetsGetYouOnboard')}
      loader={
        businessDetails_IsLoader ||
        RequestEmail_OTP_Loader ||
        contactDetails_Loader ||
        complianceFinancialDetails_Loader ||
        engagementModelDetails_Loader ||
        annexureList_Loader
      }>
      <View style={styles.container}>
        <ProgressBar
          CUSTOM_NUM_BARS={4}
          filledUpto={onBoardFormNumber}
          title={
            onBoardFormNumber === 1
              ? i18n.t('BusinessVerification')
              : onBoardFormNumber === 2
              ? i18n.t('ContactDetails')
              : // : onBoardFormNumber === 3
              // ? i18n.t('ComplianceFinancialDetails')
              onBoardFormNumber === 3
              ? i18n.t('EngagementModel')
              : onBoardFormNumber === 4
              ? null
              : null
          }
        />
        {onBoardFormNumber === 1 ? (
          <BusinessDetailsForm loader={businessDetails_IsLoader} />
        ) : onBoardFormNumber === 2 ? (
          <ContactDetailsForm />
        ) : // ) : onBoardFormNumber === 3 ? (
        // <ComplianceAndFinancialDetails />
        onBoardFormNumber === 3 ? (
          <EngagementModel />
        ) : onBoardFormNumber === 4 ? (
          <AnnexuresAndAgreementForm />
        ) : null}
      </View>
    </AuthLayout>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    padding: 24,
  },
});

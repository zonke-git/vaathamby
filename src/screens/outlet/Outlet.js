import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useOutlet} from '../../hooks/outlet/use-outlet';
import DashLayout from '../layout/DashLayout';
import {i18n} from '../../localization';
import ProgressBar from '../auth/Onboard/ProgressBar';
import OutletInfoForm from './forms/OutletInfoForm';
import DocumentForm from './forms/DocumentForm';
import OutletCharacteristics from './forms/OutletCharacteristicsForm';
import TimingsForm from './forms/TimingsForm';
import PhotosForm from './forms/PhotosForm';
import EngagementModelForm from './forms/EngagementModelForm';

const Outlet = () => {
  const {
    outletFormumber,
    subCategoriesLoading,
    outletInfoDetails_IsLoader,
    documentDetails_IsLoader,
    engagementModelDetails_IsLoader,
    photosDetails_IsLoader,
    outletCharacteristicsDetails_IsLoader,
    timingsDetails_IsLoader,
    IsFacilitysLoader,
    outletFormStatusEdit,
    backButtonFunction,
    dispatch,
  } = useOutlet();

  return (
    <DashLayout
      title={
        outletFormStatusEdit ? i18n.t('EditOutlet') : i18n.t('CreateOutlet')
      }
      loader={
        subCategoriesLoading ||
        outletInfoDetails_IsLoader ||
        documentDetails_IsLoader ||
        engagementModelDetails_IsLoader ||
        outletCharacteristicsDetails_IsLoader ||
        photosDetails_IsLoader ||
        timingsDetails_IsLoader ||
        IsFacilitysLoader
      }
      showsScrollIndicator={true}
      backButton
      backButtonFunction={backButtonFunction}>
      <View style={styles.container}>
        <ProgressBar
          CUSTOM_NUM_BARS={5}
          filledUpto={outletFormumber}
          title={
            outletFormumber === 1
              ? i18n.t('OutletInfo')
              : // : outletFormumber === 2
              // ? i18n.t('Documents')
              outletFormumber === 2
              ? i18n.t('Characteristics')
              : outletFormumber === 3
              ? i18n.t('Timings')
              : outletFormumber === 4
              ? i18n.t('Photos')
              : outletFormumber === 5
              ? i18n.t('EngagementModel')
              : null
          }
        />
        {outletFormumber === 1 ? (
          <OutletInfoForm loader={false} />
        ) : // ) : outletFormumber === 2 ? (
        // <DocumentForm />
        outletFormumber === 2 ? (
          <OutletCharacteristics />
        ) : outletFormumber === 3 ? (
          <TimingsForm />
        ) : outletFormumber === 4 ? (
          <PhotosForm />
        ) : outletFormumber === 5 ? (
          <EngagementModelForm />
        ) : null}
      </View>
    </DashLayout>
  );
};

export default Outlet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    padding: 24,
  },
});

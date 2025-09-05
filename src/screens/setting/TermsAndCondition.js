import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DashLayout from '../layout/DashLayout';
import {i18n} from '../../localization';
import {useTermsAndCondition} from '../../hooks';
import RenderHTML from 'react-native-render-html';
import {AppButton} from '../../components';
import colors from '../../Theme/colors';

const TermsAndCondition = () => {
  const {
    width,
    termsAndConditions,
    termsAndConditionsLoading,
    handleNavigation,
  } = useTermsAndCondition();
  return (
    <DashLayout
      title={i18n.t('TermsAndCondition')}
      backButton
      loader={termsAndConditionsLoading}
      backButtonFunction={handleNavigation}>
      {!termsAndConditionsLoading && (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator>
            <RenderHTML
              contentWidth={width}
              source={{html: termsAndConditions?.TermsAndConditions}}
              ignoredDomTags={['link']}
            />
          </ScrollView>
          <View style={styles.scrollContent}>
            <AppButton
              title={i18n.t('OK')}
              onPress={handleNavigation}
              useColors={[colors.appTheme, colors.appTheme]}
            />
          </View>
        </>
      )}
    </DashLayout>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
  },
});

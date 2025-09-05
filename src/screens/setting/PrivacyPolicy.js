import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DashLayout from '../layout/DashLayout';
import {i18n} from '../../localization';
import {usePrivacyPolicy} from '../../hooks';
import RenderHTML from 'react-native-render-html';
import colors from '../../Theme/colors';
import {AppButton} from '../../components';

const PrivacyPolicy = () => {
  const {width, privacyPolicys, privacyPolicysLoading, handleNavigation} =
    usePrivacyPolicy();
  return (
    <DashLayout
      title={i18n.t('PrivacyPolicy')}
      backButton
      loader={privacyPolicysLoading}
      backButtonFunction={handleNavigation}>
      {!privacyPolicysLoading && (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator>
            <RenderHTML
              contentWidth={width}
              source={{html: privacyPolicys?.privacyPolicys}}
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

export default PrivacyPolicy;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
  },
});

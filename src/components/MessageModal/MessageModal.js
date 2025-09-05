import React, {useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';

import AppButton from '../AppButton/AppButton';
import FullScreenLoader from '../Loader/FullScreenLoader';
import colors from '../../Theme/colors';
import {i18n} from '../../localization';
import {
  getPrivacyPolicys,
  getTermsAndConditions,
} from '../../redux/action/onBoardActions';

const MessageModal = ({visible, onClose, title = 'Notice'}) => {
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const {privacyPolicys, privacyPolicysLoading} = useSelector(
    state => state?.onBoard,
  );
  const {termsAndConditions, termsAndConditionsLoading} = useSelector(
    state => state?.onBoard,
  );

  useEffect(() => {
    dispatch(getPrivacyPolicys(token));
    dispatch(getTermsAndConditions(token));
  }, [dispatch, token]);

  const isLoading = privacyPolicysLoading || termsAndConditionsLoading;
  const htmlContent =
    title === 'Terms and Condition'
      ? termsAndConditions?.TermsAndConditions
      : privacyPolicys?.privacyPolicys;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {isLoading ? (
            <FullScreenLoader whitebackground={true} />
          ) : (
            <>
              {htmlContent && (
                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator>
                  <RenderHTML
                    contentWidth={width}
                    source={{html: htmlContent}}
                    ignoredDomTags={['link']}
                  />
                </ScrollView>
              )}
              <AppButton
                title={i18n.t('OK')}
                onPress={onClose}
                useColors={[colors.appTheme, colors.appTheme]}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '95%',
    height: '90%',
    alignItems: 'center',
    elevation: 10,
  },
  scrollContent: {
    paddingBottom: 30,
  },
});

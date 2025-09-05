import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {AppButton} from '../../components';

const DeleteAccountSupportScreenModal = ({
  visible,
  title,
  subTitle,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  handleBack,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent
      onRequestClose={handleBack}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>

          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
          <AppButton
            onPress={onCancel}
            title={cancelText}
            useColors={[colors.white, colors.white]}
            textStyle={{
              color: colors.appTheme,
            }}
            buttonStyle={{
              marginBottom: 30,
              borderColor: colors.appTheme,
              borderWidth: 1.5,
            }}
          />
          <AppButton
            onPress={onConfirm}
            title={confirmText}
            useColors={[colors.appTheme, colors.appTheme]}
            textStyle={{
              color: colors.white,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountSupportScreenModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 16,
    width: '100%',
    maxWidth: 380,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.RichBlack,
    fontFamily: typography.SemiBold_600,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 14,
    color: colors.RichBlack,
    fontFamily: typography.Regular_400,
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 16,
  },
  cancelButton: {
    // flex: 1,
    backgroundColor: colors.greyLight,
    paddingVertical: 12,
    borderRadius: 10,
  },
  confirmButton: {
    // flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
  },
  cancelText: {
    fontSize: 14,
    color: colors.RichBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
  confirmText: {
    fontSize: 14,
    color: colors.RichBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
});

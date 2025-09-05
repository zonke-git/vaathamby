import React from 'react';
import {Modal, View, Text, Image, StyleSheet} from 'react-native';
import AppButton from '../AppButton/AppButton'; // adjust path as per your folder structure
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {i18n} from '../../localization';

const ConfirmActionModal = ({
  visible = false,
  onCancel,
  onConfirm,
  title = '',
  confirmText = 'Confirm',
  cancelText = i18n.t('Cancel'),
  icon = require('../../assets/images/Alter.png'),
  showErrorMsg = false,
  handleAnotherButton = false,
  handleAnotherButtonFun = () => {},
  containerStyle = {},
  fullBtn = {},
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {icon && <Image source={icon} style={styles.alterIcon} />}
          <Text style={styles.title}>{title}</Text>

          <View style={[styles.btnView, containerStyle]}>
            <AppButton
              onPress={handleAnotherButton ? handleAnotherButtonFun : onCancel}
              title={cancelText}
              useColors={[colors.white, colors.white]}
              textStyle={{color: colors.appTheme}}
              buttonStyle={[
                styles.modalBtnStyles,
                styles.preBtnStyles,
                fullBtn,
              ]}
            />
            <AppButton
              onPress={onConfirm}
              title={confirmText}
              useColors={
                showErrorMsg
                  ? [colors.LightMistGray, colors.LightMistGray]
                  : [colors.appTheme, colors.appTheme]
              }
              textStyle={{
                color: showErrorMsg ? colors.LightSlateGray : colors.white,
              }}
              buttonStyle={[styles.modalBtnStyles, fullBtn]}
              disabled={showErrorMsg}
            />
          </View>

          {showErrorMsg && (
            <Text style={styles.toastText}>
              Cannot delete this outlet. One or more products are currently
              linked to it. Please remove the associated products before
              attempting to delete the outlet.
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmActionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 10,
    margin: 24,
  },
  title: {
    fontSize: 20,
    color: colors.black,
    lineHeight: 24,
    letterSpacing: 20 * (0 / 100),
    fontFamily: typography.Bold_700,
  },
  alterIcon: {
    width: 90,
    height: 80,
    marginBottom: 24,
  },
  modalBtnStyles: {
    width: '45%',
  },

  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 0,
    marginTop: 24,
    width: '100%',
    paddingBottom: 10,
  },
  preBtnStyles: {
    borderWidth: 1,
    borderColor: colors.appTheme,
  },
  toastText: {
    fontSize: 11,
    color: colors.appTheme,
    lineHeight: 18,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
    marginTop: 10,
  },
});

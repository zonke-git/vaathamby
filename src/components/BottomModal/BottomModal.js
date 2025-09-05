import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

const BottomModal = ({visible, onClose, children}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <View style={styles.handle} />
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    height: '50%',
  },
  handle: {
    width: 48,
    height: 5,
    backgroundColor: '#9C9FA9',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 27,
  },
});

export default BottomModal;

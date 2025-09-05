/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const SuggestionBottomModal = ({
  visible,
  onClose,
  title,
  options = [],
  selectedValue,
  onSelect,
  getOptionLabel = item => item.label,
  getOptionValue = item => item.value,
  themeColors = {
    selected: '#FF5722',
    unselected: '#FFFFFF',
    border: '#999999',
    text: '#000000',
    dot: '#FF5722',
  },
  isMultiSelect = false,
  maxSelections,
}) => {
  const noOptionsError = !options || options.length === 0;

  // Helper function to check if an item is selected by ID
  const isItemSelected = item => {
    const itemId = getOptionValue(item);

    if (isMultiSelect) {
      return Array.isArray(selectedValue)
        ? selectedValue.some(
            selectedItem => getOptionValue(selectedItem) === itemId,
          )
        : false;
    }
    return selectedValue ? getOptionValue(selectedValue) === itemId : false;
  };

  // Handle item selection
  const handleSelect = item => {
    const itemId = getOptionValue(item);

    if (isMultiSelect) {
      let newSelection;
      const currentSelection = Array.isArray(selectedValue)
        ? [...selectedValue]
        : [];

      // Check if item is already selected
      const selectedIndex = currentSelection.findIndex(
        selectedItem => getOptionValue(selectedItem) === itemId,
      );

      if (selectedIndex >= 0) {
        // Remove item if already selected
        newSelection = [
          ...currentSelection.slice(0, selectedIndex),
          ...currentSelection.slice(selectedIndex + 1),
        ];
      } else {
        // Add item if not selected and under max limit
        if (maxSelections && currentSelection.length >= maxSelections) {
          return; // Don't allow more selections
        }
        newSelection = [...currentSelection, item];
      }

      onSelect(newSelection);
    } else {
      // Handle single select
      onSelect(item);
    }
  };

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
          <Text style={styles.title}>{title}</Text>
          {isMultiSelect && maxSelections && (
            <Text style={styles.selectionInfo}>
              {`Max ${maxSelections} selections`}
            </Text>
          )}

          {noOptionsError ? (
            <View style={styles.noOptionsContainer}>
              <Text style={styles.noOptionsText}>No options available</Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 20,
              }}>
              {options.map((item, index) => {
                const label = getOptionLabel(item);
                const isSelected = isItemSelected(item);
                const isDisabled =
                  isMultiSelect &&
                  maxSelections &&
                  !isSelected &&
                  selectedValue?.length >= maxSelections;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.itemContainer,
                      {
                        paddingHorizontal: 16,
                        backgroundColor: isSelected
                          ? colors.ReddishOrange
                          : themeColors.unselected,
                        opacity: isDisabled ? 0.5 : 1,
                      },
                    ]}
                    onPress={() => !isDisabled && handleSelect(item)}
                    disabled={isDisabled}>
                    <View
                      style={[
                        styles.outerCircle,
                        {
                          borderColor: isSelected
                            ? colors.appTheme
                            : themeColors.border,
                          backgroundColor: isSelected
                            ? themeColors.unselected
                            : 'transparent',
                        },
                      ]}>
                      {isSelected && (
                        <View
                          style={[
                            styles.innerCircle,
                            {
                              backgroundColor: themeColors.dot,
                            },
                          ]}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.label,
                        {
                          fontFamily: isSelected
                            ? typography.Medium_500
                            : typography.Regular_400,
                        },
                      ]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
          {isMultiSelect && (
            <TouchableOpacity style={styles.doneButton} onPress={onClose}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )}
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
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    color: colors.black,
    lineHeight: 24,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Bold_700,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  selectionInfo: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 12,
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    // paddingHorizontal: 20,
    // marginHorizontal: 16,
    // borderRadius: 12,
    // marginBottom: 8,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    borderWidth: 2,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: colors.EerieBlack,
    lineHeight: 20,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Regular_400,
  },
  doneButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noOptionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  noOptionsText: {
    fontSize: 16,
    color: colors.EerieBlack,
    lineHeight: 20,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Regular_400,
  },
});

export default SuggestionBottomModal;

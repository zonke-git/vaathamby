import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import SuggestionBottomModal from '../SuggestionBottomModal/SuggestionBottomModal';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const DropdownFieldWithModal = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
  getOptionLabel = item => item.label,
  getOptionValue = item => item.value,
  required,
  maxSelections,
  error,
  errorStyle,
  AddAllOption = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Determine if we're in multi-select mode
  const isMultiSelect = maxSelections !== undefined;

  // Format the display text based on single or multi-select
  const getDisplayText = () => {
    if (
      !selectedValue ||
      (Array.isArray(selectedValue) && selectedValue.length === 0)
    ) {
      return placeholder;
    }

    if (isMultiSelect) {
      // For multi-select, find selected items by ID in options
      const selectedItems = options?.filter(option =>
        selectedValue.some(
          selected => getOptionValue(selected) === getOptionValue(option),
        ),
      );
      return selectedItems.map(item => getOptionLabel(item)).join(', ');
    }

    // For single select, find the selected item by ID in options
    const selectedItem = options?.find(option => {
      const isMatch = getOptionValue(option) === getOptionValue(selectedValue);
      return isMatch;
    });

    return selectedItem ? getOptionLabel(selectedItem) : placeholder;
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.inputContainer, error && styles.inputError]}
        hitSlop={{top: 0, bottom: 0}}
        onPress={() => setModalVisible(true)}>
        <Text style={[styles.input, !selectedValue && styles.placeholder]}>
          {getDisplayText()}
        </Text>
        <Image
          source={require('../../assets/images/ChevronDown.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
      <SuggestionBottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={label || 'Select an option'}
        options={
          AddAllOption && options
            ? [{outletName: 'All Outlets', _id: 'ALL'}, ...options]
            : options
        }
        selectedValue={selectedValue}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        onSelect={selectedItems => {
          onSelect(selectedItems);
          if (!isMultiSelect) {
            setModalVisible(false);
          }
        }}
        isMultiSelect={isMultiSelect}
        maxSelections={maxSelections}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.DimGray,
    lineHeight: 12 * 1.6,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  required: {
    color: colors.FireEngineRed,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: colors.FireEngineRed,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  placeholder: {
    color: colors.SilverGray,
  },
  icon: {
    height: 24,
    width: 24,
    marginLeft: 8,
    color: '#666',
  },
});

export default DropdownFieldWithModal;

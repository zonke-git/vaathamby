import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const YesNoOption = ({
  label,
  onSelectionChange,
  initialValue = null,
  selectedOption = null,
}) => {
  const handleSelection = value => {
    onSelectionChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleSelection(true)}>
          <View
            style={[
              styles.circle,
              selectedOption === true && styles.selectedCircle,
            ]}>
            {selectedOption === true && <View style={styles.innerCircle} />}
          </View>
          <Text
            style={[
              styles.optionText,
              selectedOption === true && styles.selectedOptionText,
            ]}>
            Yes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleSelection(false)}>
          <View
            style={[
              styles.circle,
              selectedOption === false && styles.selectedCircle,
            ]}>
            {selectedOption === false && <View style={styles.innerCircle} />}
          </View>
          <Text
            style={[
              styles.optionText,
              selectedOption === false && styles.selectedOptionText,
            ]}>
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.EerieBlack,
    lineHeight: 16 * 1.4,
    letterSpacing: 16 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.LightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedCircle: {
    borderColor: colors.appTheme,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.appTheme,
  },
  optionText: {
    fontSize: 16,
    color: colors.DimGray,
    fontFamily: typography.Medium_500,
  },
  selectedOptionText: {
    color: colors.EerieBlack,
    fontFamily: typography.SemiBold_600,
  },
});

export default YesNoOption;

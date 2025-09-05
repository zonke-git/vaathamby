import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format, parse} from 'date-fns';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';

const DatePickerField = ({
  mode = 'date',
  onConfirm,
  onCancel,
  minimumDate,
  maximumDate,
  value,
  buttonStyle,
  textStyle,
  placeholder = 'Select date', // Changed default placeholder text
  placeholderTextColor = colors.SilverGray, // Added new prop for placeholder color
  display = 'default',
  label,
  required = false,
  showDateIcon = true,
  error = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = date => {
    setIsVisible(false);
    const formattedDate = format(date, 'dd/MM/yyyy');
    onConfirm(formattedDate);
  };

  const handleCancel = () => {
    setIsVisible(false);
    if (onCancel) {
      onCancel();
    }
  };

  const getFormattedDate = () => {
    if (!value) {
      return (
        <Text style={[styles.placeholder, {color: placeholderTextColor}]}>
          {placeholder}
        </Text>
      );
    }

    try {
      const dateObj = parse(value, 'dd/MM/yyyy', new Date());

      if (mode === 'time') {
        return format(dateObj, 'hh:mm a');
      } else if (mode === 'date') {
        return format(dateObj, 'dd/MM/yyyy');
      } else {
        return format(dateObj, 'dd/MM/yyyy hh:mm a');
      }
    } catch (e) {
      return value;
    }
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
        style={[
          styles.button,
          buttonStyle,
          error ? {borderColor: colors.FireEngineRed} : {},
        ]}
        onPress={() => setIsVisible(true)}
        >
        <Text style={[styles.text, textStyle]}>{getFormattedDate()}</Text>
        {showDateIcon && (
          <Image
            source={require('../../assets/images/Date.png')}
            style={styles.dateIcon}
          />
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        date={value ? parse(value, 'dd/MM/yyyy', new Date()) : new Date()}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        display={display}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 46,
    shadowColor: colors.Gainsboro,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.24,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  placeholder: {
    // Added new style for placeholder
    fontSize: 14,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
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
  dateIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: colors.FireEngineRed,
    fontSize: 12,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
});

export default DatePickerField;

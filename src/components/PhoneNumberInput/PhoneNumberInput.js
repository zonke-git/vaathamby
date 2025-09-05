import React from 'react';
import {View} from 'react-native';
import {
  formatSouthAfricanPhone,
  getSouthAfricanValidationError,
} from '../../screens/validation/Validation';
import CustomTextField from '../TextFiled/CustomTextField';
import colors from '../../Theme/colors';
import CountryPhoneInput from '../ContryCode/CountryPhoneInput';
import {i18n} from '../../localization';

const PhoneNumberInput = ({
  value,
  countryDetails,
  onChangePhone,
  showError,
  inputStyle,
  modalVisible,
  setModalVisible,
  label_name = i18n.t('PhoneNumber'),
}) => {
  const handlePhoneChange = text => {
    const code = countryDetails?.code;
    let cleaned = text.replace(/\D/g, '');

    if (code === 'ZA') {
      // Automatically prefix 0 if missing
      if (cleaned.length > 0 && !cleaned.startsWith('0')) {
        cleaned = '0' + cleaned;
      }

      const formatted = formatSouthAfricanPhone(cleaned);
      const error = '';
      onChangePhone({
        phoneNo: formatted,
        phoneNoRaw: cleaned,
        error,
      });
    } else {
      onChangePhone({
        phoneNo: text,
        phoneNoRaw: cleaned,
        error: '',
      });
    }
  };

  const maxLength =
    countryDetails?.code === 'ZA'
      ? 12 // With leading zero
      : ['IN', 'US', 'AU'].includes(countryDetails?.code)
      ? 10
      : countryDetails?.code === 'AE'
      ? 9
      : 4;

  return (
    <View>
      <CustomTextField
        label={label_name}
        placeholder="XX XXX XXXX"
        placeholderTextColor={colors.SilverGray}
        value={value}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
        leftComponent={true}
        disableContrySelection={true}
        countryPhoneCode={countryDetails?.phoneCode}
        countryPhoneFlag={countryDetails?.flag}
        setOpenCountryModal={setModalVisible}
        inputStyle={inputStyle}
        required={true}
        error={showError}
        maxLength={maxLength}
        onBlur={() => {
          const code = countryDetails?.code;
          let cleaned = (value || '').replace(/\D/g, '');

          if (!cleaned) {
            onChangePhone({
              phoneNo: value,
              phoneNoRaw: '',
              error: 'Phone number is required',
            });
          } else if (code === 'ZA') {
            if (!cleaned.startsWith('0')) {
              cleaned = '0' + cleaned;
            }
            const formatted = formatSouthAfricanPhone(cleaned);
            const error = getSouthAfricanValidationError(cleaned);
            onChangePhone({
              phoneNo: formatted,
              phoneNoRaw: cleaned,
              error,
            });
          }
        }}
      />
      <CountryPhoneInput
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default PhoneNumberInput;

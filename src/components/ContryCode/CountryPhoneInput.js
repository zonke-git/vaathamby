import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import {countries} from './Countries';
import {typography} from '../../Theme/typography';
import colors from '../../Theme/colors';
import {setLoginDetails} from '../../redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import AppButton from '../AppButton/AppButton';
import {i18n} from '../../localization';

export default function CountryPhoneInput({modalVisible, setModalVisible}) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const onSelectCountry = country => {
    setModalVisible(false);
    setSearchText(''); // Clear search when closing
    dispatch(setLoginDetails({countrieDetails: country}));
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().startsWith(searchText.toLowerCase()),
  );

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search country..."
          value={searchText}
          onChangeText={text =>
            setSearchText(text.replace(/[^a-zA-Z]/g, '').replace(/^\s+/, ''))
          }
          placeholderTextColor={colors.DimGray}
        />

        <FlatList
          data={filteredCountries}
          keyExtractor={item => item.code}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => onSelectCountry(item)}>
              <Text style={styles.flag}>{item?.flag}</Text>
              <Text style={styles.countryText}>{item?.name}</Text>
              <Text style={styles.phoneCode}>{item?.phoneCode}</Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />

        <AppButton
          title={i18n.t('Close')}
          onPress={() => {
            setModalVisible(false);
            setSearchText('');
          }}
          useColors={[colors.appTheme, colors.appTheme]}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  countryItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  flag: {
    fontSize: 24,
    marginRight: 15,
  },
  countryText: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
    fontFamily: typography.SemiBold_600,
  },
  phoneCode: {
    fontSize: 16,
    marginRight: 10,
    color: colors.black,
    fontFamily: typography.SemiBold_600,
  },

  closeButton: {
    margin: 20,
    width: '100%',
    height: 48,

    borderRadius: 10,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: typography.SemiBold_600,
  },
});

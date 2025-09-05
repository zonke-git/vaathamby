import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
  Image,
} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {post} from '../../api/methods';
import {Url} from '../../api/url';

const SearchableDropdownTextField = ({
  label,
  placeholder,
  required = false,
  onSelect,
  value = '',
  fieldKey = 'place_id',
  fieldLabel = 'description',
  error,
  errorStyle,
  showCheckTick = false,
  handleCheckTick = () => {},
  handleByPage = false,
}) => {
  const [input, setInput] = useState(value);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const searchGoogleLocation = async query => {
    setIsLoading(true);
    try {
      const payload = {
        GOOGLE_API_KEY: 'AIzaSyCE4n2FNNx1tUYVwsLwnqbCkwoygOetgQA',
        input: query,
        components: 'country:za',
      };

      const url = `${Url.URL_V4}/googlelocation`;
      const response = await post(url, payload);
      // console.log('Search Loc Response ::',response);
      return response?.data || [];
    } catch (err) {
      console.error('Search Loc API Error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResults = async text => {
    if (text) {
      const data = handleByPage ? '' : await searchGoogleLocation(text);
      setResults(data);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchResults(input);
    }, 300);
    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handleSelect = item => {
    setInput(item[fieldLabel]);
    setShowDropdown(false);
    onSelect(item);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          placeholderTextColor={colors.SilverGray}
          value={input}
          onChangeText={setInput}
          onFocus={() => {
            setIsFocused(true);
            if (input) setShowDropdown(true);
          }}
          onBlur={() => {}}
          keyboardType="default"
        />
        {showCheckTick && (
          <TouchableOpacity
            style={styles.tickView}
            onPress={() => {
              handleCheckTick();
            }}>
            <Image
              source={require('../../assets/images/check.png')}
              style={styles.checkTick}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}

      {showDropdown && isFocused && (
        <View style={styles.dropdown}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={item => item[fieldKey]}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              style={styles.list}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    handleSelect(item);
                    setIsFocused(false);
                    setShowDropdown(false);
                  }}>
                  <Text style={styles.itemText}>{item[fieldLabel]}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchableDropdownTextField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 1,
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
  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   padding: 10,
  //   // color: colors.black,
  //   flex: 1,
  //   fontSize: 14,
  //   color: colors.EerieBlack,
  //   lineHeight: 14 * 1.4,
  //   letterSpacing: 14 * (0 / 100),
  //   fontFamily: typography.Medium_500,
  // },
  dropdown: {
    maxHeight: 200,
    backgroundColor: 'white',
    borderColor: colors.NeutralGray,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -2,
    overflow: 'hidden',
    position: 'absolute',
    top: 65,
  },
  list: {
    maxHeight: 200,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.NeutralLight,
    // position: 'absolute',
    // backgroundColor: 'green',
  },
  itemText: {
    color: colors.black,
    fontSize: 16,
  },
  loadingContainer: {
    padding: 15,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.NeutralGray,
  },
  noResultsContainer: {
    padding: 15,
    alignItems: 'center',
  },
  noResultsText: {
    color: colors.NeutralGray,
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
  placeholder: {
    color: colors.SilverGray,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    // paddingRight: 40,
    paddingHorizontal: 40,
    paddingLeft: 10,
    fontSize: 14,
    color: colors.EerieBlack,
    fontFamily: typography.Medium_500,
  },
  tickView: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkTick: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

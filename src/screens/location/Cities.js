import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {useCities} from '../../hooks';
import AppButton from '../../components/AppButton/AppButton';
import {i18n} from '../../localization';
import {CustomTextField} from '../../components';
import DashLayout from '../layout/DashLayout';

const Cities = () => {
  const {
    searchValue,
    areaList,
    canLoadMore,
    isLoadingMore,
    areaLoading,

    setSearchValue,
    handleNavigation,
    handleSearchLocationTick,
    loadMore,
    setCanLoadMore,
    searchAreaAPI,
  } = useCities();

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity onPress={() => handleNavigation(item)}>
          <Text style={styles.cityName_txt}>{item.name}</Text>
          {areaList?.Citys?.length !== index + 1 && (
            <View style={styles.horizontalLine} />
          )}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <DashLayout title="Please Select Area" loader={areaLoading} backButton>
        <View style={styles.container}>
          <CustomTextField
            label={i18n.t('Search_') + ' ' + i18n.t('Area')}
            placeholder={i18n.t('Search_') + ' ' + i18n.t('Area')}
            placeholderTextColor={colors.SilverGray}
            value={searchValue || ''}
            onChangeText={text => {
              setSearchValue(text);
              // searchAreaAPI(text);
            }}
            showSearchIcon={true}
            showRightIcon={searchValue ? true : false}
            rightIconSource={require('../../assets/images/Close.png')}
            onRightIconPress={() => {
              setSearchValue('');
              searchAreaAPI();
            }}
          />

          <Text style={styles.cityHeading_txt}>{i18n.t('Area')}</Text>
          {areaList?.Citys?.length ? (
            <FlatList
              data={areaList?.Citys}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item._id}_${index}`}
              onEndReached={() => {
                if (canLoadMore && !isLoadingMore) {
                  loadMore();
                }
              }}
              contentContainerStyle={{paddingBottom: 50}}
              onEndReachedThreshold={0.7}
              onScrollBeginDrag={() => setCanLoadMore(true)}
              ListFooterComponent={
                isLoadingMore ? (
                  <ActivityIndicator style={{marginVertical: 20}} />
                ) : null
              }
            />
          ) : (
            <Text style={styles.noData}>
              Oops! No Area matched your search.
            </Text>
          )}
        </View>
      </DashLayout>

      <View style={styles.fixedBottomButton}>
        <AppButton
          title={i18n.t('Submit')}
          onPress={handleSearchLocationTick}
          useColors={[colors.appTheme, colors.appTheme]}
        />
      </View>
    </>
  );
};

export default Cities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 10,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: colors.CulturedGray,
  },
  cityHeading_txt: {
    fontSize: 18,
    fontFamily: typography.SemiBold_600,
    color: colors.SimplyCharcoal,
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 18 * 1.4,
    letterSpacing: 18 * (0 / 100),
  },
  cityName_txt: {
    fontSize: 14,
    fontFamily: typography.Regular_400,
    color: colors.SimplyCharcoal,
    marginVertical: 12,
  },
  fixedBottomButton: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 0,
    backgroundColor: colors.white,
    // borderTopWidth: 1,
    // borderColor: colors.CulturedGray,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: typography.SemiBold_600,
    color: colors.SimplyCharcoal,
    // marginTop: 16,
    // marginBottom: 24,
    // lineHeight: 18 * 1.4,
    // letterSpacing: 18 * (0 / 100),
  },
});

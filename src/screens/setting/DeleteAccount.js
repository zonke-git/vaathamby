/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useDeleteAccount} from '../../hooks';
import DashLayout from '../layout/DashLayout';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {AppButton, ConfirmActionModal, CustomTextField} from '../../components';
import {i18n} from '../../localization';
import DeleteAccountSupportScreenModal from './DeleteAccountSupportScreenModal';

const DeleteAccount = () => {
  const {
    isLoader,
    deleteOptions,
    selectedOption,
    otherReason,
    isShowDeleteAccModal,
    otherOptionName,

    setIsLoader,
    handleNavigation,
    handleDeleteAccount,
    setSelectedOption,
    setOtherReason,
    isButtonEnabled,
    setIsShowDeleteAccModal,
    handleContactSupport,
  } = useDeleteAccount();

  return (
    <DashLayout loader={isLoader} title={'Delete Account'}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerTxt}>
            {i18n.t('WhyAreYouDeletingTheZonkeApp')}
          </Text>
          <FlatList
            data={deleteOptions}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.card_view}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.optionsContainer}
                onPress={() => setSelectedOption(item?.name)}>
                <View
                  style={[
                    styles.outerCircle,
                    {
                      borderColor:
                        selectedOption === item?.name
                          ? colors.appTheme
                          : colors.textNote,
                      backgroundColor:
                        selectedOption === item?.name
                          ? colors.white
                          : 'transparent',
                    },
                  ]}>
                  {selectedOption === item?.name && (
                    <View
                      style={[
                        styles.innerCircle,
                        {
                          backgroundColor: colors.appTheme,
                        },
                      ]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.optionsNameTxt,
                    {
                      fontFamily:
                        selectedOption === item?.name
                          ? typography.Bold_700
                          : typography.Medium_500,
                    },
                  ]}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          {selectedOption === otherOptionName && (
            <>
              <CustomTextField
                label={i18n.t('EnterReason')}
                required
                placeholder={i18n.t('EnterReason')}
                placeholderTextColor={colors.SilverGray}
                value={otherReason}
                onChangeText={text => {
                  if (text.length <= 250) {
                    setOtherReason(text);
                  }
                }}
                numberOfLines={5}
                multiline={true}
                textAlignVertical="top"
                multilineInputStyle={{alignSelf: 'flex-start'}}
                style={{marginBottom: 0}}
              />
              <Text style={styles.textCount}>{otherReason?.length}/250</Text>
            </>
          )}
        </View>
        <AppButton
          onPress={() => {
            setIsShowDeleteAccModal(true);
          }}
          title={i18n.t('DeleteAccount')}
          useColors={
            !isButtonEnabled
              ? [colors.LightMistGray, colors.LightMistGray]
              : [colors.appTheme, colors.appTheme]
          }
          disabled={!isButtonEnabled}
          textStyle={{
            color: !isButtonEnabled ? colors.LightSlateGray : colors.white,
          }}
        />
      </View>
      <DeleteAccountSupportScreenModal
        visible={isShowDeleteAccModal}
        onCancel={() => {
          setIsShowDeleteAccModal(false);
          handleDeleteAccount();
        }}
        onConfirm={handleContactSupport}
        title={i18n.t('CanWeHelpBeforeYouGo')}
        subTitle={i18n.t(
          'WereContinuouslyImprovingZonkeAndWouldLoveToResolveAnyIssuesYouveFaced',
        )}
        cancelText={i18n.t('NoContinueWithDeletion')}
        confirmText={i18n.t('YesContactSupport')}
        handleBack={() => {
          setIsShowDeleteAccModal(false);
        }}
      />
    </DashLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  headerTxt: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 16 * 1.4,
    letterSpacing: 16 * (-1 / 100),
    fontFamily: typography.Bold_700,
    marginBottom: 10,
  },
  contentContainer: {
    // flex: 1,
    // padding: 16,
  },
  optionsContainer: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  optionsNameTxt: {
    fontSize: 14,
    color: colors.RichBlack,
    // lineHeight: 14 * 1.6,
    fontFamily: typography.Medium_500,
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
  textCount: {
    textAlign: 'right',
    fontSize: 10,
    color: colors.DimGray,
    fontFamily: typography.SemiBold_600,
    lineHeight: 10 * 1.2,
  },
  btnContainerStyle: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // gap: 12,
    // marginBottom: 0,
    // marginTop: 24,
    // width: '100%',
    // paddingBottom: 10,
  },
  fullBtn: {
    width: '100%',
  },
});

export default DeleteAccount;

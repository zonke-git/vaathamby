import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {i18n} from '../../localization';
import DashLayout from '../layout/DashLayout';
import AppButton from '../../components/AppButton/AppButton';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import OutletCard from './components/OutletCard';
import OutletBottomModal from './components/OutletBottomModal';
import {useOutletList} from '../../hooks';
import {ConfirmActionModal, OptionMenuModal} from '../../components';

const OutletList = () => {
  const {
    openIndex,
    openBottomModal,
    openBottomModalData,
    openDeleteModal,
    openDeleteModalData,
    OutletsList,
    OutletsLoading,
    deleteOutletByIdLoading,
    openShowOptions,
    openShowOptionMenu,
    menuList,
    OutletsDetails,

    handleCreateOutlet,
    handleDelete,
    setOpenShowOptions,
    setOpenIndex,
    handleOpenBottomModal,
    handleEditOutlet,
    backButtonFunction,
    setOpenDeleteModal,
    setOpenDeleteModalData,
    setOpenShowOptionMenu,
    handleEditFormNavigation,
    handleOptionMenuModalCancel,
    handleContinueSetup,
    handleCloseModal,
    handleMenuNavigation,
    loadMore,
    setOpenBottomModalData,
  } = useOutletList();

  const renderCreateOutletButton = () => (
    <View style={styles.container}>
      <AppButton
        title={i18n.t('CreateOutlet')}
        onPress={handleCreateOutlet}
        useColors={[colors.appTheme, colors.appTheme]}
      />
    </View>
  );

  const renderOutletCards = () => {
    const handlePressOutside = () => {
      setOpenShowOptions(false);
      setOpenIndex(null);
      Keyboard.dismiss();
    };

    return (
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={{flex: 1}}>
          <FlatList
            data={OutletsList}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.card_view}
            renderItem={({item, index}) => (
              <OutletCard
                data={item}
                coverPhoto={item?.coverPhoto?.[0]?.value ?? ''}
                outletName={item?.outletName}
                status={item?.status}
                area={item?.area}
                address={item?.address}
                outlet_ID={item?._id}
                index__={index}
                openIndex={openIndex}
                openShowOptions={openShowOptions}
                setOpenIndex={setOpenIndex}
                setOpenShowOptions={setOpenShowOptions}
                handleOpenBottomModal={handleOpenBottomModal}
                handleDelete={handleDelete}
                handleEdit={() => handleEditOutlet(item)}
                setOpenDeleteModal={setOpenDeleteModal}
                openDeleteModal={openDeleteModal}
                handleMenuNavigation={handleMenuNavigation}
                setOpenDeleteModalData={setOpenDeleteModalData}
              />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              OutletsDetails?.currentPage < OutletsDetails?.totalPages ? (
                <ActivityIndicator />
              ) : null
            }
          />

          <ConfirmActionModal
            visible={openDeleteModal}
            onCancel={() => {
              setOpenDeleteModal(false);
              setOpenDeleteModalData(null);
            }}
            onConfirm={() => {
              handleDelete(openDeleteModalData?._id, openDeleteModalData);
              setOpenDeleteModal(false);
            }}
            title={i18n.t('AreYouSureYouWantToDeleteThisOutlet')}
            cancelText={i18n.t('No')}
            confirmText={i18n.t('Yes')}
            showErrorMsg={!openDeleteModalData?.canDelete}
          />

          {/* Fixed button at bottom */}
          <View style={styles.fixedButtonContainer}>
            {renderCreateOutletButton()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderNoOutlets = () => (
    <>
      <View style={styles.image_view}>
        <Image
          source={require('../../assets/images/e-commerce.png')}
          style={styles.icon}
        />
        <Text style={styles.noOutlet_text}>{i18n.t('NoOutletsFound')}</Text>
        <Text style={styles.addOutlet_text}>
          {i18n.t('YouCanCreate_A_NewOutletToGetStarted')}
        </Text>
      </View>
      {renderCreateOutletButton()}
    </>
  );

  return (
    <DashLayout
      title={i18n.t('Outlets')}
      backButton
      loader={OutletsLoading || deleteOutletByIdLoading}
      backButtonFunction={backButtonFunction}>
      {!OutletsLoading && (
        <>
          {OutletsList?.length ? renderOutletCards() : renderNoOutlets()}

          {/* Shared Modals */}
          <OptionMenuModal
            visible={openShowOptionMenu}
            onClose={() => setOpenShowOptionMenu(false)}
            setOpenShowOptionMenu={setOpenShowOptionMenu}
            menuList={menuList}
            handleNavigation={handleEditFormNavigation}
            handleContinueSetup={handleContinueSetup}
            handleCancel={handleOptionMenuModalCancel}
          />

          <OutletBottomModal
            data={openBottomModalData}
            onClose={handleCloseModal}
            visible={openBottomModal}
            handleDeleteOutlet={handleDelete}
            handleEdit={handleEditOutlet}
            setOpenDeleteModal={setOpenDeleteModal}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModalData={setOpenDeleteModalData}
          />
        </>
      )}
    </DashLayout>
  );
};

export default OutletList;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  card_view: {
    // paddingHorizontal: 16,
    // paddingTop: 16,
    // paddingBottom: 24,
  },
  image_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 100,
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  noOutlet_text: {
    fontSize: 20,
    color: colors.EerieBlack,
    textAlign: 'center',
    fontFamily: typography.Bold_700,
    lineHeight: 24,
    marginTop: 16,
  },
  addOutlet_text: {
    fontSize: 16,
    color: colors.CharcoalGray,
    textAlign: 'center',
    fontFamily: typography.Regular_400,
    lineHeight: 20,
    marginTop: 8,
  },
  fixedButtonContainer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: colors.white,
    // // paddingHorizontal: 24,
    // // paddingBottom: 16,
    // // paddingTop: 8,
    // borderTopWidth: 1,
    // borderColor: '#eee',
  },
});

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import DashLayout from '../layout/DashLayout';
import {i18n} from '../../localization';
import AppButton from '../../components/AppButton/AppButton';
import colors from '../../Theme/colors';
import {useCatalogueList} from '../../hooks';
import ProductBottomModal from './components/ProductBottomModal';
import {ConfirmActionModal, DropdownFieldWithModal} from '../../components';
import {typography} from '../../Theme/typography';
import ProductItems from './ProductItems';

const CatalogueList = () => {
  const {
    openModalVisible,
    selectedMenu,
    OutletsList,
    MenuList,
    deleteMenuLoading,
    IsMenusListLoading,
    IsOutletsLoading,
    MenuListData,
    selectDropDownMenu,
    openDeleteModal,
    openShowOptions,
    openIndex,
    deleteProductDataId,

    dispatch,
    handleAddMenuNavigation,
    handleMenuSelection,
    setOpenModalVisible,
    handleDeleteMenuByID,
    handleEditMenuByID,
    handleSelectDropDownMenu,
    setOpenDeleteModal,
    backButtonFunction,
    loadMore,
    setOpenShowOptions,
    setOpenIndex,
    setDeleteProductDataId,
  } = useCatalogueList();

  const renderAddMenuButton = () => (
    <View style={styles.buttonContainer}>
      <AppButton
        title={i18n.t('AddProduct')}
        onPress={handleAddMenuNavigation}
        useColors={[colors.appTheme, colors.appTheme]}
        buttonStyle={styles.fullWidth}
      />
    </View>
  );

  const renderMenuContent = () => (
    <View style={{flex: 1}}>
      {MenuList?.length ? (
        <ProductItems
          MenuList={MenuList}
          handleMenuSelection={handleMenuSelection}
          handleLoadMore={loadMore}
          MenuListData={MenuListData}
          openShowOptions={openShowOptions}
          setOpenIndex={setOpenIndex}
          setOpenShowOptions={setOpenShowOptions}
          openIndex={openIndex}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleDeleteMenuByID={handleDeleteMenuByID}
          handleEditMenuByID={handleEditMenuByID}
          setDeleteProductDataId={setDeleteProductDataId}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Image
            source={require('../../assets/images/e-commerce.png')}
            style={styles.image}
          />
          <Text style={styles.noDataText}>{i18n.t('NoProductsFound')}</Text>
        </View>
      )}
      {renderAddMenuButton()}
    </View>
  );

  return (
    <DashLayout
      title={i18n.t('Catalogue')}
      backButton
      loader={deleteMenuLoading || IsMenusListLoading || IsOutletsLoading}
      backButtonFunction={backButtonFunction}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <DropdownFieldWithModal
            options={OutletsList}
            selectedValue={selectDropDownMenu?.selectedMenuList}
            onSelect={handleSelectDropDownMenu}
            getOptionLabel={item => item.outletName}
            getOptionValue={item => item.outletName}
            placeholder={i18n.t('AllOutlets')}
            AddAllOption={true}
          />
        </View>

        {renderMenuContent()}
      </View>

      <ProductBottomModal
        visible={openModalVisible}
        onClose={() => setOpenModalVisible(false)}
        item={selectedMenu}
        handleDeleteMenuByID={handleDeleteMenuByID}
        handleEditMenuByID={handleEditMenuByID}
        setOpenDeleteModal={setOpenDeleteModal}
        openDeleteModal={openDeleteModal}
        setDeleteProductDataId={setDeleteProductDataId}
      />

      <ConfirmActionModal
        visible={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={() => {
          handleDeleteMenuByID(deleteProductDataId?._id);
          setOpenDeleteModal(false);
        }}
        title={i18n.t('AreYouSAureYouWantToDeleteThisProduct')}
        cancelText={i18n.t('No')}
        confirmText={i18n.t('Yes')}
      />
    </DashLayout>
  );
};

export default CatalogueList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    padding: 24,
    paddingBottom: 0,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 100,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  noDataText: {
    fontSize: 20,
    color: colors.EerieBlack,
    textAlign: 'center',
    fontFamily: typography.Bold_700,
    lineHeight: 24,
    // marginTop: 16,
  },
  buttonContainer: {
    padding: 24,
    paddingTop: 0,
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
});

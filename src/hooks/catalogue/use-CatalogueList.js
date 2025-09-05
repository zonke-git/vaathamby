import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOutlets} from '../../redux/action/outletActions';
import {
  resetAddMenuDetails,
  resetMenuProductTypes,
  resetMenuTagTypes,
  setAddMenuDetails,
  setMenusListFailure,
  setMenusListSuccess,
  setMenuStatusEdit,
  setSelectDropDownMenu,
} from '../../redux/slice/catalogueSlice';
import {delete_Menu, fetchMenus} from '../../redux/action/catalogueActions';
import Toast from 'react-native-root-toast';
import {BackHandler} from 'react-native';
import {setOutletsSuccess} from '../../redux/slice/outletSlice';
import {getMenus} from '../../api/api';

export const useCatalogueList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openModalVisible, setOpenModalVisible] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteProductDataId, setDeleteProductDataId] = useState(false);
  const [openShowOptions, setOpenShowOptions] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('');
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const MenuListData = useSelector(state => state?.catalogue?.menusList);
  const MenuList = useSelector(state => state?.catalogue?.menusList?.Menus);
  const deleteMenuLoading = useSelector(
    state => state?.catalogue?.deleteMenuLoading,
  );
  const OutletsList = useSelector(state => state?.outlet?.Outlets?.outlets);
  const IsMenusListLoading = useSelector(
    state => state?.catalogue?.menusListLoading,
  );
  const IsOutletsLoading = useSelector(
    state => state?.selectedMenuList?.OutletsLoading,
  );
  const selectDropDownMenu = useSelector(
    state => state?.catalogue?.selectDropDownMenu,
  );
  const selectedMenuList = useSelector(
    state => state?.catalogue?.selectDropDownMenu,
  );

  // console.log('MenuList', MenuList);

  // console.log('OutletsList', OutletsList);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('MainApp');

        return true; // prevent default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  useEffect(() => {
    dispatch(fetchOutlets(token))
      .then(response => {
        // console.log('Fetch Outlets Response:', response);

        if (response?.success) {
          const filteredOutlets = response.outlets.filter(
            outlet => outlet.status !== 'DRAFT',
          );

          const finalData = {
            ...response,
            outlets: filteredOutlets,
          };

          // console.log('Final Filtered Response:', finalData);
          dispatch(setOutletsSuccess(finalData));
        } else {
          Toast.show(response?.message || 'Something went wrong', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      })
      .catch(error => {
        console.error('Fetch Outlets Error:', error);
        Toast.show(error?.error || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      });
  }, [dispatch, navigation, token]);

  useEffect(() => {
    dispatch(fetchMenus(token, selectDropDownMenu?.selectedMenuList?._id));
  }, [dispatch, selectDropDownMenu?.selectedMenuList?._id, token]);

  const handleAddMenuNavigation = () => {
    dispatch(resetAddMenuDetails());
    dispatch(resetMenuProductTypes());
    dispatch(resetMenuTagTypes());
    dispatch(setMenuStatusEdit(false));
    navigation.navigate('AddProduct');
  };

  const handleMenuSelection = item => {
    setSelectedMenu(item);
    setOpenModalVisible(true);
  };

  const handleSelectDropDownMenu = item => {
    // console.log('item', item);

    // console.log('item.outletName', item.outletName);
    if (item.outletName === 'All Outlets') {
      dispatch(fetchMenus(token, '', '', 25));
      dispatch(
        setSelectDropDownMenu({
          selectedMenuList: '',
          selectedMenuList_name: '',
        }),
      );
    } else {
      dispatch(fetchMenus(token, item?._id, '', 25));
      dispatch(
        setSelectDropDownMenu({
          selectedMenuList: item,
          selectedMenuList_name: item.outletName,
        }),
      );
    }
  };

  const handleDeleteMenuByID = menu_id => {
    setSelectedMenu('');
    setOpenModalVisible(false);
    dispatch(delete_Menu(token, menu_id))
      .then(response => {
        console.log('Add Menu Response :', response);
        if (response?.success) {
          navigation.navigate('CatalogueList');
          Toast.show(response?.message || 'Something went wrong', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
          dispatch(fetchMenus(token));
        } else {
          Toast.show(response?.message || 'Something went wrong', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      })
      .catch(error => {
        console.error('Add Menu Error :', error);
        Toast.show(error?.error || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      });
  };

  const handleEditMenuByID = item => {
    const updateEditMenuFiled = {
      Outlet: item?.outlet,
      Outlet_name: item?.outlet?.outletName,
      ProductName: item?.name,
      ProductType: '',
      ProductType_name: '',
      typeAPIData: item?.type,
      TagValue: item?.tagvalue,
      TagValue_name: item?.tagvalue?.name,
      Price: item?.price,
      Description: item?.description,
      Photo: item?.coverPhoto,
      menuId: item?._id,
    };

    // console.log('updateEditMenuFiled', updateEditMenuFiled);

    dispatch(setAddMenuDetails(updateEditMenuFiled));
    dispatch(setMenuStatusEdit(true));

    setOpenModalVisible(false);
    navigation.navigate('AddProduct');
  };

  const backButtonFunction = () => {
    navigation.navigate('MainApp');
  };

  const loadMore = async () => {
    if (MenuListData?.currentPage < MenuListData?.totalPages) {
      try {
        // dispatch(setMenusListLoader());
        const response = await getMenus(
          token,
          selectDropDownMenu?.selectedMenuList?._id,
          MenuListData?.currentPage + 1,
          10,
        );
        const updatedData = {
          ...response,
          Menus: [...(MenuListData?.Menus || []), ...(response.Menus || [])],
        };
        dispatch(setMenusListSuccess(updatedData));
        return response;
      } catch (error) {
        console.log('Menus List Error :', error);
        dispatch(
          setMenusListFailure(error.message || 'Failed to fetch Menus List'),
        );
        throw error;
      }
    }
  };

  return {
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
  };
};

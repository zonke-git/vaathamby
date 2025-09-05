import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker, {types} from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert, BackHandler, Platform} from 'react-native';
import Toast from 'react-native-root-toast';
import axios from 'axios';

import {setAddMenuDetails} from '../../redux/slice/catalogueSlice';
import {
  addUpdateMenu,
  fetchTagTypes,
  fetchTagValues,
  menuProductTypesubCategorys,
} from '../../redux/action/catalogueActions';
import {
  fetchOutlets,
  fetchSubCategories,
} from '../../redux/action/outletActions';
import {Url} from '../../api/url';
import {setOutletsSuccess} from '../../redux/slice/outletSlice';

export const useAddProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPhotoLoader, setIsPhotoLoader] = useState(false);
  // Redux selectors
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const addMenuFormDetails = useSelector(
    state => state?.catalogue?.addMenuDetails,
  );
  const Selected_Outlets_ID = useSelector(
    state => state?.catalogue?.addMenuDetails?.Outlet?._id,
  );
  const selectDropDownMenu = useSelector(
    state => state?.catalogue?.selectDropDownMenu?.selectedMenuList,
  );
  const menuStatusEdit = useSelector(state => state?.catalogue?.menuStatusEdit);
  const IsLoader = useSelector(state => state?.catalogue?.addMenuLoading);
  const OutletsList = useSelector(state => state?.outlet?.Outlets?.outlets);
  const merchant__id = useSelector(
    state => state?.businessProfile?.merchantDetailsdata?.merchant?._id,
  );
  const menuProductTypes = useSelector(
    state => state?.catalogue?.menuProductTypes?.Catelogues,
  );
  const menuTagTypes = useSelector(
    state => state?.catalogue?.menuTagTypes?.TagTypes,
  );
  const menuTagValues = useSelector(
    state => state?.catalogue?.menuTagValues?.TagValues,
  );
  const typeAPIData = useSelector(
    state => state?.catalogue?.addMenuDetails?.typeAPIData?._id,
  );

  const menuProductTypesLoading = useSelector(
    state => state?.catalogue?.menuProductTypesLoading,
  );
  const OutletsLoading = useSelector(state => state?.outlet?.OutletsLoading);
  const subCategoriesLoading = useSelector(
    state => state?.outlet?.subCategoriesLoading,
  );
  const menuTagValuesLoading = useSelector(
    state => state?.catalogue?.menuTagValuesLoading,
  );

  // console.log(
  //   'Loading',
  //   IsLoader,
  //   menuProductTypesLoading,
  //   OutletsLoading,
  //   subCategoriesLoading,
  //   menuTagValuesLoading,
  // );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('CatalogueList');

        return true; // prevent default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  useEffect(() => {
    const selectedOutletId = addMenuFormDetails?.Outlet?._id;
    const matchedOutlet = OutletsList?.find(
      item => item._id === selectedOutletId,
    );
    const subcategoryId =
      matchedOutlet?.subcategory?._id || addMenuFormDetails?.subcategory?._id;

    const fetchAndUpdate = async () => {
      try {
        const response = await dispatch(
          menuProductTypesubCategorys(token, subcategoryId, merchant__id),
        );

        const matchedProductType = response?.Catelogues?.find(
          item => item._id === typeAPIData,
        );

        if (matchedProductType) {
          const updateEditMenuFiled = {
            ProductType: matchedProductType,
            ProductType_name: matchedProductType.name,
          };

          dispatch(
            setAddMenuDetails({
              ...addMenuFormDetails,
              ...updateEditMenuFiled,
            }),
          );
        } else {
          console.warn('⚠️ No matching product type found after API call');
        }
      } catch (error) {
        console.error('❌ Failed fetching menu product types:', error);
      }
    };

    if (subcategoryId) {
      fetchAndUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addMenuFormDetails?.Outlet?._id,
    addMenuFormDetails?.subcategory?._id,
    dispatch,
    merchant__id,
    token,
  ]);

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

  // Fetch subcategories when an outlet is selected
  useEffect(() => {
    if (Selected_Outlets_ID) {
      dispatch(fetchSubCategories(token, Selected_Outlets_ID));
    }
  }, [Selected_Outlets_ID, dispatch, token]);

  useEffect(() => {
    if (Array.isArray(menuTagTypes) && menuTagTypes[0]?._id) {
      dispatch(fetchTagValues(token, menuTagTypes[0]._id));
    }
  }, [dispatch, menuTagTypes, token]);

  const getImageUri = item => {
    const imageKey = Object.keys(item).find(key => key.endsWith('Img'));
    return item[imageKey];
  };

  // Image picker configuration
  const commonImageOptions = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1000,
    maxHeight: 1000,
    includeBase64: Platform.OS === 'android',
  };

  const galleryOptions = {
    ...commonImageOptions,
    presentationStyle:
      Platform.OS === 'android' && Platform.Version >= 33
        ? 'photoLibrary'
        : undefined,
  };

  useEffect(() => {
    if (selectDropDownMenu) {
      handleOutletSelect(selectDropDownMenu);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectDropDownMenu]);

  // Outlet Selection Handler
  const handleOutletSelect = outlet => {
    dispatch(
      setAddMenuDetails({
        Outlet: outlet,
        Outlet_name: outlet.outletName,
      }),
    );
    dispatch(
      menuProductTypesubCategorys(
        token,
        outlet?.subcategory?._id,
        merchant__id,
      ),
    );
  };

  // Product Type Selection Handler
  const handleProductType = productType => {
    // console.log('productType', productType);
    dispatch(
      setAddMenuDetails({
        ProductType: productType,
        ProductType_name: productType.name,
      }),
    );
    dispatch(fetchTagTypes(token, productType?._id));
    // dispatch(fetchTagValues(token, productType?._id));
  };

  // Document Picker (for images)
  const handleDocumentPick = async fieldName => {
    try {
      const [file] = await DocumentPicker.pick({
        type: [types.images],
        allowMultiSelection: false,
      });
      dispatch(setAddMenuDetails({[fieldName]: file}));
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Document pick error:', err);
      }
    }
  };

  // Camera/Gallery Image Picker
  const handleImagePick = fieldName => {
    const handleSelection = response => {
      if (response.didCancel) return;
      if (response.error) {
        console.error('ImagePicker Error:', response.error);
        return;
      }

      if (response.assets?.length) {
        const asset = response.assets[0];
        const file = {
          uri: asset.uri,
          name: asset.fileName || asset.uri.split('/').pop(),
          type: asset.type,
          size: asset.fileSize,
        };
        dispatch(setAddMenuDetails({[fieldName]: file}));
      }
    };

    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => launchCamera(commonImageOptions, handleSelection),
        },
        {
          text: 'Gallery',
          onPress: () => launchImageLibrary(galleryOptions, handleSelection),
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  // Cancel a selected image/document
  const handleCancel = fieldName => {
    dispatch(setAddMenuDetails({[fieldName]: null}));
  };

  // Menu Form Submission
  const handleAddMenuSubmit = values => {
    let payload = {
      outlet: [values?.Outlet?._id],
      name: values?.ProductName,
      type: values?.ProductType?._id,
      tagvalue: values?.TagValue?._id,
      price: values?.Price,
      description: values?.Description,
      newtype: false,
    };

    if (values?.TagValue?._id) {
      payload = {
        ...payload,
        tagvalue: values?.TagValue?._id,
      };
    }

    const menuId = addMenuFormDetails?.menuId;

    // console.log('payload', payload);

    dispatch(addUpdateMenu(payload, token, menuId))
      .then(response => {
        // console.log('response', response);

        if (response?.success) {
          const menu_id = response?.data?.[0]?._id || response?.updated?._id;

          if (values?.Photo?.uri) {
            uploadMenuPhoto(values?.Photo, menu_id, token);
          } else {
            navigation.navigate('CatalogueList');
          }
        } else {
          showToast(response?.message || 'Something went wrong');
        }
      })
      .catch(error => {
        console.error('Add Menu Error:', error);
        showToast(error?.message || 'Something went wrong');
      });
  };

  // Upload menu photo (if exists)
  const uploadMenuPhoto = async (imageUri, menuId, token) => {
    try {
      setIsPhotoLoader(true);
      const formData = new FormData();
      const fileName = imageUri?.uri?.split('/').pop();

      formData.append('menuPhoto', {
        uri: imageUri?.uri,
        name: fileName || `menuPhoto${Date.now()}.jpg`,
        type: imageUri?.type || 'image/jpeg',
      });

      const response = await axios.put(
        `${Url.URL_V4}/menu/${menuId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          maxBodyLength: Infinity,
        },
      );

      navigation.navigate('CatalogueList');
      return response.data;
    } catch (error) {
      console.error('Upload Error:', error?.response?.data || error.message);
      throw error;
    } finally {
      setIsPhotoLoader(false);
    }
  };

  // Toast Message Utility
  const showToast = message => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
  };

  const backButtonFunction = () => {
    navigation.navigate('CatalogueList');
  };

  return {
    IsLoader,
    menuProductTypesLoading,
    OutletsLoading,
    subCategoriesLoading,
    menuTagValuesLoading,
    isPhotoLoader,
    isModalVisible,
    addMenuFormDetails,
    OutletsList,
    menuProductTypes,
    menuTagValues,
    menuTagTypes,
    menuStatusEdit,

    setIsModalVisible,
    handleOutletSelect,
    handleDocumentPick,
    handleImagePick,
    handleCancel,
    handleAddMenuSubmit,
    dispatch,
    handleProductType,
    getImageUri,
    backButtonFunction,
  };
};

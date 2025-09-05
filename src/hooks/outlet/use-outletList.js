import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';
import moment from 'moment';

import {
  deleteOutlet,
  fetchArea,
  fetchOutlets,
  fetchProvince,
  fetchSubCategories,
} from '../../redux/action/outletActions';
import {getMerchantDetails} from '../../redux/action/businessProfileActions';

import {
  documentDetails_submitOnBoard_reset,
  engagementModelDetails_submitOnBoard_reset,
  outletCharacteristicsDetails_submitOnBoard_reset,
  outletInfoDetails_submitOnBoard_reset,
  photosDetails_submitOnBoard_reset,
  resetDocumentsDetails,
  resetEngagementModelDetails,
  resetOutletCharacteristicsDetails,
  resetOutletInfoDetails,
  resetPhotosDetails,
  resetTimingsDetails,
  setDeleteOutletByIdFailure,
  setEngagementModelDetails,
  setOutletCharacteristicsDetails,
  setOutletFirstTime,
  setOutletFormStatusEdit,
  setOutletFormumber,
  setOutletInfoDetails,
  setOutletsFailure,
  setOutletSingleStep,
  setOutletsSuccess,
  setPhotosDetails,
  setTimingsDetails,
  timingsDetails_submitOnBoard_reset,
} from '../../redux/slice/outletSlice';

import {setMerchantDetailsFailure} from '../../redux/slice/businessProfileSlice';

import {countries} from '../../components/ContryCode/Countries';
import {formatSouthAfricanPhone} from '../../screens/validation/Validation';
import {BackHandler} from 'react-native';
import {i18n} from '../../localization';
import {setSelectDropDownMenu} from '../../redux/slice/catalogueSlice';
import {areaAPI, getOutletsAPI} from '../../api/api';

export const useOutletList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openShowOptionMenu, setOpenShowOptionMenu] = useState(false);
  const [openShowOptions, setOpenShowOptions] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [openBottomModal, setOpenBottomModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteModalData, setOpenDeleteModalData] = useState(null);
  const [openBottomModalData, setOpenBottomModalData] = useState(false);
  // const TimingsFormValues = useSelector(state => state?.outlet?.TimingsDetails);
  const [menuList, setMenuList] = useState([
    {
      id: 1,
      name: i18n.t('OutletInfo'),
      route: '',
      openEdit: false,
      needToEdit: false,
    },
    {
      id: 2,
      name: i18n.t('OutletCharacteristics'),
      route: '',
      openEdit: false,
      needToEdit: false,
    },
    {
      id: 3,
      name: i18n.t('Timings'),
      route: '',
      openEdit: false,
      needToEdit: false,
    },
    {
      id: 4,
      name: i18n.t('Photos'),
      route: '',
      openEdit: false,
      needToEdit: false,
    },
    {
      id: 5,
      name: i18n.t('EngagementModel'),
      route: '',
      openEdit: false,
      needToEdit: false,
    },
  ]);
  const merchantDetailsdata = useSelector(
    state => state?.businessProfile?.merchantDetailsdata?.merchant,
  );
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const provinceList = useSelector(state => state?.outlet?.province?.States);
  const areaList = useSelector(state => state?.outlet?.area?.Citys);
  // console.log('areaList',areaList);

  const OutletFirstTime = useSelector(state => state?.outlet?.OutletFirstTime);
  const OutletsLoading = useSelector(state => state?.outlet?.OutletsLoading);
  const deleteOutletByIdLoading = useSelector(
    state => state?.outlet?.deleteOutletByIdLoading,
  );
  const OutletsList = useSelector(state => state?.outlet?.Outlets?.outlets);
  const OutletsDetails = useSelector(state => state?.outlet?.Outlets);

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

  const backButtonFunction = () => {
    navigation.navigate('MainApp');
  };

  useEffect(() => {
    dispatch(fetchOutlets(token));
    dispatch(fetchSubCategories(token));
    dispatch(fetchProvince(token));
    dispatch(fetchArea(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (OutletFirstTime) {
      handleCreateOutlet();
    } else {
      dispatch(getMerchantDetails(token))
        .then(res => {
          const merchant = res?.merchant;
          if (!merchant) {
            dispatch(setMerchantDetailsFailure('Submission failed'));
            return;
          }

          dispatch(outletInfoDetails_submitOnBoard_reset());
        })
        .catch(() => {
          dispatch(
            setMerchantDetailsFailure('Failed to fetch merchant details'),
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  const getMatchedArea = async (token, areaName) => {
  try {
    const response = await areaAPI(token, 1, 1, areaName);
    return response?.Citys?.[0];
  } catch (error) {
    console.error('Error fetching area:', error);
    return null;
  }
};



  const handleCreateOutlet = async () => {
    // console.log('::: handleCreateOutlet', merchantDetailsdata);
    dispatch(setOutletFormumber(1));
    dispatch(outletInfoDetails_submitOnBoard_reset());
    dispatch(outletCharacteristicsDetails_submitOnBoard_reset());
    dispatch(documentDetails_submitOnBoard_reset());
    dispatch(timingsDetails_submitOnBoard_reset());
    dispatch(engagementModelDetails_submitOnBoard_reset());
    dispatch(photosDetails_submitOnBoard_reset());
    dispatch(resetOutletInfoDetails());
    dispatch(resetDocumentsDetails());
    dispatch(resetEngagementModelDetails());
    dispatch(resetOutletCharacteristicsDetails());
    dispatch(resetPhotosDetails());
    dispatch(resetTimingsDetails());
    if (OutletFirstTime) {
      const matchedProvince = provinceList?.find(
        p => p?.name === merchantDetailsdata?.province,
      );
      const matchedAreaApiCall = await getMatchedArea(token, merchantDetailsdata?.area);
      const matchedArea = matchedAreaApiCall;

      const physicalLines = [
        merchantDetailsdata?.company?.PhysicalAddressLine1 ||
          merchantDetailsdata?.company?.PhysicalAddress?.Line1,
        merchantDetailsdata?.company?.PhysicalAddressLine2 ||
          merchantDetailsdata?.company?.PhysicalAddress?.Line2,
        merchantDetailsdata?.company?.PhysicalAddressLine3 ||
          merchantDetailsdata?.company?.PhysicalAddress?.Line3,
        merchantDetailsdata?.company?.PhysicalAddressLine4 ||
          merchantDetailsdata?.company?.PhysicalAddress?.Line4,
        merchantDetailsdata?.company?.PhysicalAddressPostCode ||
          merchantDetailsdata?.company?.PhysicalAddress?.PostCode,
      ];
      const PhysicalAddress =
        merchantDetailsdata?.location ||
        physicalLines.filter(Boolean).join(', ');

      await dispatch(
        setOutletInfoDetails(
          mapMerchantToOutletDetails(
            merchantDetailsdata,
            matchedProvince,
            matchedArea,
            PhysicalAddress,
          ),
        ),
      );
    }
    dispatch(setOutletFormStatusEdit(false));
    navigation.navigate('Outlet');
  };

  const handleEditOutlet = async (item) => {
    // console.log('Edit Outlet Item ::', item);

    setMenuList(prevList =>
      prevList?.map(menu => {
        const needToEditStep1Filled = true;
        const needToEditStep2Filled = item.facilities?.length > 0;
        const needToEditStep3Filled = item.timing?.length > 0;
        const needToEditStep4Filled = item.coverPhoto?.length > 0;
        const needToEditStep5Filled = item.scanAndPay?.scanAndPay;
        // console.log(
        //   'needToEditStep2Filled',
        //   needToEditStep1Filled,
        //   needToEditStep2Filled,
        //   needToEditStep3Filled,
        //   needToEditStep4Filled,
        //   needToEditStep5Filled,
        // );

        switch (menu.id) {
          case 1:
            // Step 1 is always editable
            return {...menu, openEdit: true, needToEdit: needToEditStep1Filled};

          case 2:
            // Step 2 is editable if Step 1 is always considered completed
            return {...menu, openEdit: true, needToEdit: needToEditStep2Filled};

          case 3:
            // Step 3 is editable if Step 2 is filled
            const step2Filled =
              item.facilities?.length > 0 || item.timing?.length > 0;
            return {
              ...menu,
              openEdit: !!step2Filled,
              needToEdit: needToEditStep3Filled,
            };

          case 4:
            // Step 4 is editable if Step 3 is filled
            const step3Filled =
              item.timing?.length > 0 || item.coverPhoto?.length > 0;
            return {
              ...menu,
              openEdit: !!step3Filled,
              needToEdit: needToEditStep4Filled,
            };

          case 5:
            // Step 5 is editable if Step 4 is filled
            const step4Filled =
              item.coverPhoto?.length > 0 || item.scanAndPay?.scanAndPay;
            return {
              ...menu,
              openEdit: !!step4Filled,
              needToEdit: needToEditStep5Filled,
            };

          default:
            return menu;
        }
      }),
    );

    const matchedProvince = provinceList?.find(
      p => p?._id === item?.province?._id,
    );
    const matchedAreaApiCall = await getMatchedArea(token, merchantDetailsdata?.area);
    const matchedArea = matchedAreaApiCall;

    //
    dispatch(outletInfoDetails_submitOnBoard_reset());
    dispatch(outletCharacteristicsDetails_submitOnBoard_reset());
    dispatch(documentDetails_submitOnBoard_reset());
    dispatch(timingsDetails_submitOnBoard_reset());
    dispatch(engagementModelDetails_submitOnBoard_reset());
    dispatch(photosDetails_submitOnBoard_reset());
    dispatch(resetOutletInfoDetails());
    dispatch(resetDocumentsDetails());
    dispatch(resetEngagementModelDetails());
    dispatch(resetOutletCharacteristicsDetails());
    dispatch(resetPhotosDetails());
    dispatch(resetTimingsDetails());
    //
    dispatch(
      setOutletInfoDetails(
        mapOutletItemToForm(item, matchedProvince, matchedArea),
      ),
    );
    //
    const facilitiesMap = item?.facilities?.reduce((acc, facility) => {
      const nameId = facility?.name?._id;
      if (nameId) {
        acc[nameId] = facility.isHave;
      }
      return acc;
    }, {});
    dispatch(setOutletCharacteristicsDetails(facilitiesMap));
    //
    const updatedTimings = mapApiTimingsToRedux(item?.timing);
    // console.log('updatedTimings', updatedTimings);

    dispatch(setTimingsDetails(updatedTimings));
    //
    const updatePhotos = mapApiPhotosToRedux(item?.coverPhoto);
    dispatch(setPhotosDetails(updatePhotos));
    //
    const updateEng = {
      CashbackPercentage: item?.scanAndPay?.scanAndPaycashback,
      paymentOptions: item?.scanAndPay?.scanAndPay
        ? 'Scan & Pay (QR Code)'
        : item?.scanAndPay?.scanAndPay,
    };
    // console.log('updateEng', updateEng);

    dispatch(setEngagementModelDetails(updateEng));
    //
    dispatch(setOutletFormumber(1));
    setOpenBottomModal(false);
    dispatch(setOutletFormStatusEdit(true));
    setOpenShowOptionMenu(true);
  };

  const handleEditFormNavigation = route => {
    if (!route?.needToEdit) {
      dispatch(setOutletSingleStep(false));
    } else {
      dispatch(setOutletSingleStep(true));
    }
    setOpenShowOptionMenu(false);
    dispatch(setOutletFormumber(route?.id));
    // console.log('route', route);
    navigation.navigate('Outlet');
  };

  const handleOptionMenuModalCancel = route => {
    setOpenShowOptionMenu(false);
    dispatch(setOutletFormumber(1));
    // console.log('route', route);
    // navigation.navigate('Outlet');
    // dispatch(setOutletSingleStep(true));
  };

  const handleContinueSetup = () => {
    setOpenShowOptionMenu(false);
    dispatch(setOutletFormumber(1));
    navigation.navigate('Outlet');
  };

  const handleDelete = (id, data) => {
    dispatch(deleteOutlet('', token, id))
      .then(res => {
        if (res?.success) {
          setOpenIndex(null);
          setOpenShowOptions(false);
          setOpenBottomModalData(false);
          setOpenBottomModal(false);
          dispatch(fetchOutlets(token));
        } else {
          dispatch(setDeleteOutletByIdFailure('Submission failed'));
          Toast.show(res?.message || 'Delete operation finished', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      })
      .catch(err => {
        console.error('Delete Outlet Error:', err);
      });
  };

  const handleOpenBottomModal = item => {
    // console.log('item', item);
    setOpenBottomModalData(item);
    setOpenBottomModal(true);
  };

  const handleCloseModal = () => setOpenBottomModal(false);

  const handleMenuNavigation = item => {
    // console.log('item', item);

    dispatch(
      setSelectDropDownMenu({
        selectedMenuList: item,
        selectedMenuList_name: item?.outletName,
      }),
    );
    navigation.navigate('CatalogueList');
  };

  const loadMore = async () => {
    if (OutletsDetails?.currentPage < OutletsDetails?.totalPages) {
      try {
        // dispatch(setOutletsLoader());
        const response = await getOutletsAPI(
          token,
          10,
          OutletsDetails?.currentPage + 1,
        );
        const updatedData = {
          ...response,
          outlets: [...(OutletsList || []), ...(response.outlets || [])],
        };
        dispatch(setOutletsSuccess(updatedData));
        return response;
      } catch (error) {
        dispatch(setOutletsFailure(error.error || 'Failed to fetch Outlets'));
        throw error;
      }
    }
  };

  return {
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

    dispatch,
    handleCreateOutlet,
    setOpenShowOptions,
    handleDelete,
    setOpenIndex,
    handleCloseModal,
    handleOpenBottomModal,
    setOpenBottomModalData,
    handleEditOutlet,
    backButtonFunction,
    setOpenDeleteModal,
    setOpenDeleteModalData,
    setOpenShowOptionMenu,
    handleEditFormNavigation,
    handleOptionMenuModalCancel,
    handleContinueSetup,
    handleMenuNavigation,
    loadMore,
  };
};

// ----------------- Helpers ------------------

const mapMerchantToOutletDetails = (
  merchant,
  provinceDetails,
  areaDetails,
  PhysicalAddress,
) => ({
  BusinessName: merchant?.business_name,
  outlet_id: '',
  OutletName: '',
  ContactPersonFirstName: merchant?.first_name,
  ContactPersonLastName: merchant?.last_name,
  ContactPersonMobile: {
    mobileNo: formatSouthAfricanPhone(merchant?.contact_number),
    mobileNoRaw: merchant?.contact_number,
    countrieDetails: countries[161],
  },
  ContactPersonEmail: merchant?.email,
  MobileNumber_CustomerToReachOut: {
    mobileNo: '',
    mobileNoRaw: '',
    countrieDetails: countries[161],
  },
  SubCategories_id: '',
  SubCategories: '',
  OutletLocation: merchant?.location,
  Address: PhysicalAddress,
  ProvinceDetails: provinceDetails,
  Province_name: merchant?.province,
  AreaDetails: areaDetails,
  Area_name: '',
});

const mapMerchantToDocumentsDetails = merchant => ({
  RegistrationNo: merchant?.registration_number,
  RegistrationDate: formatDate(merchant?.registerationCertificate?.updatedAt),
  IssuingProvince: merchant?.province,
  IssuingProvince_name: merchant?.province?.name,
  RegistrationCertificatePDF_JPG_PNG: '',
  TaxRegistrationNumber_TRN: merchant?.company?.TaxNumber,
  TaxRegistrationDate: formatDate(merchant?.taxCertificate?.updatedAt),
  IssuingAuthority: '',
  TaxCertificatePDF_JPG_PNG: '',
});

const mapApiTimingsToRedux = apiData => {
  const allDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return allDays.map(dayName => {
    // console.log(`🔍 Checking for day: ${dayName}`);

    const matched = apiData?.find(entry => entry.day === dayName);

    // console.log(`✅ matched for ${dayName}:`, matched);

    return matched
      ? {
          name: matched.day,
          open: true,
          time: matched.time.map(slot => {
            const [from, to] = slot.split(' - ');
            return {from, to};
          }),
        }
      : {
          name: dayName,
          open: false,
          time: [{from: '09:00', to: '17:00'}],
        };
  });
};

const mapApiPhotosToRedux = apiData => {
  
  // Separate cover photo and regular photos
  const coverPhoto = apiData?.find(photo => photo.coverphoto === true);
  const otherPhotos = apiData?.filter(photo => photo.coverphoto === false);

  // Get the original cover photo ID
  const originalCoverPhotoId = coverPhoto?._id || null;

  // Ensure photoData is always an array
  const photoData = Array.isArray(otherPhotos)
    ? otherPhotos.slice(0, 4).map(photo => ({
        url: photo?.value || '',
        id: photo?._id || null,
      }))
    : [];

  // Create the photos array with correct liked status
  const photos = [
    {
      firstImg: coverPhoto?.value || '',
      imageId: coverPhoto?._id || null,
      liked: true, // Cover photo is always liked
      coverphoto: true,
      originalCoverPhotoId: originalCoverPhotoId, // Add original cover ID
    },
    {
      secondImg: photoData[0]?.url || '',
      imageId: photoData[0]?.id || null,
      liked: false,
      coverphoto: false,
      originalCoverPhotoId: originalCoverPhotoId, // Add original cover ID
    },
    {
      thirdImg: photoData[1]?.url || '',
      imageId: photoData[1]?.id || null,
      liked: false,
      coverphoto: false,
      originalCoverPhotoId: originalCoverPhotoId, // Add original cover ID
    },
    {
      fourthImg: photoData[2]?.url || '',
      imageId: photoData[2]?.id || null,
      liked: false,
      coverphoto: false,
      originalCoverPhotoId: originalCoverPhotoId, // Add original cover ID
    },
    {
      fifthImg: photoData[3]?.url || '',
      imageId: photoData[3]?.id || null,
      liked: false,
      coverphoto: false,
      originalCoverPhotoId: originalCoverPhotoId, // Add original cover ID
    },
  ];

  // Find the photo that is actually marked as coverphoto in API data
  const actualCoverPhoto = apiData?.find(photo => photo.coverphoto === true);
  
  // If we found a cover photo in API data, update the liked status
  if (actualCoverPhoto) {
    // Find which position in our photos array contains this cover photo
    const coverIndex = photos.findIndex(
      photo => photo.imageId === actualCoverPhoto._id
    );
    
    // If found, update all liked statuses
    if (coverIndex >= 0) {
      return photos.map((photo, index) => ({
        ...photo,
        liked: index === coverIndex, // true only for the actual cover photo
        originalCoverPhotoId: originalCoverPhotoId, // Maintain original cover ID
      }));
    }
  }
  

  return photos;
};

const mapOutletItemToForm = (item, matchedProvince, matchedArea) => ({
  outlet_id: item?._id,
  BusinessName: item?.business_name || item?.businessName,
  OutletName: item?.outletName,
  ContactPersonFirstName: item?.contactName,
  ContactPersonLastName: item?.lastName,
  ContactPersonMobile: {
    mobileNo: formatSouthAfricanPhone(item?.contactNumber),
    mobileNoRaw: item?.contactNumber,
    countrieDetails: countries[161],
  },
  ContactPersonEmail: item?.email,
  MobileNumber_CustomerToReachOut: {
    mobileNo: formatSouthAfricanPhone(item?.landline),
    mobileNoRaw: item?.landline,
    countrieDetails: countries[161],
  },
  SubCategories_id: item?.subcategory?._id,
  SubCategories: item?.subcategory,
  About: item?.about,
  OutletLocation: item?.location,
  Address: item?.address,
  ProvinceDetails: matchedProvince,
  Province_name: matchedProvince?.name,
  AreaDetails: matchedArea,
  Area_name: matchedArea?.name,
});

const formatDate = date => (date ? moment(date).format('MM/DD/YYYY') : '');

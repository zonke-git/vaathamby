import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Url } from '../../../api/url';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import {
  photosDetails_submitOnBoardFormFailure,
  photosDetails_submitOnBoardFormLoader,
  photosDetails_submitOnBoardFormSuccess,
  setOutletFormumber,
  setOutletSingleStep,
  setPhotosDetails,
} from '../../../redux/slice/outletSlice';

// Constants
const isAndroid13OrAbove = Platform.OS === 'android' && Platform.Version >= 33;
const imagePickerOptions = {
  mediaType: 'photo',
  quality: 0.8,
  maxWidth: 1000,
  maxHeight: 1000,
  includeBase64: Platform.OS === 'android',
  presentationStyle: isAndroid13OrAbove ? 'photoLibrary' : undefined,
};

export const usePhotoForm = () => {
  // Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // State
  const [visible, setVisible] = useState(false);
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState(null);

  // Selectors
  const PhotosFormValues = useSelector(state => state?.outlet?.PhotosDetails);
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const outletSingleStep = useSelector(state => state?.outlet?.outletSingleStep);
  const PhotosFormDetails_SubmitError = useSelector(state => state?.onBoard?.PhotosFormDetails_SubmitError);
  const PhotosFormDetails_SubmitErrorMessage = useSelector(state => state?.onBoard?.PhotosFormDetails_SubmitErrorMessage);
  const PhotosFormDetails_IsLoader = useSelector(state => state?.onBoard?.businessDetails_IsSubmitting);
  const PhotosFormDetails_SubmitSuccess = useSelector(state => state?.onBoard?.PhotosFormDetails_SubmitSuccess);
  const edit_outlet_id = useSelector(state => state?.outlet?.outletInfoDetails?.outlet_id);
  const New_Outlet_ID = useSelector(state => state?.outlet?.outletInfoDetails_SubmitSuccessMessage?.newOutlet?._id);

  // Derived values
  const photosArray = Array.isArray(PhotosFormValues) ? PhotosFormValues : Object.values(PhotosFormValues || {});
  const [firstPhoto, ...remainingPhotos] = photosArray;

  // Helper functions
  const getImageUri = item => {
    const imageKey = Object.keys(item).find(key => key.endsWith('Img'));
    return item[imageKey];
  };

  const isAtLeastOneImageSelected = () => {
    return photosArray?.some(photo => {
    // Check all possible image fields in the photo object
    const hasImage = photo.firstImg || photo.secondImg || 
                    photo.thirdImg || photo.fourthImg || 
                    photo.fifthImg;
    return !!hasImage;
  });
  };

  const isFormValid = () => isAtLeastOneImageSelected();

  // Handler functions
  const handlePrevious = () => dispatch(setOutletFormumber(3));

  const showImagePicker = (onSelect) => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => launchCamera(imagePickerOptions, onSelect) },
        { text: 'Gallery', onPress: () => launchImageLibrary(imagePickerOptions, onSelect) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleImagePicker = (index) => {
    showImagePicker((response) => handleImageSelection(response, index));
  };

  const handleImageSelection = (response, index) => {
    if (response.didCancel || response.error) {
      if (response.error) console.log('ImagePicker Error: ', response.error);
      return;
    }

    if (response.assets?.length > 0) {
      const imageData = response.assets[0];
      const updatedPhotos = [...photosArray];
      const imageKey = Object.keys(updatedPhotos[index])[0];

      updatedPhotos[index] = {
        ...updatedPhotos[index],
        [imageKey]: imageData.uri,
        base64: imageData.base64,
        type: imageData.type,
        fileName: imageData.fileName,
      };

      dispatch(setPhotosDetails(updatedPhotos));
    }
  };

  const handleDeleteImage = (index) => {
    const updatedPhotos = [...photosArray];
    const imageKey = Object.keys(updatedPhotos[index])[0];
    
    updatedPhotos[index] = {
      ...updatedPhotos[index],
      [imageKey]: '',
      base64: undefined,
      type: undefined,
      fileName: undefined,
    };
    
    dispatch(setPhotosDetails(updatedPhotos));
  };

  const handleLikeImage = (index) => {
    const updatedPhotos = photosArray.map((photo, i) => ({
      ...photo,
      liked: i === index ? !photo.liked : false,
      coverphoto: i === index ? !photo.liked : false,
    }));
    
    dispatch(setPhotosDetails(updatedPhotos));
  };

  const handlePhotosDetailsFormSubmit = async () => {
    try {
      dispatch(photosDetails_submitOnBoardFormLoader());

      const OUTLET_ID = New_Outlet_ID || edit_outlet_id;
      if (!OUTLET_ID) {
        const msg = 'Outlet ID is missing';
        dispatch(photosDetails_submitOnBoardFormFailure(msg));
        throw new Error(msg);
      }

      const formData = new FormData();
      const allExistingIds = photosArray
        .filter(photo => {
          const uri = getImageUri(photo);
          return photo.imageId && (!uri || uri.startsWith('http'));
        })
        .map(photo => photo.imageId);

      // Cover photo handling
      const coverPhoto = photosArray[0];
      const coverUri = getImageUri(coverPhoto);
      const isCoverPhotoChanged = coverUri && !coverUri.startsWith('http');
      
      // Liked photo handling
      const likedPhotoIndex = photosArray.findIndex(photo => photo.liked);
      const likedPhoto = likedPhotoIndex >= 0 ? photosArray[likedPhotoIndex] : null;
      const isLikedPhotoNew = likedPhoto && getImageUri(likedPhoto) && 
                            (!likedPhoto.imageId || !getImageUri(likedPhoto).startsWith('http'));

      let oldCoverId = null;
      let newCoverId = null;

      if (isCoverPhotoChanged) {
        if (coverPhoto?.fileName && coverUri) {
          formData.append('coverPhoto', {
            uri: coverUri,
            name: coverPhoto.fileName || `cover_${Date.now()}.jpg`,
            type: coverPhoto.type || 'image/jpeg',
          });
        }
      } else if (isLikedPhotoNew) {
        const likedUri = getImageUri(likedPhoto);
        if (likedPhoto?.fileName && likedUri) {
          formData.append('coverPhoto', {
            uri: likedUri,
            name: likedPhoto.fileName || `cover_${Date.now()}.jpg`,
            type: likedPhoto.type || 'image/jpeg',
          });
          
          if (coverPhoto.imageId) oldCoverId = coverPhoto.imageId;
          if (likedPhoto.imageId) {
            const index = allExistingIds.indexOf(likedPhoto.imageId);
            if (index !== -1) allExistingIds.splice(index, 1);
          }
        }
      } else if (likedPhoto?.imageId) {
        newCoverId = likedPhoto.imageId;
        if (coverPhoto.imageId && coverPhoto.imageId !== newCoverId) {
          oldCoverId = coverPhoto.imageId;
        }
      }

      // Gallery photos handling
      photosArray.slice(1).forEach((photo, index) => {
        const uri = getImageUri(photo);
        if (photo === likedPhoto && isLikedPhotoNew) return;
        
        if (photo?.fileName && uri) {
          formData.append('photos', {
            uri,
            name: photo.fileName || `gallery_${index}_${Date.now()}.jpg`,
            type: photo.type || 'image/jpeg',
          });
        }
      });

      if (allExistingIds.length > 0) formData.append('ids', JSON.stringify(allExistingIds));
      if (newCoverId && !isLikedPhotoNew) formData.append('coverId', newCoverId);
      if (oldCoverId) formData.append('oldcoverId', oldCoverId);

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      // console.log('formData',formData);

      const response = await axios.put(
        `${Url.URL_V4}/outlet/coverPhoto/${OUTLET_ID}`,
        formData,
        { headers, timeout: 30000 }
      );

      if (response.data?.success) {
        if (outletSingleStep) {
          dispatch(setOutletFormumber(1));
          dispatch(setOutletSingleStep(false));
          navigation.navigate('OutletList');
        } else {
          dispatch(setOutletFormumber(5));
        }
      } else {
        showToast(response?.data?.message || 'Submission failed');
      }

      dispatch(photosDetails_submitOnBoardFormSuccess(
        response.data?.message || 'Photos uploaded successfully'
      ));

      return response.data;
    } catch (error) {
      console.log('Upload error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Network Error';
      
      dispatch(photosDetails_submitOnBoardFormFailure(errorMessage));
      showToast(errorMessage);
    }
  };

  const showToast = (message) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
  };

  return {
    // State values
    outletSingleStep,
    PhotosFormDetails_SubmitError,
    PhotosFormDetails_IsLoader,
    PhotosFormDetails_SubmitErrorMessage,
    PhotosFormValues,
    photosArray,
    firstPhoto,
    remainingPhotos,
    visible,
    imageToDeleteIndex,
    
    // Handler functions
    handlePhotosDetailsFormSubmit,
    handlePrevious,
    getImageUri,
    handleDeleteImage,
    handleImagePicker,
    handleLikeImage,
    
    // Setter functions
    setVisible,
    setImageToDeleteIndex,
    
    // Validation functions
    isAtLeastOneImageSelected,
    isFormValid,
  };
};
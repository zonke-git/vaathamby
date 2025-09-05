import {useDispatch, useSelector} from 'react-redux';
import {
  documentDetails_submitOnBoardFormFailure,
  documentDetails_submitOnBoardFormLoader,
  documentDetails_submitOnBoardFormSuccess,
  setDocumentsDetails,
  setOutletFormumber,
} from '../../../redux/slice/outletSlice';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {Url} from '../../../api/url';
import {isAndroid13OrAbove} from './use-photoForm';
import {useNavigation} from '@react-navigation/native';

export const useDocumentsForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const DocumentsFormValues = useSelector(
    state => state?.outlet?.DocumentsDetails,
  );

  // console.log('DocumentsFormValues', DocumentsFormValues);
  const token = useSelector(state => state?.auth?.authTokenInfo);

  const New_Outlet_ID = useSelector(
    state =>
      state?.outlet?.outletInfoDetails_SubmitSuccessMessage?.newOutlet?._id,
  );

  const edit_outlet_id = useSelector(
    state => state?.outlet?.outletInfoDetails?.outlet_id,
  );

  const loginDetails = useSelector(state => state?.auth?.loginDetails);
  const documentsDetailsFormValues = useSelector(
    state => state?.onBoard?.documentsDetails,
  );

  const documentsDetails_SubmitError = useSelector(
    state => state?.onBoard?.documentsDetails_SubmitError,
  );
  const documentsDetails_SubmitErrorMessage = useSelector(
    state => state?.onBoard?.documentsDetails_SubmitErrorMessage,
  );
  const documentsDetails_IsLoader = useSelector(
    state => state?.onBoard?.documentsDetails_IsSubmitting,
  );
  const documentsDetails_SubmitSuccess = useSelector(
    state => state?.onBoard?.documentsDetails_SubmitSuccess,
  );
  const documentsDetails_SubmitSuccessMessage = useSelector(
    state => state?.onBoard?.documentsDetails_SubmitSuccessMessage,
  );

  const categoriesList = useSelector(
    state => state?.onBoard?.categories?.Categorys,
  );

  const handlePrevious = async values => {
    dispatch(setOutletFormumber(1));
  };

  const handleImagePick = async () => {
    try {
      const response = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8, // Recommended to add quality for mobile
        selectionLimit: 1, // Explicitly limit to 1 image
        presentationStyle: isAndroid13OrAbove ? 'photoLibrary' : undefined,
      });
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        return;
      }
      if (response.assets?.length) {
        const selectedImage = response.assets[0];
        // console.log('Selected image:', selectedImage);
        dispatch(
          setDocumentsDetails({
            tradeLicense: {
              uri: selectedImage.uri,
              name: selectedImage.fileName || `license_${Date.now()}.jpg`,
              type: selectedImage.type || 'image/jpeg',
              size: selectedImage.fileSize,
            },
          }),
        );
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleDocumentPick = async fieldName => {
    try {
      let typesToAllow = [types.pdf, types.images]; // Default to PDF only

      // For fields that allow PDF, JPG, PNG
      if (fieldName.includes('PDF_JPG_PNG')) {
        typesToAllow = [
          types.pdf,
          types.images, // This covers all image types including jpg, png, jpeg
        ];
      }

      const res = await DocumentPicker.pick({
        type: typesToAllow,
        allowMultiSelection: false,
      });

      const file = res[0];

      // Validate file extension
      const fileExt = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = [];

      // Map types to extensions
      typesToAllow.forEach(type => {
        if (type === types.pdf) allowedExtensions.push('pdf');
        if (type === types.images) {
          allowedExtensions.push('jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp');
        }
      });

      if (!allowedExtensions.includes(fileExt)) {
        console.error('Invalid file type selected');
        // You might want to show an error to the user here
        return;
      }

      dispatch(setDocumentsDetails({[fieldName]: file}));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document pick error:', err);
      }
    }
  };

  const handleCancel = fieldName => {
    dispatch(setDocumentsDetails({[fieldName]: null}));
  };

  const handleSubmits = async values => {
    // console.log('Outlet Documents :', values);

    try {
      dispatch(documentDetails_submitOnBoardFormLoader());

      const formData = new FormData();

      // Append all text fields (excluding files)
      formData.append('regNo', values.RegistrationNo || '');
      // formData.append('reqDate', values.RegistrationDate || '');
      // formData.append('issuingProvince', values.IssuingProvince_name || '');
      formData.append('taxNo', values.TaxRegistrationNumber_TRN || '');

      // Helper to append file if it has a URI
      const appendFile = (fieldName, file) => {
        if (file?.uri) {
          formData.append(fieldName, {
            uri: file.uri,
            name:
              file.name ||
              `${fieldName}_${Date.now()}.${file.type?.split('/')[1] || 'jpg'}`,
            type: file.type || 'image/jpeg',
          });
        }
      };

      // Append file inputs
      appendFile(
        'registerationCertificate',
        values.RegistrationCertificatePDF_JPG_PNG,
      );
      appendFile('taxCertificate', values.TaxCertificatePDF_JPG_PNG);

      console.log('FormData contents:', formData);
      const OUTLET_ID = New_Outlet_ID || edit_outlet_id;
      const response = await axios.put(
        `${Url.URL_V4}/outlet/documents/${OUTLET_ID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          timeout: 30000,
        },
      );

      console.log('Response:', response.data);

      if (response.data?.success) {
        dispatch(setOutletFormumber(3));
      } else {
        Toast.show(response?.data?.message || 'Submission failed', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }

      dispatch(
        documentDetails_submitOnBoardFormSuccess(response.data || 'Success'),
      );

      return response.data;
    } catch (error) {
      console.error('Error uploading documents:', error);
      dispatch(
        documentDetails_submitOnBoardFormFailure(error || 'Submission failed'),
      );

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      throw error;
    }
  };

  return {
    dispatch,
    DocumentsFormValues,
    handleSubmits,
    handlePrevious,
    handleDocumentPick,
    handleCancel,
    handleImagePick,
    //
    categoriesList,
  };
};

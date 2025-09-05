import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import {
  complianceFinancialDetails_submitOnBoardFormFailure,
  complianceFinancialDetails_submitOnBoardFormLoader,
  complianceFinancialDetails_submitOnBoardFormSuccess,
  setComplianceFinancialDetails,
  setOnBoardFormNumber,
} from '../../redux/slice/onBoardSlice';
import {Url} from '../../api/url';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {useEffect} from 'react';
import {getMerchantDetails} from '../../redux/action/businessProfileActions';

export const useComplianceFinancialDetailsForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const ComplianceAndFinancialsDetailsFormValues = useSelector(
    state => state?.onBoard?.ComplianceAndFinancialsDetails,
  );
  const merchant_details = useSelector(
    state =>
      state?.businessProfile?.merchantDetailsdata?.merchant?.company?.company,
  );

  useEffect(() => {
    if (token) {
      dispatch(getMerchantDetails(token))
        .then(response => {
          // console.log('Busi Merchant Details Response :', response?.merchant);
          dispatch(
            setComplianceFinancialDetails({
              CIPCRegistrationNumber: response?.merchant?.registration_number,
              TaxNumber: response?.merchant?.company?.TaxNumber,
              registerationCertificate: '',
              taxCertificate: '',
            }),
          );
        })
        .catch(error => {
          console.error('Merchant Details Error :', error);
        });
    }
  }, [dispatch, navigation, token]);
  // console.log('merchant_details', merchant_details);

  // console.log(
  //   'ComplianceAndFinancialsDetailsFormValues',
  //   ComplianceAndFinancialsDetailsFormValues,
  // );

  const handleImagePick = async () => {
    try {
      const response = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8, // Recommended to add quality for mobile
        selectionLimit: 1, // Explicitly limit to 1 image
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
          setComplianceFinancialDetails({
            taxCertificate: {
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
      const res = await DocumentPicker.pick({
        type: [types.pdf, types.doc, types.docx, types.plainText, types.images],
        allowMultiSelection: false,
      });

      const file = res[0];
      dispatch(setComplianceFinancialDetails({[fieldName]: file}));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document pick error:', err);
      }
    }
  };

  const handleCancel = fieldName => {
    dispatch(setComplianceFinancialDetails({[fieldName]: null}));
  };

  const handleComplianceAndFinancialsDetailsFormSubmit = async values => {
    // console.log('Compliance And Financials Details Form submitted:', values);

    try {
      // Dispatch loading action
      dispatch(complianceFinancialDetails_submitOnBoardFormLoader());

      const formData = new FormData();

      // Append text fields
      // formData.append('tax_number', values.taxNumber || '');

      // Helper function to append files
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

      // Append all files from the form values
      appendFile('registerationCertificate', values.registerationCertificate);
      appendFile('taxCertificate', values.taxCertificate);

      // Debug: Log FormData contents
      // console.log('FormData contents:', formData);

      // Make the API call
      const response = await axios.post(`${Url.URL_V4}/step3`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        timeout: 30000, // 30 seconds timeout
      });

      // console.log('Response:', response.data);

      if (response.data?.success) {
        dispatch(setOnBoardFormNumber(4));
      }

      // Dispatch success action
      dispatch(
        complianceFinancialDetails_submitOnBoardFormSuccess(
          response.data || 'Success',
        ),
      );

      Toast.show(response?.data?.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading documents:', error);

      // Dispatch error action
      dispatch(
        complianceFinancialDetails_submitOnBoardFormFailure(
          error || 'Submission failed',
        ),
      );

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
      }

      throw error;
    }
  };

  return {
    dispatch,
    ComplianceAndFinancialsDetailsFormValues,
    handleImagePick,
    handleComplianceAndFinancialsDetailsFormSubmit,
    handleCancel,
    handleDocumentPick,
    merchant_details,
  };
};

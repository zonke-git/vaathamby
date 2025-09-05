import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import DocumentPicker, {types} from 'react-native-document-picker';

import {
  setBusinessProfileComplianceFinancialDetails,
  setbusinessProfileFormNumber,
  setbusinessProfileSingleScreen,
  submitfinanceDetailsFormFailure,
  submitfinanceDetailsFormLoader,
  submitfinanceDetailsFormSuccess,
} from '../../redux/slice/businessProfileSlice';
import {Url} from '../../api/url';

export const useComplianceAndFinancialDetailsForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector(state => state?.auth?.authTokenInfo);
  const ComplianceAndFinancialsDetailsFormValues = useSelector(
    state =>
      state?.businessProfile?.businessProfileComplianceAndFinancialsDetails,
  );
  const businessProfileSingleScreen = useSelector(
    state => state?.businessProfile?.businessProfileSingleScreen,
  );

  const handleDocumentPick = async fieldName => {
    try {
      const res = await DocumentPicker.pick({
        type: [types.pdf, types.doc, types.docx, types.plainText, types.images],
        allowMultiSelection: false,
      });

      const file = res[0];
      dispatch(
        setBusinessProfileComplianceFinancialDetails({[fieldName]: file}),
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document pick error:', err);
      }
    }
  };

  const handleCancel = fieldName => {
    dispatch(setBusinessProfileComplianceFinancialDetails({[fieldName]: null}));
  };

  const handleComplianceAndFinancialsDetailsFormSubmit = async values => {
    try {
      const formData = new FormData();

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

      appendFile('registerationCertificate', values.registerationCertificate);
      appendFile('taxCertificate', values.taxCertificate);

      if (formData._parts.length === 0) {
        console.log('No files attached to FormData');

        if (businessProfileSingleScreen) {
          dispatch(setbusinessProfileSingleScreen(false));
          navigation.navigate('MainApp', {
            screen: 'MyAccount',
            params: {
              from: 'businessProfile',
            },
          });
        } else {
          dispatch(setbusinessProfileFormNumber(4));
          dispatch(submitfinanceDetailsFormSuccess('Success'));
        }

        return;
      }

      dispatch(submitfinanceDetailsFormLoader());
      const response = await axios.put(
        `${Url.URL_V4}/profiledocuments`,
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
        if (businessProfileSingleScreen) {
          dispatch(setbusinessProfileSingleScreen(false));
          navigation.navigate('MainApp', {
            screen: 'MyAccount',
            params: {
              from: 'businessProfile',
            },
          });
        } else {
          dispatch(setbusinessProfileFormNumber(4));
        }
        dispatch(submitfinanceDetailsFormSuccess(response.data || 'Success'));
        dispatch(
          setBusinessProfileComplianceFinancialDetails({
            CIPCRegistrationNumber: '',
            registerationCertificate: '',
            taxNumber: '',
            taxCertificate: '',
          }),
        );
      } else {
        dispatch(submitfinanceDetailsFormFailure('Submission failed'));
        Toast.show(response?.data?.message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }

      return response.data;
    } catch (error) {
      console.error('Error uploading documents:', error);
      dispatch(submitfinanceDetailsFormFailure(error || 'Submission failed'));

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

  const handleCancelExit = () => {
    navigation.navigate('MainApp', {
      screen: 'MyAccount',
      params: {
        from: 'businessProfile',
      },
    });
  };

  return {
    ComplianceAndFinancialsDetailsFormValues,
    businessProfileSingleScreen,
    dispatch,
    handleCancel,
    handleComplianceAndFinancialsDetailsFormSubmit,
    handleDocumentPick,
    handleCancelExit,
  };
};

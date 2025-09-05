import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {engagementModelDetails_submitOnBoardForm} from '../../redux/action/onBoardActions';
import Toast from 'react-native-root-toast';
const options = [
  {
    id: 1,
    name: 'Scan & Pay (QR Code)',
    ImageData: require('../../assets/images/ScanAndPay.png'),
  },
  // {
  //   id: 2,
  //   name: 'Payment Link',
  //   ImageData: require('../../assets/images/PayLink.png'),
  // },
  // {
  //   id: 3,
  //   name: 'Both (Scan & Pay + Payment Link)',
  //   ImageData: require('../../assets/images/DoubleTick.png'),
  // },
];

export const useBusinessProfileEngagementModelForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const businessProfileEngagementModelDetailsFormValues = useSelector(
    state => state?.businessProfile?.businessProfileEngagementModelDetails,
  );
  const OutletFirstTime = useSelector(state => state?.outlet?.OutletFirstTime);

  const handlebusinessProfileEngagementModelDetailsFormSubmit = values => {
    const payload = {
      scan_pay: businessProfileEngagementModelDetailsFormValues?.scan_pay,
      scan_cashback_percentage:
        businessProfileEngagementModelDetailsFormValues?.scan_cashback_percentage,
      payment_link:
        businessProfileEngagementModelDetailsFormValues?.payment_link,
      paymentlink_cashback_percentage: 10,
    };
    // console.log('Engagement Model Details payload:', payload);
    dispatch(engagementModelDetails_submitOnBoardForm(payload, token))
      .then(response => {
        // console.log('Engagement Model Details Response :', response);

        if (response?.success) {
          if (OutletFirstTime) {
            navigation.navigate('OutletList');
          } else {
            navigation.navigate('MainApp', {
              screen: 'MyAccount',
              params: {
                from: 'businessProfile',
              },
            });
          }
        } else {
          Toast.show(response?.message || 'Something went wrong', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      })
      .catch(error => {
        console.error('Engagement Model Details Error :', error);
        Toast.show(error?.error || 'Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      });
  };

  const handleCancel = () => {
    navigation.navigate('MainApp', {
      screen: 'MyAccount',
      params: {
        from: 'businessProfile',
      },
    });
  };

  return {
    options,
    dispatch,
    businessProfileEngagementModelDetailsFormValues,
    handlebusinessProfileEngagementModelDetailsFormSubmit,
    handleCancel,
  };
};

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {engagementModelDetails_submitOnBoardForm} from '../../redux/action/onBoardActions';
import {setOnBoardFormNumber} from '../../redux/slice/onBoardSlice';
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

export const useEngagementModelForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const EngagementModelDetailsFormValues = useSelector(
    state => state?.onBoard?.EngagementModelDetails,
  );

  const handleEngagementModelDetailsFormSubmit = values => {
    const payload = {
      scan_pay: EngagementModelDetailsFormValues?.scan_pay,
      scan_cashback_percentage:
        EngagementModelDetailsFormValues?.scan_cashback_percentage,
      payment_link: EngagementModelDetailsFormValues?.payment_link,
      paymentlink_cashback_percentage: 0,
    };
    // console.log('Engagement Model Details payload:', payload);
    dispatch(engagementModelDetails_submitOnBoardForm(payload, token))
      .then(response => {
        // console.log('Engagement Model Details Response :', response);

        if (response?.success) {
          dispatch(setOnBoardFormNumber(4));
        }
      })
      .catch(error => {
        console.error('Engagement Model Details Error :', error);
      });
  };

  return {
    options,
    dispatch,
    EngagementModelDetailsFormValues,
    handleEngagementModelDetailsFormSubmit,
  };
};

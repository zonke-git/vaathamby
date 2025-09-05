import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  documentDetails_submitOnBoard_reset,
  engagementModelDetails_submitOnBoard_reset,
  engagementModelDetails_submitOnBoardFormFailure,
  outletCharacteristicsDetails_submitOnBoard_reset,
  outletInfoDetails_submitOnBoard_reset,
  photosDetails_submitOnBoard_reset,
  resetDocumentsDetails,
  resetEngagementModelDetails,
  resetOutletCharacteristicsDetails,
  resetOutletInfoDetails,
  resetPhotosDetails,
  resetTimingsDetails,
  setOutletFirstTime,
  setOutletFormumber,
  timingsDetails_submitOnBoard_reset,
} from '../../../redux/slice/outletSlice';
import Toast from 'react-native-root-toast';
import {outletEngagementmodel_Form} from '../../../redux/action/outletActions';
import {
  setAddMenuDetails,
  setSelectDropDownMenu,
} from '../../../redux/slice/catalogueSlice';
const options = [
  {
    id: 1,
    name: 'Scan & Pay (QR Code)',
    ImageData: require('../../../assets/images/ScanAndPay.png'),
  },
  //   {
  //     id: 2,
  //     name: 'Payment Link',
  //     ImageData: require('../../../assets/images/PayLink.png'),
  //   },
  // {
  //   id: 3,
  //   name: 'Both (Scan & Pay + Payment Link)',
  //   ImageData: require('../../../assets/images/DoubleTick.png'),
  // },
];

export const useEngagementModelForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const EngagementModelDetailsFormValues = useSelector(
    state => state?.outlet?.EngagementModelDetails,
  );
  const OutletFirstTime = useSelector(state => state?.outlet?.OutletFirstTime);

  const New_Outlet_ID = useSelector(
    state =>
      state?.outlet?.outletInfoDetails_SubmitSuccessMessage?.newOutlet?._id,
  );

  const edit_outlet_id = useSelector(
    state => state?.outlet?.outletInfoDetails?.outlet_id,
  );

  const handleEngagementModelDetailsFormSubmit = values => {
    const OUTLET_ID = New_Outlet_ID || edit_outlet_id;
    if (!OUTLET_ID) {
      dispatch(
        engagementModelDetails_submitOnBoardFormFailure('Outlet ID is missing'),
      );
      throw new Error('Outlet ID is missing');
    }
    const payload = {
      scan_pay: true,
      scan_cashback_percentage:
        EngagementModelDetailsFormValues?.CashbackPercentage,
      payment_link: false,
      paymentlink_cashback_percentage: 0,
    };

    // console.log('Outlet EngagementModel Details  Payload :', payload);
    dispatch(outletEngagementmodel_Form(payload, token, OUTLET_ID))
      .then(response => {
        // console.log('Outlet EngagementModel Details Response :', response);
        if (response?.success) {
          if (OutletFirstTime) {
            dispatch(setOutletFirstTime(false));
            dispatch(
              setSelectDropDownMenu({
                selectedMenuList: response?.outlets,
                selectedMenuList_name: response?.outlets?.outletName,
              }),
            );
            dispatch(
              setAddMenuDetails({
                Outlet: response?.outlets,
                Outlet_name: response?.outlets?.outletName,
              }),
            );
            navigation.navigate('AddProduct');
          } else {
            navigation.navigate('OutletList');
          }

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
          dispatch(setOutletFormumber(1));
        } else {
          Toast.show(response?.message || 'Submission failed', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
          dispatch(
            engagementModelDetails_submitOnBoardFormFailure(
              'Submission failed',
            ),
          );
        }
      })
      .catch(error => {
        console.error('Outlet EngagementModel Details Error :', error);
      });
  };

  const handlePrevious = async values => {
    dispatch(setOutletFormumber(4));
  };
  return {
    options,
    dispatch,
    EngagementModelDetailsFormValues,
    handleEngagementModelDetailsFormSubmit,

    handlePrevious,
  };
};

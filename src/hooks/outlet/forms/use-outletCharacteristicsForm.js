import {useDispatch, useSelector} from 'react-redux';
import {
  outletCharacteristicsDetails_submitOnBoardFormFailure,
  setOutletFormumber,
  setOutletSingleStep,
} from '../../../redux/slice/outletSlice';
import Toast from 'react-native-root-toast';
import {
  fetchFacilitys,
  outletCharacteristics_Form,
} from '../../../redux/action/outletActions';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

export const useOutletCharacteristicsForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const outletSingleStep = useSelector(
    state => state?.outlet?.outletSingleStep,
  );
  // const business_category = useSelector(
  //   state => state?.businessProfile?.merchantDetailsdata?.merchant,
  // );
  // console.log('business_category', business_category);

  const business_ = useSelector(
    state => state?.businessProfile?.merchantDetailsdata?.merchant,
  );

  // console.log('business_ ::', business_);

  const business_category_id = useSelector(
    state =>
      state?.businessProfile?.merchantDetailsdata?.merchant?.business_category
        ?._id,
  );
  // console.log('business_category_id', business_category_id);

  const facilitysList = useSelector(
    state => state?.outlet?.facilitys?.Facilitys,
  );

  // console.log('facilitysList ::', facilitysList);
  const SubCategories_id = useSelector(
    state => state?.outlet?.outletInfoDetails
,
  );

  // console.log('SubCategories_id',SubCategories_id);
  

  const OutletCharacteristicsFormValues = useSelector(
    state => state?.outlet?.OutletCharacteristicsDetails,
  );

  const New_Outlet_ID = useSelector(
    state =>
      state?.outlet?.outletInfoDetails_SubmitSuccessMessage?.newOutlet?._id,
  );

  const edit_outlet_id = useSelector(
    state => state?.outlet?.outletInfoDetails?.outlet_id,
  );

  const outlet_ErrorMessage = useSelector(
    state =>
      state?.outlet?.outletCharacteristicsDetails_SubmitErrorMessage?.error,
  );

  // console.log('business_category_id', business_category_id);

  useEffect(() => {
    const fetchData = async () => {
      const id_ = business_category_id;
      try {
        if (token) {
          dispatch(fetchFacilitys(token, id_));
        }
      } catch (error) {
        console.error('Failed to fetch facilities', error);
      }
    };

    fetchData();
  }, [dispatch, token, business_category_id]);

  const handlePrevious = () => {
    dispatch(setOutletFormumber(1));
  };

  const handleMySubmit = async () => {
    const payload = {
      facilities: Object.entries(OutletCharacteristicsFormValues).map(
        ([key, value]) => ({
          name: key,
          isHave: value,
        }),
      ),
    };

    // Validate at least one option selected
    const hasValidSelection = payload.facilities.some(
      f => f.isHave === true || f.isHave === false,
    );

    if (!hasValidSelection) {
      Toast.show('Please select at least one facility detail.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
      return;
    }

    try {
      const OUTLET_ID = New_Outlet_ID || edit_outlet_id;
      if (!OUTLET_ID) {
        dispatch(
          outletCharacteristicsDetails_submitOnBoardFormFailure(
            'Outlet ID is missing',
          ),
        );
        throw new Error('Outlet ID is missing');
      }

      const response = await dispatch(
        outletCharacteristics_Form(payload, token, OUTLET_ID),
      );

      if (response?.success) {
        if (outletSingleStep) {
          dispatch(setOutletFormumber(1));
          dispatch(setOutletSingleStep(false));
          navigation.navigate('OutletList');
        } else {
          dispatch(setOutletFormumber(3));
        }
      } else {
        Toast.show(response?.message || 'Submission failed', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }
    } catch (error) {
      console.error('Submission failed:', error);
      Toast.show(error.message || 'Submission failed', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });

      dispatch(
        outletCharacteristicsDetails_submitOnBoardFormFailure(error.message),
      );
    }
  };

  const isFormValid = () => {
    return Object.values(OutletCharacteristicsFormValues).some(
      value => value === true || value === false,
    );
  };

  return {
    OutletCharacteristicsFormValues,
    outletSingleStep,
    facilitysList,
    outlet_ErrorMessage,

    dispatch,
    handlePrevious,
    handleMySubmit,
    isFormValid,
  };
};

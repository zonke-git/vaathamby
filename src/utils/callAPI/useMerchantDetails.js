import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getMerchantDetails} from '../../redux/action/businessProfileActions';
import {setMerchantDetailsFailure} from '../../redux/slice/businessProfileSlice';

const useMerchantDetails = (token, onSuccess) => {
  const dispatch = useDispatch();

  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    dispatch(getMerchantDetails(token))
      .then(res => {
        const merchantData = res?.merchant;

        if (!merchantData) {
          const errorMsg = 'Submission failed';
          dispatch(setMerchantDetailsFailure(errorMsg));
          setError(errorMsg);
          return;
        }

        setMerchant(merchantData);
        if (typeof onSuccess === 'function') {
          onSuccess(merchantData);
        }
      })
      .catch(() => {
        const errorMsg = 'Failed to fetch merchant details';
        dispatch(setMerchantDetailsFailure(errorMsg));
        setError(errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, token, onSuccess]);

  return {merchant, loading, error};
};

export default useMerchantDetails;

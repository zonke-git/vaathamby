import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing the token
const AUTH_TOKEN_KEY = '@auth_token';
const MPIN_KEY = '@enable_mpin';
const MERCHANT_KEY = '@merchant_id';
const BIOMETRIC_KEY = '@bioMetric_id';

//
//
//
// AuthToken
//
//
//

/**
 * Save authentication token to storage
 * @param {string} token - Authentication token to save
 */
export const saveAuthToken = async token => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save auth token', error);
    throw error;
  }
};

/**
 * Retrieve authentication token from storage
 * @returns {Promise<string|null>} Authentication token or null if not found
 */
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get auth token', error);
    return null;
  }
};

/**
 * Remove authentication token from storage
 */
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove auth token', error);
    throw error;
  }
};

//
//
//
// MPIN
//
//
//

export const enableMPIN = async () => {
  try {
    await AsyncStorage.setItem(MPIN_KEY, 'MPIN');
  } catch (error) {
    console.error('Failed to save MPIN', error);
    throw error;
  }
};
export const getMPIN = async () => {
  try {
    return await AsyncStorage.getItem(MPIN_KEY);
  } catch (error) {
    console.error('Failed to get MPIN', error);
    return null;
  }
};
export const removeMPIN = async () => {
  try {
    await AsyncStorage.removeItem(MPIN_KEY);
  } catch (error) {
    console.error('Failed to remove MPIN', error);
    throw error;
  }
};

//
//
//
// Merchant_id_
//
//
//

export const setMerchant_id_ = async id => {
  try {
    await AsyncStorage.setItem(MERCHANT_KEY, id);
  } catch (error) {
    console.error('Failed to save merchant_id', error);
    throw error;
  }
};
export const getMerchant_id = async () => {
  try {
    return await AsyncStorage.getItem(MERCHANT_KEY);
  } catch (error) {
    console.error('Failed to get merchant_id', error);
    return null;
  }
};
export const removeMerchant_id = async () => {
  try {
    await AsyncStorage.removeItem(MERCHANT_KEY);
  } catch (error) {
    console.error('Failed to remove merchant_id', error);
    throw error;
  }
};

//
//
//
// BioMetrics Enabled
//
//
//

export const setBioMetrics = async id => {
  try {
    await AsyncStorage.setItem(BIOMETRIC_KEY, id);
  } catch (error) {
    console.error('Failed to save BIOMETRIC', error);
    throw error;
  }
};
export const getBioMetrics = async () => {
  try {
    return await AsyncStorage.getItem(BIOMETRIC_KEY);
  } catch (error) {
    console.error('Failed to get BIOMETRIC', error);
    return null;
  }
};
export const removeBioMetrics = async () => {
  try {
    await AsyncStorage.removeItem(BIOMETRIC_KEY);
  } catch (error) {
    console.error('Failed to remove BIOMETRIC', error);
    throw error;
  }
};

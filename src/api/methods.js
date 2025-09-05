import axios from 'axios';

export const get = async (url, params = {}, token) => {
  const config = {
    params: params || {},
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && {Authorization: `Bearer ${token}`}),
    },
  };

  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (err) {
    console.error('GET Error:', err);

    // More comprehensive error handling
    if (err.response) {
      // The request was made and the server responded with a status code
      throw (
        err.response.data || {
          status: err.response.status,
          message: err.response.statusText,
        }
      );
    } else if (err.request) {
      // The request was made but no response was received
      throw {
        message: 'No response received from server',
        originalError: err.message,
      };
    } else {
      // Something happened in setting up the request
      throw {
        message: 'Error setting up request',
        originalError: err.message,
      };
    }
  }
};

export const post = async (url, payload = {}, token, isFormData = false) => {
  // console.log('payload = {}, token', payload, token);

  // Set up headers based on content type
  const headers = {
    Accept: 'application/json',
    ...(token && {Authorization: `Bearer ${token}`}),
    ...(!isFormData && {'Content-Type': 'application/json'}),
  };

  // For FormData, we don't set Content-Type header - let the browser handle it
  let data = isFormData ? payload : JSON.stringify(payload);

  try {
    const response = await axios.post(url, data, {
      headers,
      // timeout: 30000, // 30 seconds timeout
    });
    return response.data;
  } catch (err) {
    console.log('❌ POST Error:');
    if (err.response) {
      console.log('Status Code:', err.response.status);
      console.log('Data:', JSON.stringify(err.response.data, null, 2));
    } else if (err.request) {
      console.log('No response received:', err.request);
    } else {
      console.log('Error Message:', err.message);
    }

    throw err?.response?.data || err.message;
  }
};

export const del = async (url, payload = {}, token) => {
  const headers = {
    Accept: 'application/json',
    ...(token && {Authorization: `Bearer ${token}`}),
  };
  try {
    const response = await axios.delete(url, {data: payload, headers});
    return response.data;
  } catch (err) {
    console.error('DELETE Error:', err);
    throw err?.response?.data || err.message;
  }
};

export const put = async (url, payload = {}, token, isFormData = false) => {
  // Set up headers based on content type
  const headers = {
    Accept: 'application/json',
    ...(token && {Authorization: `Bearer ${token}`}),
    ...(!isFormData && {'Content-Type': 'application/json'}),
  };

  // For FormData, don't set Content-Type manually
  const data = isFormData ? payload : JSON.stringify(payload);

  try {
    const response = await axios.put(url, data, {
      headers,
      // timeout: 30000, // 30 seconds timeout
    });
    return response.data;
  } catch (err) {
    console.log('❌ PUT Error:');
    if (err.response) {
      console.log('Status Code:', err.response.status);
      console.log('Data:', JSON.stringify(err.response.data, null, 2));
    } else if (err.request) {
      console.log('No response received:', err.request);
    } else {
      console.log('Error Message:', err.message);
    }

    throw err?.response?.data || err.message;
  }
};

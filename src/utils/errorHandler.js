// utils/errorHandler.js
export const parseApiError = (error) => {
  if (typeof error === 'string') return error;

  // Handle the scrambled object case
  if (error?.error) return error.error;

  // Handle the message field
  if (error?.message) return error.message;

  // Handle array-like error objects
  if (typeof error === 'object' && !Array.isArray(error)) {
    const keys = Object.keys(error).filter(k => !isNaN(k));
    if (keys.length > 0) {
      return keys.sort((a, b) => a - b).map(k => error[k]).join('');
    }
  }

  return 'An unknown error occurred';
};

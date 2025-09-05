export const getDisplayImageUri = imageObject => {
  if (!imageObject) return null;

  // Case 1: If it's already a string URL
  if (typeof imageObject === 'string') {
    if (
      imageObject.startsWith('http') ||
      imageObject.startsWith('file://') ||
      imageObject.startsWith('content://')
    ) {
      return imageObject;
    }
    return null;
  }

  // Case 2: Direct "uri" key (from image picker)
  if (imageObject.uri) return imageObject.uri;

  // Case 3: Any key that ends with "Img" (e.g. from DB structure)
  const key = Object.keys(imageObject).find(k => k.endsWith('Img'));
  const uri = imageObject[key];

  if (
    typeof uri === 'string' &&
    (uri.startsWith('http') ||
      uri.startsWith('file://') ||
      uri.startsWith('content://'))
  ) {
    return uri;
  }

  return null;
};

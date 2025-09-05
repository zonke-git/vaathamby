import RNFS from 'react-native-fs';

const baseUrl = 'https://zonkedev.blob.core.windows.net/zonkepay';
const encryptedPath =
  'registrationCertificate/3012094b-8281-46cd-ad72-3498774fb96c.pdf';
const fileUrl = `${baseUrl}/${encryptedPath}`;

const downloadAndDecryptFile = async () => {
  const downloadDest = `${RNFS.DocumentDirectoryPath}/registrationCertificate.pdf`;

  const response = await RNFS.downloadFile({
    fromUrl: fileUrl,
    toFile: downloadDest,
  }).promise;

  if (response.statusCode === 200) {
    console.log('Download success:', downloadDest);
    return downloadDest;
  } else {
    console.error('Download failed');
    return null;
  }
};

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import {formatFileSize} from '../../utils/formatFileSize';
import {useNavigation} from '@react-navigation/native';

const FileUploadField = ({
  label,
  required,
  file,
  iconType = 'PDF',
  onPick,
  onCancel,
  error,
  errorStyle,
  PreViewImage = false,
}) => {
  const navigation = useNavigation();
  const isUploaded =
    (typeof file === 'string' && file.trim().length > 20) || // base64 strings usually longer
    (typeof file === 'object' && !!file?.uri && file?.uri !== ''); // file object with valid URI

  const getBase64Type = (input = '') => {
    if (typeof input !== 'string') return null;

    if (input.startsWith('data:image')) return 'image';
    if (input.startsWith('data:application/pdf')) return 'pdf';
    if (input.startsWith('JVBER')) return 'pdf'; // raw base64 PDF
    if (input.startsWith('/9j/')) return 'image'; // JPEG
    if (input.startsWith('iVBOR')) return 'image'; // PNG
    return null;
  };

  const getFileIcon = () => {
    const uri = file?.uri || file;
    if (!uri) return null;

    const fileName = file?.name || '';
    const fileExt = fileName.split('.').pop()?.toLowerCase();

    if (uri.startsWith('data:application/pdf') || uri.startsWith('JVBER')) {
      return require('../../../assets/images/PDF.png');
    }
    if (
      uri.startsWith('data:image') ||
      uri.startsWith('/9j/') ||
      uri.startsWith('iVBOR')
    ) {
      return require('../../../assets/images/JPG.png');
    }

    switch (fileExt) {
      case 'pdf':
        return require('../../../assets/images/PDF.png');
      case 'jpg':
      case 'jpeg':
      case 'png':
        return require('../../../assets/images/JPG.png');
      default:
        return require('../../../assets/images/document.png');
    }
  };

  const getDisplayUri = () => {
    if (file?.uri) return file.uri;

    if (typeof file === 'string') {
      const base64Type = getBase64Type(file);
      console.log('base64Type', base64Type);

      if (base64Type === 'image') return `data:image/jpeg;base64,${file}`;
      if (base64Type === 'pdf') return `data:application/pdf;base64,${file}`;
    }

    return null;
  };

  const base64Type = getBase64Type(file?.uri || file);

  return (
    <View style={styles.filedStyle}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>

      {isUploaded ? (
        <>
          {PreViewImage ? (
            <>
              <View style={styles.img_view}>
                {base64Type === 'image' ? (
                  <Image
                    source={{uri: getDisplayUri()}}
                    style={styles.imagePreview}
                  />
                ) : (
                  <Image
                    source={getFileIcon()}
                    style={styles.selectedFileIcon}
                  />
                )}
                <TouchableOpacity onPress={onCancel} style={styles.closeBtn}>
                  <Image
                    source={require('../../../assets/images/Close.png')}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.showSelectedImage}>
              <View style={{flexDirection: 'row'}}>
                {base64Type === 'image' ? (
                  <Text
                    style={styles.viewPDF}
                    onPress={() => {
                      navigation.navigate('ImageViewerScreen', {
                        base64Data: file,
                      });
                    }}>
                    View Image
                  </Text>
                ) : base64Type ? (
                  <Text
                    style={styles.viewPDF}
                    onPress={() => {
                      navigation.navigate('PdfViewerScreen', {
                        base64Data: file,
                      });
                    }}>
                    View Pdf
                  </Text>
                ) : (
                  <>
                    <View style={styles.selectedFileIconShower}>
                      <Image
                        source={getFileIcon()}
                        style={styles.selectedFileIcon}
                      />
                    </View>

                    <View style={styles.showFileName_view}>
                      <Text
                        style={styles.fileName_txt}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {file?.name || 'Certificate'}
                      </Text>
                      <Text style={styles.fileSize_txt}>
                        {file?.size ? formatFileSize(file.size) : ''}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              <TouchableOpacity onPress={onCancel}>
                <Image
                  source={require('../../../assets/images/Close.png')}
                  style={styles.uploadIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={onPick}
            style={[
              styles.card,
              {borderColor: error ? colors.FireEngineRed : colors.LightGray},
            ]}>
            <Image
              source={require('../../../assets/images/FileArrowUp.png')}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadButtonText}>No attachments uploaded</Text>
            <Text style={styles.uploadButton2LineText}>
              To add a file, click here!
            </Text>
          </TouchableOpacity>
          {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    shadowColor: colors.DenimBlue,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.48,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    fontFamily: typography.Medium_500,
  },
  filedStyle: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.DimGray,
    lineHeight: 12 * 1.6,
    letterSpacing: 0,
    fontFamily: typography.Medium_500,
  },
  required: {
    color: colors.FireEngineRed,
  },
  showSelectedImage: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.WhisperGray,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewPDF: {
    fontSize: 12,
    lineHeight: 16.8,
    fontFamily: typography.Bold_700,
    color: colors.appTheme,
    textDecorationLine: 'underline',
  },
  selectedFileIconShower: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginRight: 8,
    alignSelf: 'center',
  },
  selectedFileIcon: {
    width: 20,
    height: 20,
  },
  showFileName_view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '75%',
  },
  fileName_txt: {
    fontSize: 12,
    lineHeight: 16.8,
    color: colors.textSecondaryColor,
    fontFamily: typography.Regular_400,
    marginBottom: 4,
  },
  fileSize_txt: {
    fontSize: 11,
    lineHeight: 11,
    color: colors.textSecondaryColor,
    fontFamily: typography.Regular_400,
  },
  card: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.LightGray,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  uploadButtonText: {
    fontSize: 12,
    color: colors.JetBlack,
    lineHeight: 19,
    fontFamily: typography.SemiBold_600,
  },
  uploadButton2LineText: {
    fontSize: 10,
    color: colors.textSecondaryColor,
    lineHeight: 19,
    fontFamily: typography.Regular_400,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
  },
  img_view: {
    aspectRatio: 327 / 150,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    backgroundColor: colors.appTheme,
    borderRadius: 60,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
});

export default FileUploadField;

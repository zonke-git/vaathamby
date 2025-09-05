import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Pdf from 'react-native-pdf';
import colors from '../../Theme/colors';

const PdfViewerScreen = ({route}) => {
  const {base64Data} = route.params;

  const navigation = useNavigation();

  const source = {
    uri: `data:application/pdf;base64,${base64Data}`,
    cache: true,
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
        onLoadComplete={numberOfPages => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onError={error => {
          console.log(error);
        }}
      />
      <TouchableOpacity onPress={onCancel} style={styles.close}>
        <Image
          source={require('../../assets/images/Close.png')}
          style={styles.uploadIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  close: {
    position: 'absolute',
    right: 30,
    top: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 30,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.white,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
});

export default PdfViewerScreen;

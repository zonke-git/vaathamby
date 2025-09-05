import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../../Theme/colors';

const ImageViewerScreen = ({route}) => {
  const {base64Data} = route.params;
  const navigation = useNavigation();

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: `data:image/jpeg;base64,${base64Data}`}}
        style={styles.image}
        resizeMode="contain"
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
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
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

export default ImageViewerScreen;

import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Theme/colors';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';

const SuccessfullyLayout = ({children, loader = false}) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <LinearGradient
        colors={[colors.AmberOrange, colors.white]}
        style={styles.pageColor}>
        {loader && <FullScreenLoader />}

        <Image
          source={require('../../assets/images/appBackground/appBgUp.png')}
          style={styles.appBgUpIcon}
        />
      </LinearGradient>
      <View style={styles.contentView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageColor: {
    flex: 0.2,
  },
  appBgUpIcon: {
    width: 239,
    height: 212,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
  },
  contentView: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default SuccessfullyLayout;

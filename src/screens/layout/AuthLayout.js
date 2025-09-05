import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';

const {height} = Dimensions.get('window');
const verticalScale = size => (height / 812) * size;

const AuthLayout = ({
  title = 'Welcome',
  subTitle = '',
  children,
  topStyle,
  fontStyle,
  loader = false,
  containerStyle,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {loader && <FullScreenLoader />}

      {/* Background Images */}
      <Image
        source={require('../../assets/images/appBackground/appBgUp.png')}
        style={styles.appBgUpIcon}
      />
      <Image
        source={require('../../assets/images/appBackground/appBgDown.png')}
        style={styles.appBgDownIcon}
      />

      {/* Main Content */}
      <View style={{flex: 1}}>
        {/* Title Section */}
        <View style={[styles.titleView, topStyle]}>
          {title && <Text style={[styles.titleTxt, fontStyle]}>{title}</Text>}
          {subTitle && <Text style={styles.subTitleTxt}>{subTitle}</Text>}
        </View>

        {/* Scrollable Content View */}
        <View style={[styles.contentView, containerStyle]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {children}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appTheme,
  },
  appBgUpIcon: {
    width: 239,
    height: 212,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
  },
  appBgDownIcon: {
    width: 193,
    height: 171,
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    top: 101,
  },
  titleView: {
    width: '85%',
    paddingTop: verticalScale(68),
    paddingBottom: verticalScale(35),
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  titleTxt: {
    fontSize: 32,
    color: colors.white,
    fontFamily: typography.Bold_700,
    lineHeight: 32 * 1.3,
    letterSpacing: 32 * (-2 / 100),
  },
  subTitleTxt: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
    marginTop: verticalScale(12),
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

export default AuthLayout;

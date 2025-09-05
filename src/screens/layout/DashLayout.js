import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';
import {getMerchantDetails} from '../../redux/action/businessProfileActions';
import Toast from 'react-native-root-toast';

const {height} = Dimensions.get('window');
const verticalScale = size => (height / 812) * size;

const DashLayout = ({
  title,
  subTitle = '',
  subTitleBelow = '',
  children,
  topStyle,
  fontStyle,
  loader = false,
  containerStyle,
  backButton = false,
  name = '',
  showsScrollIndicator = false,
  backButtonFunction,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const merchant_details = useSelector(
    state => state?.businessProfile?.merchantDetailsdata?.merchant,
  );
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const handleBack = backButtonFunction || (() => navigation.goBack());

  useEffect(() => {
    dispatch(getMerchantDetails(token));
  }, [dispatch, token]);

  return (
    <>
      {loader && <FullScreenLoader />}
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}>
        <LinearGradient
          colors={[colors.AmberOrange, colors.white]}
          style={styles.pageColor}>
          <Image
            source={require('../../assets/images/appBackground/appBgUp.png')}
            style={styles.appBgUpIcon}
          />

          <View style={{flex: 1}}>
            <View style={[styles.titleView, topStyle]}>
              {name ? (
                <View style={styles.userDetailsView}>
                  <View style={styles.nameingView}>
                    <Text style={styles.hiTxt} numberOfLines={2}>
                      {merchant_details?.business_name}
                    </Text>
                  </View>
                  {/* <View style={styles.iconView}>
                    <TouchableOpacity
                      onPress={() => {
                        Toast.hide();
                        Toast.show('Coming Soon', {
                          duration: Toast.durations.SHORT,
                          position: Toast.positions.BOTTOM,
                        });
                      }}>
                      <Image
                        source={require('../../assets/images/notifi.png')}
                        style={styles.notifiIcon}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Toast.hide();
                        Toast.show('Coming Soon', {
                          duration: Toast.durations.SHORT,
                          position: Toast.positions.BOTTOM,
                        });
                      }}>
                      <Image
                        source={require('../../assets/images/headPhone.png')}
                        style={styles.headPhoneIcon}
                      />
                    </TouchableOpacity>
                  </View> */}
                </View>
              ) : null}

              {backButton && (
                <TouchableOpacity onPress={handleBack}>
                  <Image
                    source={require('../../assets/images/LeftArrow.png')}
                    style={styles.backButtonIcon}
                  />
                </TouchableOpacity>
              )}

              <View style={styles.showTitleView}>
                {title && (
                  <Text style={[styles.titleTxt, fontStyle]}>{title}</Text>
                )}
                {subTitleBelow && (
                  <Text style={styles.subTitleBelowTxt}>{subTitleBelow}</Text>
                )}
                {subTitle && <Text style={styles.subTitleTxt}>{subTitle}</Text>}
              </View>
            </View>
          </View>
        </LinearGradient>

        <View
          style={[
            // StyleSheet.absoluteFill,
            styles.contentView,
            containerStyle,
          ]}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  backButtonIcon: {
    width: 24,
    height: 24,
    tintColor: colors.black,
  },
  titleView: {
    flexDirection: 'row',
    paddingTop: verticalScale(68),
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  showTitleView: {
    justifyContent: 'center',
    flex: 1,
  },
  titleTxt: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.RichBlack,
    fontFamily: typography.SemiBold_600,
    lineHeight: 22,
    letterSpacing: 0,
  },
  subTitleTxt: {
    fontSize: 12,
    color: colors.white,
    lineHeight: 16.8,
    letterSpacing: -0.12,
    fontFamily: typography.Medium_500,
    marginTop: verticalScale(12),
  },
  subTitleBelowTxt: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.RichBlack,
    lineHeight: 16.8,
    letterSpacing: -0.12,
    fontFamily: typography.Medium_500,
    // marginTop: verticalScale(12),
  },
  contentView: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  nameingView: {
    width: '80%',
  },
  hiTxt: {
    fontSize: 12,
    color: colors.black,
    fontFamily: typography.Regular_400,
    lineHeight: 16.8,
    letterSpacing: -0.12,
  },
  nameTxt: {
    fontSize: 16,
    color: colors.black,
    fontFamily: typography.SemiBold_600,
    lineHeight: 22.4,
    letterSpacing: -0.16,
  },
  userDetailsView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconView: {
    flexDirection: 'row',
  },
  notifiIcon: {
    height: 24,
    width: 24,
  },
  headPhoneIcon: {
    height: 24,
    width: 24,
    marginLeft: 16,
  },
});

export default DashLayout;

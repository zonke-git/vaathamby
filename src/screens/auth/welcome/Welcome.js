import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../Theme/colors';

import {useWelcome} from '../../../hooks';
import {i18n} from '../../../localization';
import {typography} from '../../../Theme/typography';
import AppButton from '../../../components/AppButton/AppButton';
import Carousel from 'react-native-reanimated-carousel';

const {width, height} = Dimensions.get('window');

const CarouselData = [
  // {
  //   id: 0,
  //   name: 'zero',
  //   image: require('../../../assets/images/onBoarding/Zonke.png'),
  //   title: '',
  //   content: '',
  // },
  {
    id: 1,
    name: 'first',
    image: require('../../../assets/images/onBoarding/Thrift-shop-cuate.png'),
    title: 'Create your free storefront in minutes',
    content:
      'List your products or services with ease and start accepting payments instantly. Get discovered by new customers browsing on Zonke.',
  },
  {
    id: 2,
    name: 'second',
    image: require('../../../assets/images/onBoarding/E-Wallet-bro.png'),
    title: 'Accept wallet payments easily',
    content:
      'Set up your Zonke Wallet without the need for machines or hardware. Start receiving payments through QR codes or optional POS integration.',
  },
  {
    id: 3,
    name: 'third',
    image: require('../../../assets/images/onBoarding/Business-growth-amico.png'),
    title: 'Increase loyalty and repeat buys',
    content:
      'Drive repeat sales by offering cashback and loyalty rewards. Encourage return visits and build stronger relationships with your customers.',
  },
];

const Welcome = () => {
  const {
    activeIndex,
    carouselRef,
    setActiveIndex,
    welcomeMessage,
    handleWelcomeScreen,
    handleIndexChange,
    handleNavigation,
  } = useWelcome();

  return (
    <>
      <SafeAreaView
        style={styles.container}
        edges={['bottom', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          <>
            {welcomeMessage ? (
              <>
                <View style={styles.welcome_view}>
                  <View>
                    <View style={styles.welcome_img_view}>
                      <Image
                        source={require('../../../assets/images/onBoarding/Zonke.png')}
                        style={styles.image_size}
                      />
                    </View>
                    <View style={styles.welcome_msg_view}>
                      <Text style={styles.welcome_txt}>
                        {i18n.t('welcome_message')}
                      </Text>
                      <Text style={styles.welcome_content_txt}>
                        {i18n.t(
                          'SouthAfricasNewAgeMerchantPaymentandStorefrontPlatform',
                        )}
                      </Text>
                      <Text style={styles.welcome_content_msg_txt}>
                        {i18n.t(
                          'GetstartedInMinutesAndEnjoyBuilt_inLoyaltyAandCashbackToolsToGrowYourBusiness',
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
                <AppButton
                  onPress={() => handleWelcomeScreen()}
                  title={i18n.t('Next')}
                  useColors={[colors.appTheme, colors.appTheme]}
                />
              </>
            ) : (
              <>
                <View>
                  <Carousel
                    ref={carouselRef}
                    style={{alignSelf: 'center'}}
                    width={width * 0.9}
                    height={height * 0.9}
                    data={CarouselData}
                    scrollAnimationDuration={1000}
                    onSnapToItem={index => setActiveIndex(index)}
                    renderItem={({item, index}) => (
                      <>
                        <View style={styles.item}>
                          <Image
                            source={item?.image}
                            style={styles.Carousel_image}
                          />
                        </View>

                        <View style={styles.pagination}>
                          {CarouselData.map((_, index) => (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.dot,
                                activeIndex === index
                                  ? styles.activeDot
                                  : styles.inactiveDot,
                              ]}
                              onPress={() => handleIndexChange(index)}
                            />
                          ))}
                        </View>

                        <Text style={styles.title_txt}>{item?.title}</Text>
                        <Text style={styles.content_txt}>{item?.content}</Text>
                      </>
                    )}
                  />
                </View>

                {activeIndex < CarouselData?.length - 1 ? (
                  <View style={styles.btnView}>
                    <AppButton
                      width={'45%'}
                      onPress={() =>
                        handleIndexChange(CarouselData?.length - 1)
                      }
                      title={i18n.t('Skip')}
                      useColors={[colors.white, colors.white]}
                      textStyle={{color: colors.DimGray}}
                    />

                    <AppButton
                      width={'45%'}
                      onPress={() => handleIndexChange(activeIndex + 1)}
                      title={i18n.t('Next')}
                      useColors={[colors.appTheme, colors.appTheme]}
                    />
                  </View>
                ) : (
                  <View style={styles.btnView}>
                    <AppButton
                      onPress={handleNavigation}
                      title={i18n.t('GetStarted')}
                      useColors={[colors.appTheme, colors.appTheme]}
                    />
                  </View>
                )}
              </>
            )}
          </>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 0,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 80,
  },
  welcome_view: {
    flex: 1,
    justifyContent: 'center',
  },
  welcome_img_view: {
    aspectRatio: 310 / 280,
    // aspectRatio: 272 / 310,
    alignItems: 'center',
  },
  image_size: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  welcome_msg_view: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 36,
  },
  welcome_txt: {
    fontSize: 24,
    color: colors.DeepOrange,
    textAlign: 'center',
    fontFamily: typography.Bold_700,
    lineHeight: 24 * 1.2, // This is 150%
    marginBottom: 12,
  },
  welcome_content_txt: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    textAlign: 'center',
    fontFamily: typography.SemiBold_600,
    lineHeight: 16 * 1.5,
    marginBottom: 8,
  },
  welcome_content_msg_txt: {
    fontSize: 14,
    color: colors.CharcoalGray,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: typography.Regular_400,
    lineHeight: 14 * 1.5,
  },
  item: {
    // flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    aspectRatio: 310 / 310,
  },
  Carousel_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  title_txt: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    textAlign: 'center',
    fontFamily: typography.SemiBold_600,
    lineHeight: 16 * 1.5,
    marginBottom: 8,
  },
  content_txt: {
    fontSize: 14,
    color: colors.CharcoalGray,
    textAlign: 'center',
    fontFamily: typography.Regular_400,
    lineHeight: 14 * 1.5,
  },
  btnView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    bottom: 80,
  },
  buttonWrapper: {
    width: 150,
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
    fontFamily: typography.Medium_500,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.appTheme,
  },
  inactiveDot: {
    backgroundColor: colors.LightGray,
  },
});

export default Welcome;

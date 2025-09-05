import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import colors from '../../../Theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {typography} from '../../../Theme/typography';
import ProgressBar from '../../auth/Onboard/ProgressBar';

const {width} = Dimensions.get('window');

const CarouselData = [
  {
    id: 1,
    name: 'first',
    image: require('../../../assets/images/pen.png'),
    content: 'Let`s finish setting up your Zonke account.',
    useColors: ['#4568DC', '#B06AB3'],
  },
  {
    id: 2,
    name: 'second',
    image: require('../../../assets/images/exclamation.png'),
    content: 'Complete Your Setup (2/5)',
    useColors: ['#F12711', '#F5AF19'],
  },
  {
    id: 3,
    name: 'third',
    image: require('../../../assets/images/wallet.png'),
    content:
      'Your wallet has been created. Please complete your business profile.',
    useColors: ['#348F50', '#56B4D3'],
  },
];

const CarouselBoard = ({}) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          width={width}
          data={CarouselData}
          scrollAnimationDuration={1000}
          onSnapToItem={setActiveIndex}
          panGestureHandlerProps={{
            enabled: false,
          }}
          autoPlay={true}
          autoPlayInterval={2000}
          loop={true}
          renderItem={({item, index}) => (
            <View style={styles.carouselItem}>
              {/* <GradientBorderCard colors={item?.useColors}> */}
                <LinearGradient
                  colors={item?.useColors.map(color => `${color}1A`)}
                  style={styles.boxContent}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <View style={{
    padding: Platform.OS=== 'ios'?16:0,}}>
                    <View style={styles.innerContainer}>
                      <Image source={item.image} style={styles.image_size} />
                      <Text style={styles.message}>{item.content}</Text>
                      <Image
                        source={require('../../../assets/images/ChevronRight.png')}
                        style={styles.image_size}
                      />
                    </View>
                    {index === 1 && (
                      <ProgressBar
                        CUSTOM_NUM_BARS={5}
                        filledUpto={2}
                        progressSectionConatinerStyle={{marginBottom: 0}}
                        containerWidth={65}
                      />
                    )}
                  </View>
                </LinearGradient>
              {/* </GradientBorderCard> */}
            </View>
          )}
        />
      </View>
      <View style={styles.pagination}>
        {CarouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </>
  );
};

export default CarouselBoard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 90,
  },
  boxContent: {
    borderRadius: 12,
    padding: Platform.OS=== 'ios'?0:16,
    // paddingHorizontal:16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.white,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        shadowColor: colors.white,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.48,
        shadowRadius: 4,
        elevation: 4,
      },
    }),
  },
  carouselItem: {
    marginHorizontal: 16, // Add horizontal margin between items
  },
  image_size: {
    width: 24,
    height: 24,
  },
  message: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 12,
    color: colors.EerieBlack,
    lineHeight: 20,
    letterSpacing: 12 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: colors.appTheme || '#4568DC',
  },
  inactiveDot: {
    backgroundColor: colors.LightGray || '#CCCCCC',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 40,
  },
});

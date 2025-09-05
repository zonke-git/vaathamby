/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {typography} from '../../../Theme/typography';
import colors from '../../../Theme/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ProgressBar = ({
  filledUpto = 0,
  title = '',
  CUSTOM_NUM_BARS = 0,
  progressSectionConatinerStyle,
  containerWidth = 50,
}) => {
  // Default to 0 if not provided

  const NUM_BARS = CUSTOM_NUM_BARS ? CUSTOM_NUM_BARS : 4;
  const BAR_SPACING = 8;
  const TOTAL_SPACING = BAR_SPACING * (NUM_BARS - 1);
  const BAR_WIDTH = (SCREEN_WIDTH - containerWidth - TOTAL_SPACING) / NUM_BARS;


  return (
    <View style={[styles.progressSection, progressSectionConatinerStyle]}>
      {title && <Text style={styles.pageTitle_txt}>{title}</Text>}
      <View style={styles.row}>
        {[...Array(NUM_BARS)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.barStyle,
              {
                width: BAR_WIDTH,
                marginRight: index !== NUM_BARS - 1 ? BAR_SPACING : 0,
                backgroundColor:
                  index < filledUpto ? colors.appTheme : colors.LightGray,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressSection: {
    marginBottom: 20,
  },
  pageTitle_txt: {
    fontSize: 14,
    color: colors.EerieBlack,
    marginBottom: 12,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    height: 10,
  },
  barStyle: {
    height: '100%',
    borderRadius: 8,
  },
});

export default ProgressBar;

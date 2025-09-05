import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DashLayout from '../../layout/DashLayout';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';

const Dashboard = () => {
  return (
    <DashLayout name={'Shravan Charya'}>
      <View style={styles.container}>
        <Text style={styles.title}>Coming Soon</Text>
      </View>
    </DashLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.black,
    lineHeight: 24 * 1.4,
    letterSpacing: 24 * (-1 / 100),
    fontFamily: typography.ExtraBold_800,
    textAlign: 'center',
  },
});

export default Dashboard;

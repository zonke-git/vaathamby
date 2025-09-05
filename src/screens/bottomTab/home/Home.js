import React from 'react';
import {View, StyleSheet} from 'react-native';
import DashLayout from '../../layout/DashLayout';
import CarouselBoard from './CarouselBoard';
import HomeMenusOptions from './HomeMenusOptions';
import {useHome} from '../../../hooks';

const Home = () => {
  const {handleMenuSelection, merchantDetailsLoader} = useHome();
  return (
    <DashLayout loader={merchantDetailsLoader} name={true}>
      {/* <CarouselBoard /> */}
      <View style={styles.container}>
        <HomeMenusOptions handleMenuSelection={handleMenuSelection} />
      </View>
    </DashLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Add this to take full available space
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
});

export default Home;

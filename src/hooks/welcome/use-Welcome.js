import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';

export const useWelcome = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [welcomeMessage, setWelcomeMessage] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const handleWelcomeScreen = index => {
    setWelcomeMessage(false);
    // setActiveIndex(index);
    // carouselRef.current?.scrollTo({index});
  };

  const handleIndexChange = index => {
    setActiveIndex(index);
    carouselRef.current?.scrollTo({index});
  };

  const handleNavigation = () => {
    navigation.navigate('SignUp');
  };

  return {
    activeIndex,
    carouselRef,
    setActiveIndex,
    welcomeMessage,
    setWelcomeMessage,
    handleWelcomeScreen,
    handleIndexChange,
    handleNavigation,
  };
};

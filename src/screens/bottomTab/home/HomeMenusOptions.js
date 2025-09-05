import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../Theme/colors';
import {i18n} from '../../../localization';
import {typography} from '../../../Theme/typography';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 3;

const Lists = [
  {
    id: 1,
    name: i18n.t('Outlets'),
    img: require('../../../assets/images/homePage/store.png'),
    navigation: 'OutletList',
  },
  {
    id: 2,
    name: i18n.t('Catalogue'),
    img: require('../../../assets/images/homePage/menu.png'),
    navigation: 'CatalogueList',
  },
  {
    id: 3,
    name: i18n.t('QR_Codes'),
    img: require('../../../assets/images/homePage/smartphone.png'),
  },
  {
    id: 4,
    name: i18n.t('Users'),
    img: require('../../../assets/images/homePage/multi-level-marketing.png'),
  },
  {
    id: 5,
    name: i18n.t('Reports'),
    img: require('../../../assets/images/homePage/analysist.png'),
  },
  {
    id: 6,
    name: i18n.t('Settlements'),
    img: require('../../../assets/images/homePage/deal.png'),
  },
];

const HomeMenusOptions = ({handleMenuSelection}) => {
  return (
    <View style={styles.container}>
      {Lists.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              handleMenuSelection(item);
            }}
            style={[
              styles.menuBox,
              // !item.navigation && {opacity: 0.8}, // faded if no navigation
            ]}
            activeOpacity={0.6}
            key={item.id}>
            <View
              style={[
                styles.itemContainer,
                !item.navigation && {opacity: 0.8},
              ]}>
              <Image source={item.img} style={styles.icon} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 0,
  },
  menuBox: {
    // flexBasis: '2%',
    maxWidth: '28%',
    marginBottom: 20,
    alignItems: 'center',
    // paddingHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 8,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        elevation: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 0.5,
    borderColor: '#EDEDED',
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  icon: {
    width: 71,
    height: 71,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.SimplyCharcoal,
    lineHeight: 16,
    fontFamily: typography.Medium_500,
  },
});

export default HomeMenusOptions;

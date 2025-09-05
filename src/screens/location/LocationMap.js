import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AuthLayout from '../layout/AuthLayout';
import colors from '../../Theme/colors';
import {typography} from '../../Theme/typography';
import {useMapLocation} from '../../hooks/location/use-MapLocation';
import AppButton from '../../components/AppButton/AppButton';
import {i18n} from '../../localization';

const LocationMap = () => {
  const {
    mapRef,
    fetchingAddress,
    selectedLocationAddress,
    locationAddress,
    location,
    selectedLocation,
    loading,
    error,
    showGpsPrompt,
    showEnableGpsDialog,
    handleMapPress,
    handleSelect,
  } = useMapLocation();

  const renderAddress = () => {
    const addressData = selectedLocationAddress || locationAddress;
    if (!addressData) return null;

    return (
      <View style={styles.addressView}>
        <Image
          source={require('../../assets/images/location.png')}
          style={styles.locationIcon}
        />
        <View style={styles.cityAddressView}>
          <Text style={styles.cityText}>
            {selectedLocationAddress
              ? addressData?.city
              : `Current Location: ${addressData?.city}`}
          </Text>
          <Text style={styles.lineAddressText}>{addressData?.address}</Text>
        </View>
      </View>
    );
  };

  const initialRegion = {
    latitude: -30.5595,
    longitude: 22.9375,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  return (
    <AuthLayout
      title="Please Select Location"
      topStyle={{flex: 0.085}}
      fontStyle={{fontSize: 24}}>
      <View style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            {showGpsPrompt && (
              <TouchableOpacity onPress={showEnableGpsDialog}>
                <Text style={styles.enableGpsText}>Enable GPS</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          region={location || initialRegion}
          mapType="standard"
          zoomControlEnabled
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          onPress={handleMapPress}>
          {location?.latitude && location?.longitude && (
            <Marker
              coordinate={location}
              title="You are here"
              pinColor={colors.gradientGreen}
            />
          )}

          {selectedLocation?.latitude && selectedLocation?.longitude && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              pinColor={colors.appTheme}
            />
          )}
        </MapView>
      </View>

      <View style={styles.bottomContainer}>
        {fetchingAddress ? (
          <View style={styles.addressLoadingContainer}>
            <ActivityIndicator size="small" color={colors.appTheme} />
            <Text style={styles.loadingText}>Fetching address...</Text>
          </View>
        ) : (
          renderAddress()
        )}

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.appTheme} />
            <Text style={[styles.cityText, {color: colors.black}]}>
              Get Current Location
            </Text>
          </View>
        )}

        <AppButton
          title={i18n.t('SelectLocation')}
          onPress={handleSelect}
          useColors={[colors.appTheme, colors.appTheme]}
        />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Crucial for absolute positioning
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Fills parent container
  },
  errorContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  errorText: {color: 'red', fontSize: 14, textAlign: 'center'},
  enableGpsText: {color: 'blue', textAlign: 'center', marginTop: 8},
  bottomContainer: {
    padding: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  addressView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    width: 22,
    height: 28,
    tintColor: colors.SimplyCharcoal,
    marginRight: 13,
  },
  cityAddressView: {flexDirection: 'column'},
  cityText: {
    fontSize: 16,
    color: colors.SimplyCharcoal,
    fontFamily: typography.SemiBold_600,
  },
  lineAddressText: {
    fontSize: 14,
    color: colors.SimplyCharcoalDarkGray,
    fontFamily: typography.Regular_400,
    marginTop: 4,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  addressLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.SimplyCharcoalDarkGray,
  },
});

export default LocationMap;

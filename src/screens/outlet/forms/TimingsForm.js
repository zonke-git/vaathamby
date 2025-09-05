import React, {useRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {i18n} from '../../../localization';
import colors from '../../../Theme/colors';
import {typography} from '../../../Theme/typography';
import AppButton from '../../../components/AppButton/AppButton';
import {useTimingsForm} from '../../../hooks';

const TimingsForm = ({loader}) => {
  // const scrollRef = useRef();
  // const slotRefs = useRef([]); // Store refs for each slot

  const {
    outletSingleStep,
    timingsDetails_SubmitErrorMessage,
    isTimePickerVisible,
    localTimings,
    activeField,
    TimingsFormDetails_SubmitError,
    TimingsFormDetails_IsLoader,
    TimingsFormDetails_SubmitErrorMessage,
    errorDayIndex,
    errorSlotIndex,
    slotRefs,
    scrollRef,
    selectedFiledTime,

    handleTimingsDetailsFormSubmit,
    handlePrevious,
    dispatch,
    handleToggle,
    showTimePicker,
    formatTimeDisplay,
    handleTimeConfirm,
    hideTimePicker,
    addSlot,
    removeSlot,
    scrollToErrorRef,
    isFormValid,
  } = useTimingsForm();

  const isSubmitButtonDisabled = !isFormValid();

  return (
    <>
      <ScrollView ref={scrollRef}>
        <View style={styles.container}>
          {localTimings?.map((day, dayIndex) => (
            <View key={dayIndex}>
              <View style={styles.dayContainer}>
                <Text style={styles.labelStyle}>{day.name}</Text>
                <Switch
                  value={day.open}
                  onValueChange={value => handleToggle(dayIndex, value)}
                  trackColor={{false: colors.LightGray, true: colors.appTheme}}
                  thumbColor={colors.white}
                />
              </View>

              {day.open ? (
                <View>
                  {day.time.map((slot, slotIndex) => (
                    <View
                      key={slotIndex}
                      ref={ref => {
                        if (!slotRefs.current[dayIndex]) {
                          slotRefs.current[dayIndex] = [];
                        }
                        slotRefs.current[dayIndex][slotIndex] = ref;
                      }}
                      style={styles.slotContainer}>
                      <View style={styles.timeContainer}>
                        <View style={styles.timeRow}>
                          <TouchableOpacity
                            style={[
                              styles.timeInput,
                              errorDayIndex === dayIndex &&
                              errorSlotIndex === slotIndex
                                ? styles.timeInputError
                                : {},
                            ]}
                            onPress={() =>
                              showTimePicker(
                                dayIndex,
                                slotIndex,
                                'from',
                                formatTimeDisplay(slot.from),
                              )
                            }>
                            <Text
                              style={[
                                styles.timeText,
                                errorDayIndex === dayIndex &&
                                errorSlotIndex === slotIndex
                                  ? styles.timeTextError
                                  : {},
                              ]}>
                              {formatTimeDisplay(slot.from)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.timeRow}>
                          <TouchableOpacity
                            style={[
                              styles.timeInput,
                              errorDayIndex === dayIndex &&
                              errorSlotIndex === slotIndex
                                ? styles.timeInputError
                                : {},
                            ]}
                            onPress={() =>
                              showTimePicker(
                                dayIndex,
                                slotIndex,
                                'to',
                                formatTimeDisplay(slot.to),
                              )
                            }>
                            <Text
                              style={[
                                styles.timeText,
                                errorDayIndex === dayIndex &&
                                errorSlotIndex === slotIndex
                                  ? styles.timeTextError
                                  : {},
                              ]}>
                              {formatTimeDisplay(slot.to)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {day.time.length > 1 && (
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeSlot(dayIndex, slotIndex)}>
                          <Image
                            source={require('../../../assets/images/minus.png')}
                            style={styles.removeIcon}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addSlot(dayIndex)}>
                    <Text style={styles.addText}>+ Add Time Slot</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.moonContainer}>
                  <Image
                    source={require('../../../assets/images/moon.png')}
                    style={styles.deteleIcon}
                  />
                  <Text style={styles.closedTxt}>Closed</Text>
                </View>
              )}
              {dayIndex !== 6 && <View style={styles.horizontalLine} />}
            </View>
          ))}

          <DateTimePickerModal
            date={selectedFiledTime ?? new Date()}
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
            headerTextIOS={`Select ${activeField} time`}
            locale="en_GB"
          />

          {timingsDetails_SubmitErrorMessage && (
            <Text
              style={styles.error}
              ref={el => {
                if (el && scrollRef?.current) {
                  el.measureLayout(
                    scrollRef.current,
                    (x, y) => {
                      scrollRef.current.scrollTo({y, animated: true});
                    },
                    () => {},
                  );
                }
              }}>
              {timingsDetails_SubmitErrorMessage}
            </Text>
          )}

          {TimingsFormDetails_SubmitError && (
            <Text style={styles.errorText}>
              {TimingsFormDetails_SubmitErrorMessage}
            </Text>
          )}
        </View>
      </ScrollView>

      {outletSingleStep ? (
        <AppButton
          onPress={handleTimingsDetailsFormSubmit}
          title={i18n.t('Save')}
          useColors={
            isSubmitButtonDisabled
              ? [colors.LightMistGray, colors.LightMistGray]
              : [colors.appTheme, colors.appTheme]
          }
          textStyle={{
            color: isSubmitButtonDisabled
              ? colors.sliverBorderColor
              : colors.white,
          }}
          // disabled={isSubmitButtonDisabled}
          buttonStyle={[styles.btnStyles, {width: '100%'}]}
        />
      ) : (
        <View style={styles.btnView}>
          <AppButton
            onPress={handlePrevious}
            title={i18n.t('Previous')}
            useColors={[colors.white, colors.white]}
            textStyle={{color: colors.appTheme}}
            buttonStyle={[styles.btnStyles, styles.preBtnStyles]}
          />
          <AppButton
            onPress={handleTimingsDetailsFormSubmit}
            title={i18n.t('Save_Next')}
            useColors={
              isSubmitButtonDisabled
                ? [colors.LightMistGray, colors.LightMistGray]
                : [colors.appTheme, colors.appTheme]
            }
            textStyle={{
              color: isSubmitButtonDisabled
                ? colors.sliverBorderColor
                : colors.white,
            }}
            buttonStyle={styles.btnStyles}
            loading={TimingsFormDetails_IsLoader}
            // disabled={isSubmitButtonDisabled}
          />
        </View>
      )}
    </>
  );
};

export default TimingsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelStyle: {
    fontSize: 16,
    color: colors.EerieBlack,
    lineHeight: 16 * 1.4,
    letterSpacing: 16 * (0 / 100),
    fontFamily: typography.SemiBold_600,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.LightGray,
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: 12.5,
    paddingHorizontal: 14,
  },
  timeText: {
    fontSize: 14,
    color: colors.EerieBlack,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (0 / 100),
    fontFamily: typography.Medium_500,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  preBtnStyles: {
    borderWidth: 1.5,
    borderColor: colors.appTheme,
  },
  btnStyles: {
    width: '45%',
    marginTop: 15,
  },
  deteleIcon: {
    width: 14,
    height: 14,
  },
  moonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12.5,
    paddingHorizontal: 14,
    borderColor: colors.LightGray,
    backgroundColor: colors.RawGray,
    marginBottom: 16,
  },
  closedTxt: {
    fontSize: 14,
    color: colors.MediumGray,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * (-1 / 100),
    fontFamily: typography.Medium_500,
    marginLeft: 10,
  },
  horizontalLine: {
    width: Dimensions.get('screen').width - 32,
    height: 1,
    backgroundColor: colors.CulturedGray,
    marginVertical: 16,
  },
  slotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  addText: {
    color: colors.appTheme,
    fontFamily: typography.Medium_500,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
  removeIcon: {
    width: 15,
    height: 15,
  },
  error: {
    color: colors.FireEngineRed,
    fontSize: 10,
    marginTop: 4,
    fontFamily: typography.Regular_400,
    marginBottom: 20,
  },
  timeInputError: {
    borderColor: colors.FireEngineRed,
  },

  timeTextError: {
    color: colors.FireEngineRed,
  },
});

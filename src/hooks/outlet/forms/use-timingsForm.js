import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setOutletFormumber,
  setOutletSingleStep,
  setTimingsDetails,
  timingsDetails_submitOnBoardFormFailure,
} from '../../../redux/slice/outletSlice';
import Toast from 'react-native-root-toast';
import {outletTiming_Form} from '../../../redux/action/outletActions';

// Default timings structure
const DEFAULT_TIMINGS = [
  {name: 'Monday', open: false, time: [{from: '09:00', to: '17:00'}]},
  {name: 'Tuesday', open: false, time: [{from: '09:00', to: '17:00'}]},
  {name: 'Wednesday', open: false, time: [{from: '09:00', to: '17:00'}]},
  {name: 'Thursday', open: false, time: [{from: '09:00', to: '17:00'}]},
  {name: 'Friday', open: false, time: [{from: '09:00', to: '17:00'}]},
  {name: 'Saturday', open: false, time: [{from: '09:00', to: '17:00'}]},
  {name: 'Sunday', open: false, time: [{from: '09:00', to: '17:00'}]},
];

const convertToMinutes = timeStr => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const useTimingsForm = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const slotRefs = useRef([]);
  const navigation = useNavigation();
  const TimingsFormValues = useSelector(state => state?.outlet?.TimingsDetails);
  const outletSingleStep = useSelector(
    state => state?.outlet?.outletSingleStep,
  );

  // ✅ fallback to DEFAULT_TIMINGS if undefined or not an array
  // const [localTimings, setLocalTimings] = useState(
  //   Array.isArray(TimingsFormValues) ? TimingsFormValues : DEFAULT_TIMINGS,
  // );

  const [localTimings, setLocalTimings] = useState(
    Object.values(TimingsFormValues),
  );
  const [errorDayIndex, setErrorDayIndex] = useState(null);
  const [errorSlotIndex, setErrorSlotIndex] = useState(null);

  const sessionId = useSelector(state => state?.auth?.verifyOtpData?.sessionId);
  const token = useSelector(state => state?.auth?.authTokenInfo);
  const loginDetails = useSelector(state => state?.auth?.loginDetails);

  const TimingsFormDetails_SubmitError = useSelector(
    state => state?.outlet?.TimingsFormDetails_SubmitError,
  );
  const TimingsFormDetails_SubmitErrorMessage = useSelector(
    state => state?.outlet?.TimingsFormDetails_SubmitErrorMessage,
  );
  // TimingsDetails
  const TimingsFormDetails_IsLoader = useSelector(
    state => state?.outlet?.businessDetails_IsSubmitting,
  );
  const TimingsFormDetails_SubmitSuccess = useSelector(
    state => state?.outlet?.TimingsFormDetails_SubmitSuccess,
  );
  const TimingsDetails = useSelector(state => state?.outlet?.TimingsDetails);

  const TimingsFormDetails_SubmitSuccessMessage = useSelector(
    state => state?.outlet?.TimingsFormDetails_SubmitSuccessMessage,
  );

  const timingsDetails_SubmitErrorMessage = useSelector(
    state => state?.outlet?.timingsDetails_SubmitErrorMessage,
  );

  const edit_outlet_id = useSelector(
    state => state?.outlet?.outletInfoDetails?.outlet_id,
  );

  const New_Outlet_ID = useSelector(
    state =>
      state?.outlet?.outletInfoDetails_SubmitSuccessMessage?.newOutlet?._id,
  );

  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);

  const [activeField, setActiveField] = useState(null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [selectedFiledTime, setSelectedFiledTime] = useState(null);

  // Update addSlot and removeSlot functions to avoid mutations
  const addSlot = dayIndex => {
    const updatedTimings = localTimings?.map((day, i) =>
      i === dayIndex
        ? {...day, time: [...day.time, {from: '09:00', to: '17:00'}]}
        : day,
    );
    setLocalTimings(updatedTimings);
    dispatch(setTimingsDetails(updatedTimings));
    dispatch(timingsDetails_submitOnBoardFormFailure(null));
  };

  const removeSlot = (dayIndex, slotIndex) => {
    const updatedTimings = localTimings?.map((day, i) =>
      i === dayIndex
        ? {...day, time: day.time.filter((_, idx) => idx !== slotIndex)}
        : day,
    );
    setLocalTimings(updatedTimings);
    dispatch(setTimingsDetails(updatedTimings));
    dispatch(timingsDetails_submitOnBoardFormFailure(null));
  };

  // Update handleTimeConfirm to avoid mutations
  const handleTimeConfirm = time => {
    if (activeDayIndex === null || activeSlotIndex === null) return;

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const time24 = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;

    const updatedTimings = localTimings?.map((day, i) => {
      if (i === activeDayIndex) {
        return {
          ...day,
          time: day.time.map((slot, idx) =>
            idx === activeSlotIndex ? {...slot, [activeField]: time24} : slot,
          ),
        };
      }
      return day;
    });

    setLocalTimings(updatedTimings);
    dispatch(setTimingsDetails(updatedTimings));
    hideTimePicker();
    dispatch(timingsDetails_submitOnBoardFormFailure(null));
  };

  // Update time picker to handle slot index
  const showTimePicker = (
    dayIndex,
    slotIndex,
    field,
    selectedFiledTimeFromTo,
  ) => {
    let selectedTime = new Date();

    if (selectedFiledTimeFromTo) {
      try {
        // Parse "9:00 AM" or "14:00" string into Date
        const [time, modifier] = selectedFiledTimeFromTo.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier === 'PM' && hours < 12) {
          hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
          hours = 0;
        }

        selectedTime.setHours(hours);
        selectedTime.setMinutes(minutes);
        selectedTime.setSeconds(0);
      } catch (error) {
        console.warn('Time parsing failed:', error);
      }
    }

    setSelectedFiledTime(selectedTime);
    setActiveDayIndex(dayIndex);
    setActiveSlotIndex(slotIndex);
    setActiveField(field);
    setTimePickerVisibility(true);
  };

  const handleToggle = (index, value) => {
    const updatedTimings = localTimings?.map((day, i) =>
      i === index ? {...day, open: value} : day,
    );
    setLocalTimings(updatedTimings);
    dispatch(setTimingsDetails(updatedTimings));
    dispatch(timingsDetails_submitOnBoardFormFailure(null));
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const formatTimeDisplay = time => {
    if (!time) return '--:-- --';

    // If input is already in 12-hour format (e.g., "01:30 PM")
    const amPmMatch = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
    if (amPmMatch) {
      const [, hour, minute, period] = amPmMatch;
      return `${parseInt(hour)}:${minute.padStart(
        2,
        '0',
      )} ${period.toUpperCase()}`;
    }

    // If input is in 24-hour format (e.g., "13:30")
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return '--:-- --';

    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handlePrevious = async values => {
    dispatch(setOutletFormumber(2));
  };

  // Existing validation helpers
  const validateAtLeastOneDayOpen = timings => {
    return timings.some(day => day.open);
  };

  // NEW: Validate each open day has at least one slot
  const validateOpenDaysHaveSlots = timings => {
    for (const day of timings) {
      if (day.open && (!day.time || day.time.length === 0)) {
        return `Please add at least one time slot for ${day.name}`;
      }
    }
    return null;
  };

  // Existing time validation
  const validateTimings = timings => {
    for (let dayIndex = 0; dayIndex < timings.length; dayIndex++) {
      const day = timings[dayIndex];
      if (day.open) {
        for (let slotIndex = 0; slotIndex < day.time.length; slotIndex++) {
          const slot = day.time[slotIndex];
          const fromMinutes = convertToMinutes(slot.from);
          const toMinutes = convertToMinutes(slot.to);

          if (toMinutes <= fromMinutes) {
            return `For ${
              day.name
            }, closing time must be after opening time in slot ${
              slotIndex + 1
            }`;
          }
        }
      }
    }
    return null;
  };

  const convertToAMPM = time => {
    let [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert '0' to '12'
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )} ${ampm}`;
  };

  const convertTo24Hour = time => {
    if (!time.includes('AM') && !time.includes('PM')) return time; // already 24hr
    const [t, modifier] = time.split(' ');
    let [hours, minutes] = t.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}`;
  };

  const validateDuplicateAndOverlappingSlots = timings => {
    for (let dayIndex = 0; dayIndex < timings.length; dayIndex++) {
      const day = timings[dayIndex];
      if (day.open) {
        const ranges = [];

        for (let slotIndex = 0; slotIndex < day.time.length; slotIndex++) {
          const slot = day.time[slotIndex];
          const from = convertToMinutes(slot.from);
          const to = convertToMinutes(slot.to);

          if (from >= to) {
            return {
              error: `Invalid slot "${slot.from} - ${slot.to}" on ${day.name}`,
              dayIndex,
              slotIndex,
            };
          }

          const key = `${from}-${to}`;
          if (ranges.find(r => r.key === key)) {
            return {
              error: `Duplicate time slot "${convertToAMPM(
                slot.from,
              )} - ${convertToAMPM(slot.to)}" found on ${day.name}`,
              dayIndex,
              slotIndex,
            };
          }

          for (let rIndex = 0; rIndex < ranges.length; rIndex++) {
            const range = ranges[rIndex];
            const isOverlap = from < range.to && to > range.from;
            if (isOverlap) {
              return {
                error: `Time slot "${convertToAMPM(
                  slot.from,
                )} - ${convertToAMPM(slot.to)}" on ${
                  day.name
                } overlaps with "${convertToAMPM(
                  `${String(Math.floor(range.from / 60)).padStart(
                    2,
                    '0',
                  )}:${String(range.from % 60).padStart(2, '0')}`,
                )} - ${convertToAMPM(
                  `${String(Math.floor(range.to / 60)).padStart(
                    2,
                    '0',
                  )}:${String(range.to % 60).padStart(2, '0')}`,
                )}"`,
                dayIndex,
                slotIndex,
              };
            }
          }

          ranges.push({from, to, key});
        }
      }
    }

    return null;
  };

  const handleTimingsDetailsFormSubmit = async values => {
    // Validation 1: At least one day must be open
    if (!validateAtLeastOneDayOpen(localTimings)) {
      dispatch(
        timingsDetails_submitOnBoardFormFailure(
          'Please select at least one day to be open',
        ),
      );
      return;
    }

    // NEW Validation 2: Each open day must have time
    const slotsValidation = validateOpenDaysHaveSlots(localTimings);
    if (slotsValidation) {
      dispatch(timingsDetails_submitOnBoardFormFailure(slotsValidation));
      return;
    }

    // Existing Validation 3: Time slot validation
    const timeValidation = validateTimings(localTimings);
    if (timeValidation) {
      dispatch(timingsDetails_submitOnBoardFormFailure(timeValidation));
      return;
    }

    // // Validation 4: Duplicate time slots
    // const duplicateValidation =
    //   validateDuplicateAndOverlappingSlots(localTimings);
    // if (duplicateValidation) {
    //   dispatch(timingsDetails_submitOnBoardFormFailure(duplicateValidation));
    //   return;
    // }

    const validationResult = validateDuplicateAndOverlappingSlots(localTimings);

    if (validationResult) {
      dispatch(timingsDetails_submitOnBoardFormFailure(validationResult.error));
      setErrorDayIndex(validationResult.dayIndex);
      setErrorSlotIndex(validationResult.slotIndex);
      setTimeout(() => scrollToErrorRef(), 300);
      return;
    } else {
      setErrorDayIndex(null); // Reset on valid
      setErrorSlotIndex(null);
    }

    const OUTLET_ID = New_Outlet_ID || edit_outlet_id;
    if (!OUTLET_ID) {
      dispatch(timingsDetails_submitOnBoardFormFailure('Outlet ID is missing'));
      throw new Error('Outlet ID is missing');
    }

    const payload = {
      timing: localTimings
        ?.filter(day => day.open) // Only include days that are open
        .map(day => ({
          day: day.name,
          time: day.time.map(slot => `${slot.from} - ${slot.to}`),
        })),
    };

    // console.log('payload', payload);

    // console.log('Outlet Timing  Payload :', payload);

    dispatch(outletTiming_Form(payload, token, OUTLET_ID))
      .then(response => {
        // console.log('Outlet Timing Response :', response);
        if (response?.success) {
          if (outletSingleStep) {
            dispatch(setOutletFormumber(1));
            dispatch(setOutletSingleStep(false));
            navigation.navigate('OutletList');
          } else {
            dispatch(setOutletFormumber(4));
          }
        } else {
          Toast.show(
            Array.isArray(response?.message)
              ? response.message.join('\n') // join with new lines for readability
              : response?.message || 'Submission failed',
            {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
            },
          );

          dispatch(
            timingsDetails_submitOnBoardFormFailure('Submission failed'),
          );
        }
      })
      .catch(error => {
        console.error('Outlet Timing Error :', error);
        Toast.show(
          Array.isArray(error?.message)
            ? error.message.join('\n') // join with new lines for readability
            : error?.message,
          {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          },
        );
      });
  };

  const scrollToErrorRef = () => {
    if (
      errorDayIndex !== null &&
      errorSlotIndex !== null &&
      slotRefs.current[errorDayIndex]?.[errorSlotIndex]
    ) {
      slotRefs.current[errorDayIndex][errorSlotIndex].measureLayout(
        scrollRef.current,
        (x, y) => {
          scrollRef.current?.scrollTo({x: 0, y: y - 40, animated: true});
        },
        error => console.warn('Scroll measure error', error),
      );
    }
  };

  const isFormValid = () => {
    if (!validateAtLeastOneDayOpen(localTimings)) return false;
    if (validateOpenDaysHaveSlots(localTimings)) return false;
    if (validateTimings(localTimings)) return false;
    if (validateDuplicateAndOverlappingSlots(localTimings)) return false;
    return true;
  };

  return {
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
  };
};

import React from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../../../Theme/colors';

const STATUS_STYLES = {
  DRAFT: {
    backgroundColor: '#E0E8FF',
    color: '#2F58CD',
  },
  PENDING: {
    backgroundColor: '#FFF8EA',
    color: '#E89D08',
  },
  APPROVED: {
    backgroundColor: '#E9FFE9',
    color: '#007400',
  },
  DEFAULT: {
    backgroundColor: colors.CulturedGray,
    color: colors.black,
  },
};

const StatusLabel = ({status, style}) => {
  const stylesForStatus = STATUS_STYLES[status] || STATUS_STYLES.DEFAULT;

  return <Text style={[styles.text, stylesForStatus, style]}>{status}</Text>;
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '500',
    fontSize: 14,
    overflow: 'hidden',
  },
});

export default StatusLabel;

import React, {useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useAnnexuresAndAgreementForm} from '../../../../hooks';
import AppButton from '../../../../components/AppButton/AppButton';
import {i18n} from '../../../../localization';
import colors from '../../../../Theme/colors';
import FullScreenLoader from '../../../../components/Loader/FullScreenLoader';
import RenderHTML from 'react-native-render-html';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '../../../../components/CheckBox/CheckBox';
import {typography} from '../../../../Theme/typography';

const AnnexuresAndAgreementForm = ({}) => {
  const {
    handleSubmit,
    annexureContent,
    annexureListLoading,
    termsAndConditionCheckBox,
    setTermsAndConditionCheckBox,
  } = useAnnexuresAndAgreementForm();

  const {width} = useWindowDimensions();
  const [showCheckboxError, setShowCheckboxError] = useState(false);

  const onPressHandler = () => {
    if (!termsAndConditionCheckBox) {
      setShowCheckboxError(true);
      return;
    }

    setShowCheckboxError(false);
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {annexureContent && (
          <ScrollView
            contentContainerStyle={{paddingBottom: 30}}
            showsVerticalScrollIndicator
            showsHorizontalScrollIndicator>
            <RenderHTML contentWidth={width} source={{html: annexureContent}} />
          </ScrollView>
        )}
        {annexureListLoading && <FullScreenLoader whitebackground={true} />}
      </View>
      <CheckBox
        value={termsAndConditionCheckBox}
        onToggle={() => {
          setTermsAndConditionCheckBox(!termsAndConditionCheckBox);
          if (!termsAndConditionCheckBox) {
            setShowCheckboxError(false);
          }
        }}
        childDiv={
          <>
            <Text style={styles.checkBoxLabel_txt}>
              I have read and agree to the Terms and Conditions.
            </Text>
          </>
        }
        error={
          showCheckboxError ? i18n.t('YouMustAcceptTheTermsAndConditions') : ''
        }
      />

      <AppButton
        onPress={onPressHandler}
        title={i18n.t('AcceptAgreement')}
        useColors={
          termsAndConditionCheckBox
            ? [colors.appTheme, colors.appTheme]
            : [colors.LightMistGray, colors.LightMistGray]
        }
        textStyle={{
          color: termsAndConditionCheckBox
            ? colors.white
            : colors.LightSlateGray,
        }}
        buttonStyle={[
          styles.btnStyle,
          !termsAndConditionCheckBox && styles.disabledButton,
        ]}
      />
    </View>
  );
};
export default AnnexuresAndAgreementForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  btnStyle: {
    marginTop: 10,
  },

  checkBoxLabel_txt: {
    marginLeft: 8,
    fontSize: 12,
    color: colors.SimplyCharcoalDarkGray,
    lineHeight: 12 * 1.5,
    letterSpacing: 12 * (-1 / 100),
    fontFamily: typography.Medium_500,
    backgroundColor: colors.white,
  },
  disabledButton: {},
});

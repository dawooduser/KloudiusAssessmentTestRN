import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { FONTS } from '../../constant';
import { useTypedSelector } from '../../customHooks';


const LazyLoader = () => {
    

  const SpinnerData = useTypedSelector(x => x.spinner)

  return <Spinner
    visible={SpinnerData.visible}
    textStyle={styles.spinnerTextStyle}
    textContent={SpinnerData.text}
  />
}

export default memo(LazyLoader)

const styles = StyleSheet.create({
  spinnerTextStyle: {
    ...FONTS.h4,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
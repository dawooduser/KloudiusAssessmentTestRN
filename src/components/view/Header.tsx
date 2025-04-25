import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackBtn from './BackBtn'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../types';
import { COLORS, commonStyles, FONTS } from '../../constant';
import { genericRatio } from '../../helper';
import { AntDesign } from '../../constant/icons';


const Header = ({ backVisible = false, centerText = "", rightCompont = <View />, rightCompontVisible = false }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const onBackhandler = () => {
        navigation.goBack()
      }
  return (
    <View style={[styles.container, commonStyles.spaceBetween, commonStyles.rowDirectionCenter, commonStyles.screenCommonPaddingHorizontal]}>
      <TouchableOpacity onPress={onBackhandler}>
                <AntDesign name='arrowleft' size={genericRatio(25)} color={COLORS.secondary} />
              </TouchableOpacity>
      <Text style={[FONTS.body2, commonStyles.textColorBlack,]}>{centerText}</Text>
      {rightCompontVisible ? rightCompont : <View />}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  }
})
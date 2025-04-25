import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HorizontalSpace = ({gap = 10}) => {
  return (
    <View style={{width: gap}} />
  )
}

export default HorizontalSpace

const styles = StyleSheet.create({})
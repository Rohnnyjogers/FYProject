import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, SIZE } from '../../theme/theme';

interface ReceiptStampProps{
    stamped: boolean
}

const RewardStamp: React.FC<ReceiptStampProps> = ({ stamped }) => {
  return (
    <View style={[styles.rewardStamp, {
        backgroundColor: stamped ? COLOR.primaryBlueHex : COLOR.stampLightGrey,
        borderColor: stamped ? COLOR.borderDarkBlue : COLOR.borderDarkGrey
    }]}/>
  )
}

export default RewardStamp;

const styles = StyleSheet.create({
    rewardStamp: {
        margin: SIZE.size_10,
        width: SIZE.size_30,
        height: SIZE.size_30,
        borderRadius: SIZE.size_15,
        borderWidth: SIZE.size_1,
        borderColor: COLOR.borderDarkBlue,
        backgroundColor: COLOR.primaryBlueHex
    }
})
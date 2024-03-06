import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, REWARDS_CARD_HEIGHT, REWARDS_CARD_WIDTH, SIZE } from '../../theme/theme'



const RewardsCard: React.FC<{value:string}> = ({
    value
}) => {
  return (
    <View style={styles.container}>
      <Text>{value}</Text>
    </View>
  )
}

export default RewardsCard

const styles = StyleSheet.create({
    container: {
        height: REWARDS_CARD_HEIGHT,
        width: REWARDS_CARD_WIDTH,
        backgroundColor: COLOR.secondaryLightGrey,
        borderRadius: SIZE.size_4,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: SIZE.size_8,
        gap: SIZE.size_8,
    }
})
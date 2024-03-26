import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, REWARDS_CARD_HEIGHT, REWARDS_CARD_WIDTH, SIZE } from '../../theme/theme'
import { Reward } from '../../types/types';
import RewardStamp from './RewardStamp';

interface RewardCardProps {
  reward: Reward;
}

const RewardsCard: React.FC<RewardCardProps> = ({
  reward
}) => {
  //const { size } = reward;
  const size: number = 6;
  const progress: number = 3;

  const renderRewardArray = () => {
    const rewardArray = [];
    for(let i=0;i<size;i++){
      if(i<progress){
        rewardArray.push(<RewardStamp key={i} stamped={true}/>);
      }
      else{
        rewardArray.push(<RewardStamp key={i} stamped={false}/>);
      }
    }
    return rewardArray;
  }


  return (
    <View style={styles.container}>
      <Text>{reward.item}</Text>
      <View style={styles.stamps}>
        {renderRewardArray()}
      </View>
    </View>
  )
}

export default RewardsCard;

const styles = StyleSheet.create({
    container: {
        height: REWARDS_CARD_HEIGHT,
        width: REWARDS_CARD_WIDTH,
        backgroundColor: COLOR.secondaryLightGrey,
        borderRadius: SIZE.size_4,
        borderWidth: SIZE.size_1,
        borderColor: COLOR.borderDarkGrey,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: SIZE.size_8
    },
    stamps: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: SIZE.size_10
    }
})
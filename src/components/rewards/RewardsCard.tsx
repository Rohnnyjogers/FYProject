import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, FONTFAMILY, FULL_RECEIPT_WIDTH, REWARDS_CARD_HEIGHT, REWARDS_CARD_WIDTH, SIZE } from '../../theme/theme'
import { Reward } from '../../types/types';
import RewardStamp from './RewardStamp';

interface RewardCardProps {
  reward: Reward;
}

const RewardsCard: React.FC<RewardCardProps> = ({
  reward
}) => {
  // const { active, vendor, item , size, progress  } = reward;
  const rewardStatus: boolean = false;
  const [active, setActive] = useState<boolean>(false);
  const vendor: string = 'The Corner Shop'
  const size: number = 6;
  const progress: number = 0;


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
    <View style={styles.card}>
      <Text style={styles.itemText}>{reward.item}</Text>
      <Text style={styles.vendorText}>{vendor}</Text>
      {active ? 
        <View style={styles.stamps}>
          {renderRewardArray()}
        </View>
        : 
        <View style={styles.activate}>
          <Button
            title='Activate'
            color={COLOR.primaryBlueHex}
            onPress={() => {setActive(true)}}
          />
        </View>
      }      
    </View>
  )
}

export default RewardsCard;

const styles = StyleSheet.create({
    card: {
        height: REWARDS_CARD_HEIGHT,
        width: REWARDS_CARD_WIDTH,
        backgroundColor: COLOR.secondaryLightGrey,
        borderRadius: SIZE.size_4,
        borderWidth: SIZE.size_1,
        borderColor: COLOR.borderDarkGrey,
        flexDirection: 'column',
        gap: SIZE.size_8,
        paddingTop: SIZE.size_5,
        paddingBottom: SIZE.size_5,
        alignItems: 'center',
        alignSelf: 'center',
    },
    itemText: {
      fontFamily: FONTFAMILY.jost_medium,
      fontSize: SIZE.size_16
    },
    vendorText: {
      fontFamily: FONTFAMILY.jost_light,
      fontSize: SIZE.size_14
    },
    stamps: {
      width: REWARDS_CARD_WIDTH,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: SIZE.size_10
    },
    activate: {
      width: FULL_RECEIPT_WIDTH
    }
  })
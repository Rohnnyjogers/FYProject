import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, FONTFAMILY, FULL_RECEIPT_WIDTH, REWARDS_CARD_HEIGHT, REWARDS_CARD_WIDTH, SIZE } from '../../theme/theme'
import { Reward } from '../../types/types';
import RewardStamp from './RewardStamp';
import { auth } from '../../../firebaseconfig';
import { setRewardActive, setRewardClaimed } from '../../service/rewardFunctions';

interface RewardCardProps {
  reward: Reward;
}

const RewardsCard: React.FC<RewardCardProps> = ({
  reward
}) => {
  const { active, complete, claimed, vendor, item , size, progress  } = reward;
  const userId = auth.currentUser?.uid;
  const vendorName: string = vendor.replace(/_/g,' ');

  


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
    <>
      {claimed ? 
        <View style={styles.card}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.vendorText}>{vendorName}</Text>
          <View style={styles.stamps}>
            {renderRewardArray()}
          </View>
        </View>
        :
          <View style={styles.card}>
            {complete ? 
              <>
                <Text style={styles.itemText}>{item} reward complete!</Text>
                <Text style={styles.vendorText}>{vendorName}</Text>
              </>
            : 
              <>
                <Text style={styles.itemText}>{item}</Text>
                <Text style={styles.vendorText}>{vendorName}</Text>
              </>
            }
            {active ? 
                <View style={styles.stamps}>
                  {renderRewardArray()}
                </View>
              : 
              <>
              {complete ? 
                <View style={styles.activate}>
                  <Button
                    title='Claim'
                    color={COLOR.primaryBlueHex}
                    onPress={() => setRewardClaimed(
                      userId,
                      reward
                    )}
                    
                  />
                </View>
              :
                <View style={styles.activate}>
                  <Button
                    title='Activate'
                    color={COLOR.primaryBlueHex}
                    onPress={() => setRewardActive(
                      userId,
                      reward
                    )}
                  />
                </View>
              }
              </>
            }      
          </View>
      }
    </> 
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
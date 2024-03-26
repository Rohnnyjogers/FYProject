import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, SectionList  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import RewardsCard from '../components/rewards/RewardsCard';
import { auth, database } from '../../firebaseconfig';
import { DatabaseReference, onValue, ref } from 'firebase/database';
import { Reward } from '../types/types';

const Rewards = () => {

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [active, setActive] = useState<Reward[]>([]);
  const [complete, setComplete] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomTabHeight = useBottomTabBarHeight();
  
  let DATA: any[] = [];

  if(rewards && rewards.length > 0){
    DATA.push({
      title: 'Rewards for you',
      data: rewards
    })
  }
  console.log(rewards);

  if(active && active.length > 0){
    DATA.push({
      title: 'Rewards in progress',
      data: active
    })
  }
  console.log(active);

  if(complete && complete.length > 0){
    DATA.push({
      title: 'Completed rewards',
      data: complete
    })
  }
  console.log(complete);
  console.log('DATA', DATA);

  useEffect(() => {
    const userId: string | undefined = auth.currentUser?.uid;
    const rewardsRef: DatabaseReference = ref(database, `/users/${userId}/rewards`);

    onValue(rewardsRef, (snapshot) => {
      if(snapshot.exists()){
        const rewardIds: string[] = Object.keys(snapshot.val());
        const rewards: Reward[] = rewardIds.map(rewardId => {
          const rewardData: Reward = snapshot.val()[rewardId];
          return{
            active: rewardData.active,
            vendor: rewardData.vendor,
            item: rewardData.item,
            size: rewardData.size,
            progress: rewardData.progress
          }
        })
        setRewards(rewards);
      }
    });
  }, []);

  return (
    
    <>
      {loading ? 
        <ActivityIndicator 
          size={'large'} 
          color={COLOR.primaryBlueHex}
          style={styles.indicator}
        />
        :
        <>
          <Header/>
          <Text style={styles.title}>Rewards</Text>
          <View style={styles.divider}/>
          <View style={styles.screenContainer}>
            <SectionList
              contentContainerStyle={styles.sectionList}
              sections={DATA}
              keyExtractor={(reward, index) => reward.item + index}
              renderSectionHeader={(DATA) => (
                <Text style={styles.sectionTitle}>{DATA.section.title}</Text>
              )}
              renderItem={({ item }) => (
                <RewardsCard
                  reward={item}                    
                />
              )}
            />
          </View>
        </>
      }
    </>
  )
}

const styles = StyleSheet.create({
  indicator: {
    alignSelf: 'center'
  },
  screenContainer: {
    flex: 1,
    paddingStart: SIZE.size_20,
    paddingEnd: SIZE.size_20,
    marginBottom: SIZE.size_20
  },
  title: {
    paddingStart: SIZE.size_20,
    paddingEnd: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: 25,
    color: COLOR.primaryBlueHex,
  },
  divider: {
    height: SIZE.size_1,
    backgroundColor: COLOR.primaryBlueHex
  },
  sectionTitle: {
    paddingTop: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  },
  sectionList: {
    gap: SIZE.size_15
  }
})

export default Rewards;
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, SectionList  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import RewardsCard from '../components/rewards/RewardsCard';
import { auth, database } from '../../firebaseconfig';
import { DatabaseReference, onValue, ref } from 'firebase/database';
import { Reward } from '../types/types';
import { checkAndUpdateRewards } from '../functions/rewardFunctions';

const Rewards = () => {

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(false);

  const userId: string | undefined = auth.currentUser?.uid;

  let rewardData = [];
  let availableRewards: Reward[] = [];
  let activeRewards: Reward[] = [];
  let unclaimedRewards: Reward[] = [];
  let completeRewards: Reward[] = [];
  
  rewards.forEach((reward) => {
    if(!reward.active&&!reward.complete&&!reward.claimed){
      availableRewards.push(reward);
    }

    if(reward.active){
      activeRewards.push(reward);
    }

    if(reward.complete&&!reward.claimed){
      unclaimedRewards.push(reward);
    }

    if(reward.complete&&reward.claimed){
      completeRewards.push(reward);
    }

  })

  if(availableRewards.length > 0){
    const availableList = {
      title: 'Rewards for you',
      data: availableRewards
    }
    rewardData.push(availableList);
  }

  if(activeRewards.length > 0){
    const activeList = {
      title: 'Rewards in progress',
      data: activeRewards
    }
    rewardData.push(activeList);
  }

  if(unclaimedRewards.length > 0){
    const unclaimedList = {
      title: 'Complete rewards',
      data: unclaimedRewards
    }
    rewardData.push(unclaimedList);
  }

  if(completeRewards.length > 0){
    const completeList = {
      title: 'Rewards history',
      data: completeRewards
    }
    rewardData.push(completeList);
  }
  
  const bottomTabHeight = useBottomTabBarHeight();

  useEffect(() => {
    setLoading(true);
    const rewardsRef: DatabaseReference = ref(database, `/users/${userId}/rewards`);

    onValue(rewardsRef, (snapshot) => {
      if(snapshot.exists()){
        const rewardIds: string[] = Object.keys(snapshot.val());
        const rewards: Reward[] = rewardIds.map(rewardId => {
          const rewardData: Reward = snapshot.val()[rewardId];
          return{
            active: rewardData.active,
            rewardId: rewardData.rewardId,
            vendor: rewardData.vendor,
            vendorId: rewardData.vendorId,
            item: rewardData.item,
            size: rewardData.size,
            progress: rewardData.progress,
            claimed: rewardData.claimed,
            complete: rewardData.complete
          }
        })
        setRewards(rewards);
      }
    });

    setLoading(false);
  }, []);

  return (
        <>
          <Header/>
          <Text style={styles.title}>Rewards</Text>
          <View style={styles.divider}/>
          {loading ? 
            <View style={styles.indicatorView}>
              <ActivityIndicator 
                size={'large'} 
                color={COLOR.primaryBlueHex}
                style={styles.indicator}
              />
            </View> 
          :
            <View style={styles.screenContainer}>
              <SectionList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.sectionList}
                sections={rewardData}
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
          }
        </>
  )
}

const styles = StyleSheet.create({
  indicator: {
    alignSelf: 'center'
  },
  indicatorView:{
    flex: 1,
    backgroundColor: COLOR.stampLightGrey,
    justifyContent: 'center'
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
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, SectionList  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import RewardsCard from '../components/rewards/RewardsCard';
import { auth, database } from '../../firebaseconfig';
import { onValue, ref } from 'firebase/database';
import { Reward } from '../types/types';

const Rewards = () => {

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomTabHeight = useBottomTabBarHeight();

  const DATA = [
    {
      title: 'Rewards in progress',
      data: rewards
    }
  ];

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    const rewardsRef = ref(database, `/users/${userId}/rewards`);

    onValue(rewardsRef, (snapshot) => {
      if(snapshot.exists()){
        const rewardIds = Object.keys(snapshot.val());
        const rewards: Reward[] = rewardIds.map(rewardId => {
          const rewardData = snapshot.val()[rewardId];
          return{
            item: rewardData.item,
            active: rewardData.active,
            size: rewardData.size,
            userStamps: rewardData.userStamps
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
        style={styles.indicator}/>
        :
        <>
          <Header/>
          <Text style={styles.title}>Rewards</Text>
          <View style={styles.divider}/>
          <View style={styles.screenContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewFlex}>
              <Text style={styles.inProgressTitle}>Rewards in progress</Text>
              <View style={styles.flatListView}>
                <SectionList
                  sections={DATA}
                  keyExtractor={(reward, index) => reward.item + index}
                  renderItem={({ item }) => (
                    <RewardsCard
                      reward={item}                    
                    />
                  )}
                />
              </View>
            </ScrollView>
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
  scrollViewFlex: {
    flexGrow: 1,
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
  inProgressTitle: {
    paddingTop: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  },
  flatListView: {
    height: RECEIPT_CARD_HEIGHT
  },
  flatListStyle: {
    marginTop: SIZE.size_10,
    flexGrow: 0
  },
  rewardsList: {
    alignItems: 'center',
    gap: SIZE.size_20
  }
})

export default Rewards;
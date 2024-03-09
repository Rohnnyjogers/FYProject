import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator  } from 'react-native';
import React, { useState } from 'react';
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import RewardsCard from '../components/rewards/RewardsCard';

const Rewards = () => {

  const [rewards, setRewards] = useState([...Array(10).keys()].map((i)=> i + 1));
  const [loading, setLoading] = useState(false);

  const bottomTabHeight = useBottomTabBarHeight();

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
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={styles.flatListStyle}
                  contentContainerStyle={styles.rewardsList}
                  data={rewards}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({item}) => {
                    return(
                      <RewardsCard
                        value={item.toString()}
                      />
                    )
                  }}
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
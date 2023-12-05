import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { COLOR, FONTFAMILY, SPACING } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import { useStore } from '../store/AppStore';
import ReceiptCard from '../components/ReceiptCard';
import MapView from 'react-native-maps';

const Home = () => {
  
  const ReceiptsList = useStore((state: any) => state.ReceiptsList);
  console.log("Receipts data:", ReceiptsList);

  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
          <Header/>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.recentListTitle}>Recent purchases</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentList}
            data={ReceiptsList}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return <ReceiptCard
                        id={item.id}
                        index={item.index}
                        location={item.location}
                        items={item.items}
                        priceTotal={item.priceTotal}
                        itemTotal={item.itemTotal}/>
            }}/>
            <Text style={styles.mapTitle}>Compare receipts nearby</Text>
            {/* <MapView style={styles.map}/> */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  recentScrollView: {},
  title: {
    paddingLeft: SPACING.space_20,
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: 25,
    color: COLOR.primaryBlueHex,
  },
  recentListTitle: {
    paddingTop: SPACING.space_20,
    paddingLeft: SPACING.space_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: 20,
    color: COLOR.primaryGreyHex,
  },
  recentList: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
  },
  mapTitle: {
    paddingLeft: SPACING.space_20,
    marginTop: 10,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: 20,
    color: COLOR.primaryGreyHex,
  },
  map: {

  },
});

export default Home;
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import { useStore } from '../store/AppStore';
import ReceiptCard from '../components/ReceiptCard';
import MapView from 'react-native-maps';

const Home = () => {
  
  const ReceiptsList = useStore((state: any) => state.ReceiptsList);

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
            style={styles.flatlistStyle}
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
    paddingLeft: SIZE.size_20,
    paddingRight: SIZE.size_20,
    flex: 1,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  recentScrollView: {},
  title: {
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: SIZE.size_25,
    color: COLOR.primaryBlueHex,
  },
  recentListTitle: {
    paddingTop: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  },
  recentList: {
    gap: SIZE.size_20,
    height: RECEIPT_CARD_HEIGHT
  },
  flatlistStyle: {
    marginTop: SIZE.size_10,
    flexGrow: 0
  },
  mapTitle: {
    marginTop: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  },
  map: {

  },
});

export default Home;
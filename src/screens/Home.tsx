import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import { ReceiptsData } from '../data/ReceiptsData'
import ReceiptCard from '../components/receipts/ReceiptCard';
import { ADD_TO_SAVED_AND_TAX } from '../types/types';
import Map from '../components/Map';

const Home = () => {

  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <>
      <Header/>
      <Text style={styles.title}>Home</Text>
      <View style={styles.divider}/>
      <View style={styles.screenContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewFlex}>
            <Text style={styles.recentListTitle}>Recent purchases</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatlistStyle}
              contentContainerStyle={styles.recentList}
              data={ReceiptsData}
              keyExtractor={item => item.receiptId.toString()}
              renderItem={({item}) => {
                return <ReceiptCard
                          receiptId={item.receiptId}
                          vendorId={item.vendorId}
                          vendorLat={item.vendorLat}
                          vendorLong={item.vendorLong}
                          vendorName={item.vendorName}
                          items={item.items}
                          priceTotal={item.priceTotal}
                          itemTotal={item.itemTotal}
                          viewerType={ADD_TO_SAVED_AND_TAX}
                        />
              }}
            />
            <Text style={styles.mapTitle}>Compare receipts nearby</Text>
            <Map/>
          </ScrollView>
      </View>
    </>
  )
}

export default Home;

const styles = StyleSheet.create({
  screenContainer: {
    paddingStart: SIZE.size_18,
    paddingEnd: SIZE.size_18,
    marginBottom: SIZE.size_20,
    flex: 1,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  recentScrollView: {},
  title: {
    paddingStart: SIZE.size_20,
    paddingEnd: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: SIZE.size_25,
    color: COLOR.primaryBlueHex,
  },
  divider: {
    height: SIZE.size_1,
    backgroundColor: COLOR.primaryBlueHex
  },
  recentListTitle: {
    marginTop: SIZE.size_20,
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
  }
});

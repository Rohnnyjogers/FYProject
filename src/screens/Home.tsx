import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import { ReceiptsData } from '../data/ReceiptsData'
import ReceiptCard from '../components/ReceiptCard';
import MapView from 'react-native-maps';
import { ADD_TO_SAVED_AND_TAX } from '../types/types';

const Home = () => {

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
                        viewerType={ADD_TO_SAVED_AND_TAX}/>
            }}/>
            <Text style={styles.mapTitle}>Compare receipts nearby</Text>
            {/* <MapView style={styles.map}/> */}
      </ScrollView>
    </View>
  )
}

export default Home;

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

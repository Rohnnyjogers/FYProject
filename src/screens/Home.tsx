import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import ReceiptCard from '../components/receipts/ReceiptCard';
import { ADD_TO_SAVED_TAX_EXPENSE, ReceiptProps } from '../types/types';
import Map from '../components/Map';
import { auth, database } from '../../firebaseconfig';
import { onValue, ref } from 'firebase/database';

const Home = () => {
  const [recentReceipts, setRecentReceipts] = useState<ReceiptProps[]>([]);

  const bottomTabHeight = useBottomTabBarHeight();

  useEffect(() => {
    const userId = auth.currentUser?.uid; 
    const recentDbRef = ref(database, `/users/${userId}/receipts/recent`);

    onValue(recentDbRef, (snapshot) => {
      if(snapshot.exists()){
        const recents = Object.keys(snapshot.val());

        const recentReceipts = recents.flatMap((receipt) => {
          const receipts: ReceiptProps[] = Object.values(snapshot.val()[receipt]);
          
          return receipts.map((receipt) => ({
            ...receipt
          }))
        });
        setRecentReceipts(recentReceipts);
      }
    })

  },[]);

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
              data={recentReceipts.reverse()}
              keyExtractor={item => item.receiptId.toString()}
              renderItem={({item}) => {
                return <ReceiptCard
                          receiptId={item.receiptId}
                          vendorId={item.vendorId}
                          receiptDate={item.receiptDate}
                          latitude={item.latitude}
                          longitude={item.longitude}
                          vendorName={item.vendorName}
                          items={item.items}
                          priceTotal={item.priceTotal}
                          itemsTotal={item.itemsTotal}
                          viewerType={ADD_TO_SAVED_TAX_EXPENSE}
                        />
              }}
            />
            <Text style={styles.mapTitle}>Compare receipts nearby</Text>
            {/* <Map/> */}
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
    height: RECEIPT_CARD_HEIGHT+2
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

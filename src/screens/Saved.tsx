import { StyleSheet, View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTFAMILY, SIZE, COLOR, RECEIPT_CARD_HEIGHT } from '../theme/theme'
import Header from '../components/Header'
import ReceiptCard from '../components/receipts/ReceiptCard'
import { auth, database } from '../../firebaseconfig'
import { onValue, ref } from 'firebase/database'
import { REMOVE_FROM_SAVED, REMOVE_FROM_TAX, ReceiptProps } from '../types/types'
import NavError from '../components/NavError'

const Saved = () => {
  const [savedReceipts, setSavedReceipts] = useState<ReceiptProps[]>([]);
  const [taxReceipts, setTaxReceipts] = useState<ReceiptProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const userId = auth.currentUser?.uid;

    if(userId){
      const savedDBRef = ref(database, `/users/${userId}/receipts/saved`);
      const taxDBRef = ref(database, `/users/${userId}/receipts/tax`)
      setLoading(true);

      onValue(savedDBRef, (snapshot) => {
        if(snapshot.exists()){
          const vendors = Object.keys(snapshot.val());

          const receipts = vendors.flatMap((vendor) => {
            const vendorReceipts: ReceiptProps[] = Object.values(snapshot.val()[vendor])
            
            return vendorReceipts.map((receipt) => ({
              ...receipt
            }));

          });
          setSavedReceipts(receipts);
        } else {
          setSavedReceipts([]);
        }
        setLoading(false);
      })

      onValue(taxDBRef, (snapshot) => {
        if(snapshot.exists()){
          const vendors = Object.keys(snapshot.val());

          const receipts = vendors.flatMap((vendor) => {
            const vendorReceipts: ReceiptProps[] = Object.values(snapshot.val()[vendor])
            
            return vendorReceipts.map((receipt) => ({
              ...receipt
            }));

          });
          setTaxReceipts(receipts);
        } else {
          setTaxReceipts([]);
        }
        setLoading(false);
      })
    }
  },[]);

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
            <Text style={styles.title}>Saved</Text>
            <View style={styles.divider}/>
            <View style={styles.screenContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewFlex}>
                <Text style={styles.savedTitle}>Saved Receipts</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.flatListStyle}
                  contentContainerStyle={styles.receiptList}
                  data={savedReceipts}
                  keyExtractor={(item) => item.receiptId.toString()}
                  renderItem={({item}) => {
                    return(
                      <ReceiptCard 
                        receiptId={item.receiptId}
                        vendorId={item.vendorId}
                        vendorLat={item.vendorLat}
                        vendorLong={item.vendorLong}
                        vendorName={item.vendorName}
                        items={item.items}
                        priceTotal={item.priceTotal}
                        itemTotal={item.itemTotal}
                        viewerType={REMOVE_FROM_SAVED}
                      />
                    )
                  }}
                  ListEmptyComponent={<NavError/>}
                />

                <Text style={styles.taxTitle}>Tax Receipts</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.flatListStyle}
                  contentContainerStyle={styles.receiptList}
                  data={taxReceipts}
                  keyExtractor={(item) => item.receiptId.toString()}
                  renderItem={({item}) => {
                    return(
                      <ReceiptCard
                        receiptId={item.receiptId}
                        vendorId={item.vendorId}
                        vendorLat={item.vendorLat}
                        vendorLong={item.vendorLong}
                        vendorName={item.vendorName}
                        items={item.items}
                        priceTotal={item.priceTotal}
                        itemTotal={item.itemTotal}
                        viewerType={REMOVE_FROM_TAX}
                      />
                    )
                  }}
                  ListEmptyComponent={<NavError/>}
                />
              </ScrollView>
            </View>
          </> 
        }
    </>
  )
}

export default Saved;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingLeft: SIZE.size_20,
    paddingRight: SIZE.size_20,
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
  indicator: {
    alignSelf: 'center'
  },
  savedTitle: {
    paddingTop: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  },
  flatListStyle: {
    marginTop: SIZE.size_10,
    flexGrow: 0
  },
  receiptList: {
    gap: SIZE.size_20,
    height: RECEIPT_CARD_HEIGHT
  },
  taxTitle: {
    marginTop: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  }
})
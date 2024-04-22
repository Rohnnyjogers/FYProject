import { StyleSheet, View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTFAMILY, SIZE, COLOR, RECEIPT_CARD_HEIGHT } from '../theme/theme'
import Header from '../components/Header'
import ReceiptCard from '../components/receipts/ReceiptCard'
import { auth, database } from '../../firebaseconfig'
import { onValue, ref } from 'firebase/database'
import { REMOVE_FROM_SAVED, REMOVE_FROM_TAX, ReceiptProps } from '../types/types'
import NavError from '../components/NavError'
import TaxAndExpenseCard from '../components/taxesExpenses/TaxAndExpenseCard'

const Saved = () => {
  const [savedReceipts, setSavedReceipts] = useState<ReceiptProps[]>([]);
  const [taxReceipts, setTaxReceipts] = useState<ReceiptProps[]>([]);
  const [expenseReceipts, setExpenseReceipts] = useState<ReceiptProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth.currentUser?.uid;

    if(userId){
      setLoading(true);
      const savedDbRef = ref(database, `/users/${userId}/receipts/saved`);
      const taxDbRef = ref(database, `/users/${userId}/receipts/tax`);
      const expenseDbRef = ref(database, `/users/${userId}/receipts/expenses`);

      onValue(savedDbRef, (snapshot) => {
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
      });

      onValue(taxDbRef, (snapshot) => {
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
      });

      onValue(expenseDbRef, (snapshot) => {
        if(snapshot.exists()){
          const vendors = Object.keys(snapshot.val());

          const receipts = vendors.flatMap((vendor) => {
            const vendorReceipts: ReceiptProps[] = Object.values(snapshot.val()[vendor])
            
            return vendorReceipts.map((receipt) => ({
              ...receipt
            }));

          });
          setExpenseReceipts(receipts);
        } else {
          setExpenseReceipts([]);
        }
      });

      setLoading(false);
    }
  },[]);

  return (
    <>
      <Header/>
      <Text style={styles.title}>Receipts</Text>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewFlex}>
            <Text style={styles.savedTitle}>Saved Receipts</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListStyle}
              contentContainerStyle={styles.receiptList}
              data={savedReceipts.reverse()}
              keyExtractor={(item) => item.receiptId.toString()}
              renderItem={({item}) => {
                return(
                  <ReceiptCard 
                    receiptId={item.receiptId}
                    vendorId={item.vendorId}
                    receiptDate={item.receiptDate}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    vendorName={item.vendorName}
                    items={item.items}
                    priceTotal={item.priceTotal}
                    itemsTotal={item.itemsTotal}
                    viewerType={REMOVE_FROM_SAVED}
                  />
                )
              }}
              ListEmptyComponent={<NavError/>}
            />

            <Text style={styles.taxTitle}>Taxes and Expenses</Text>
            <TaxAndExpenseCard
              taxes={taxReceipts}
              expenses={expenseReceipts}
            />          
          </ScrollView>
        </View> 
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
  indicatorView:{
    flex: 1,
    backgroundColor: COLOR.stampLightGrey,
    justifyContent: 'center'
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
    flexGrow: 0,
  },
  receiptList: {
    gap: SIZE.size_20,
    height: RECEIPT_CARD_HEIGHT+2
  },
  taxTitle: {
    marginTop: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  }
})
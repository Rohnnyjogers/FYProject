import { Alert, Button, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { ADD_TO_SAVED_AND_TAX, 
         REMOVE_FROM_SAVED, 
         REMOVE_FROM_TAX,
         ADD_TO_SAVED_BTN,
         ADD_TO_TAX_BTN,
         REMOVE_FROM_SAVED_BTN,
         REMOVE_FROM_TAX_BTN, 
         ReceiptProps, 
         RootStackParamsList } from '../types/types';
import { COLOR, FULL_RECEIPT_WIDTH, SIZE } from '../theme/theme';
import FullReceipt from '../components/receipts/FullReceipt';
import { auth } from '../../firebaseconfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addReceiptToSaved, addReceiptToTax, removeReceiptFromSaved, removeReceiptFromTax } from '../service/service';

const ReceiptViewer = () => {
  const route = useRoute();

  const { 
    receiptId,
    vendorId,
    vendorLat,
    vendorLong,
    vendorName, 
    items, 
    priceTotal, 
    itemTotal, 
    viewerType} = route.params as ReceiptProps;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  
  const userId = auth.currentUser?.uid;

  const receiptData: ReceiptProps = {
    receiptId,
    vendorId,
    vendorLat,
    vendorLong,
    vendorName, 
    items, 
    priceTotal, 
    itemTotal, 
  };

  const serviceMethodsWrapper = (button: number) => {
    if(userId){
      if(button === ADD_TO_SAVED_BTN){
        addReceiptToSaved(userId, receiptData, navigation);
      }
      else if(button === ADD_TO_TAX_BTN){
        addReceiptToTax(userId, receiptData, navigation);
      }
      else if(button === REMOVE_FROM_SAVED_BTN){
        removeReceiptFromSaved(userId, receiptData, navigation);
      }
      else if(button === REMOVE_FROM_TAX_BTN){
        removeReceiptFromTax(userId, receiptData, navigation);
      }
    } 
    else {
      Alert.alert('User not authenticated');
    }
  }

  return (
    <View style={styles.receiptView}>
      <ScrollView style={styles.scrollView}>
        <FullReceipt
           receiptId={receiptId}
           items={items}
           vendorName={vendorName}
           priceTotal={priceTotal}
           itemTotal={itemTotal}
        />
      </ScrollView>
    
      <View style={styles.buttonView}>
        {viewerType === ADD_TO_SAVED_AND_TAX && (
          <View style={styles.addBtnsContainer}>
            <Button
              title='Add to Saved'
              color={COLOR.primaryBlueHex}
              onPress={() => serviceMethodsWrapper(ADD_TO_SAVED_BTN)}
            />
            <Button
              title='Add to Tax'
              color={COLOR.primaryBlueHex}
              onPress={() => serviceMethodsWrapper(ADD_TO_TAX_BTN)}
            />
          </View>
        )}
        {viewerType === REMOVE_FROM_SAVED && (
          <View style={styles.removeBtnsContainer}>
            <Button
              title='Remove from Saved'
              color={COLOR.primaryBlueHex}
              onPress={() => serviceMethodsWrapper(REMOVE_FROM_SAVED_BTN)}
            />
          </View>
        )}
        {viewerType === REMOVE_FROM_TAX && (
          <View style={styles.removeBtnsContainer}>
            <Button
              title='Remove from Tax'
              color={COLOR.primaryBlueHex}
              onPress={() => serviceMethodsWrapper(REMOVE_FROM_TAX_BTN)}
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default ReceiptViewer;

const styles = StyleSheet.create({
  receiptView: {
    alignSelf: 'center',
    marginTop: SIZE.size_40,
  },
  buttonView: {
    alignSelf: 'center',
    marginBottom: SIZE.size_20
  },
  addBtnsContainer: {
    flexDirection: 'column',
    width: FULL_RECEIPT_WIDTH,
    gap: SIZE.size_10
  },
  removeBtnsContainer: {
    width: FULL_RECEIPT_WIDTH
  },
  scrollView:{
    flex: 1, 
  }
})
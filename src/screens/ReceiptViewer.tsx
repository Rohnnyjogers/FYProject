import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { COLOR, FONTFAMILY, FULL_RECEIPT_WIDTH, SIZE } from '../theme/theme';
import FullReceipt from '../components/receipts/FullReceipt';
import { auth } from '../../firebaseconfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addReceiptToSaved, addReceiptToTax, removeReceiptFromSaved, removeReceiptFromTax } from '../service/service';

const ReceiptViewer = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const userId = auth.currentUser?.uid;

  const { 
    receiptId,
    vendorId,
    receiptDate,
    latitude,
    longitude,
    vendorName, 
    items, 
    priceTotal, 
    itemsTotal, 
    viewerType} = route.params as ReceiptProps;

  const receiptData: ReceiptProps = {
    receiptId,
    vendorId,
    receiptDate,
    latitude,
    longitude,
    vendorName, 
    items, 
    priceTotal, 
    itemsTotal, 
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
      <FullReceipt
          receiptId={receiptId}
          items={items}
          vendorName={vendorName}
          priceTotal={priceTotal}
          itemTotal={itemsTotal}
      />
    
      <View style={styles.buttonView}>
        {viewerType === ADD_TO_SAVED_AND_TAX && (
          <View style={styles.buttonsContainer}>
            <Pressable 
              onPress={() => serviceMethodsWrapper(ADD_TO_SAVED_BTN)}
              style={styles.pressable}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
              <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex}}>Save Receipt</Text>
            </Pressable>
            <Pressable 
              onPress={() => serviceMethodsWrapper(ADD_TO_TAX_BTN)}
              style={styles.pressable}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
              <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex}}>Add to Taxback</Text>
            </Pressable>
            <Pressable 
              onPress={() => {}}
              style={styles.pressable}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
              <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex}}>Add to Expenses</Text>
            </Pressable>
          </View>
        )}
        {viewerType === REMOVE_FROM_SAVED && ( 
          <View style={styles.buttonsContainer}>
            <Pressable 
              onPress={() => serviceMethodsWrapper(REMOVE_FROM_SAVED_BTN)}
              style={styles.pressable}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{fontFamily: FONTFAMILY.jost_bold, color: COLOR.primaryWhiteHex}}>Remove Receipt</Text>
            </Pressable>
          </View>
        )}
        {viewerType === REMOVE_FROM_TAX && (
          <View style={styles.buttonsContainer}>
            <Pressable 
              onPress={() => serviceMethodsWrapper(REMOVE_FROM_TAX_BTN)}
              style={styles.pressable}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{fontFamily: FONTFAMILY.jost_bold, color: COLOR.primaryWhiteHex}}>Remove Receipt</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

export default ReceiptViewer;

const styles = StyleSheet.create({
  receiptView: {
    padding: SIZE.size_10,
    alignSelf: 'center',
    marginTop: SIZE.size_15,
    gap: SIZE.size_25,
    borderWidth: SIZE.size_1,
    borderColor: COLOR.borderDarkGrey,
    borderRadius: SIZE.size_4,
    backgroundColor: COLOR.secondaryLightGrey,
    elevation: SIZE.size_1
  },
  buttonView: {
    alignSelf: 'center'
  },
  buttonsContainer: {
    width: FULL_RECEIPT_WIDTH,
    gap: SIZE.size_10
  },
  pressable: {
    backgroundColor: COLOR.primaryBlueHex,
    alignItems: 'center',
    padding: SIZE.size_5,
    borderRadius: SIZE.size_4,
    elevation: SIZE.size_2
  },
  removeBtnsContainer: {
    width: FULL_RECEIPT_WIDTH
  }
})
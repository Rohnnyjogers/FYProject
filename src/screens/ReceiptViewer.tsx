import { Alert, Button, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { ADD_TO_SAVED_AND_TAX, REMOVE_FROM_SAVED, REMOVE_FROM_TAX, ReceiptProps, RootStackParamsList } from '../types/types';
import { COLOR, SIZE } from '../theme/theme';
import FullReceipt from '../components/FullReceipt';
import {auth, database} from '../../firebaseconfig';
import { get, ref, remove, set } from 'firebase/database';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ReceiptViewer = () => {
  const route = useRoute();

  const { receiptId,
    vendorId,
    vendorLat,
    vendorLong,
    vendorName, 
    items, 
    priceTotal, 
    itemTotal, 
    viewerType} = route.params as ReceiptProps;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  
  const addReceiptToSaved = () => {
    const userId = auth.currentUser?.uid;

    if(userId){
      const receiptData = {
        receiptId,
        vendorId,
        vendorLat,
        vendorLong,
        vendorName, 
        items, 
        priceTotal, 
        itemTotal, 
      };
      
      const receiptKey = `${vendorName}_${vendorId}_${receiptId}`; 
      const dbRef = ref(database, `/${userId}/receipts/saved/${vendorName}_${vendorId}/${receiptKey}`)

      set(dbRef, receiptData)
      .then(() => {
        Alert.alert('Receipt Saved', undefined, [{
          onPress: () => {
            navigation.navigate('Home');
          }
        }]);
      })
      .catch((error: any) => {
        Alert.alert('Error saving receipt '+error.message);
      })
    } 
    else {
      Alert.alert('User not authenticated');
    }
  }

  const addReceiptToTax = () => {
    const userId = auth.currentUser?.uid;

    if(userId){
      const receiptData = {
        receiptId,
        vendorId,
        vendorLat,
        vendorLong,
        vendorName, 
        items, 
        priceTotal, 
        itemTotal, 
      };
      
      const receiptKey = `T_${vendorName}_${vendorId}_${receiptId}`; 
      const dbRef = ref(database, `/${userId}/receipts/tax/${vendorName}_${vendorId}/${receiptKey}`)

      set(dbRef, receiptData)
      .then(() => {
        Alert.alert('Tax Receipt Saved', undefined, [{
          onPress: () => {
            navigation.navigate('Home');
          }
        }]);
      })
      .catch((error: any) => {
        Alert.alert('Error saving receipt '+error.message);
      })
    } 
    else {
      Alert.alert('User not authenticated');
    }
  }

  const removeReceiptFromSaved = () => {
  const userId = auth.currentUser?.uid;
  const receiptKey = `${vendorName}_${vendorId}_${receiptId}`; 
  const dbRef = ref(database, `/${userId}/receipts/saved/${vendorName}_${vendorId}/${receiptKey}`);

  get(dbRef)
  .then((snapshot) => {
    if(snapshot.exists()){
      Alert.alert('Receipt removed', undefined, [{
        onPress: () => {
          navigation.navigate('Saved');
        }
      }]);
      return remove(dbRef);
    } 
    else {
      Alert.alert('Receipt not found')
      return Promise.resolve();
    }
  })
  .catch((error: any) => {
    Alert.alert('Error removing receipt: '+error.message);
  });
  }

  const removeReceiptFromTax = () => {
  const userId = auth.currentUser?.uid;
  const receiptKey = `T_${vendorName}_${vendorId}_${receiptId}`; 
  const dbRef = ref(database, `/${userId}/receipts/tax/${vendorName}_${vendorId}/${receiptKey}`);

  get(dbRef)
  .then((snapshot) => {
    if(snapshot.exists()){
      Alert.alert('Tax receipt removed', undefined, [{
        onPress: () => {
          navigation.navigate('Saved');
        }
      }]);
      return remove(dbRef);
    }
    else {
      Alert.alert('Receipt not found');
      return Promise.resolve();
    }
  })
  .catch((error: any) => {
    Alert.alert('Error removing receipt '+error.message);
  });
  }

  return (
    <View style={styles.receiptView}>
      <ScrollView style={styles.scrollView}>
        <FullReceipt
           receiptId={receiptId}
           items={items}
           vendorName={vendorName}
           priceTotal={priceTotal}
           itemTotal={itemTotal}/>
      </ScrollView>
      {viewerType === ADD_TO_SAVED_AND_TAX && (
        <>
          <Button
            title='Add to Saved'
            color={COLOR.primaryBlueHex}
            onPress={addReceiptToSaved}/>
          <Button
            title='Add to Tax'
            color={COLOR.primaryBlueHex}
            onPress={addReceiptToTax}
          />
        </>
      )}
      {viewerType === REMOVE_FROM_SAVED && (
        <Button
          title='Remove from Saved'
          color={COLOR.primaryBlueHex}
          onPress={removeReceiptFromSaved}
        />
      )}
      {viewerType === REMOVE_FROM_TAX && (
        <Button
          title='Remove from Tax'
          color={COLOR.primaryBlueHex}
          onPress={removeReceiptFromTax}/>
      )}
    </View>
  )
}

export default ReceiptViewer;

const styles = StyleSheet.create({
  receiptView: {
    alignSelf: 'center',
    paddingTop: SIZE.size_40,
  },
  scrollView:{
    flex: 1, 
  }
})
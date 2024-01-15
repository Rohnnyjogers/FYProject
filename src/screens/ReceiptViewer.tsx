import { Button, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Receipt from '../components/Receipt';
import { useRoute } from '@react-navigation/native'; 
import { ReceiptProps } from '../types/types';
import { COLOR, SIZE } from '../theme/theme';
import FullReceipt from '../components/FullReceipt';

const ReceiptViewer = () => {
  const route = useRoute();
  const {id, items, location, priceTotal, itemTotal, index} = route.params as ReceiptProps;

  return (
    <View style={styles.receiptView}>
      <ScrollView style={styles.scrollView}>
        <FullReceipt
          id={id}
          items={items}
          location={location}
          priceTotal={priceTotal}
          itemTotal={itemTotal}
          index={index}/>
      </ScrollView>
      <Button
        title='Save Receipt'
        color={COLOR.primaryBlueHex}/>
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
    flex: 1
  }

})
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ReceiptProps } from '../types/types';
import { COLOR, FONTFAMILY, FULL_RECEIPT_HEIGHT, FULL_RECEIPT_WIDTH, SIZE } from '../theme/theme';

const FullReceipt: React.FC<ReceiptProps> = ({
    location,
    items,
    itemTotal,
    priceTotal
}) => {
  return (
    <View style={styles.receiptContainer}>
      <Text style={styles.receiptTitle}>{location}</Text>
      <View style={styles.items}>
        {items.map((item) => {
          return(
            <Text key={item.description}>{item.quantity} x {item.description}  €{item.price}</Text>
          )
        })}
      </View>
      <Text>Item total: {itemTotal}</Text>
      <Text>Price: €{priceTotal}</Text>
    </View>
  )
}

export default FullReceipt

const styles = StyleSheet.create({
    receiptContainer: {
        height: FULL_RECEIPT_HEIGHT,
        width: FULL_RECEIPT_WIDTH,
        padding: SIZE.size_4,
        borderRadius: SIZE.size_2,
        backgroundColor: COLOR.primaryWhiteHex,
      },
    receiptTitle: {
        alignSelf: 'center'
      },
    items: {
        fontFamily: FONTFAMILY.IBMPlexMono_Italic,
        justifyContent: 'space-around',
      }
})
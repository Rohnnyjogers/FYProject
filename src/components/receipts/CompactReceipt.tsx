import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, RECEIPT_HEIGHT, RECEIPT_WIDTH, SIZE } from '../../theme/theme';
import { ReceiptProps, UIReceiptProps } from '../../types/types';


const CompactReceipt: React.FC<UIReceiptProps> = ({
    vendorName,
    items,
    priceTotal,
    itemTotal,
}) => {
  return (
    <View style={styles.receiptContainer}>
      <Text style={styles.receiptTitle}>{vendorName}</Text>
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

const styles = StyleSheet.create({
    receiptContainer: {
        height: RECEIPT_HEIGHT,
        width: RECEIPT_WIDTH,
        borderRadius: SIZE.size_2,
        padding: SIZE.size_4,
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

export default CompactReceipt;
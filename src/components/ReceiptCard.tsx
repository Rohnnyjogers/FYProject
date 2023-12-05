import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, RECEIPT_CARD_WIDTH, RECEIPT_HEIGHT, SIZE } from '../theme/theme'

const CARD_WIDTH = Dimensions.get('window').width*0.4;
const RECEIPT_WIDTH = Dimensions.get('window').width*0.25;

interface ReceiptCardProps {
  id: String;
  items: Array<any>;
  location: String;
  priceTotal: String;
  itemTotal: String;
  index: number;

}

const ReceiptCard: React.FC<ReceiptCardProps> = ({
  id,
  items,
  location,
  priceTotal,
  itemTotal,
}) => {

  return (
    <View style={styles.card}>
      <View style={styles.receiptStyle}>
            <Text>{location}</Text>
            <View>
              {items.map((item) => {
                return(
                  <Text>{item.quantity} x {item.description}  €{item.price}</Text>
                )
              })}
            </View>
            <Text>Items: {itemTotal}</Text>
            <Text>Price: €{priceTotal}</Text>
        </View>
      <Text style={styles.receiptTitle}>{location}</Text>
      <Text style={styles.receiptTime}>12:10 04/12/2023</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        height: RECEIPT_CARD_HEIGHT,
        width: RECEIPT_CARD_WIDTH,
        backgroundColor: COLOR.secondaryLightGrey,
        borderRadius: SIZE.size_4,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: SIZE.size_8,
        gap: SIZE.size_8,
    },
    receiptStyle: {
        height: RECEIPT_HEIGHT,
        padding: SIZE.size_2,
        backgroundColor: COLOR.primaryWhiteHex,
    },
    receiptTitle: {
      fontFamily: FONTFAMILY.jost_medium
    },
    receiptTime: {
      fontFamily: FONTFAMILY.jost_regular
    }
})

export default ReceiptCard;
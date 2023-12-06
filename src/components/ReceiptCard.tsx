import { StyleSheet, Text, View, Dimensions, Pressable, Button } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, RECEIPT_CARD_WIDTH, RECEIPT_HEIGHT, SIZE } from '../theme/theme'
import Receipt from './Receipt';
import ReceiptViewer from '../screens/ReceiptViewer';

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

const renderReceipt = () => {
  console.log("Inside render receipt function");
  return(
    <ReceiptViewer/>
  )
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
      <Pressable onPress={() => renderReceipt()}>
        <Receipt
            id={id}
            items={items}
            location={location}
            priceTotal={priceTotal}
            itemTotal={itemTotal} 
            index={0}/>
      </Pressable>  
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
    receiptTitle: {
      fontFamily: FONTFAMILY.jost_medium
    },
    receiptTime: {
      fontFamily: FONTFAMILY.jost_regular
    }
})

export default ReceiptCard;
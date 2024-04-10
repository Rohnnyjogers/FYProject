import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, COMPACT_RECEIPT_HEIGHT, COMPACT_RECEIPT_WIDTH, SIZE, COMPACT_ITEMS_CONTAINER_HEIGHT } from '../../theme/theme';
import { UIReceiptProps } from '../../types/types';


const CompactReceipt: React.FC<UIReceiptProps> = ({
    vendorName,
    items,
    priceTotal,
    itemTotal,
}) => {
  const vendor: string = vendorName.replace(/_/g,' ');

  return (
    <View style={styles.receiptContainer}>
      <Text style={styles.receiptTitle}>{vendor}</Text>
      <View style={styles.divider}/>
      <View style={styles.items}>
        <ScrollView
          showsVerticalScrollIndicator={true}>
          {items.map((item) => {
            return(
              <View style={styles.itemView} key={items.indexOf(item)}>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <Text style={styles.itemMultiplier}>x</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.divider}/>
      <View style={styles.dblDivider}/>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.price}>€{priceTotal}</Text>
      </View>
      <View style={styles.divider}/>
    </View>
  )
}

export default CompactReceipt;

const styles = StyleSheet.create({
  receiptContainer: {
    height: COMPACT_RECEIPT_HEIGHT,
    width: COMPACT_RECEIPT_WIDTH,
    borderRadius: SIZE.size_2,
    borderWidth: SIZE.size_1,
    borderColor: COLOR.borderDarkGrey,
    padding: SIZE.size_4,
    backgroundColor: COLOR.primaryWhiteHex,
  },
  receiptTitle: {
    marginTop: SIZE.size_6,
    fontSize: SIZE.size_14,
    alignSelf: 'center',
    fontFamily: FONTFAMILY.IBMPlexMono_SemiBold,
    color: COLOR.primaryGreyHex
  },
  divider: {
    marginTop: SIZE.size_4,
    height: SIZE.size_1,
    borderColor: COLOR.primaryGreyHex,
    borderBottomWidth: SIZE.size_1,
    borderStyle: 'dashed'
  },
  dblDivider: {
    marginTop: SIZE.size_2,
    height: SIZE.size_1,
    borderColor: COLOR.primaryGreyHex,
    borderBottomWidth: SIZE.size_1,
    borderStyle: 'dashed'
  },
  items: {
      marginTop: SIZE.size_4,
      height: COMPACT_ITEMS_CONTAINER_HEIGHT
  },
  itemView: {
    marginLeft: SIZE.size_4,
    marginBottom: SIZE.size_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  itemQuantity: {
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_Light
  },
  itemMultiplier: {
    marginLeft: -SIZE.size_12,
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_Light
  },
  itemDesc: {
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_Light
  },
  itemPrice: {
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_Light
  },
  totalContainer: {
    marginTop: SIZE.size_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontSize: SIZE.size_14,
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_SemiBold
  
  },
  price: {
    fontSize: SIZE.size_14,
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_SemiBold  
  }
})
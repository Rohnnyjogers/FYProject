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
  const vendor: string = vendorName.replace(/_/g, ' ');

  return (
    <View style={styles.receiptContainer}>
      <Text style={styles.receiptTitle}>{vendor}</Text>
      <View style={styles.divider} />
      <View style={styles.items}>
        <ScrollView
          showsVerticalScrollIndicator={true}>
          {items.map((item) => {
            return (
              <View style={styles.itemView} key={items.indexOf(item)}>
                <Text style={styles.itemLayout}>{item.quantity} x {item.description}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={{marginBottom: 20}}>
        <View style={styles.divider} />
        <View style={styles.dblDivider} />
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total:</Text>
          <Text style={styles.price}>€{priceTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
      </View>
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
    elevation: SIZE.size_2
  },
  receiptTitle: {
    marginTop: SIZE.size_2,
    fontSize: SIZE.size_14,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: FONTFAMILY.IBMPlexMono_Medium,
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
    height: COMPACT_ITEMS_CONTAINER_HEIGHT
  },
  itemView: {
    padding: SIZE.size_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  itemLayout: {
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_Light,
    fontSize: SIZE.size_12
  },
  itemPrice: {
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_Light,
    fontSize: SIZE.size_12
  },
  totalContainer: {
    marginTop: SIZE.size_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontSize: SIZE.size_14,
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_Medium

  },
  price: {
    fontSize: SIZE.size_14,
    color: COLOR.primaryGreyHex,
    fontFamily: FONTFAMILY.IBMPlexMono_Medium
  }
})
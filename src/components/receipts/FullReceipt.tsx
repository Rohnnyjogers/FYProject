import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { UIReceiptProps } from '../../types/types';
import { COLOR, FONTFAMILY, FULL_RECEIPT_HEIGHT, FULL_RECEIPT_WIDTH, FULL_ITEMS_CONTAINER_HEIGHT, SIZE } from '../../theme/theme';

const FullReceipt: React.FC<UIReceiptProps> = ({
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
                <Text style={styles.itemQuantity}>{item.quantity} x</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>{item.price.toFixed(2)}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.divider}/>
      <View style={styles.dblDivider}/>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.price}>€{priceTotal.toFixed(2)}</Text>
      </View>
      <View style={styles.divider}/>
    </View>
    
  )
}

export default FullReceipt;

const styles = StyleSheet.create({
    receiptContainer: {
        height: FULL_RECEIPT_HEIGHT,
        width: FULL_RECEIPT_WIDTH,
        paddingStart: SIZE.size_10,
        paddingEnd: SIZE.size_10,
        borderRadius: SIZE.size_2,
        borderWidth: SIZE.size_1,
        borderColor: COLOR.borderDarkGrey,
        backgroundColor: COLOR.primaryWhiteHex,
        elevation: SIZE.size_2
      },
    receiptTitle: {
        marginTop: SIZE.size_16,
        fontSize: SIZE.size_18,
        alignSelf: 'center',
        fontFamily: FONTFAMILY.IBMPlexMono_Bold,
        color: COLOR.primaryGreyHex
      },
    divider: {
      marginTop: SIZE.size_12,
      height: SIZE.size_1,
      borderColor: COLOR.primaryGreyHex,
      borderBottomWidth: SIZE.size_1,
      borderStyle: 'dashed'
    },
    dblDivider: {
      marginTop: SIZE.size_3,
      height: SIZE.size_1,
      borderColor: COLOR.primaryGreyHex,
      borderBottomWidth: SIZE.size_1,
      borderStyle: 'dashed'
    },
    items: {
        marginTop: SIZE.size_12,
        height: FULL_ITEMS_CONTAINER_HEIGHT
      },
    itemView: {
      marginLeft: SIZE.size_6,
      marginBottom: SIZE.size_4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    itemQuantity: {
      fontFamily: FONTFAMILY.IBMPlexMono_Medium,
      color: COLOR.primaryGreyHex
    },
    itemDescription: {
      fontFamily: FONTFAMILY.IBMPlexMono_Medium,
      color: COLOR.primaryGreyHex
    },
    itemPrice: {
      fontFamily: FONTFAMILY.IBMPlexMono_Medium,
      color: COLOR.primaryGreyHex
    },
    totalContainer: {
      marginTop: SIZE.size_12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    total: {
      fontFamily: FONTFAMILY.IBMPlexMono_Bold,
      color: COLOR.primaryGreyHex,
      fontSize: SIZE.size_22
    },
    price: {
      fontFamily: FONTFAMILY.IBMPlexMono_Bold,
      fontSize: SIZE.size_22,
      color: COLOR.primaryGreyHex
    }
})
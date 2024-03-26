import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, RECEIPT_CARD_WIDTH, SIZE } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ADD_TO_SAVED_AND_TAX, NAV_ERROR, REMOVE_FROM_SAVED, REMOVE_FROM_TAX, ReceiptProps, RootStackParamsList, ViewerScreen } from '../../types/types';
import CompactReceipt from './CompactReceipt';

const ReceiptCard: React.FC<ReceiptProps> = ({
      receiptId,
      vendorId,
      receiptDate,
      latitude,
      longitude,
      vendorName, 
      items, 
      priceTotal, 
      itemsTotal, 
      viewerType 
}) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  
  const toReceiptViewer = () => {
    let targetViewer: ViewerScreen;

    if(viewerType === ADD_TO_SAVED_AND_TAX){
      targetViewer = viewerType;
    }
    else if(viewerType === REMOVE_FROM_SAVED){
      targetViewer = viewerType;
    }
    else if(viewerType === REMOVE_FROM_TAX){
      targetViewer = viewerType
    } 
    else {
      targetViewer = NAV_ERROR 
    }

    navigation.navigate(targetViewer, {
      receiptId,
      vendorId,
      receiptDate,
      vendorName, 
      latitude,
      longitude,
      items, 
      itemsTotal, 
      priceTotal, 
      viewerType 
    });
  };

  return (
    <View style={styles.card}>
          <Pressable onPress={toReceiptViewer}>
            <CompactReceipt
                receiptId={receiptId}
                items={items}
                vendorName={vendorName}
                priceTotal={priceTotal}
                itemTotal={itemsTotal}/>
          </Pressable> 
      <Text style={styles.receiptTitle}>{vendorName}</Text>
      <Text style={styles.receiptTime}>12:10 04/12/2023</Text>
    </View>
  );
};

export default ReceiptCard;

const styles = StyleSheet.create({
    card: {
        height: RECEIPT_CARD_HEIGHT,
        width: RECEIPT_CARD_WIDTH,
        backgroundColor: COLOR.secondaryLightGrey,
        borderRadius: SIZE.size_4,
        borderWidth: 1,
        borderColor: COLOR.borderDarkGrey,
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


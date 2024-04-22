import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, RECEIPT_CARD_WIDTH, SIZE } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ADD_TO_SAVED_TAX_EXPENSE, NAV_ERROR, REMOVE_FROM_SAVED, REMOVE_FROM_TAX, ReceiptProps, RootStackParamsList, ViewerScreen } from '../../types/types';
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

    if(viewerType === ADD_TO_SAVED_TAX_EXPENSE){
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

  const rawDate: Date = new Date(receiptDate);
  const date = `${rawDate.getDate()}/${rawDate.getMonth()+1}/${rawDate.getFullYear()} ${rawDate.getHours()}:${String(rawDate.getMinutes()).padStart(2,'0')}`;
  const vendor: string = vendorName.replace(/_/g,' ');

  return (
    <View style={styles.card}>
          <Pressable 
            onPress={toReceiptViewer}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
            <CompactReceipt
                receiptId={receiptId}
                items={items}
                vendorName={vendorName}
                priceTotal={priceTotal}
                itemTotal={itemsTotal}/>
          </Pressable> 
      <Text style={styles.receiptTitle}>{vendor}</Text>
      <Text style={styles.receiptTime}>{date}</Text>
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
        elevation: SIZE.size_2
    },
    receiptTitle: {
      fontFamily: FONTFAMILY.jost_medium
    },
    receiptTime: {
      fontFamily: FONTFAMILY.jost_regular
    }
})


import { StyleSheet, Text, View, Dimensions, Pressable, Button } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, RECEIPT_CARD_HEIGHT, RECEIPT_CARD_WIDTH, RECEIPT_HEIGHT, SIZE } from '../theme/theme'
import Receipt from './Receipt';
import ReceiptViewer from '../screens/ReceiptViewer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReceiptProps, RootStackParamsList } from '../types/types';

// const ShowReceipt = () => {
//   console.log("Inside render receipt function");
//   return(

//   )
// }



const ReceiptCard: React.FC<ReceiptProps> = ({id, items, location, priceTotal, itemTotal, index}) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  
  const onPressHandler = () => {
    navigation.navigate('ReceiptViewer', {
      id,
      items,
      location,
      priceTotal,
      itemTotal,
      index
    });
  };

  return (
    <View style={styles.card}>
          <Pressable onPress={onPressHandler}>
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
  );

};

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
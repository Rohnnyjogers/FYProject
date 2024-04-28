import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ADD_TO_SAVED_TAX_EXPENSE, ReceiptProps, RootStackParamsList } from '../types/types';
import { COLOR, FONTFAMILY, FULL_RECEIPT_CARD, SIZE } from '../theme/theme';
import FullReceipt from '../components/receipts/FullReceipt';
import ReceiptCard from '../components/receipts/ReceiptCard';
import { removeReceiptFromExpenses, removeReceiptFromTax } from '../service/service';
import { auth } from '../../firebaseconfig';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ReceiptListViewer = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    const { receiptList }  = route.params as { receiptList: ReceiptProps[] };
    const { viewerType } = route.params as { viewerType: string };
    
    const userId = auth.currentUser?.uid;

    const dateString = (receiptDate: Date) => {
        const rawDate = new Date(receiptDate);
        return `${rawDate.getDate()}/${rawDate.getMonth()+1}/${rawDate.getFullYear()} ${rawDate.getHours()}:${String(rawDate.getMinutes()).padStart(2,'0')}`;
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatList}
                contentContainerStyle={styles.flatListContent}
                data={receiptList}
                keyExtractor={item => item.receiptId.toString()}
                renderItem={({item}) => {
                    return(
                        <View style={styles.receiptCard}>
                            <FullReceipt
                                receiptId={item.receiptId}
                                items={item.items}
                                vendorName={item.vendorName}
                                priceTotal={item.priceTotal}
                                itemTotal={item.itemsTotal}
                            />
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, fontSize: SIZE.size_18}}>{String(item.vendorName.replace(/_/g,' '))}</Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_regular, fontSize: SIZE.size_16}}>{dateString(item.receiptDate)}</Text>
                            </View>
                            {viewerType === 'tax' && (
                                <Pressable
                                    onPress={() => removeReceiptFromTax(
                                        userId,
                                        item,
                                        navigation
                                    )}
                                    style={styles.pressable}
                                    android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                                    <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex}}>Remove Receipt</Text>
                                </Pressable>
                            )}
                            {viewerType === 'expenses' && (
                                <Pressable
                                    onPress={() => removeReceiptFromExpenses(
                                        userId,
                                        item,
                                        navigation
                                    )}
                                    style={styles.pressable}
                                    android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                                    <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex}}>Remove Receipt</Text>
                                </Pressable>
                            )}
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default ReceiptListViewer

const styles = StyleSheet.create({
    listContainer: {
       flex: 1
    },
    flatList: {
        flexGrow: 0
    },
    flatListContent: {
        borderWidth: 1,
        height: FULL_RECEIPT_CARD+70
    },
    receiptCard: {
        marginStart: SIZE.size_40,
        marginEnd: SIZE.size_40,
        padding: SIZE.size_10,
        marginTop: SIZE.size_15,
        gap: SIZE.size_10,
        borderWidth: SIZE.size_1,
        borderColor: COLOR.borderDarkGrey,
        borderRadius: SIZE.size_4,
        backgroundColor: COLOR.secondaryLightGrey,
        elevation: SIZE.size_1
    },
    pressable: {
        backgroundColor: COLOR.primaryBlueHex,
        alignItems: 'center',
        padding: SIZE.size_5,
        borderRadius: SIZE.size_4,
        elevation: SIZE.size_2
    }
})
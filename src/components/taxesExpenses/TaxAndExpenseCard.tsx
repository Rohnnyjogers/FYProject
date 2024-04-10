import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ReceiptProps } from '../../types/types'
import { COLOR, FONTFAMILY, SIZE, TAX_EXPENSE_CARD_HEIGHT, TAX_EXPENSE_CARD_WIDTH } from '../../theme/theme'
import  Icon  from 'react-native-vector-icons/MaterialIcons'

interface TaxAndExpenseCardProps {
    taxes: ReceiptProps[],
    expenses: ReceiptProps[]
}

const TaxAndExpenseCard: React.FC = (
    
) => {

    let vat = true;
    let medical = true;
    let expenses = true;

  return (
     <View style={styles.taxExpenseCard}>
        {vat && 
            <View style={styles.cardLayout}>
                <View style={styles.innerCardLayout}>
                    <View style={styles.totalsLayout}>
                        <View style={styles.cardTitle}>
                            <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16}}>VAT Receipts</Text>
                        </View>
                            <View style={styles.totalsView}>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>Receipts count: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>0</Text>
                            </View>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>Receipts total: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>€0</Text>
                            </View>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>Taxback total: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>€0</Text>  
                            </View>
                        </View>
                    </View>
                    <Pressable style={styles.pressableView}>
                            <Icon
                                name='receipt'
                                size={50}
                                color={COLOR.primaryBlueHex}
                            />
                            <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>View Receipts</Text>
                    </Pressable>
                </View>
                <View style={{borderWidth: 0.5, borderColor: COLOR.borderDarkGrey}}/>
                <View style={{padding: 10}}>
                    <Pressable style={styles.submitButton}>
                        <Text style={{fontFamily: FONTFAMILY.jost_bold, color: COLOR.primaryWhiteHex, padding: SIZE.size_10}}>Generate VAT Report</Text>
                    </Pressable>
                </View>
            </View>
        }
        {medical &&
            <View style={styles.cardLayout}>
                <View style={styles.innerCardLayout}>
                    <View style={styles.totalsLayout}>
                        <View style={styles.cardTitle}>
                            <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16}}>Medical Receipts</Text>
                        </View>
                        <View style={styles.totalsView}>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>Receipts count: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>0</Text>
                            </View>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>Receipts total: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>€0</Text>
                            </View>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>Taxback total: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>€0</Text>  
                            </View>
                        </View>
                    </View>
                    <Pressable style={styles.pressableView}>
                            <Icon
                                name='receipt'
                                size={50}
                                color={COLOR.primaryBlueHex}
                            />
                            <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>View Receipts</Text>
                    </Pressable>
                </View>
                <View style={{borderWidth: 0.5, borderColor: COLOR.borderDarkGrey}}/>
                <View style={{padding: 10}}>
                    <Pressable style={styles.submitButton}>
                        <Text style={{fontFamily: FONTFAMILY.jost_bold, color: COLOR.primaryWhiteHex, padding: SIZE.size_10}}>Generate Medical Report</Text>
                    </Pressable>
                </View>
            </View>
        }
        {expenses && 
            <View style={styles.cardLayout}>
                <View style={styles.innerCardLayout}>
                    <View style={styles.totalsLayout}>
                        <View style={styles.cardTitle}>
                            <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16}}>Expenses</Text>
                        </View>
                        <View style={styles.totalsView}>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>Receipts count: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>0</Text>
                            </View>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>Receipts total: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>€0</Text>  
                            </View>
                        </View>
                    </View>
                    <Pressable style={styles.pressableView}>
                            <Icon
                                name='receipt'
                                size={50}
                                color={COLOR.primaryBlueHex}
                            />
                            <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>View Receipts</Text>
                    </Pressable>
                </View>
                <View style={{borderWidth: 0.5, borderColor: COLOR.borderDarkGrey}}/>
                <View style={{padding: 10}}>
                    <Pressable style={styles.submitButton}>
                        <Text style={{fontFamily: FONTFAMILY.jost_bold, color: COLOR.primaryWhiteHex, padding: SIZE.size_10}}>Generate Expense Report</Text>
                    </Pressable>
                </View>
            </View>} 
    </View>
  )
}

export default TaxAndExpenseCard;

const styles = StyleSheet.create({
    taxExpenseCard: {
        marginTop: SIZE.size_10,
        width: TAX_EXPENSE_CARD_WIDTH,
        padding: SIZE.size_10,
        gap: SIZE.size_50,
        backgroundColor: COLOR.secondaryLightGrey,
        borderColor: COLOR.borderDarkGrey,
        borderRadius: SIZE.size_4,
        borderWidth: SIZE.size_1,
        elevation: SIZE.size_1
    },
    cardLayout: {
        justifyContent: 'space-evenly',
        backgroundColor: COLOR.secondaryLightGrey,
        borderColor: COLOR.borderDarkGrey,
        borderRadius: SIZE.size_4,
        borderWidth: SIZE.size_1,
        elevation: SIZE.size_2
    },
    innerCardLayout: {
        marginBottom: SIZE.size_10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZE.size_5
    },
    totalsLayout: {
        width: SIZE.size_160
    },
    cardTitle:{
        marginBottom: SIZE.size_10
    },
    totalsView: {
        justifyContent: 'space-evenly',
        gap: SIZE.size_10
    },
    singleTotalsLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pressableView: {
        alignItems: 'center',
        height: SIZE.size_100,
        backgroundColor: COLOR.secondaryLightGrey,
        padding: SIZE.size_10,
        borderWidth: SIZE.size_1,
        borderRadius: SIZE.size_4,
        borderColor: COLOR.primaryBlueHex,
        justifyContent: 'space-evenly',
        elevation: SIZE.size_4
    },
    submitButton: {
        backgroundColor: COLOR.primaryBlueHex,
        alignItems: 'center',
        borderRadius: SIZE.size_4,
        elevation: SIZE.size_4
    },
    expensesCard: {}
})
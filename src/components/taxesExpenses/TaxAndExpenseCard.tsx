import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RECEIPT_LIST_VIEWER, ReceiptProps, RootStackParamsList, TO_EXPENSES_LIST, TO_MEDICAL_LIST, TO_VAT_LIST } from '../../types/types';
import { COLOR, FONTFAMILY, SIZE, TAX_EXPENSE_CARD_HEIGHT, TAX_EXPENSE_CARD_WIDTH } from '../../theme/theme';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PDFDocument, rgb, StandardFonts, } from 'pdf-lib';
import { encodeToBase64 } from 'pdf-lib';
import { writeFile, DownloadDirectoryPath } from 'react-native-fs';
import { auth, database } from '../../../firebaseconfig';
import { CompanyDetailsProps, PersonalDetailsProps } from '../../screens/Profile';
import { onValue, ref } from 'firebase/database';
import { generateAndDownloadPDF, receiptsTotal, vatTaxback } from './taxesExpensesFunctions';


interface TaxAndExpenseCardProps {
    taxes: ReceiptProps[],
    expenses: ReceiptProps[],
}

const TaxAndExpenseCard: React.FC<TaxAndExpenseCardProps> = ({
    taxes,
    expenses,
}) => {
    const [personalDetails, setPersonalDetails] = useState<PersonalDetailsProps>();
    const [companyDetails, setCompanyDetails]= useState<CompanyDetailsProps>();

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        const personalDetailsRef = ref(database, `/users/${userId}/profile/personalDetails`);
        const companyDetailsRef = ref(database, `/users/${userId}/profile/companyDetails`);
        
        onValue(personalDetailsRef, (snapshot) => {
            if(snapshot.exists()){
                setPersonalDetails(snapshot.val());
            }
        });

        onValue(companyDetailsRef, (snapshot) => {
            if(snapshot.exists()){
                setCompanyDetails(snapshot.val());
            }
        });
    }, []);

    console.log(personalDetails);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    const toReceiptListViewer = (button: number) => {
        if(button === TO_VAT_LIST){
            navigation.navigate(RECEIPT_LIST_VIEWER, {receiptList: taxes, viewerType: 'taxes'});
        }
        else if(button === TO_MEDICAL_LIST){
            navigation.navigate(RECEIPT_LIST_VIEWER, {receiptList: taxes, viewerType: ''});
        }
        else if(button === TO_EXPENSES_LIST){
            navigation.navigate(RECEIPT_LIST_VIEWER, {receiptList: expenses, viewerType: 'expenses'});
        }
    }

    let medical = false;

  return (
     <View style={styles.taxExpenseCard}>
        {taxes && 
            <View style={styles.cardLayout}>
                <View style={styles.innerCardLayout}>
                    <View style={styles.totalsLayout}>
                        <View style={styles.cardTitle}>
                            <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16}}>VAT Receipts</Text>
                        </View>
                            <View style={styles.totalsView}>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>Receipts count: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>{taxes.length}</Text>
                            </View>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>Receipts total: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>€{receiptsTotal(taxes).toFixed(2)}</Text>
                            </View>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>Taxback total: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>€{vatTaxback(taxes).toFixed(2)}</Text>  
                            </View>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => toReceiptListViewer(TO_VAT_LIST)}
                        style={styles.pressableView}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                            <Icon
                                name='receipt'
                                size={50}
                                color={COLOR.primaryBlueHex}
                            />
                            <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>View Receipts</Text>
                    </Pressable>
                </View>
                <View style={{borderWidth: 1, borderColor: COLOR.borderDarkGrey}}/>
                <View style={{padding: 10}}>
                    <Pressable
                        onPress={() => generateAndDownloadPDF(
                            taxes, 
                            personalDetails,
                            companyDetails,
                            'VAT'
                        )} 
                        style={styles.submitButton}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                            <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex}}>Generate VAT Report</Text>
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
                    <Pressable 
                        style={styles.pressableView}
                        onPress={() => {toReceiptListViewer(TO_MEDICAL_LIST)}}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                            <Icon
                                name='receipt'
                                size={50}
                                color={COLOR.primaryBlueHex}
                            />
                            <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>View Receipts</Text>
                    </Pressable>
                </View>
                <View style={{borderWidth: 1, borderColor: COLOR.borderDarkGrey}}/>
                <View style={{padding: 10}}>
                    <Pressable
                        onPress={() => generateAndDownloadPDF(
                            taxes,
                            personalDetails,
                            companyDetails,
                            'MEDICAL'
                        )} 
                        style={styles.submitButton}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                            <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex}}>Generate Medical Report</Text>
                    </Pressable>
                </View>
            </View>
        }
        {expenses.length > 0 && 
            <View style={styles.cardLayout}>
                <View style={styles.innerCardLayout}>
                    <View style={styles.totalsLayout}>
                        <View style={styles.cardTitle}>
                            <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16}}>Expenses</Text>
                        </View>
                        <View style={styles.totalsView}>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>Receipts count: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium}}>{expenses.length}</Text>
                            </View>
                            <View style={styles.singleTotalsLayout}>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>Receipts total: </Text>
                                <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>€{receiptsTotal(expenses).toFixed(2)}</Text>  
                            </View>
                        </View>
                    </View>
                    <Pressable 
                        style={styles.pressableView}
                        onPress={() => {toReceiptListViewer(TO_EXPENSES_LIST)}}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                            <Icon
                                name='receipt'
                                size={50}
                                color={COLOR.primaryBlueHex}
                            />
                            <Text style={{fontFamily: FONTFAMILY.jost_medium, color: COLOR.primaryBlueHex}}>View Receipts</Text>
                    </Pressable>
                </View>
                <View style={{borderWidth: 1, borderColor: COLOR.borderDarkGrey}}/>
                <View style={{padding: 10}}>
                    <Pressable 
                        onPress={() => generateAndDownloadPDF(
                            expenses,
                            personalDetails,
                            companyDetails,
                            'EXPENSE'
                        )}
                        style={styles.submitButton}
                        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                            <Text style={{fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex}}>Generate Expense Report</Text>
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
        gap: SIZE.size_50,
    },
    cardLayout: {
        justifyContent: 'space-evenly',
        backgroundColor: COLOR.secondaryLightGrey,
        borderColor: COLOR.borderDarkGrey,
        borderRadius: SIZE.size_4,
        borderWidth: SIZE.size_1,
        elevation: SIZE.size_1
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
        padding: SIZE.size_5,
        borderWidth: SIZE.size_1,
        borderRadius: SIZE.size_4,
        borderColor: COLOR.primaryBlueHex,
        justifyContent: 'space-evenly',
        elevation: SIZE.size_2
    },
    submitButton: {
        padding: SIZE.size_5,
        backgroundColor: COLOR.primaryBlueHex,
        alignItems: 'center',
        borderRadius: SIZE.size_4,
        elevation: SIZE.size_2
    },
    expensesCard: {}
})
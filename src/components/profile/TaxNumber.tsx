import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { TaxNumberProp } from '../../types/types'
import { COLOR, FONTFAMILY, SIZE } from '../../theme/theme'

const TaxNumber: React.FC<TaxNumberProp> = ({ onTaxNumberChange }) => {
    const [taxNumber, setTaxNumber] = useState({
        taxNumber: ''
    })

    const handleTextChange = (value: string) => {
        setTaxNumber((previousState) => ({
            ...previousState,
            taxNumber: value
        }));

        onTaxNumberChange({
            taxNumber: value,
            onTaxNumberChange: function (updatedTaxNumber: TaxNumberProp): void {
                throw new Error('onTaxNumberChange function not implemented.')
            }
        })
    }
  
    return (
    <View style={styles.container}>
        <Text style={styles.title}>TaxNumber</Text>
        <TextInput 
            style={styles.textInput}
            placeholder='Tax Number'
            placeholderTextColor={COLOR.primaryBlueHex}
            onChangeText={(text) => handleTextChange(text)}/>
    </View>
  )
}

export default TaxNumber;

const styles = StyleSheet.create({
    container: {},
    title: {
        paddingTop: SIZE.size_20,
        paddingBottom: SIZE.size_5,
        fontFamily: FONTFAMILY.jost_medium,
        fontSize: SIZE.size_20,
        color: COLOR.primaryGreyHex
    },
    textInput:{
        marginTop: SIZE.size_10,
        height: SIZE.size_40,
        borderWidth: SIZE.size_1,
        borderRadius: SIZE.size_2,
        fontFamily: FONTFAMILY.jost_light,
        paddingLeft: SIZE.size_10,
        backgroundColor: COLOR.primaryWhiteHex
    }
})
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, FONTFAMILY, SIZE } from '../../theme/theme'
import { AddressProps } from '../../types/types'

const Address:React.FC<AddressProps> = ({ onAddressChange }) => {
    const [address, setAddress] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: ''
    });
    
    //Update local state with value from TextInput at specified field within AddressProps. Then this function calls the function prop 
    //which updates the address state in the Profile component 
    const handleTextChange = (field: keyof AddressProps, value: string) => {
        setAddress((previousAddress) => ({
            ...previousAddress,
            [field]: value
        }));
    
        onAddressChange({
            ...address,
            [field]: value,
            onAddressChange: function (updatedAddress: AddressProps): void {
                throw new Error('onChangeAddress function not implemented.')
            }
        });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Address</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Address Line 1'
                placeholderTextColor={COLOR.primaryBlueHex}
                onChangeText={(text) => handleTextChange('addressLine1', text)}/>
            <TextInput
                style={styles.textInput}
                placeholder='Address Line 2'
                placeholderTextColor={COLOR.primaryBlueHex}
                onChangeText={(text) => handleTextChange('addressLine2', text)}/>
            <TextInput
                style={styles.textInput}
                placeholder='City'
                placeholderTextColor={COLOR.primaryBlueHex}
                onChangeText={(text) => handleTextChange('city', text)}/>
            <TextInput
                style={styles.textInput}
                placeholder='Country'
                placeholderTextColor={COLOR.primaryBlueHex}
                onChangeText={(text) => handleTextChange('country', text)}/>
        </View>
    )
}

export default Address;

const styles = StyleSheet.create({
    container: {},
    title: {
        paddingTop: SIZE.size_20,
        paddingBottom: SIZE.size_5,
        fontFamily: FONTFAMILY.jost_medium,
        fontSize: 20,
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
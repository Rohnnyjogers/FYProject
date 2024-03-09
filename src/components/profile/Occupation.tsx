import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { OccupationProps } from '../../types/types'
import { COLOR, FONTFAMILY, SIZE } from '../../theme/theme'

const Occupation: React.FC<OccupationProps> = ({ onOccupationChange }) => {
    const [occupation, setOccupation] = useState({
        company: '',
        role: ''
    })

    const handleTextChange = (field: keyof OccupationProps, value: string) => {
        setOccupation((previousState) => ({
            ...previousState,
            [field]: value
        }));

        onOccupationChange({
            ...occupation,
            [field]: value,
            onOccupationChange: function (updatedOccupation: OccupationProps): void {
                throw new Error('Function not implemented.')
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Occupation</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Company'
                placeholderTextColor={COLOR.primaryBlueHex}
                onChangeText={(text) => handleTextChange('company', text)}/>
            <TextInput
                style={styles.textInput}
                placeholder='Role'
                placeholderTextColor={COLOR.primaryBlueHex}
                onChangeText={(text) => handleTextChange('role', text)}/>        
        </View>
    )
}

export default Occupation;

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
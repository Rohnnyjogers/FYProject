import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { NameProp } from '../../types/types'
import { COLOR, FONTFAMILY, SIZE } from '../../theme/theme';

const Name: React.FC<NameProp> = ({ onNameChange }) => {
    const [name, setName] = useState({
        fullName: '',
    });

    const handleTextChange = (value: string) => {
        setName((previousState) => ({
            ...previousState,
            fullName: value
        }));

        onNameChange({
            fullName: value,
            onNameChange: function (updatedName: NameProp): void {
                throw new Error('Function not implemented.');
            }
        })
    }

  return (
    <View>
      <Text style={styles.title}>Name</Text>
      <TextInput 
        style={styles.textInput}
        placeholder='Full Name'
        placeholderTextColor={COLOR.primaryBlueHex}
        onChangeText={(text) => handleTextChange(text)}/>
    </View>
  )
}

export default Name;

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
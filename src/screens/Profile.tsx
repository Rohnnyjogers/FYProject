import { StyleSheet, View, Text, ScrollView, TextInput, Button } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, SIZE } from '../theme/theme'
import Header from '../components/Header'

const Profile = () => {
  return (
    <View style={styles.screenContainer}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewFlex}>
        <Header/>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.infoTitle}>Name</Text>
        <TextInput  style={styles.textInput}
                    placeholder='Full name'/>
        <Text style={styles.infoTitle}>Address</Text>
        <View style={styles.textInputGroup}>
          <TextInput  style={styles.textInput}
                      placeholder='Address Line 1'/>
          <TextInput  style={styles.textInput}
                      placeholder='Address Line 2'/>
          <TextInput  style={styles.textInput}
                      placeholder='City'/>
          <TextInput  style={styles.textInput}
                      placeholder='Country'/>
        </View>
        <Text style={styles.infoTitle}>Occupation</Text>
        <View style={styles.textInputGroup}>
          <TextInput  style={styles.textInput}
                      placeholder='Role'/>
          <TextInput  style={styles.textInput}
                      placeholder='Company'/>
        </View>
        <Text style={styles.infoTitle}>Tax number</Text>
        <TextInput  style={styles.textInput}
                      placeholder='Personal Tax Number'/>
        <View style={styles.buttonContainer}>
          <Button
            title='Clear'
            color={COLOR.secondaryLightGrey}
          />
          <Button
            title='Submit'
            color={COLOR.primaryBlueHex}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingLeft: SIZE.size_20,
    paddingRight: SIZE.size_20
  },
  scrollViewFlex: {
    
  },
  title: {
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: 25,
    color: COLOR.primaryBlueHex
  },
  infoTitle: {
    paddingTop: SIZE.size_20,
    paddingBottom: SIZE.size_10,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: 20,
    color: COLOR.primaryGreyHex
  },
  textInput: {
    height: SIZE.size_40,
    borderWidth: SIZE.size_1,
    borderRadius: SIZE.size_2,
    fontFamily: FONTFAMILY.jost_light,
    paddingLeft: SIZE.size_10
  },
  textInputGroup: {
    gap: SIZE.size_10
  },
  buttonContainer: {
    paddingTop: SIZE.size_20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SIZE.size_10
  },
})

export default Profile
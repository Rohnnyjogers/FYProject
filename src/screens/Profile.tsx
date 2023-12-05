import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, SPACING } from '../theme/theme'
import Header from '../components/Header'

const Profile = () => {
  return (
    <View style={styles.screenContainer}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewFlex}>
        <Header/>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.infoTitle}>Name and Address</Text>
        <TextInput  style={styles.textInput}
                    placeholder='Full name'/>
       <View style={styles.address}>
        <TextInput  style={styles.textInput}
                    placeholder='Address Line 1'/>
        <TextInput  style={styles.textInput}
                    placeholder='Address Line 2'/>
        <TextInput  style={styles.textInput}
                    placeholder='City'/>
        <TextInput  style={styles.textInput}
                    placeholder='Country'/>
       </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingLeft: SPACING.space_20,
    paddingRight: SPACING.space_20,
  },
  scrollViewFlex: {
    
  },
  title: {
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: 25,
    color: COLOR.primaryBlueHex,
  },
  infoTitle: {
    paddingTop: SPACING.space_20,
    paddingBottom: SPACING.space_10,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: 20,
    color: COLOR.primaryGreyHex
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    fontFamily: FONTFAMILY.jost_light,
    paddingLeft: SPACING.space_10,
  },
  address: {
    paddingVertical: SPACING.space_20,
    gap: SPACING.space_10
  }
})

export default Profile
import { StyleSheet, View, Text, ScrollView } from 'react-native'
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
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  title: {
    paddingLeft: SPACING.space_20,
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: 25,
    color: COLOR.primaryBlueHex,
  },
})

export default Profile
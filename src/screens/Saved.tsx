import { StyleSheet, View, Text, ScrollView } from 'react-native'
import React from 'react'
import { FONTFAMILY, SIZE, COLOR } from '../theme/theme'
import Header from '../components/Header'

const Saved = () => {
  return (
    <View style={styles.screenContainer}>
     <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewFlex}>
        <Header/>
        <Text style={styles.title}>Saved</Text>
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
    paddingLeft: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: 25,
    color: COLOR.primaryBlueHex,

  }
})

export default Saved
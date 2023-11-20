import { StyleSheet, View, Text, ScrollView } from 'react-native'
import React from 'react'
import { COLOR, FONTFAMILY, SPACING } from '../theme/theme'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Header from '../components/Header'

const Home = () => {
  
  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
          <Header/>
          <Text style={styles.title}>Home</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentScrollView}>
        </ScrollView>
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
  recentScrollView: {},
  title: {
    paddingLeft: SPACING.space_20,
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: 25,
    color: COLOR.primaryBlueHex,
  }
})

export default Home
import { View, Text, StyleSheet, ScrollView  } from 'react-native';
import React from 'react';
import { COLOR, FONTFAMILY, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';

const Rewards = () => {

  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
          <Header/>
          <Text style={styles.title}>Rewards</Text>
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

export default Rewards;
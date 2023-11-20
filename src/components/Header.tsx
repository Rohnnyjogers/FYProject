import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTFAMILY, SPACING } from '../theme/theme'

interface HeaderBarProps {
    headerTitle?: string,
}

const Header: React.FC<HeaderBarProps> = ({headerTitle}) => {
  return (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{headerTitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: SPACING.space_20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontFamily: FONTFAMILY.jost_regular,
        fontSize: 18,
    }
})

export default Header
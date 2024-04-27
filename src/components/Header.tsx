import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, FONTFAMILY, SIZE } from '../theme/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { auth } from '../../firebaseconfig'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/types';
import { Menu, Divider, Provider, Portal } from 'react-native-paper';

interface HeaderBarProps {
    headerTitle?: string,
}

const Header: React.FC<HeaderBarProps> = ({ headerTitle }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    const signOut = async () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you would like to sign out?',
            [
                {
                    text: 'No',
                    onPress: () => closeMenu(),
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await auth.signOut();
                            navigation.navigate('Login');
                        }
                        catch (error) {
                            console.log('Error signing out: ', error);
                        }
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.headerContainer}>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <Icon
                            name='more-vert'
                            size={28}
                            color={COLOR.primaryBlueHex}
                            onPress={openMenu}
                        />
                    }>
                    <Menu.Item onPress={signOut} title='Sign out' />
                </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: SIZE.size_10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerText: {
        fontFamily: FONTFAMILY.jost_regular,
        fontSize: 18,
    }
})

export default Header
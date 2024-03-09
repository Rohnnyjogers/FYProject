import { StyleSheet, View, Text, ScrollView, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { COLOR, FONTFAMILY, SIZE } from '../theme/theme';
import Header from '../components/Header';
import Address from '../components/profile/Address';
import { AddressProps, NameProp, OccupationProps, TaxNumberProp } from '../types/types';
import Name from '../components/profile/Name';
import Occupation from '../components/profile/Occupation';
import TaxNumber from '../components/profile/TaxNumber';
import { auth, database } from '../../firebaseconfig';
import { ref, set } from 'firebase/database';

const Profile: React.FC = () => {

  const onAddressUpdate = (updatedAddress: AddressProps) => {
    setAddress(updatedAddress);
  } 
  const onNameUpdate = (updatedName: NameProp) => {
    setName(updatedName);
  }
  const onOccupationUpdate = (updatedOccupation: OccupationProps) => {
    setOccupation(updatedOccupation);
  }
  const onTaxNumberUpdate = (updateTaxNumber: TaxNumberProp) => {
    setTaxNumber(updateTaxNumber);
  }

  const [name, setName] = useState<NameProp>({
    fullName: '',
    onNameChange: onNameUpdate
  });
  const [address, setAddress] = useState<AddressProps>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    onAddressChange: onAddressUpdate
  });
  const [occupation, setOccupation] = useState<OccupationProps>({
    company: '',
    role: '',
    onOccupationChange: onOccupationUpdate	
  });
  const [taxNumber, setTaxNumber] = useState<TaxNumberProp>({
    taxNumber: '',
    onTaxNumberChange: onTaxNumberUpdate
  });

  const addProfileToDatabse = () => {
    const userId = auth.currentUser?.uid;

    if(userId){

      const ProfileData = {
        fullName: name.fullName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        country: address.country,
        company: occupation.company,
        role: occupation.role,
        taxNumber: taxNumber.taxNumber
      }

      const dbRef = ref(database, `${userId}/profile`)

      set(dbRef, ProfileData)
      .then(() => {
        Alert.alert('Profile data saved');}
      )
      .catch((error: any) => {
        console.log('Error saving profile data', error);
        Alert.alert('Error saving profile data');
      });

    }
  }

  return (
   <>
    <Header/>
    <Text style={styles.title}>Profile</Text>
    <View style={styles.divider}/>
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <Name 
          fullName={''} 
          onNameChange={onNameUpdate}
        />
        <Address 
          addressLine1={''} 
          addressLine2={''} 
          city={''} 
          country={''}
          onAddressChange={onAddressUpdate}
        /> 
        <Occupation 
          company={''} 
          role={''} 
          onOccupationChange={onOccupationUpdate}
        />  
        <TaxNumber
          taxNumber={''}
          onTaxNumberChange={onTaxNumberUpdate}
        />
        <View style={styles.buttonContainer}>
          <Button
            title='Clear'
            color={COLOR.secondaryLightGrey}
          />
          <Button
            title='Submit'
            color={COLOR.primaryBlueHex}
            onPress={addProfileToDatabse}
          />
        </View>
      </ScrollView>
    </View>
   </>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingStart: SIZE.size_20,
    paddingEnd: SIZE.size_20,
    marginBottom: SIZE.size_20
  },
  scrollViewFlex: {
    
  },
  title: {
    paddingStart: SIZE.size_20,
    paddingEnd: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: SIZE.size_25,
    color: COLOR.primaryBlueHex
  },
  divider: {
    height: SIZE.size_1,
    backgroundColor: COLOR.primaryBlueHex
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
    paddingLeft: SIZE.size_10,
    backgroundColor: COLOR.primaryWhiteHex
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

export default Profile;
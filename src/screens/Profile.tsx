import { StyleSheet, View, Text, ScrollView, Button, Alert, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLOR, FONTFAMILY, SIZE } from '../theme/theme';
import Header from '../components/Header';
import { AddressProps, NameProp, OccupationProps, TaxNumberProp } from '../types/types';
import { auth, database } from '../../firebaseconfig';
import { get, onValue, ref, set } from 'firebase/database';

export interface PersonalDetailsProps {
  firstName: string,
  secondName: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  country: string,
  taxNumber: string
}

export interface CompanyDetailsProps {
  role: string,
  company: string,
  companyEmail: string
}

const Profile: React.FC = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsProps>();
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsProps>();

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [taxNumber, setTaxNumber] = useState('');

  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const personalRef = ref(database, `/users/${userId}/profile/personalDetails`);
    const companyRef = ref(database, `/users/${userId}/profile/companyDetails`);

    onValue(personalRef, (snapshot) => {
      if (snapshot.exists()) {
        setPersonalDetails(snapshot.val());
      }
    })

    onValue(companyRef, (snapshot) => {
      if (snapshot.exists()) {
        setCompanyDetails(snapshot.val());
      }
    })

  }, []);

  const validPersonalFields = (
    firstName: string,
    secondName: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    country: string,
    taxNumber: string
  ) => {
    return !firstName || !secondName || !addressLine1 || !addressLine2 || !city || !country || !taxNumber;
  }

  const validTaxNumber = (
    taxNumber: string
  ) => {
    return taxNumber.length !== 8 || !isNaN(Number(taxNumber.slice(-1)));
  }

  const formatAddressFields = (
    addressLine1: string,
    addressLine2: string,
    city: string,
    country: string,
  ) => {
    return `${addressLine1}\n${addressLine2}\n${city}\n${country}`
  }

  const validCompanyDetails = (
    role: string,
    company: string,
    companyEmail: string
  ) => {
    return !role || !company || !companyEmail;
  }

  const clearPersonalFields = () => {
    setFirstName('');
    setSecondName('');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setCountry('');
    setTaxNumber('');
  }

  const clearCompanyFields = () => {
    setCompany('');
    setRole('');
    setCompanyEmail('')
  }

  const addProfileToDatabse = async () => {
    let invalid = true;

    if (invalid = validPersonalFields(firstName, secondName, addressLine1, addressLine2, city, country, taxNumber)) {
      Alert.alert('Please fill out all fields in Personal Details.');
      return;
    }

    if (invalid = validTaxNumber(taxNumber)) {
      Alert.alert('Tax Number must contain 8 values and end with a letter.');
      return;
    }

    if (!invalid) {

      const profileData: PersonalDetailsProps = {
        firstName: firstName,
        secondName: secondName,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        country: country,
        taxNumber: taxNumber
      }

      const profileRef = ref(database, `/users/${userId}/profile/personalDetails`)
      try {
        await set(profileRef, profileData);
        Alert.alert('Personal Details saved successfully.');
      }
      catch (error) {
        console.log('Error setting Personal Details: ', error);
      }
    }
  }

  const addCompanyToDatabase = async () => {
    let invalid = true;

    if (invalid = validCompanyDetails(role, company, companyEmail)) {
      Alert.alert('Please fill out all fields in Company Details.');
      return;
    }

    const companyData: CompanyDetailsProps = {
      role: role,
      company: company,
      companyEmail: companyEmail
    }

    const profileRef = ref(database, `/users/${userId}/profile/companyDetails`);
    try {
      await set(profileRef, companyData);
      Alert.alert('Company Details saved succesfully.');
    } catch (error) {
      console.log('Error setting Company Details: ', error);
    }
  }

  return (
    <>
      <Header />
      <Text style={styles.title}>Profile</Text>
      <View style={styles.divider} />
      <View style={styles.screenContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}>
          {personalDetails ?
            <View style={styles.detailsView}>
              <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_20 }}>Personal Details</Text>
              <View style={{ borderWidth: 1, borderColor: COLOR.borderDarkGrey }} />
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Name: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${personalDetails.firstName} ${personalDetails.secondName}`}</Text>
              </View>
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Address: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {formatAddressFields(
                    personalDetails.addressLine1,
                    personalDetails.addressLine2,
                    personalDetails.city,
                    personalDetails.country)}</Text>
              </View>
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Tax Number: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${personalDetails.taxNumber}`}</Text>
              </View>
            </View>
            :
            <View style={styles.detailsView}>
              <Text style={styles.detailsTitle}>Personal Details</Text>
              <View style={styles.note}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold }}>Note:</Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_light }}>
                  Please fill out your Pesonal Details before generating a tax report.
                </Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={firstName}
                placeholder='First Name'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setFirstName(text)}
              />
              <TextInput
                style={styles.textInput}
                value={secondName}
                placeholder='Second Name'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setSecondName(text)}
              />
              <TextInput
                style={styles.textInput}
                value={addressLine1}
                placeholder='Address Line 1'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setAddressLine1(text)}
              />
              <TextInput
                style={styles.textInput}
                value={addressLine2}
                placeholder='Address Line 2'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setAddressLine2(text)}
              />
              <TextInput
                style={styles.textInput}
                value={city}
                placeholder='City'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setCity(text)}
              />
              <TextInput
                style={styles.textInput}
                value={country}
                placeholder='Country'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setCountry(text)}
              />
              <TextInput
                style={styles.textInput}
                value={taxNumber}
                placeholder='Tax Number'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setTaxNumber(text)}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={clearPersonalFields}
                  style={styles.clearButton}
                  android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                  <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Clear</Text>
                </Pressable>
                <Pressable
                  onPress={addProfileToDatabse}
                  style={styles.submitButton}
                  android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                  <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Submit</Text>
                </Pressable>
              </View>
            </View>
          }
          {companyDetails ?
            <View style={styles.detailsView}>
              <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_20 }}>Company Details</Text>
              <View style={{ borderWidth: 1, borderColor: COLOR.borderDarkGrey }} />
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Company: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${companyDetails.company}`}</Text>
              </View>
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Role: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${companyDetails.role}`}
                </Text>
              </View>
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Accounts Email: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${companyDetails.companyEmail}`}
                </Text>
              </View>
            </View>
            :
            <View style={styles.detailsView}>
              <Text style={styles.detailsTitle}>Company Details</Text>
              <View style={styles.note}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold }}>Note:</Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_light }}>
                  Please fill out your Company Details before generating an expense report.
                </Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={company}
                placeholder='Company Name'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setCompany(text)}
              />
              <TextInput
                style={styles.textInput}
                value={role}
                placeholder='Role'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setRole(text)}
              />
              <TextInput
                style={styles.textInput}
                value={companyEmail}
                placeholder='Accounts Email'
                keyboardType='email-address'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setCompanyEmail(text)}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={clearCompanyFields}
                  style={styles.clearButton}
                  android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                  <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Clear</Text>
                </Pressable>
                <Pressable
                  onPress={addCompanyToDatabase}
                  style={styles.submitButton}
                  android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                  <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Submit</Text>
                </Pressable>
              </View>
            </View>
          }
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
  detailsView: {
    marginTop: SIZE.size_20,
    marginBottom: SIZE.size_20,
    backgroundColor: COLOR.secondaryLightGrey,
    gap: SIZE.size_10,
    borderWidth: SIZE.size_1,
    borderColor: COLOR.borderDarkGrey,
    borderRadius: SIZE.size_2,
    padding: SIZE.size_5,
    elevation: SIZE.size_1
  },
  detailsTitle: {
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex
  },
  singleDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: SIZE.size_5,
    paddingEnd: SIZE.size_5
  },
  note: {
    padding: SIZE.size_5,
    borderWidth: SIZE.size_1,
    borderRadius: SIZE.size_4,
    borderColor: COLOR.borderDarkGrey
  },
  textInput: {
    height: SIZE.size_50,
    padding: SIZE.size_10,
    borderWidth: SIZE.size_1,
    borderColor: COLOR.borderDarkGrey,
    borderRadius: SIZE.size_2,
    fontFamily: FONTFAMILY.jost_light,
    backgroundColor: COLOR.primaryWhiteHex
  },
  buttonContainer: {
    paddingTop: SIZE.size_10,
    paddingBottom: SIZE.size_10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZE.size_10
  },
  clearButton: {
    paddingTop: SIZE.size_5,
    paddingBottom: SIZE.size_5,
    paddingStart: SIZE.size_10,
    paddingEnd: SIZE.size_10,
    backgroundColor: COLOR.borderDarkGrey,
    alignItems: 'center',
    borderRadius: SIZE.size_4,
    elevation: SIZE.size_2
  },
  submitButton: {
    paddingTop: SIZE.size_5,
    paddingBottom: SIZE.size_5,
    paddingStart: SIZE.size_10,
    paddingEnd: SIZE.size_10,
    backgroundColor: COLOR.primaryBlueHex,
    alignItems: 'center',
    borderRadius: SIZE.size_4,
    elevation: SIZE.size_2
  }
})

export default Profile;
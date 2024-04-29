import { StyleSheet, View, Text, ScrollView, Alert, TextInput, Pressable, Modal } from 'react-native';
import React, { SetStateAction, useEffect, useState } from 'react';
import { COLOR, FONTFAMILY, SIZE } from '../theme/theme';
import Header from '../components/Header';
import { auth, database } from '../../firebaseconfig';
import { onValue, ref, set } from 'firebase/database';
import {
  formatAddressFields,
  validCompanyDetails,
  validPersonalFields,
  validTaxNumber,
} from '../functions/profileFunctions';

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
  const [hasPersonalDetails, setHasPersonalDetails] = useState<PersonalDetailsProps>();
  const [hasCompanyDetails, setHasCompanyDetails] = useState<CompanyDetailsProps>();

  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsProps>({
    firstName: '',
    secondName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    taxNumber: ''
  });
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsProps>({
    role: '',
    company: '',
    companyEmail: ''
  });
  const [editedDetails, setEditedDetails] = useState<PersonalDetailsProps>({
    firstName: '',
    secondName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    taxNumber: ''
  });
  const [editedCompanyDetails, setEditedCompanyDetails] = useState<CompanyDetailsProps>({
    role: '',
    company: '',
    companyEmail: ''
  })


  const [personalModalVisible, setPersonalModalVisible] = useState(false);
  const [companyModalVisible, setCompanyModalVisible] = useState(false);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const personalRef = ref(database, `/users/${userId}/profile/personalDetails`);
    const companyRef = ref(database, `/users/${userId}/profile/companyDetails`);

    onValue(personalRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setHasPersonalDetails(snapshot.val());
      }
    })

    onValue(companyRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setHasCompanyDetails(snapshot.val());
      }
    })

  }, []);

  const addPersonalToDatabase = async (
    type: string
  ) => {
    let invalid = true;
    let details: PersonalDetailsProps = {
      firstName: '',
      secondName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      taxNumber: ''
    };
    
    if(type === 'CREATE'){
      details = personalDetails;
    }
    else if(type === 'EDIT'){
      details = editedDetails;
    }

    if (invalid = validPersonalFields(details)) {
      Alert.alert(
        'Details Missing',
        'Please fill out all fields in Personal Details.');
      return;
    }

    if (invalid = validTaxNumber(details.taxNumber)) {
      Alert.alert(
        'Tax Number Invalid',
        'Tax Number must contain 8 values and end with a letter.');
      return;
    }

    if (!invalid) {

      const profileRef = ref(database, `/users/${userId}/profile/personalDetails`)
      try {
        await set(profileRef, details);
        Alert.alert('Personal Details saved successfully.');
        if(personalModalVisible){
          closePersonalModal();
        }
        if(editedDetails){
          clearFields('EDIT')
        }
      }
      catch (error) {
        console.log('Error setting Personal Details: ', error);
      }
    }
  }

  const addCompanyToDatabase = async (
    type: string
  ) => {
    let invalid = true;
    let details: CompanyDetailsProps = {
      role: '',
      company: '',
      companyEmail: ''
    }

    if(type === 'CREATE'){
      details = companyDetails
    }
    else if(type === 'EDIT'){
      details = editedCompanyDetails
    }

    if (invalid = validCompanyDetails(details)) {
      Alert.alert('Please fill out all fields in Company Details.');
      return;
    }

    if (!invalid) {
      const profileRef = ref(database, `/users/${userId}/profile/companyDetails`);
      try {
        await set(profileRef, details);
        Alert.alert('Company Details saved succesfully.');
        if(companyModalVisible){
          closeCompanyModal();
        }
        if(editedCompanyDetails){
          clearFields('EDIT_COMPANY');
        }
      } catch (error) {
        console.log('Error setting Company Details: ', error);
      }
    }
  }

  const openPersonalModal = () => {
    setPersonalModalVisible(true);
  }

  const closePersonalModal = () => {
    setPersonalModalVisible(false);
  }

  const openCompanyModal = () => {
    setCompanyModalVisible(true);
  }

  const closeCompanyModal = () => {
    setCompanyModalVisible(false);
  }

  const clearFields = (
    type: string
  ) => {
    if (type === 'CREATE') {
      setPersonalDetails({
        firstName: '',
        secondName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        taxNumber: ''
      })
    }
    else if (type === 'EDIT') {
      setEditedDetails({
        firstName: '',
        secondName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        taxNumber: ''
      })
    }
    else if (type === 'CREATE_COMPANY') {
      setCompanyDetails({
        role: '',
        company: '',
        companyEmail: ''
      })
    }
    else if(type === 'EDIT_COMPANY'){
      setEditedCompanyDetails({
        role: '',
        company: '',
        companyEmail: ''
      })
    }
  }

  const renderPersonalModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={personalModalVisible}
        onRequestClose={closePersonalModal}>
        <View style={styles.modalCard}>
          <View style={styles.modalContent}>
            <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_20 }}>Edit Personal Details</Text>
            <TextInput
              style={styles.textInput}
              placeholder='First Name'
              value={editedDetails.firstName}
              onChangeText={(text) => setEditedDetails(prev => ({
                ...prev,
                firstName: text
              }))}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Second Name'
              value={editedDetails.secondName}
              onChangeText={(text) => setEditedDetails(prev => ({
                ...prev,
                secondName: text
              }))}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Address Line 1'
              value={editedDetails.addressLine1}
              onChangeText={(text) => setEditedDetails(prev => ({
                ...prev,
                addressLine1: text
              }))}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Address Line 2'
              value={editedDetails.addressLine2}
              onChangeText={(text) => setEditedDetails(prev => ({
                ...prev,
                addressLine2: text
              }))}
            />
            <TextInput
              style={styles.textInput}
              placeholder='City'
              value={editedDetails.city}
              onChangeText={(text) => setEditedDetails(prev => ({
                ...prev,
                city: text
              }))}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Country'
              value={editedDetails.country}
              onChangeText={(text) => setEditedDetails(prev => ({
                ...prev,
                country: text
              }))}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Tax Number'
              value={editedDetails.taxNumber}
              onChangeText={(text) => setEditedDetails(prev => ({
                ...prev,
                taxNumber: text
              }))}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={() => addPersonalToDatabase('EDIT')}
                style={styles.modalButton}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Save</Text>
              </Pressable>
              <Pressable
                onPress={() => clearFields('EDIT')}
                style={styles.modalButton}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Clear</Text>
              </Pressable>
              <Pressable
                onPress={closePersonalModal}
                style={styles.modalButton}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  const renderCompanyModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={companyModalVisible}
        onRequestClose={closeCompanyModal}>
        <View style={styles.modalCard}>
          <View style={styles.modalContent}>
            <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_20 }}>Edit Company Details</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Company'
              value={editedCompanyDetails.company}
              onChangeText={(text) => setEditedCompanyDetails(prev => ({
                ...prev,
                company: text
              }))}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Role'
              value={editedCompanyDetails.role}
              onChangeText={(text) => setEditedCompanyDetails(prev => ({
                ...prev,
                role: text
              }))}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Accounts Email'
              value={editedCompanyDetails.companyEmail}
              onChangeText={(text) => setEditedCompanyDetails(prev => ({
                ...prev,
                companyEmail: text
              }))}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={() => addCompanyToDatabase('EDIT')}
                style={styles.modalButton}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Save</Text>
              </Pressable>
              <Pressable
                onPress={() => clearFields('EDIT_COMPANY')}
                style={styles.modalButton}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Clear</Text>
              </Pressable>
              <Pressable
                onPress={closeCompanyModal}
                style={styles.modalButton}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    )
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
          {hasPersonalDetails ?
            <View style={styles.detailsView}>
              <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_20 }}>Personal Details</Text>
              <View style={{ borderWidth: 1, borderColor: COLOR.borderDarkGrey }} />
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Name: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${hasPersonalDetails.firstName} ${hasPersonalDetails.secondName}`}</Text>
              </View>
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Address: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {formatAddressFields(hasPersonalDetails)}</Text>
              </View>
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Tax Number: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${hasPersonalDetails.taxNumber}`}</Text>
              </View>
              <Pressable
                onPress={openPersonalModal}
                style={styles.submitButton}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Edit</Text>
              </Pressable>
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
                value={personalDetails.firstName}
                placeholder='First Name'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setPersonalDetails(prev => ({
                  ...prev,
                  firstName: text
                }))}
              />
              <TextInput
                style={styles.textInput}
                value={personalDetails.secondName}
                placeholder='Second Name'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setPersonalDetails(prev => ({
                  ...prev,
                  secondName: text
                }))}
              />
              <TextInput
                style={styles.textInput}
                value={personalDetails.addressLine1}
                placeholder='Address Line 1'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setPersonalDetails(prev => ({
                  ...prev,
                  addressLine1: text
                }))}
              />
              <TextInput
                style={styles.textInput}
                value={personalDetails.addressLine2}
                placeholder='Address Line 2'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setPersonalDetails(prev => ({
                  ...prev,
                  addressLine2: text
                }))}
              />
              <TextInput
                style={styles.textInput}
                value={personalDetails.city}
                placeholder='City'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setPersonalDetails(prev => ({
                  ...prev,
                  city: text
                }))}
              />
              <TextInput
                style={styles.textInput}
                value={personalDetails.country}
                placeholder='Country'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setPersonalDetails(prev => ({
                  ...prev,
                  country: text
                }))}
              />
              <TextInput
                style={styles.textInput}
                value={personalDetails.taxNumber}
                placeholder='Tax Number'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setPersonalDetails(prev => ({
                  ...prev,
                  taxNumber: text
                }))}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => clearFields('CREATE')}
                  style={styles.clearButton}
                  android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                  <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Clear</Text>
                </Pressable>
                <Pressable
                  onPress={() => addPersonalToDatabase('CREATE')}
                  style={styles.submitButton}
                  android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                  <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Submit</Text>
                </Pressable>
              </View>
            </View>
          }
          {hasCompanyDetails ?
            <View style={styles.detailsView}>
              <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_20 }}>Company Details</Text>
              <View style={{ borderWidth: 1, borderColor: COLOR.borderDarkGrey }} />
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Company: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${hasCompanyDetails.company}`}</Text>
              </View>
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Role: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${hasCompanyDetails.role}`}
                </Text>
              </View>
              <View style={styles.singleDetail}>
                <Text style={{ fontFamily: FONTFAMILY.jost_semibold, color: COLOR.primaryGreyHex, fontSize: SIZE.size_16 }}>Accounts Email: </Text>
                <Text style={{ fontFamily: FONTFAMILY.jost_regular, color: COLOR.primaryGreyHex, fontSize: SIZE.size_14 }}>
                  {`${hasCompanyDetails.companyEmail}`}
                </Text>
              </View>
              <Pressable
                onPress={openCompanyModal}
                style={styles.submitButton}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Edit</Text>
              </Pressable>
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
                value={companyDetails.company}
                placeholder='Company Name'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setCompanyDetails(prev => ({
                  ...prev,
                  company: text
                }))}
              />
              <TextInput
                style={styles.textInput}
                value={companyDetails.role}
                placeholder='Role'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setCompanyDetails(prev => ({
                  ...prev,
                  role: text
                }))}
              />
              <TextInput
                style={styles.textInput}
                value={companyDetails.companyEmail}
                placeholder='Accounts Email'
                keyboardType='email-address'
                placeholderTextColor={COLOR.primaryGreyHex}
                onChangeText={(text) => setCompanyDetails(prev => ({
                  ...prev,
                  companyEmail: text
                }))}
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => clearFields('CREATE_COMPANY')}
                  style={styles.clearButton}
                  android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                  <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Clear</Text>
                </Pressable>
                <Pressable
                  onPress={() => addCompanyToDatabase('CREATE')}
                  style={styles.submitButton}
                  android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                  <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Submit</Text>
                </Pressable>
              </View>
            </View>
          }
        </ScrollView>
        {personalModalVisible && renderPersonalModal()}
        {companyModalVisible && renderCompanyModal()}
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
  },
  modalButton: {
    paddingTop: SIZE.size_5,
    paddingBottom: SIZE.size_5,
    paddingStart: SIZE.size_10,
    paddingEnd: SIZE.size_10,
    backgroundColor: COLOR.primaryBlueHex,
    borderRadius: SIZE.size_4,
    elevation: SIZE.size_2
  },
  modalCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 1,
    backgroundColor: COLOR.secondaryLightGrey,
    paddingStart: SIZE.size_10,
    paddingEnd: SIZE.size_10,
    paddingTop: SIZE.size_30,
    paddingBottom: SIZE.size_30,
    width: '90%',
    gap: SIZE.size_10,
    borderRadius: SIZE.size_5,
    borderWidth: SIZE.size_1,
    borderColor: COLOR.borderDarkGrey,
  }
})

export default Profile;
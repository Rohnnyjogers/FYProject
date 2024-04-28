import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { CompanyDetailsProps, PersonalDetailsProps } from "../screens/Profile"
import { TextInput } from "react-native-paper"
import React, { SetStateAction, useState } from "react"
import { COLOR, FONTFAMILY, SIZE } from "../theme/theme"
import { ref, set } from "firebase/database"
import { database } from "../../firebaseconfig"


export const validPersonalFields = (
    details: PersonalDetailsProps
) => {
    const {
        firstName,
        secondName,
        addressLine1,
        addressLine2,
        city,
        country,
        taxNumber } = details;
    return !firstName || !secondName || !addressLine1 || !addressLine2 || !city || !country || !taxNumber;
}

export const validTaxNumber = (
    taxNumber: string
) => {
    return taxNumber.length !== 8 || !isNaN(Number(taxNumber.slice(-1)));
}

export const formatAddressFields = (
    details: PersonalDetailsProps
) => {
    const { addressLine1, addressLine2, city, country } = details;

    return `${addressLine1}\n${addressLine2}\n${city}\n${country}`;
}

export const validCompanyDetails = (
    details: CompanyDetailsProps
) => {
    const { role, company, companyEmail } = details;

    return !role || !company || !companyEmail;
}


export const savePersonalChanges = async (
    userId: string | undefined,
    editedDetails: PersonalDetailsProps
) => {
    const dbRef = ref(database, `/users/${userId}/profile/personalDetails`)
    try {
        await set(dbRef, editedDetails);
        Alert.alert(
            'Edit Personal Details',
            'Your changes have been saved successfully.'
        );
    }
    catch (error) {
        console.log('Error updating personal details: ', error)
    }
}

// export const renderPersonalModal = (
//     userId: string | undefined,
//     visible: boolean,
//     onClose: () => void,
//     personalDetails: PersonalDetailsProps
// ) => {
//     const [editedDetails, setEditedDetails] = useState<PersonalDetailsProps>({
//         firstName: personalDetails.firstName,
//         secondName: personalDetails.secondName,
//         addressLine1: personalDetails.addressLine1,
//         addressLine2: personalDetails.addressLine2,
//         city: personalDetails.city,
//         country: personalDetails.country,
//         taxNumber: personalDetails.taxNumber
//     });

    

//     return (
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={visible}
//             onRequestClose={onClose}>
//             <View style={styles.modalCard}>
//                 <View style={styles.modalContent}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder={personalDetails.firstName}
//                         value={personalDetails.firstName}
//                         onChangeText={(text) => setEditedDetails({ ...editedDetails, firstName: text })}
//                     />
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder={personalDetails.secondName}
//                         value={personalDetails.secondName}
//                         onChangeText={(text) => setEditedDetails({ ...editedDetails, secondName: text })}
//                     />
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder={personalDetails.addressLine1}
//                         value={personalDetails.addressLine1}
//                         onChangeText={(text) => setEditedDetails({ ...editedDetails, addressLine1: text })}
//                     />
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder={personalDetails.addressLine2}
//                         value={personalDetails.addressLine2}
//                         onChangeText={(text) => setEditedDetails({ ...editedDetails, addressLine2: text })}
//                     />
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder={personalDetails.city}
//                         value={personalDetails.city}
//                         onChangeText={(text) => setEditedDetails({ ...editedDetails, city: text })}
//                     />
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder={personalDetails.country}
//                         value={personalDetails.country}
//                         onChangeText={(text) => setEditedDetails({ ...editedDetails, country: text })}
//                     />
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder={personalDetails.taxNumber}
//                         value={personalDetails.taxNumber}
//                         onChangeText={(text) => setEditedDetails({ ...editedDetails, taxNumber: text })}
//                     />
//                     <View style={styles.buttonContainer}>
//                         <Pressable
//                             onPress={saveChanges}
//                             // style={styles.submitButton}
//                             android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
//                             <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Save</Text>
//                         </Pressable>
//                         <Pressable
//                             onPress={() => clearPersonalFields(setEditedDetails)}
//                             // style={styles.submitButton}
//                             android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
//                             <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Clear</Text>
//                         </Pressable>
//                         <Pressable
//                             onPress={onClose}
//                             // style={styles.submitButton}
//                             android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
//                             <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Cancel</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     )
// }

const styles = StyleSheet.create({
    modalCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.secondaryLightGrey
    },
    modalContent: {
        backgroundColor: COLOR.primaryWhiteHex,
        paddingStart: SIZE.size_100,
        paddingEnd: SIZE.size_100,
        paddingTop: SIZE.size_30,
        paddingBottom: SIZE.size_30,
        gap: SIZE.size_40,
        borderRadius: SIZE.size_10,
        borderWidth: SIZE.size_1,
        borderColor: COLOR.borderDarkGrey,
        alignItems: 'center'
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
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
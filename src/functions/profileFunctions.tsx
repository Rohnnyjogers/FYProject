import { CompanyDetailsProps, PersonalDetailsProps } from "../screens/Profile"

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

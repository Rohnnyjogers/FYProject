export const ADD_TO_SAVED_AND_TAX = 'ADD_TO_SAVED_AND_TAX';
export const REMOVE_FROM_SAVED = 'REMOVE_FROM_SAVED';
export const REMOVE_FROM_TAX = 'REMOVE_FROM_TAX';
export const NAV_ERROR = 'NAV_ERROR';

export const ADD_TO_SAVED_BTN = 0;
export const ADD_TO_TAX_BTN = 1;
export const REMOVE_FROM_SAVED_BTN = 2;
export const REMOVE_FROM_TAX_BTN = 3;

type Item = {
    quantity: number;
    description: string;
    price: number;
}

export type ReceiptProps = {
    receiptId: number;
    vendorId: number;
    vendorLat: number;
    vendorLong: number;
    vendorName: string;
    items: Item[];
    priceTotal: number;
    itemTotal: number;
} & ({viewerType?: never} | {viewerType: string});

export type ViewerScreen = 
    typeof ADD_TO_SAVED_AND_TAX | 
    typeof REMOVE_FROM_SAVED | 
    typeof REMOVE_FROM_TAX |
    typeof NAV_ERROR; 

export type RootStackParamsList = {
    Home: undefined;
    Saved: undefined;
    Rewards: undefined;
    Profile: undefined;
    ADD_TO_SAVED_AND_TAX: {
        receiptId: number;
        vendorId: number;
        vendorLat: number;
        vendorLong: number;
        vendorName: string;
        items: Item[];
        priceTotal: number;
        itemTotal: number;
        viewerType: string | undefined;
    },
    REMOVE_FROM_SAVED: {
        receiptId: number;
        vendorId: number;
        vendorLat: number;
        vendorLong: number;
        vendorName: string;
        items: Item[];
        priceTotal: number;
        itemTotal: number;
        viewerType: string | undefined;
    },
    REMOVE_FROM_TAX: {
        receiptId: number;
        vendorId: number;
        vendorLat: number;
        vendorLong: number;
        vendorName: string;
        items: Item[];
        priceTotal: number;
        itemTotal: number;
        viewerType: string | undefined;
    }
    NAV_ERROR: {
        receiptId: number;
        vendorId: number;
        vendorLat: number;
        vendorLong: number;
        vendorName: string;
        items: Item[];
        priceTotal: number;
        itemTotal: number;
        viewerType: string | undefined;
    }
}

export type UIReceiptProps = {
    receiptId: number;
    vendorName: string;
    items: Item[];
    itemTotal: number;
    priceTotal: number;
}

export type NameProp = {
    fullName: string;
    onNameChange: (updatedName: NameProp) => void;
}

export type AddressProps = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    onAddressChange: (updatedAddress: AddressProps) => void;
}

export type OccupationProps = {
    company: string;
    role: string;
    onOccupationChange: (updatedOccupation: OccupationProps) => void;
}

export type TaxNumberProp = {
    taxNumber: string;
    onTaxNumberChange: (updatedTaxNumber: TaxNumberProp) => void;
}

export const ADD_TO_SAVED_TAX_EXPENSE = 'ADD_TO_SAVED_TAX_EXPENSE';
export const REMOVE_FROM_SAVED = 'REMOVE_FROM_SAVED';
export const REMOVE_FROM_TAX = 'REMOVE_FROM_TAX';
export const NAV_ERROR = 'NAV_ERROR';
export const RECEIPT_LIST_VIEWER = 'RECEIPT_LIST_VIEWER';

export const ADD_TO_SAVED_BTN = 0;
export const ADD_TO_TAX_BTN = 1;
export const ADD_TO_EXPENSE_BTN = 2;
export const REMOVE_FROM_SAVED_BTN = 3;
export const REMOVE_FROM_TAX_BTN = 4;

export const TO_VAT_LIST = 0;
export const TO_MEDICAL_LIST = 1;
export const TO_EXPENSES_LIST = 2;


type Item = {
    quantity: number;
    description: string;
    price: number;
}

export type ReceiptProps = {
    receiptId: number;
    vendorId: string;
    receiptDate: Date;
    vendorName: string;
    latitude: number;
    longitude: number;
    items: Item[];
    itemsTotal: number;
    priceTotal: number;
    taxType: string;
    vendorType: string;
} & ({ viewerType?: never } | { viewerType: string });

export type Reward = {
    active: boolean;
    rewardId: number;
    vendor: string;
    vendorId: string;
    item: string;
    size: number;
    progress: number;
    claimed: boolean;
    complete: boolean;
}

export type ViewerScreen =
    typeof ADD_TO_SAVED_TAX_EXPENSE |
    typeof REMOVE_FROM_SAVED |
    typeof REMOVE_FROM_TAX |
    typeof NAV_ERROR;

export type RootStackParamsList = {
    Home: undefined;
    Saved: undefined;
    Rewards: undefined;
    Profile: undefined;
    Login: undefined;
    ADD_TO_SAVED_TAX_EXPENSE: {
        receiptId: number;
        vendorId: string;
        receiptDate: Date;
        vendorName: string;
        latitude: number;
        longitude: number;
        items: Item[];
        itemsTotal: number;
        priceTotal: number;
        taxType: string;
        vendorType: string;
        viewerType: string | undefined;
    },
    REMOVE_FROM_SAVED: {
        receiptId: number;
        vendorId: string;
        receiptDate: Date;
        vendorName: string;
        latitude: number;
        longitude: number;
        items: Item[];
        itemsTotal: number;
        priceTotal: number;
        taxType: string;
        vendorType: string;
        viewerType: string | undefined;
    },
    REMOVE_FROM_TAX: {
        receiptId: number;
        vendorId: string;
        receiptDate: Date;
        vendorName: string;
        latitude: number;
        longitude: number;
        items: Item[];
        itemsTotal: number;
        priceTotal: number;
        taxType: string;
        vendorType: string;
        viewerType: string | undefined;
    }
    NAV_ERROR: {
        receiptId: number;
        vendorId: string;
        receiptDate: Date;
        vendorName: string;
        latitude: number;
        longitude: number;
        items: Item[];
        itemsTotal: number;
        priceTotal: number;
        taxType: string;
        vendorType: string;
        viewerType: string | undefined;
    },
    RECEIPT_LIST_VIEWER: {
        receiptList: ReceiptProps[];
        viewerType: string;
    },
}

export type UIReceiptProps = {
    receiptId: number;
    vendorName: string;
    items: Item[];
    itemTotal: number;
    priceTotal: number;
}

export type PurchaseProps = {
    quantity: number;
    rewardable: boolean;
    activeReward: boolean;
    rewardCount: number | null;
    nextRewardPhase: boolean;
    nextRewardCount: number;
    totalCompleteRewards: number;
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

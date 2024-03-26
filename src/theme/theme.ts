import { Dimensions } from "react-native";

export const RECEIPT_CARD_WIDTH = Dimensions.get('window').width*0.4;
export const RECEIPT_CARD_HEIGHT = Dimensions.get('window').width*0.65;
export const COMPACT_RECEIPT_WIDTH = Dimensions.get('window').width*0.35;
export const COMPACT_RECEIPT_HEIGHT = Dimensions.get('window').width*0.45;
export const FULL_RECEIPT_WIDTH = Dimensions.get('window').width*0.75;
export const FULL_RECEIPT_HEIGHT =  Dimensions.get('window').height*0.65;
export const REWARDS_CARD_WIDTH = Dimensions.get('window').width*0.895;
export const REWARDS_CARD_HEIGHT = Dimensions.get('window').height*0.15;
export const COMPACT_ITEMS_CONTAINER_HEIGHT = Dimensions.get('window').height*0.08;
export const FULL_ITEMS_CONTAINER_HEIGHT = Dimensions.get('window').height*0.35;
export const MAP_CARD_WIDTH = Dimensions.get('window').width*0.9;
export const MAP_CARD_HEIGHT = Dimensions.get('window').height*0.35;
export const MAP_WIDTH = Dimensions.get('window').width*0.85;
export const MAP_HEIGHT = Dimensions.get('window').height*0.25;

interface Size {
    size_1: number;
    size_2: number;
    size_3: number;
    size_4: number;
    size_5: number;
    size_6: number;
    size_7: number;
    size_8: number;
    size_9: number;
    size_10: number;
    size_12: number;
    size_14: number;
    size_15: number;
    size_16: number;
    size_18: number;
    size_20: number;
    size_22: number;
    size_24: number;
    size_25: number;
    size_26: number;
    size_28: number;
    size_30: number;
    size_35: number;
    size_40: number;
    size_45: number;
    size_50: number;
    size_55: number;
    size_60: number;
};

export const SIZE: Size = {
    size_1: 1,
    size_2: 2,
    size_3: 3,
    size_4: 4,
    size_5: 5,
    size_6: 6,
    size_7: 7,
    size_8: 8,
    size_9: 9,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_15: 15,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_22: 22,
    size_24: 24,
    size_25: 25,
    size_26: 26,
    size_28: 28,
    size_30: 30,
    size_35: 35,
    size_40: 40,
    size_45: 45,
    size_50: 50,
    size_55: 55,
    size_60: 60,
};

interface FontFamily {
    jost_black: string;
    jost_blackitalic: string;
    jost_bold: string;
    jost_bolditalic: string;
    jost_extrabold: string;
    jost_extrabolditalic: string;
    jost_extralight: string;
    jost_extralightitalic: string;
    jost_italic: string;
    jost_light: string;
    jost_lightitalic: string;
    jost_medium: string;
    jost_mediumitalic: string;
    jost_regular: string;
    jost_semibold: string;
    jost_semibolditalic: string;
    jost_thin: string;
    jost_thinitalic: string;
    IBMPlexMono_Bold: string;
    IBMPlexMono_BoldItalic: string;
    IBMPlexMono_ExtraLight: string;
    IBMPlexMono_ExtraLightItalic: string;
    IBMPlexMono_Italic: string;
    IBMPlexMono_Light: string;
    IBMPlexMono_LightItalic: string;
    IBMPlexMono_Medium: string;
    IBMPlexMono_MediumItalic: string;
    IBMPlexMono_Regular: string;
    IBMPlexMono_SemiBold: string;
    IBMPlexMono_SemiBoldItalic: string;
    IBMPlexMono_Thin: string;
    IBMPlexMono_ThinItalic: string;
    
    
};

export const FONTFAMILY: FontFamily = {
    jost_black: 'Jost-Black',
    jost_blackitalic: 'Jost-BlackItalic',
    jost_bold: 'Jost-Bold',
    jost_bolditalic: 'Jost-BoldItalic',
    jost_extrabold: 'Jost-ExtraBold',
    jost_extrabolditalic: 'Jost-ExtraBoldItalic',
    jost_extralight: 'Jost-ExtraLight',
    jost_extralightitalic: 'Jost-ExtraLightItalic',
    jost_italic: 'Jost-Italic',
    jost_light: 'Jost-Light',
    jost_lightitalic: 'Jost-LightItalic',
    jost_medium: 'Jost-Medium',
    jost_mediumitalic: 'Jost-MediumItalic',
    jost_regular: 'Jost-Regular',
    jost_semibold: 'Jost-SemiBold',
    jost_semibolditalic: 'Jost-SemiBoldItalic',
    jost_thin: 'Jost-Thin',
    jost_thinitalic: 'Jost-ThinItalic',
    IBMPlexMono_Bold: 'IBMPlexMono-Bold',
    IBMPlexMono_BoldItalic: 'IBMPlexMono-BoldItalic',
    IBMPlexMono_ExtraLight: 'IBMPlexMono-ExtraLight',
    IBMPlexMono_ExtraLightItalic: 'IBMPlexMono-ExtraLightItalic',
    IBMPlexMono_Italic: 'IBMPlexMono-Italic',
    IBMPlexMono_Light: 'IBMPlexMono-Light',
    IBMPlexMono_LightItalic: 'IBMPlexMono-LightItalic',
    IBMPlexMono_Medium: 'IBMPlexMono-Medium',
    IBMPlexMono_MediumItalic: 'IBMPlexMono-MediumItalic',
    IBMPlexMono_Regular: 'IBMPlexMono-Regular',
    IBMPlexMono_SemiBold: 'IBMPlexMono-SemiBold',
    IBMPlexMono_SemiBoldItalic: 'IBMPlexMono-SemiBoldItalic',
    IBMPlexMono_Thin: 'IBMPlexMono-Thin',
    IBMPlexMono_ThinItalic: 'IBMPlexMono-ThinItalic',
};

interface Color {
    primaryBlueHex: string;
    primaryWhiteHex: string;
    primaryBlackHex: string;
    primaryGreyHex: string;
    borderDarkGrey: string;
    borderDarkBlue: string;
    secondaryLightGrey: string;
    stampLightGrey: string;
};

export const COLOR: Color = {
    primaryBlueHex: '#4682B4',
    primaryWhiteHex: '#FBFCFC',
    primaryBlackHex: '#343434',
    primaryGreyHex: '#494d4f',
    borderDarkGrey: '#D7DBDD',
    borderDarkBlue: '#325D81',
    secondaryLightGrey: '#E5E7E9',
    stampLightGrey: '#F3F3F3'
};

type Item = {
    quantity: number;
    description: string;
    price: number;
}

export type ReceiptProps = {
    id: String;
    items: Item[];
    location: String;
    priceTotal: number;
    itemTotal: number;
    index: number;
}

export type RootStackParamsList = {
    ReceiptViewer:{
        id: String;
        items: Item[];
        location: String;
        priceTotal: number;
        itemTotal: number;
        index: number;
    },
}
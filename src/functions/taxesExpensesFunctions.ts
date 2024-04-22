import { PDFDocument, StandardFonts, encodeToBase64, rgb } from "pdf-lib";
import { CompanyDetailsProps, PersonalDetailsProps } from "../screens/Profile";
import { ReceiptProps } from "../types/types";
import { Alert } from "react-native";
import { DownloadDirectoryPath, writeFile } from "react-native-fs";

export const receiptsTotal = (taxesArr: ReceiptProps[]) => {
    const total = taxesArr.reduce((acc, itm) => {
        return acc + itm.priceTotal; 
    }, 0);

    return total;
}

export const vatTaxback = (taxesArr: ReceiptProps[]) => {
    const vatTaxback = taxesArr.reduce((acc, itm) => {
        return acc + itm.priceTotal * 0.135;
    }, 0);
    
    return vatTaxback;
}

export const medicalTaxback = (taxesArr: ReceiptProps[]) => {
    const medicalTaxback = taxesArr.reduce((acc, itm) => {
        return acc + itm.priceTotal * 0.2;
    }, 0);
    
    return medicalTaxback;
}


export const generateAndDownloadPDF = async(
    receipts: ReceiptProps[],
    personalState: PersonalDetailsProps | undefined,
    companyState: CompanyDetailsProps | undefined,
    pdfType: string
) => {
    const pdfDocument  = await PDFDocument.create();
    const page = pdfDocument.addPage([600,850]);
    const courierFont = await pdfDocument.embedFont(StandardFonts.Courier);
    const reportTotal = receiptsTotal(receipts);
    let taxbackTotal = 0;
    let reportType = '';
    const reportDate = new Date();
    const reportDateStr = `${reportDate.getDate()}${reportDate.getMonth()}${reportDate.getFullYear()}${reportDate.getHours()}${String(reportDate.getMinutes()).padStart(2,'0')}${reportDate.getSeconds()}`;

    if(pdfType === 'VAT' && !personalState){
        Alert.alert('Fill out Personal Details before generating a report.');
        return;
    }

    if(pdfType === 'MEDICAL' && !personalState){
        Alert.alert('Fill out Personal Details before generating a report.');
    }

    if(pdfType === 'EXPENSE' && !companyState){
        Alert.alert('Fill out Company Details before generating a report.');
        return;
    }

    if(pdfType === 'VAT'){
        taxbackTotal = vatTaxback(receipts);
        reportType = 'VAT'
    }
    else if(pdfType === 'MEDICAL'){
        taxbackTotal = medicalTaxback(receipts);
        reportType = 'Medical'
    }
    else{
        reportType = 'Expense'
    }

    page.setFont(courierFont);
    page.setFontSize(12);

    const reportTitle = `${reportType} Receipt Report`;
    const titleWidth = courierFont.widthOfTextAtSize(reportTitle, 16);
    const titleX = (600 - titleWidth)/2;
    const titleY = 800;
    page.drawText((reportTitle),{
        x: titleX,
        y: titleY,
        size: 12,
        color: rgb(0,0,0),
        font: courierFont
    })

    let y = titleY - 40;

    receipts.forEach((receipt, index) => {
        const rawDate = new Date(receipt.receiptDate);
        const dateString = `${rawDate.getDate()}/${rawDate.getMonth()}/${rawDate.getFullYear()} ${rawDate.getHours()}:${String(rawDate.getMinutes()).padStart(2,'0')}`;
        const receiptInfoText = `${index+1} ${receipt.vendorName.replace(/_/g, ' ')} ${dateString}`;

        page.drawText(receiptInfoText ,{
            x: 50,
            y,
            size: 12,
            color: rgb(0,0,0)
        });

        y -= 20;

        page.drawText('    Items:',{
            x: 50,
            y,
            size: 12,
            font: courierFont
        });

        y -= 20;

        receipt.items.forEach((item) => {
            const itemText = `    ${item.quantity} x ${item.description}  ${item.price.toFixed(2)}`;
            page.drawText(itemText, {
                x: 50,
                y,
                size: 12,
                color: rgb(0,0,0,)
            });

            y -= 20;
        }); 
        const totalText = `    Total: €${receipt.priceTotal.toFixed(2)}`;
        page.drawText(totalText, {
            x: 50,
            y,
            size: 12,
            color: rgb(0,0,0)
        })

        y -= 20
    });

    y -= 20;

    if(pdfType === 'VAT'){
        const vatTaxback = `Total VAT return: €${taxbackTotal.toFixed(2)}`;
        page.drawText(vatTaxback, {
            x: 50,
            y,
            size: 12,
            color: rgb(0,0,0)
        });
    }
    else if(pdfType === 'MEDICAL'){
        const medicalTaxback = `Total Medical tax return: €${taxbackTotal.toFixed(2)}`;
        page.drawText(medicalTaxback, {
            x: 50,
            y,
            size: 12,
            color: rgb(0,0,0)
        });
    }

    y -= 20
    const total = `Report total: €${reportTotal.toFixed(2)}`
    page.drawText(total, {
        x: 50,
        y,
        size: 12,
        color: rgb(0,0,0)
    });

    const pdfBytes = await pdfDocument.save();
    const base64String = encodeToBase64(pdfBytes);

    const filePath = `${DownloadDirectoryPath}/${reportType}_ReceiptReport_${reportDateStr}.pdf`;
    try{
        await writeFile(filePath, base64String, 'base64');
        Alert.alert('Receipt report generated. Please find in Downloads.');
        return filePath;
    }
    catch(error){
        console.log('Error saving PDF file: ', error);
        return null;
    }
}
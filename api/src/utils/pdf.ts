import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Quoter } from '../entities';
import path from 'path';
import fs from 'fs';

export const createPdfWithTable = async (quoter: Quoter, data: string[][]) => {
    const pdfDoc = await PDFDocument.create();
    const y = 1000;
    const x = 700;
    const page = pdfDoc.addPage([x, y]); // Tamaño A4 en puntos
    const TimesRomanBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const TimesRoman = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const imageBytes = await fs.readFileSync(path.join(__dirname, '../assets/header-cotizacion.png'));
    const header = await pdfDoc.embedPng(imageBytes);

    page.drawImage(header, {
        x: 0,
        y: y - 45,
        width: 700,
        height: (header.height / header.width) * 700
    });

    // fecha
    page.drawText('miércoles, 8 de mayo de 2024', {
        x: x - 190,
        y: y - 180,
        size: 12,
        color: rgb(0, 0, 0),
        font: TimesRoman
    });

    page.drawText('Estimado', {
        x: 60,
        y: y - 230,
        size: 12,
        font: TimesRoman,
        color: rgb(0, 0, 0)
    });

    page.drawText(quoter.cliente?.cliente ?? '', {
        x: 60,
        y: y - 250,
        size: 12,
        font: TimesRomanBold,
        color: rgb(0, 0, 0)
    });

    page.drawText('Presente', {
        x: 60,
        y: y - 270,
        size: 12,
        font: TimesRoman,
        color: rgb(0, 0, 0)
    });

    page.drawText('COTIZACIÓN VEHICULOS', {
        x: 250,
        y: y - 350,
        size: 18,
        font: TimesRomanBold,
        color: rgb(0, 0, 0)
    });

    page.drawText('TRANSPORTE VÍA TERRESTRE', {
        x: 225,
        y: y - 375,
        size: 18,
        font: TimesRomanBold,
        color: rgb(0, 0, 0)
    });

    page.drawText(`Vehiculo: ${quoter.anio} ${quoter.marca} ${quoter.modelo}`, {
        x: 60,
        y: y - 410,
        size: 12,
        font: TimesRoman,
        color: rgb(0, 0, 0)
    });

    page.drawText(`Ubicación de vehiculos: `, {
        x: 60,
        y: y - 430,
        size: 12,
        font: TimesRoman,
        color: rgb(0, 0, 0)
    });

    const imageFooterBytes = await fs.readFileSync(path.join(__dirname, '../assets/footer-cotizacion.png'));
    const footer = await pdfDoc.embedPng(imageFooterBytes);

    page.drawImage(footer, {
        x: 0,
        y: 30,
        width: 700,
        height: (footer.height / footer.width) * 700
    });

    // Configuración de la tabla
    const startX = 60;
    const startY = 550;
    const conceptColumnWidth = 350; // Ancho de la columna "Concepto"
    const valueColumnWidth = 150; // Ancho de la columna "Valor"
    const cellHeight = 30;

    // Dibujar las líneas de la tabla y ajustar el ancho de cada columna
    for (let rowIndex = 0; rowIndex <= data.length; rowIndex++) {
        page.drawLine({
            start: { x: startX, y: startY - rowIndex * cellHeight },
            end: { x: startX + conceptColumnWidth + valueColumnWidth, y: startY - rowIndex * cellHeight },
            color: rowIndex === 0 ? rgb(0, 0, 0) : rgb(1, 0.75, 0.02)
        });
    }

    // fondo en total
    page.drawLine({
        start: { x: startX, y: startY + 15 - data.length * cellHeight },
        end: { x: startX + conceptColumnWidth + valueColumnWidth, y: startY + 15 - data.length * cellHeight },
        color: rgb(1, 0.75, 0.02),
        thickness: cellHeight
    });

    page.drawLine({
        start: { x: startX, y: startY },
        end: { x: startX, y: startY - cellHeight * data.length },
        color: rgb(1, 0.75, 0.02)
    });

    page.drawLine({
        start: { x: startX + conceptColumnWidth, y: startY },
        end: { x: startX + conceptColumnWidth, y: startY - cellHeight * data.length },
        color: rgb(1, 0.75, 0.02)
    });

    page.drawLine({
        start: { x: startX + conceptColumnWidth + valueColumnWidth, y: startY },
        end: { x: startX + conceptColumnWidth + valueColumnWidth, y: startY - cellHeight * data.length },
        color: rgb(1, 0.75, 0.02)
    });

    // Agregar texto a cada celda, truncando el texto si es demasiado largo
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        const conceptText = data[rowIndex][0];
        const valueText = data[rowIndex][1];

        // Texto truncado para evitar superposición
        const truncatedConceptText = conceptText.length > 53 ? `${conceptText.slice(0, 50)}...` : conceptText;
        const truncatedValueText = valueText.length > 21 ? `${valueText.slice(0, 18)}...` : valueText;

        page.drawText(truncatedConceptText, {
            x: startX + 5,
            y: startY - rowIndex * cellHeight - 20,
            size: 12,
            font: TimesRomanBold,
            color: rgb(0, 0, 0)
        });

        page.drawText(truncatedValueText, {
            x: startX + conceptColumnWidth + 5,
            y: startY - rowIndex * cellHeight - 20,
            size: 12,
            font: TimesRomanBold,
            color: rgb(0, 0, 0)
        });
    }

    page.drawText('Atentamente.', {
        x: 310,
        y: 230,
        size: 12,
        font: TimesRomanBold,
        color: rgb(0, 0, 0)
    });

    page.drawText(quoter.vendedor?.nombre ?? '', {
        x: x / 2 - quoter.vendedor?.nombre?.length * 3.5,
        y: 210,
        size: 12,
        font: TimesRomanBold,
        color: rgb(0, 0, 0)
    });

    page.drawText('Control de operaciones', {
        x: 285,
        y: 190,
        size: 12,
        font: TimesRomanBold,
        color: rgb(0, 0, 0)
    });

    return pdfDoc;
};

export const unionEndPfd = async (tablePdfDoc: PDFDocument) => {
    const url = path.join(__dirname, '../assets/end-cotizacion.pdf');
    const input = await fs.readFileSync(url);
    const finalPdfDoc = await PDFDocument.load(input);

    // Unir ambos documentos PDF
    const pdfDoc = await PDFDocument.create();
    const [tablePage] = await pdfDoc.copyPages(tablePdfDoc, [0]);
    const [finalPage] = await pdfDoc.copyPages(finalPdfDoc, [0]);

    pdfDoc.addPage(tablePage);
    pdfDoc.addPage(finalPage);

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};
